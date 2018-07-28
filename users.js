var express = require('express');
var fs=require('fs');
var formidable=require('formidable');
var router = express.Router();
var AipOcrClient = require("baidu-aip-sdk").ocr;
var url=require('url');

// 设置APPID/AK/SK
var APP_ID = "10403470";
var API_KEY = "cf0iE3yKa2u4CFMpDzKwrfAC";
var SECRET_KEY = "3EQwCWo6Itm0QUCzx6KOoemFxnO4V13k";

var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
function getResult(res,imgName){
		var image = fs.readFileSync(imgName);
		var base64Img = new Buffer(image).toString('base64');
		client.generalBasic(base64Img).then(function(result) {
	    	console.log(JSON.stringify(result));
	    	res.json(result);
		});
	}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/uploadPhoto',function(req,res){
		// 跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    
    let form=new formidable.IncomingForm();
    form.encoding='utf-8';
    form.keepExtensions = true; // 保留扩展�?    form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小
    form.uploadDir = 'F:/node/ocr';  // 存储路径
    form.parse(req,function(err,fileds,files){// 解析 formData数据
    	if(err){
    		return console.log(err);
    	}
    	let imgpath=files.img.path;// 获取文件路径
    	var name=url.parse(imgpath);
    	var result=name.pathname.split('/');
    	let data=fs.readFileSync(imgpath);//同步读取文件，取得buffer
    	
    	//fs.writeFile(filename, data, [options], [callback(err)])
//  	filename      (String)            文件名称
//
//		data        (String | Buffer)    将要写入的内容，可以使字符串 �?buffer数据�?
//		
//		options        (Object)           option数组对象，包含：
//		
//		· encoding   (string)            可选值，默认 ‘utf8′，当data使buffer时，该值应该为 ignored�?
//		
//		· mode         (Number)        文件读写权限，默认�?438
//		
//		· flag            (String)            默认�?‘w'
//		
//		callback {Function}  回调，传递一个异常参数err�?		fs.writeFile(result[3],data,function(err){
    		if(err){ return console.log(err) }
    		//console.log(imgName)
    		fs.unlink(imgpath,function(){});
    		getResult(res,result[3]);
    	})
    	
    })
})

module.exports = router;
