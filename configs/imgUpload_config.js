// 引入 multer 模块
var multer  = require('multer')
var path = require('path');
var timestamp = require('time-stamp');
// 生成唯一的 id
var uid =  require('uid');

/**
* 功能：定义图片上传的配置函数
* @param String imgPath  图片保存的路径
* @param Array  imgType  允许上传图片的类型
*/
function imgUpload(imgPath,imgType){

  // 配置上传的文件
  var storage = multer.diskStorage({
    // 设置保存图片的目录  
    destination: function (req, file, cb) {
      cb(null, imgPath)
    },
    // 保存的文件名
    filename: function (req, file, cb) {

      var extname = path.extname(file.originalname);

      // 自己定义 上传文件的文件名
      cb(null,'tou_'+timestamp('YYYYMMDD')+timestamp('HH')+'_'+uid()+extname);
    }
  })

  // 上传文件的过滤函数
  function fileFilter (req, file, cb) {
    if(imgType.indexOf(file.mimetype)==-1){
        // 拒绝这个文件，使用`false`, 像这样:
        cb(null, false);
        cb(new Error('不好意思只能上传 jpeg 、gif 和 png 的图片'));
    }else{
      cb(null, true);
    }
  }

  var upload = multer({
    storage: storage,
    fileFilter:fileFilter
  });

  return upload;
}

module.exports = imgUpload;

