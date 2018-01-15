// 引入操作数据的模型对象
var categoryModel = require('../models/categoryModel');


// 声明一个控制器的对象
var indexController = {}

indexController.index = function(req,res,next){

	categoryModel.find(function(err,data){

		console.log(data);	

		res.render('index',{items:data});

	})
}
// 登录页面
indexController.login = function(req, res, next) {
	
  categoryModel.find(function(err,data){

		console.log(data);	

		res.render('login',{items:data});

	})}





module.exports = indexController;
