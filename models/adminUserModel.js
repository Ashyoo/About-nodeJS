// 引入数据库的配置文件 
var mongoose = require('../configs/db_config.js');

// 定义集合的骨架
var adminUserSchema = new mongoose.Schema({
	// 骨架 用来 约束 集合 的属性
	 
	//名称
	adminUsername:{
		type : String,
  
	},
	adminPassword:{
		type:String,
		
	},

});


// 创建模型对象 专门用来操作 user 集合
var adminUserModel = mongoose.model('adminUser',adminUserSchema);

// 暴露操作数据的模型对象
module.exports = adminUserModel;