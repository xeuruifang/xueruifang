function ajax(option){
		var arr = [];
		for (var i in option.data){
			arr.push(i + '=' + option.data[i])
		}
		var str = arr.join('&');



		var xhr = new XMLHttpRequest();
		if(option.type == 'get'){
		xhr.open(option.type,option.url+'?'+str,option.async);
		xhr.send();
		}else if(option.type == 'post'){
		xhr.open(option.type,option.url,option.async);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(str);
		}
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
					option.success(xhr.responseText)
				}else{
					option.error()
				}
			}
		}
	}