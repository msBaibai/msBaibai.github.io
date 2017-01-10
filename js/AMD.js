(function(win){
	var isOpenSaveJs=false;
	var saveJs={};
	var jsFiles="js/";
	win.loadJs=function(jsUrl,fn){
		if((typeof jsUrl)=="string"){
			if(!saveJs.hasOwnProperty(jsUrl)){
				saveJs[jsUrl]="";
				sJs(jsFiles+jsUrl+".js",function(){
					if(!!fn) fn();
				});
			}else{
				if(!!fn) fn();
			}
		}else if((typeof jsUrl)=="object"){
			var count=jsUrl.length;
			var c=0;
			for(var i in jsUrl){
				if(jsUrl.hasOwnProperty(i)){
					var url=jsUrl[i];
					if(!saveJs.hasOwnProperty(url)){
						saveJs[url]="";
						sJs(jsFiles+url+".js",function(){
							c++;
							if(count==c) if(!!fn) fn();
						});
					}else{
						c++;
						if(count==c) if(!!fn) fn();
					}
				}
			}
		}
	}
	function sJs(url,fn){
		if(!!isOpenSaveJs){
			$_.getHTML(url,function(text){
				if(!text||text==null||text=="null"||text=="undefined"){
					ajax(url,function(text){
						eval.call(win,text);
						$_.addHTML(url,text);
						if(!!fn) fn();
					});
				}else{
					eval.call(win,text);
					if(!!fn) fn();
				}
			});
		}else{
			ajax(url,function(text){
				eval.call(win,text);
				if(!!fn) fn();
			});
		}
	}
	function ajax(url,fn){
		var xmlhttp;
		if (window.XMLHttpRequest){
		  xmlhttp=new XMLHttpRequest();
		}else{
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				if(!!fn) fn(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET",url,true);
		xmlhttp.send();
	}
	
	
	win.loadJsM=function(jsUrl,fn){
		var count=jsUrl.length;
		var c=0;
		if(count>0){
			dgJsList(0,jsUrl,count,fn);
		}
	}
	function dgJsList(c,jsUrl,count,fn){
		var url=jsUrl.shift();
		if(!!url){
			if(!saveJs.hasOwnProperty(url)){
				saveJs[url]="";
				sJs(jsFiles+url+".js",function(){
					c++;
					dgJsList(c,jsUrl,count,fn);
					if(count==c) if(!!fn) fn();
				});
			}else{
				c++;
				dgJsList(c,jsUrl,count,fn);
				if(count==c) if(!!fn) fn();
			}
		}
		
	}
	function sJs(url,fn){
		if(!!isOpenSaveJs){
			$_.getHTML(url,function(text){
				if(!text||text==null||text=="null"||text=="undefined"){
					ajax(url,function(text){
						eval.call(win,text);
						$_.addHTML(url,text);
						if(!!fn) fn();
					});
				}else{
					eval.call(win,text);
					if(!!fn) fn();
				}
			});
		}else{
			ajax(url,function(text){
				eval.call(win,text);
				if(!!fn) fn();
			});
		}
	}
	function ajax(url,fn){
		var xmlhttp;
		if (window.XMLHttpRequest){
		  xmlhttp=new XMLHttpRequest();
		}else{
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				if(!!fn) fn(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET",url+"?_="+(new Date()).getTime(),true);
		xmlhttp.send();
	}
})(window);
