// 引入操作数据的模型对象
var categoryModel = require('../models/categoryModel');

var articleModel = require('../models/articleModel');

var adminUserModel = require('../models/adminUserModel');

// 引入图片上传配置文件
var imgUpload = require('../configs/imgUpload_config');

// 声明一个控制器的对象
var adminController = {}

//**********************登录*************************************
adminController.adminLogin = function(req, res, next) {
  res.render('adminLogin');
}

adminController.doAdminLogin = function(req, res, next) {
	console.log(req.body);
  	var username = req.body.adminUsername.trim();
	var password = req.body.adminPassword.trim();

	// 给密码加密
	// 1. 引入加密模块
	var crypto = require('crypto');
	// 选加密的方法
	var md5 = crypto.createHash('md5');
	// 开始加密字符串
	md5.update(password);
	// 输出加密后的字符串
	var md5Password = md5.digest('hex');

  	adminUserModel.find({adminUsername:username,adminPassword:md5Password},function(err,data){

		if(data==''){
			// console.log('登录失败')
			res.redirect('.admin');
		}else{
			res.redirect('/admin/adminLogin')
		}
	})
}

// 管理员注册 页面
adminController.adminReg = function(req, res, next) {
  res.render('adminReg');
}

// 管理员注册 数据
adminController.insertAdmin = function(req, res, next) {
	console.log(req.body)

	var username = req.body.adminUsername.trim();
	var password = req.body.adminPassword.trim();

	// 给密码加密
	// 1. 引入加密模块
	var crypto = require('crypto');
	// 选加密的方法
	var md5 = crypto.createHash('md5');
	// 开始加密字符串
	md5.update(password);
	// 输出加密后的字符串
	var md5Password = md5.digest('hex');

  	adminUserModel.create({adminUsername:username,adminPassword:md5Password},function(err){

		if(err){
			console.log('操作失败')
		}else{
			res.send('ok');

		}
	})
}

//**********************分类管理*************************************
// 首页
adminController.list = function(req, res, next) {
  res.render('admin');
}

// 添加分类 页面
adminController.categoryCon = function(req, res, next) {
  res.render('categoryCon');
}

// 分类列表
adminController.categorySee = function(req, res, next) {
	// 查询分类
	categoryModel.find(function(err,data){
		res.render('categorySee',{datalist:data});
		console.log(data);
	})
}

// 编辑分类 页面
adminController.updateCategory = function(req, res, next) {
	// 查询分类
	categoryModel.findOne(req.params,function(err,data){
		// 响应页面 发送数据
		res.render('updateCategory',{datalist:data});
		console.log(data);
	})
}
// 提交修改过后的信息
adminController.updatedCategory = function(req, res, next) {
	//  上传文件保存的位置
	var imgpath = './uploads';

	// 定义允许图片上次的类型
    var imgType = ['image/gif','image/jpeg','image/png'];

    // 调用图片上传函数
	var upload = imgUpload(imgpath,imgType).single('pic');

	// 图片上传
	upload(req,res,function(err){
		// 判断是否修改图片 如果修改 file!=undefined
		if(req.file != undefined){
			// 给req.body.pic重新赋值
			req.body.pic = req.file.filename;
		}

		// 把上传后的图片名称放到 req.body 里
		console.log(req.body);
		categoryModel.update({_id:req.body._id},req.body,function(err){
			if(err){
				console.log('操作失败11')
			}else{
				console.log('ok')
				res.redirect('/admin/categorySee');
			}
		})
	});
}

// 删除分类 
adminController.removeCategory = function(req, res, next) {

  categoryModel.remove(req.params,function(err,data){
  	console.log('删除成功');
  	res.redirect('/admin/categorySee');
  })
}

