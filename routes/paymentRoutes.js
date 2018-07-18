const keys = require('../config/keys');
const path = require('path');
const Courses = require('../models/course');
const User = require('../models/user');

const notify_url = `${process.env.NODE_ENV === "production" 
	? 'https://shielded-shelf-96177.herokuapp.com/'
	: 'http://localhost:3000'}/api/alipay_notify`;

const return_url = `${process.env.NODE_ENV === "production" 
	? 'https://shielded-shelf-96177.herokuapp.com/'
	: 'http://localhost:3000'}/api/alipay_return`;

const AlipaySdkConfig = {
	appId: keys.alipayAppId,
	notifyUrl: notify_url,
	rsaPrivate: path.resolve('./config/alipay-private.pem'),
	rsaPublic: path.resolve('./config/alipay-public.pem'),
	sandbox: true,
	signType: 'RSA2'
};

const Alipay = require('alipay-node-sdk');
const ali = new Alipay(AlipaySdkConfig);
let outTradeId = Date.now().toString();

module.exports = (app) => {
	// instant purchase
	app.get('/api/payment/:id', isLoggedIn, async (req, res) => {
		req.user.local.purchasedCourses = Array.from(new Set([...req.user.local.purchasedCourses, req.params.id]));
		const user = await req.user.save();
		res.send(user);
	});
	
	app.get('/api/mongo/:userId/:courseId', (req, res) => {
		User.findById(req.params.userId, async 	(err, user) => {
			if(err)
				console.log('mongo query err: ', err);
			else {
				// console.log("user: ", user.local);
				user.local.purchasedCourses = Array.from(new Set([...user.local.purchasedCourses, req.params.courseId]));
				const newUser = await user.save();
				res.send(user);
			}
		});
	});
	
	// instant purchase
	app.get('/api/alipay/:id', isLoggedIn, async (req, res) => {
		// get course data 
		console.log('req.user: ', req.user);
		// console.log('ali object: ', ali);
		console.log('return url: ', return_url);
		const courseData = await getCourseData(req.params.id);
		// console.log(`course data : ${courseData}`);
		const params = await generateInstantPaymentParams(courseData, outTradeId, req.user._id);
		// console.log(`params: ${params}`);
		if(params)
			res.redirect(params);
		
	});

	// look at query
	app.get('/api/test', (req, res) => {
		res.send(req.query);
	});

	app.get('/api/alipay_return', async (req, res) => {
		console.log('alipay 响应报文: ', req.query);
		// 验签
		let response = ali.signVerify(req.query);
		if (response === false) {
			return res.error("return 回调签名验证未通过");
		}

		ali.query({
		    outTradeId: req.query.out_trade_no
		}).then(function (ret) {
		    console.log("***** ret.body=" + ret.body);
		    //签名校验
		    var ok = ali.signVerify(ret.json());
		    console.log('Ali query: ', ok);
		});
		res.send(ret.body);
		
	});

	//支付宝异步通知，必须是公网地址，否则收不到反馈。
	// 支付结果必须以notify_url得到的信息为准，否则会有掉单可能。
	// 加入更新数据库逻辑
	app.post('/api/alipay_notify', async (req, res) => {

		let response = ali.signVerify(req.body);
		if (response === false) {
			return res.error("fail");
		} else {
			if(req.body.trade_status === 'TRADE_SUCCESS') {
				const params = JSON.parse(req.body.passbackParams);
				const userId = params.userId;
				const courseId = params.courseId;
				
				User.findById(userId, async (err, user) => {
					if(err)
						console.log('mongo query err: ', err);
					else {
						// console.log("user: ", user.local);
						user.local.purchasedCourses = Array.from(new Set([...user.local.purchasedCourses, courseId]));
						const newUser = await user.save();
						console.log(newUser);
					}
				});
				res.send('success');
			}
		}

		res.send('success');
		// console.log('notify', response);
	});
}

function isLoggedIn(req, res, next) {
    if(!req.user) {
		// stop the middleware chain right here, otherwise more error.
		// return res.status(403).redirect('./');//.send({ error: 'You must log in!'});
		res.redirect('/login');
	}
	console.log('require login: logged in');
	next();
};

function getCourseData(courseId) {
	var promise = Courses.findById(courseId).exec();
	// console.log('promise: ', promise);
	return promise;
};

function generateInstantPaymentParams(Item, outTradeId, userId) {
	console.log(`Item: ${Item}`);
	console.log(`outTradeId: ${outTradeId}`);
	const charge = ali.pagePay({
	    subject: Item.Name,
	    body: Item.Description,
	    passbackParams: JSON.stringify({
	    	description: Item.Description,
	    	courseId: Item._id,
	    	userId: userId
	    }),
	    outTradeId: outTradeId,
	    timeout: '10m',
	    amount: Item.Price,
	    goodsType: '0',
	    qrPayMode: 2,
	    return_url: return_url
	});
	console.log('charge: ', charge);
	return charge;
};