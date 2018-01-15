// 引入数据库的配置文件 
var mongoose = require('../configs/db_config.js');

// 定义集合的骨架
var categorySchema = new mongoose.Schema({
	// 骨架 用来 约束 集合 的属性
	 
	//分类名称
	fenlei:{
		type : String,
		unique:true,     //名是唯一的
	},
	info:{
		type:String,
		default:"中国好台词",
	},
	pic :{
		type:String,
	},
});


// 创建模型对象 专门用来操作 集合
var categoryModel = mongoose.model('category',categorySchema);

// 暴露操作数据的模型对象
module.exports = categoryModel;