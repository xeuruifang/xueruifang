const http = require('http');
const fs = require('fs');
const queryString = require('querystring');


http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	let str = '';
	req.on('data',function(data){
		str += data;
	})
	req.on('end',function(err){
		if(err) throw err;
		let json = queryString.parse(str); 
		fs.readFile('./data.txt','utf8',function(err,data){
			if(err) throw err;
		 	let json1 = JSON.parse(data);
			if(json1[json.user]){
				res.write('账号已注册');
				res.end();
			}else{
				json1[json.user] = json.pass;  //json对象赋值{"xiebin":"123456"}
				fs.writeFile('./data.txt',JSON.stringify(json1),function(err){
						if(err) throw err;
						res.write('注册成功');
						res.end();
					})			
			}			
		})
	 })

}).listen(1001,function(){
	console.log('server')
})
//登陆
http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	let str = '';
	req.on('data',function(data){
		str += data;
	})
	req.on('end',function(err){
		if(err) throw err;
		let json = queryString.parse(str);
		fs.readFile('./data.txt','utf8',function(err,data){
			if(err) throw err;
			let json1 = JSON.parse(data); 
			if(json1[json.user] == json.pass){
				res.write('登录成功');
				res.end();
			}else{
				res.write('账号密码错误');
				res.end();
			}
		})
	})
}).listen(1000)