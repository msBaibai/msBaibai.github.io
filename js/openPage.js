(function($){
	$.isOpenHrefStorage=false;
	var sudu="0.25";
	var body=$("body");
	var bodyDiv=$("body").children("div");
	var hrefArr=new Array();
	function preLoadPage(href){
		var html=localStorage.getItem(href);
		if(!html) {
			loadHTML(href);
		}
	}
	$.preLoadPage=preLoadPage;
	function loadHTML(href,fn){
		$.ajax({
			type: 'get',
			url: href,
			dataType: 'html',
			success: function (str) {
				var div = document.createElement("div");
				div.style.display = "none";
				div.innerHTML = handleHTML(str);
				str = $(div).html();
				if (!!href && href.indexOf("http://") == -1)
					localStorage.setItem(href, str);
				if(fn)
					fn(str);
			},
			error: function (msg) {
				alert("页面预加载失败!");
			}
		});
	}
	function handleHTML(str){
		str=str.substring(str.indexOf("<body"),str.indexOf("</body>")+7);
		return str;
	}
	function changePage(html,isRe){
		if(body.length==0){
			body=$("body");
			bodyDiv=body.children("div");
		}
		var fx=1;
		if(!!isRe)
			fx=isRe;
		var div = $(html);
		with(div[0].style){
			transition="-webkit-transform "+sudu+"s";
			webkitTransition="-webkit-transform "+sudu+"s";
			webkitTransform="translateX("+(100*fx)+"%)";
			position="fixed";
			top="0px";
			overflowY="auto";
			overflowX="hidden";
			width=$.pageWidth+"px";
			height=$.pageHeight+"px";
		}
		body.append(div);
		with(bodyDiv[0].style){
			transition="-webkit-transform "+sudu+"s";
			webkitTransition="-webkit-transform "+sudu+"s";
			position="fixed";
			top="0px";
			overflowY="auto";
			overflowX="hidden";
			width=$.pageWidth+"px";
			height=$.pageHeight+"px";
		}
		var timer=window.setTimeout(function(){
			clearTimeout(timer);
			with(div[0].style){
				webkitTransform="translateX(0%)";
			}
			with(bodyDiv[0].style){
				webkitTransform="translateX("+(-100*fx)+"%)";
			}
			timer=window.setTimeout(function(){
				clearTimeout(timer);
				bodyDiv.remove();
				with(div[0].style){
					webkitTransform="";
				}
				bodyDiv=div;
				if($.init){
					$.init();
				}
			},250);
		},10);
	}
	var hashChangeEvent=function(href){
		var hrefStr="";
		if(hrefArr.length>1)
			hrefStr=hrefArr[hrefArr.length-2];
		if(hrefStr==href){
			var html=localStorage.getItem(href);
			if(!!html&&$.isOpenHrefStorage){
				changePage(html,-1);
			}else{
				loadHTML(href,function(str){
					html=str;
					changePage(html,-1);
				});
			}
			hrefArr.pop();
		}else{
			hrefArr.push(href);
			var html=localStorage.getItem(href);
			if(!!html&&$.isOpenHrefStorage){
				changePage(html);
			}else{
				loadHTML(href,function(str){
					html=str;
					changePage(html);
				});
			}
		}
	}
	function pageName(){
	    var strUrl=location.pathname;
	    var arrUrl=strUrl.split("/");
	    var strPage=arrUrl[arrUrl.length-1];
	    return strPage;
    }
	
	$(function(){
		window.location.hash="#"+pageName();
		$(window).on("hashchange",function(){
			var hrefUrl=window.location.hash;
			hrefUrl=hrefUrl.replace("#","");
			hashChangeEvent(hrefUrl);
		});
		if(!$.isPC){
			$(document).on("touchend","a",function(){
				event.preventDefault();
				var href=$(this).attr("href");
				if(!!href)
					window.location.hash=href;
			});
		}
		$.pageWidth=$(window).width();
		$.pageHeight=$(window).height();
		var href=window.location.hash;
		href=href.replace("#","");
		hrefArr.push(href);
		$("body>div").css({"position":"fixed","top":"0px","overflow-x":"hidden","overflow-y":"auto","width":$.pageWidth+"px","height":$.pageHeight+"px"});
		var html=$("body").html();
		if($.isOpenHrefStorage)
			localStorage.setItem(href, html);
	});
	$.hrefTo=hashChangeEvent;
})(jQuery);
