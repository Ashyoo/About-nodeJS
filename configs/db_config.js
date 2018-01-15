// 使用 mongoose 连接 mongodb  
// 加载 mongoose 模块
var mongoose = require('mongoose');
// 定义数据库的地址
var dbUrl = 'mongodb://localhost:27017/taici';

mongoose.connect(dbUrl,function(err){
	if(err){
		console.log('数据库连接失败');
	}
});

// 向外暴露模块
module.exports = mongoose;
