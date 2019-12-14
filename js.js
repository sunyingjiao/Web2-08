var box =document.getElementById('box');
var navigations = document.getElementById('nav').children;
var slider = document.getElementById('slider');
var left = document.getElementById('left');
var right = document.getElementById('right');
var index = 1;
var timer;
var isMoving = false;
box.onmouseover = function(){
    animate(left,{opacity:50})
    animate(right,{opacity:50})
    clearInterval(timer)
}
box.onmouseout = function(){
    animate(left,{opacity:0})
    animate(right,{opacity:0})
    timer = setInterval(next,3000);
}
right.onclick = next;
left.onclick = prev;
for(var i=0;i<navigations.length;i++){
    navigations[i].index = i;
    navigations[i].onclick = function(){
        index = this.index+1;
        navmove();
        animate(slider,{left:-1200*index});
    }
}
function next(){
    if(isMoving){
        return;
    }
    isMoving = true;
    index++;
    navmove();
    animate(slider,{left:-1200*index},function(){
        if(index===6){
            slider.style.left='-1200px';
            index=1;
        }
        isMoving=false;
    });

}

function prev(){
    if (isMoving) {
        return;
    }
    isMoving=true;
    index--;
    navmove();
    animate(slider,{left:-1200*index},function(){
        if(index===0){
            slider.style.left = '-6000px';
            index = 5;
        }
        isMoving = false;
    });
}
function navmove(){
    for(var i=0;i<navigations.length;i++){
    	navigations[i].className="";
    }
    if(index>5){
        navigations[0].className="active";
    }
    else if(index<=0){
        navigations[4].className="active";
    }
    else{
        navigations[index-1].className="active";
    }
}


function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
timer = setInterval(next,3000);