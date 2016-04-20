(function($){
	function touchObj(selector,type,func) {
	    //滑动范围在5x5内则做点击处理，s是开始，e是结束
	    var init = {x:5,y:5,sx:0,sy:0,ex:0,ey:0};
	    var sTime = 0, eTime = 0;
	    type = type.toLowerCase();
	    $(document).off("touchstart",selector).on("touchstart",selector,function(e){
	  		sTime = new Date().getTime();
	        init.sx = event.targetTouches[0].pageX;
	        init.sy = event.targetTouches[0].pageY;
	        init.ex = init.sx;
	        init.ey = init.sy;
	        if(type.indexOf("start") != -1) func();
	  	});
	  	$(document).off("touchmove",selector).on("touchmove",selector,function(e){
	  		init.ex = event.targetTouches[0].pageX;
	        init.ey = event.targetTouches[0].pageY;
	        if(type.indexOf("move")!=-1) func.call(this,e,init);
	  	});
	  	$(document).off("touchend",selector).on("touchend",selector,function(e){
	  		var changeX = init.sx - init.ex;
	        var changeY = init.sy - init.ey;
	        
	        if(Math.abs(changeX)>Math.abs(changeY)&&Math.abs(changeY)>init.y) {
	            //左右事件
	            if(changeX > 0) {
	                if(type.indexOf("left")!=-1) func.call(this,e);
	            }else{
	                if(type.indexOf("right")!=-1) func.call(this,e);
	            }
	        }
	        else if(Math.abs(changeY)>Math.abs(changeX)&&Math.abs(changeX)>init.x){
	            //上下事件
	            if(changeY > 0) {
	                if(type.indexOf("top")!=-1) func.call(this,e);
	            }else{
	                if(type.indexOf("down")!=-1) func.call(this,e);
	            }
	        }
	        else if(Math.abs(changeX)<init.x && Math.abs(changeY)<init.y){
	            eTime = new Date().getTime();
	            //点击事件，此处根据时间差细分下
	            if((eTime - sTime) > 300) {
	                if(type.indexOf("long")!=-1) func.call(this,e); //长按
	            }else {
	                if(type.indexOf("click")!=-1) func.call(this,e); //当点击处理
	            }
	        }
	        if(type.indexOf("end")!=-1) func.call(this,e,init);
	  	});
//	    obj.addEventListener("touchstart",function(){
//	        sTime = new Date().getTime();
//	        init.sx = event.targetTouches[0].pageX;
//	        init.sy = event.targetTouches[0].pageY;
//	        init.ex = init.sx;
//	        init.ey = init.sy;
//	        if(type.indexOf("start") != -1) func();
//	    }, false);
//	  
//	    obj.addEventListener("touchmove",function(e) {
//	        //event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
//	        init.ex = event.targetTouches[0].pageX;
//	        init.ey = event.targetTouches[0].pageY;
//	        if(type.indexOf("move")!=-1) func.call(this,e,init);
//	    }, false);
//	  
//	    obj.addEventListener("touchend",function(e) {
//	        var changeX = init.sx - init.ex;
//	        var changeY = init.sy - init.ey;
//	        
//	        if(Math.abs(changeX)>Math.abs(changeY)&&Math.abs(changeY)>init.y) {
//	            //左右事件
//	            if(changeX > 0) {
//	                if(type.indexOf("left")!=-1) func.call(this,e);
//	            }else{
//	                if(type.indexOf("right")!=-1) func.call(this,e);
//	            }
//	        }
//	        else if(Math.abs(changeY)>Math.abs(changeX)&&Math.abs(changeX)>init.x){
//	            //上下事件
//	            if(changeY > 0) {
//	                if(type.indexOf("top")!=-1) func.call(this,e);
//	            }else{
//	                if(type.indexOf("down")!=-1) func.call(this,e);
//	            }
//	        }
//	        else if(Math.abs(changeX)<init.x && Math.abs(changeY)<init.y){
//	            eTime = new Date().getTime();
//	            //点击事件，此处根据时间差细分下
//	            if((eTime - sTime) > 300) {
//	                if(type.indexOf("long")!=-1) func.call(this,e); //长按
//	            }else {
//	                if(type.indexOf("click")!=-1) func.call(this,e); //当点击处理
//	            }
//	        }
//	        if(type.indexOf("end")!=-1) func.call(this,e,init);
//	    }, false);
	};
	$.touchObj=touchObj;
	function setDataTemplate(dataTemplate,key,val){
		return dataTemplate.replace(new RegExp("\\{\\["+key+"\\]\\}","ig"),val);
	}
	$.listSetVal=setDataTemplate;
	$.tap=function(selector,fn){
		if(!$.isPC){
			$.touchObj(selector,"click",fn);
		}else{
			$(document).off("click",selector).on("click",selector,fn);
		}
	}
})(jQuery);
