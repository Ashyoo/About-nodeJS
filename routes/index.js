
var express = require('express');
var router = express.Router();

// 引入首页的控制器
var indexController = require('../controllers/indexController')

 // 首页 
router.get('/', indexController.index);

// 登录页面
router.get('/login', indexController.login);


module.exports = router;
