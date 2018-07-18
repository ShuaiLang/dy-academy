const keys = require('../config/keys');
const path = require('path');
const Courses = require('../models/course');
const AlipaySdkConfig = {
	appId: keys.alipayAppId,
	notifyUrl: 'http://localhost:3000/api/alipay_notify',
	rsaPrivate: path.resolve('./config/alipay-private.pem'),
	rsaPublic: path.resolve('./config/alipay-public.pem'),
	sandbox: true,
	signType: 'RSA2'
};

const Alipay = require('alipay-node-sdk');
const ali = new Alipay(AlipaySdkConfig);

module.exports = (app) => {
	// instant purchase
	app.get('/api/payment/:id', isLoggedIn, async (req, res) => {
		req.user.local.purchasedCourses = Array.from(new Set([...req.user.local.purchasedCourses, req.params.id]));
		const user = await req.user.save();
		res.send(user);
	});

	app.get('/api/alipay/:id', isLoggedIn, async (req, res) => {
		// get course data 
		// console.log('ali object: ', ali);
		const courseData = await getCourseData(req.params.id);
		// console.log(`course data : ${courseData}`);
		const params = await generateInstantPaymentParams(courseData);
		// console.log(`params: ${params}`);
		if(params)
			res.redirect(params);
		// 验签
		// 打印执行日志

		// response handler
		
	});

	app.get('/api/test', (req, res) => {
		res.send(req.query);
	})

	app.get('/api/alipay_return', (req, res) => {
		console.log('alipay 响应报文: ', req.query);
		let response = ali.signVerify(req.query);
		if (response === false) {
			return res.error("return 回调签名验证未通过");
		}
		res.send(response);
		
	});

	//支付宝异步通知，必须是公网地址，否则收不到反馈。
	// 支付结果必须以notify_url得到的信息为准，否则会有掉单可能。
	// 加入更新数据库逻辑
	app.post('/api/alipay_notify', (req, res) => {

		let response = ali.signVerify(req.body);
		if (response === false) {
			return res.error("fail");
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
	console.log('promise: ', promise);
	return promise;
};

function generateInstantPaymentParams(Item) {
	let outTradeId = Date.now().toString();
	console.log(`Item: ${Item}`);
	const charge = ali.pagePay({
	    subject: Item.Name,
	    body: Item.Description,
	    outTradeId: outTradeId,
	    timeout: '10m',
	    amount: Item.Price,
	    goodsType: '0',
	    qrPayMode: 2,
	    return_url: 'http://localhost:3000/api/alipay_return'
	});
	return charge;
};