// 插入添加分类的数据
adminController.insertCategory = function(req, res, next){

	//  上传文件保存的位置
	var imgpath = './uploads';

	// 定义允许图片上次的类型
    var imgType = ['image/gif','image/jpeg','image/png'];

    // 调用图片上传函数
	var upload = imgUpload(imgpath,imgType).single('pic');

	// 图片上传
	upload(req,res,function(err){
		// 把上传后的图片名称放到 req.body 里
		req.body.pic = req.file.filename;
		console.log(req.body);
		categoryModel.create(req.body,function(err){
			if(err){
				console.log('操作失败')
			}else{
				console.log('ok')
				res.redirect('/admin/categorySee');
			}
		})
	});
}

// ***********************文章管理***********************************

// 文章管理的 页面
adminController.articleCon = function(req, res, next) {
	// 从数据库拿到分类列表的数据
  categoryModel.find(function(err,data){
  		// 将数据发送给文章管理
		res.render('articleCon',{datalist:data});
		console.log(data);
	})
}

// 插入添加文章的数据
adminController.insertArticle = function(req, res, next){

	//  上传文件保存的位置
	var imgpath = './uploads';

	// 定义允许图片上传的类型
    var imgType = ['image/gif','image/jpeg','image/png'];

    // 调用图片上传函数
	var upload = imgUpload(imgpath,imgType).single('fengmian');

	// 图片上传
	upload(req,res,function(err){
		// 把上传后的图片名称放到 req.body 里
		req.body.fengmian = req.file.filename;
		console.log(req.body);
		articleModel.create(req.body,function(err){
			if(err){
				console.log('操作失败')
			}else{
				console.log('ok')
				res.redirect('/admin/articleSee');
			}
		})
	});
}

// 两表联查 台词分类页面 
adminController.articleSee = function(req, res, next) {
	// 如果第一打开页面就 默认 第一页
	var page = req.query.page?req.query.page:1;

	// 定义每页显示多少条数据
	var pageSize = 3;

	// 查询 文章集合 所有的条数
	articleModel.find().count(function(err,total){
		// 计算 总的多少页
		var pageMax = Math.ceil(total/pageSize);

		// 判断提交过来的page 是否超出 边界
		if(page<1) page = 1;
		if(page>pageMax) page = pageMax;

		// 偏移量
		var pageOffset = (page-1)*pageSize;

		// 两表连查
		articleModel.find().populate('catId',{fenlei:1}).limit(pageSize).skip(pageOffset).exec(function(err,data){
			res.render('articleSee',{articlelist:data,pageMax:pageMax,page:page});
		})
	})

}

// 删除台词 
adminController.removeArticle = function(req, res, next) {

  articleModel.remove(req.params,function(err,data){
  	console.log('删除成功');
  	res.redirect('/admin/articleSee');
  })
}

// 编辑台词的 页面
adminController.updateArticle = function(req, res, next) {
	articleModel.findOne(req.params).populate('catId',{fenlei:1}).exec(function(err,data){
        console.log(req.params)
        if(err){
            console.log(err)
        }else{
            categoryModel.find(function(err,data1){
                if(err){
                    console.log(err)
                }else{
                    console.log(data1);
                    console.log(data1[0]._id)
                    console.log(data)
                    res.render('updateArticle',{articleList:data,datalist:data1});
                }
            })
        }
    })
}

// 提交修改过后的信息
adminController.updatedArticle = function(req, res, next) {
	//  上传文件保存的位置
	var imgpath = './uploads';

	// 定义允许图片上次的类型
    var imgType = ['image/gif','image/jpeg','image/png'];

    // 调用图片上传函数
	var upload = imgUpload(imgpath,imgType).single('fengmian');

	// 图片上传
	upload(req,res,function(err){
		// 判断是否修改图片 如果修改 file!=undefined
		if(req.file != undefined){
			// 给req.body.pic重新赋值
			req.body.fengmian = req.file.filename;
		}

		// 把上传后的图片名称放到 req.body 里
		console.log(req.body);
		articleModel.update({_id:req.body._id},req.body,function(err){
			if(err){
				console.log('操作失败')
			}else{
				console.log('ok')
				res.redirect('/admin/articleSee');
			}
		})
	});
}
module.exports = adminController;