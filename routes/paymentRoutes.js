const keys = require('../config/keys');
const path = require('path');
const Courses = require('../models/course');
const AlipaySdkConfig = {
	appId: keys.alipayAppId,
	notifyUrl: 'http://localhost:3000/api/alipay/notify',
	return_url: 'http://localhost:3000/api/alipay/callback',
	rsaPrivate: path.resolve('./config/alipay-private.pem'),
	rsaPublic:  path.resolve('./config/alipay-public.pem'),
	sandbox: true,
	signType: 'RSA'
}

const Alipay = require('alipay-node-sdk');
const ali = new Alipay(AlipaySdkConfig);
// /api/alipay/5b3aa9e5fb6fc03328f87349

module.exports = (app) => {
	// instant purchase
	app.get('/api/payment/:id', isLoggedIn, async (req, res) => {
		req.user.local.purchasedCourses = Array.from(new Set([...req.user.local.purchasedCourses, req.params.id]));
		const user = await req.user.save();
		res.send(user);
	});

	app.get('/api/alipay/:id', isLoggedIn, async (req, res) => {
		// get course data 
		const courseData = await getCourseData(req.params.id);
		console.log("courseData: ", courseData);
		const params = await generateInstantPaymentParams(courseData);
		console.log(`params: ${params}`);
		if(params)
			res.redirect(params);


		// let outTradeId = Date.now().toString();
		// const charge = ali.pagePay({
		//     subject: '测试商品',
		//     body: '测试商品描述',
		//     outTradeId: outTradeId,
		//     timeout: '10m',
		//     amount: '10.00',
		//     goodsType: '0',
		//     qrPayMode: 2
		// });

		// console.log(charge);
		// res.redirect(charge);

		// const charge = await AlipaySdk('alipay.trade.page.pay', {
		// 	biz_content: {
		// 		out_trade_no: '20150320010101001',
		// 		subject: 'Iphone6 16G',
		// 		body: 'Iphone6 16G',
		// 		total_amount: 88.88
		//     },
		// }, {
		// 	// 验签
		// 	validateSign: true,
		// 	// 打印执行日志
		// 	log: this.logger,
		// })
	});

	app.get('/api/alipay/callback', (req, res) => {
		res.send({"payment" : 'ok'});
	});
}

function isLoggedIn(req, res, next) {
    if(!req.user) {
		// stop the middleware chain right here, otherwise more error.
		return res.status(403).send({ error: 'You must log in!'});
	}
	console.log('require login: logged in');
	next();
};

function getCourseData(courseId) {
	//let courseData = null;
	return Courses.findById(courseId, (err, course) => {
		if(err) {
			console.log(`Error in instantPayment: ${err}`);
			return false;
		}
		// console.log("course: ", course);
		// courseData = course;
	});
}

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
	    qrPayMode: 2
	});
	return charge;
}