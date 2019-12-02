"use strict";

var doc = document;

/* 
* 智能机浏览器版本信息: 
*/ 
var browser = { 
  versions:function(){
    var u = navigator.userAgent, app = navigator.appVersion; 
    return {
      trident: u.indexOf('Trident') > -1, //IE内核 
      presto: u.indexOf('Presto') > -1, //opera内核 
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端 
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器 
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQ HD浏览器 
      iPad: u.indexOf('iPad') > -1, //是否iPad 
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部 
    };
  }(), 
  language:(navigator.browserLanguage || navigator.language).toLowerCase() 
} 
var is_mobile = browser.versions.mobile;

// 简单判断窗口宽度 小于 600 则使用手机模式适配
// BTS.mobile = window.innerWidth <= 500;

function loadImage(name, url,callback) {     
    var img = new Image();
    img.onload =function(){
      img.onload = null;
      BTS.images[name] = img;
      BTS.current_onload_image_count++;
      if ( BTS.current_onload_image_count >= BTS.IMAGE_COUNT ) {
        BTS.image_all_loaded = true;
      }
    }
    img.src = url; 
}

function createDomAttr(name,value) {
  var attr = document.createAttribute(name)
  attr.value = value
  return attr
} 

function clearMobileHeader() {
  // 清
  var container = document.getElementById("container");
  container.children[0].remove();

}

function fixMobile(){
  var wraps = doc.getElementsByClassName("wrap");
  for (var i = 0; i < wraps.length; i++) {
    var div = wraps[i];
    div.style.width = "88%";
    div.style.paddingTop = "22px";
    div.style.marginBottom = "0px";
  }

  var descs = doc.getElementsByClassName("title01");
  for (var i = 0; i < descs.length; i++) {
    var div = descs[i];
    div.style.fontSize = "0.6rem";
  }

  var descs = doc.getElementsByClassName("title02");
  for (var i = 0; i < descs.length; i++) {
    var div = descs[i];
    div.style.fontSize = "0.6rem";
  }  

  var descs = doc.getElementsByClassName("desc");
  for (var i = 0; i < descs.length; i++) {
    var div = descs[i];
    div.style.fontSize = "0.6rem";
  }

  var contents = doc.getElementsByClassName("content");
  for (var i = 0; i < contents.length; i++) {
    var div = contents[i];
    div.style.fontSize = "0.6rem";
    div.style.lineHeight = "1.0rem";
  }

  // 手动跳转锚
  var jump_id = location.hash.replace("#","");
  if ( jump_id ) {
    var scroll_top = document.getElementById(jump_id).offsetTop;
    document.documentElement.scrollTop = scroll_top;
  }

}


// 创建手机布局
function createMobileLayout() {
  clearMobileHeader()
  setTimeout(function(){
    fixMobile();
    document.getElementById("container").style.opacity = "1.0";
  },0)
}


function main(){
  if ( is_mobile) {
    createMobileLayout()
  } else {
    document.getElementById("container").style.opacity = "1.0";
  }  
}

window.addEventListener('load', function() {
  main();
})