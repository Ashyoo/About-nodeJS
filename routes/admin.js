var express = require('express');
var router = express.Router();

// 引入控制器模块
var adminController = require('../controllers/adminController');

/*------------登录-------------------*/
// 管理员登录 页面
router.get('/adminLogin', adminController.adminLogin);
// 管理员登录 数据验证
router.post('/doAdminLogin',adminController.doAdminLogin)

// 管理员注册  页面
router.get('/adminReg', adminController.adminReg);
//  管理员注册 数据
router.post('/insertAdmin', adminController.insertAdmin);

/* 首页 */ 
router.get('/', adminController.list);

// 分类管理 页面
router.get('/categoryCon', adminController.categoryCon);

// 查看分类 页面
router.get('/categorySee', adminController.categorySee);

// 删除分类
router.get('/removeCategory/:_id', adminController.removeCategory);

// 编辑分类 页面
router.get('/updateCategory/:_id', adminController.updateCategory);

// 提交编辑之后的分类
router.post('/updatedCategory', adminController.updatedCategory);

// 插入添加分类的数据 
router.post('/insertCategory', adminController.insertCategory);

/*------------台词管理-------------------*/
// 文章管理 页面
router.get('/articleCon', adminController.articleCon);

// 插入添加文章的数据 
router.post('/insertArticle', adminController.insertArticle);

// 台词列表 页面
router.get('/articleSee', adminController.articleSee);


// 删除台词
router.get('/removeArticle/:_id', adminController.removeArticle);
// 编辑台词 页面
router.get('/updateArticle/:_id', adminController.updateArticle);

// 提交编辑之后的分类
router.post('/updatedArticle', adminController.updatedArticle);

module.exports = router;


