

 	var fs=require('fs'),
	 http=require('http'),
	 url=require("url");
	http.createServer(function(req,res){
		res.setHeader('Access-Control-Allow-Origin','*');
		
		
		var str=url.parse(req.url,true).query;
		
		fs.writeFile('data.txt',JSON.stringify(str),function(err){
			res.write(str.content)
			res.end();
		})
	}).listen(8080)