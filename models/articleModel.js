// 引入数据库的配置文件 
var mongoose = require('../configs/db_config.js');

// 定义集合的骨架
var articleSchema = new mongoose.Schema({
	catId:{
		type: 'ObjectId',
		// 关联到哪个集合
		ref: 'category',
	},
	taici : {
		type: String,	//标题
		default:'',
	},	
	author : {
		type: String,	//作者
		default:'佚名',
	},	
	createTime:{	     
		type:Date,	    //时间
		default: new Date(),
	},
	fengmian : {		//封面
		type : String,
	},
});


// 创建模型对象 专门用来操作 user 集合
var articleModel = mongoose.model('article',articleSchema);

// 暴露操作数据的模型对象
module.exports = articleModel;