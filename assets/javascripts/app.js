"use strict";

var doc = document;

var BTS = new Object();

BTS.timer_player = null;
BTS.timer_player_sub = null;

BTS.IMAGE_COUNT = 48
BTS.current_onload_image_count = 0
BTS.image_all_loaded = false
BTS.images = {}

BTS.wait_frame = 0
BTS.phase = 0;
BTS.sub_phase = 0;

BTS.dom_title = doc.getElementById("prod-title")
BTS.dom_content = doc.getElementById("prod-content")
BTS.dom = doc.getElementById("player")

BTS.custom_var = null

BTS.slide_inner_width = 355;
BTS.slide_inner_height = 769;

BTS.width = 355;

BTS.isEnLang = window.location.pathname.indexOf("/en") === 0
BTS.I18N = null;
BTS.TEXTS = null;

BTS.I18N_JSON = {
  "en": {
    "website": {
      "slide": {
        "01": ["Graphene technology, high concurrency", "Starting from the user experience<br/>Starting from native technology、Say goodbye to stuck<br/>Second level transfer，Comparable Centralized Exchange" ],
        "02": ["Market", "Flexible operation, instant response, and timely refresh <br/> Free operation, unobstructed pages"],
        "03": ["Timed refresh", "Real-time update page<br/>Grasp the market more accurately"],
        "04": ["Native interaction", "Based on APP native technology <br/>The better experience"],
        "05": ["K Line", "Price trend + Volume <br/>Left and right Gestures and curve changes <br/>Two-finger gesture zoom"],
        "06": ["Line",""],
        "07": ["Depth",""]
      },
      "intro01": "Graphene technology, high concurrency.",
      "intro02": "Focus on user experience<br/>native technology development<br/>fast transfer.",
      "intro03": "Market, K-line, Line, Depth<br/>real-time control of various data.",
      "intro04": "Support wallet mode registration, login, security double protection<br/>multi-account mode, safe and convenient",
      "intro05": "Voting system",
      "intro06": "Help interface. Make it easier to use.",
      "copyrightContent": "Copyright © 2019 btspp.io All Rights Reserved.",
      // "nameAppleDownload": "苹果下载",
      // "nameAndroidDownload": "安卓下载",
      "nameClickDownload": "Download",
      "nameContactUs": "Contact us",
      "mobileTopTextQa": "FAQ"
    }
  },
  "zh-cn": {
    "website": {
      "slide": {
        "01": ["石墨烯技术，高并发量", "从用户体验出发<br/>原生技术出发、告别卡顿<br/>秒级转账，媲美中心化交易所" ],
        "02": ["市场行情", "操作灵活，即时响应，时时刷新 <br/> 自由操作，界面一览无余"],
        "03": ["定时刷新", "实时的更新数据界面<br/>更准确地把握市场"],
        "04": ["原生交互", "基于APP native 技术 <br/> 更好的体验"],
        "05": ["K线", "价格趋势+成交量 <br/> 左右手势曲线变化 <br/>双指手势缩放"],
        "06": ["分时图",""],
        "07": ["交易深度",""]
      },
      "intro01": "石墨烯技术，高并发量",
      "intro02": "从用户体验出发<br/>原生技术出发、告别卡顿<br/>秒级转账，媲美中心化交易所",
      "intro03": "行情、K线、分时、深度<br/>各种数据实时掌握",
      "intro04": "首推钱包模式注册、登陆，安全双重保障<br/>多账号模式，安全、便捷同时兼顾<br/>原生技术开发，稳定、高效，告别卡顿",
      "intro05": "完善的投票系统、自制化活跃社区",
      "intro06": "BTS投票、查看、代理设置<br/>帮助界面，自动跳转，简洁、通俗的说明助您了解价值",
      "copyrightContent": "Copyright © 2019. 版权所有",
      // "nameAppleDownload": "苹果下载",
      // "nameAndroidDownload": "安卓下载",
      "nameClickDownload": "点击下载",
      "nameContactUs": "联系我们",
      "mobileTopTextQa": "常见问题"
    }
  }
}

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
BTS.mobile = browser.versions.mobile;

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

function loadImages() {
  loadImage("title","/assets/images/slide2/title.png")
  loadImage("markets02","/assets/images/slide2/markets02.png")
  loadImage("markets03","/assets/images/slide2/markets03.png")
  loadImage("markets04","/assets/images/slide2/markets04.png")
  loadImage("markets04a","/assets/images/slide2/markets04a.png")
  loadImage("detail01","/assets/images/slide2/detail01.png")
  loadImage("detail02","/assets/images/slide2/detail02.png")
  loadImage("detail03","/assets/images/slide2/detail03.png")
  loadImage("detail04","/assets/images/slide2/detail04.png")
  loadImage("detail05","/assets/images/slide2/detail05.png")
  loadImage("detail06","/assets/images/slide2/detail06.png")
  loadImage("detail07","/assets/images/slide2/detail07.png")
  loadImage("detail08","/assets/images/slide2/detail08.png")
  loadImage("detail09","/assets/images/slide2/detail09.png")
  loadImage("detail10","/assets/images/slide2/detail10.png")
  loadImage("detail11","/assets/images/slide2/detail11.png")
  loadImage("detail12","/assets/images/slide2/detail12.png")
  loadImage("detail13","/assets/images/slide2/detail13.png")
  loadImage("detail14","/assets/images/slide2/detail14.png")
  loadImage("detail15","/assets/images/slide2/detail15.png")
  loadImage("detail16","/assets/images/slide2/detail16.png")
  loadImage("detail17","/assets/images/slide2/detail17.png")
  loadImage("detail18","/assets/images/slide2/detail18.png")
  loadImage("detail19","/assets/images/slide2/detail19.png")
  loadImage("detail20","/assets/images/slide2/detail20.png")
  loadImage("detail21","/assets/images/slide2/detail21.png")
  loadImage("detail22","/assets/images/slide2/detail22.png")
  loadImage("detail23","/assets/images/slide2/detail23.png")
  loadImage("detail24","/assets/images/slide2/detail24.png")
  loadImage("detail25","/assets/images/slide2/detail25.png")
  loadImage("detail26","/assets/images/slide2/detail26.png")
  loadImage("detail27","/assets/images/slide2/detail27.png")
  loadImage("detail28","/assets/images/slide2/detail28.png")
  loadImage("detail29","/assets/images/slide2/detail29.png")
  loadImage("timeline01","/assets/images/slide2/timeline01.png")
  loadImage("timeline02","/assets/images/slide2/timeline02.png")
  loadImage("timeline03","/assets/images/slide2/timeline03.png")
  loadImage("timeline04","/assets/images/slide2/timeline04.png")
  loadImage("timeline05","/assets/images/slide2/timeline05.png")
  loadImage("timeline06","/assets/images/slide2/timeline06.png")
  loadImage("timeline07","/assets/images/slide2/timeline07.png")
  loadImage("timeline08","/assets/images/slide2/timeline08.png")
  loadImage("timeline09","/assets/images/slide2/timeline09.png")
  loadImage("timeline10","/assets/images/slide2/timeline10.png")
  loadImage("timeline11","/assets/images/slide2/timeline11.png")
  loadImage("timeline12","/assets/images/slide2/timeline12.png")
  loadImage("scroll1","/assets/images/slide2/scroll1.png")
  loadImage("scroll2","/assets/images/slide2/scroll2.png")


}

function clearImages(){
  if (BTS.dom.children && BTS.dom.children.length > 0) {
    for (var i = 0; i < BTS.dom.children.length; i++ ) {
      BTS.dom.children[i].remove();
    }
  }

}

function createDomAttr(name,value) {
  var attr = document.createAttribute(name)
  attr.value = value
  return attr
} 

function createImageDom(name){
  var dom = doc.createElement("img");
  var attr_src = createDomAttr("src",BTS.images[name].src);

  if (BTS.mobile) {
    var attr_width = createDomAttr("width",BTS.width + "px");
    dom.setAttributeNode(attr_width);
  }

  dom.setAttributeNode(attr_src);
  // dom.setAttributeNode(attr_width);
  dom.style.opacity = 0;
  dom.style.left = "0px";
  dom.style.position = "absolute";
  return dom;
}

function createWhiteRectDiv(){
  var dom = doc.createElement("div");
  dom.style.width = BTS.width + "px"

  dom.style.height = "40px"
  dom.style.backgroundColor = "white";
  dom.style.position = "absolute";
  dom.style.opacity = 1.1;
  dom.style.top = "158px";
  return dom;
}

function setContent(key){
  var text = BTS.TEXTS[key];
  BTS.dom_title.innerHTML = text[0];
  BTS.dom_content.innerHTML = text[1];
}

function updatePlayer() {
  if ( !BTS.image_all_loaded ) return;
  
  if ( BTS.wait_frame > 0 ){
    BTS.wait_frame--;
    return;
  }

  update()

}

function update() {
  if ( BTS.wait_frame > 0 ) return;

  // 阶段1 创建所有dom
  if ( BTS.sub_phase === 0 ) {

    clearImages();
    clear_vars();

    setContent("01")

    // 标题
    var dom;
    dom = createImageDom("title");
    dom.style.zIndex = 1001;
    dom.style.opacity = 1;
    BTS.dom.appendChild(dom);

    // 点击方块
    dom = createWhiteRectDiv()
    dom.style.zIndex = 2000;
    dom.style.opacity = 0;
    BTS.dom.appendChild(dom)

    dom = createImageDom("markets02")
    dom.style.left = 0;
    dom.style.opacity = 1;
    dom.style.zIndex = 1000;
    BTS.dom.appendChild(dom)

    dom = createImageDom("markets03")
    dom.style.left = BTS.width + "px";
    dom.style.opacity = 1;
    dom.style.zIndex = 1000;
    BTS.dom.appendChild(dom)

    dom = createImageDom("markets04")
    dom.style.left = BTS.width * 2 + "px";
    dom.style.opacity = 1;
    dom.style.zIndex = 1000;
    BTS.dom.appendChild(dom)

    dom = createImageDom("markets04a")
    dom.style.opacity = 1;
    dom.style.zIndex = 999;
    BTS.dom.appendChild(dom);

    // 详情 29 张
    for ( var i = 1; i <= 29; i++ ) {
      var fname;
      if (i < 10) {
        fname = "detail0" + i.toString();
      } else {
        fname = "detail" + i.toString();
      }

      dom = createImageDom(fname);

      if (i === 1) {
        // 第一张在右边 等待滚动
        dom.style.left = BTS.width + "px"
      }

      dom.style.opacity = 1;
      dom.style.zIndex = 999 - i;
      BTS.dom.appendChild(dom);
    }

    // timeline 12张
    for ( var i = 1; i <= 12; i++ ) {
      var fname;
      if (i < 10) {
        fname = "timeline0" + i.toString();
      } else {
        fname = "timeline" + i.toString();
      }

      dom = createImageDom(fname);

      if (i === 1) {
        // 第一张在右边 等待滚动
        dom.style.left = -BTS.width + "px"
      }

      dom.style.opacity = 1;
      dom.style.zIndex = 950 - i;
      BTS.dom.appendChild(dom);
    }

    dom = createImageDom("scroll1")
    dom.style.opacity = 1;
    dom.style.zIndex = 931;
    dom.style.top = "0px";
    BTS.dom.appendChild(dom);
    
    dom = createImageDom("scroll2")
    dom.style.opacity = 1;
    dom.style.zIndex = 930;
    dom.style.top = "0px";
    BTS.dom.appendChild(dom);

    // 等待用 phase
    BTS.sub_phase = 1;
    BTS.wait_frame = 40;

    return;

  }

  // 淡出
  if ( BTS.sub_phase === 1) {

    var dom = BTS.dom.children[0];
    var opacity = parseFloat(dom.style.opacity);
    if (opacity < 0) {
      dom.remove()
      BTS.sub_phase = 2;
      BTS.wait_frame = 40;
      BTS.custom_var = 10;
      setContent("02")
      return;
    } else {
      opacity -= 0.03;
      dom.style.opacity = opacity;

    }

  }

  // 滚动 market
  if ( BTS.sub_phase === 2) {

    var doms = [ BTS.dom.children[1], BTS.dom.children[2], BTS.dom.children[3] ];
    // 最后一张 <= 0 为移动结束
    if ( doms[2].style.left === "0px" ) {
      BTS.dom.children[1].remove();
      BTS.dom.children[1].remove();
      // BTS.wait_frame = 20;
      BTS.sub_phase = 3;
      return;

    } else {
      doms.forEach(function(dom){
        dom.style.left = (parseFloat(dom.style.left.replace("px","")) - BTS.width / 10).toString() + "px";
      })
    }
    BTS.custom_var--;
    if ( BTS.custom_var === 0 ) {
      BTS.custom_var = 10;
      BTS.wait_frame = 40;
    }
  }

  // 消失掉一张
  if ( BTS.sub_phase === 3) { 
    setContent("03")
    BTS.dom.children[1].remove();
    BTS.wait_frame = 40;
    BTS.sub_phase = 4;

    // 移动端跳过点击rect
    if (BTS.mobile) {
      BTS.sub_phase = 6;
    }
 
    return;
  }

  // 显示点击 rect
  if ( BTS.sub_phase === 4) {
    setContent("04")
     BTS.dom.children[0].style.opacity = 1;
     BTS.sub_phase = 5;
     return;
  }

  // 点击区域淡出
  if ( BTS.sub_phase === 5) {
    var dom = BTS.dom.children[0];
    var opacity = parseFloat(dom.style.opacity);
    if (opacity < 0) {
      dom.style.opacity = 0;
      // dom.remove()
      BTS.sub_phase = 6;
      // BTS.wait_frame = 40;
      BTS.custom_var = 10;
      return;
    } else {
      opacity -= 0.15;
      dom.style.opacity = opacity;
    }
  }

  // 滚动一下
  if ( BTS.sub_phase === 6) { 
    var doms = [ BTS.dom.children[1], BTS.dom.children[2]];
    // 最后一张 <= 0 为移动结束
    var left = parseFloat(doms[1].style.left.replace("px",""));
    if ( left <= 0 ) {
      BTS.dom.children[2].remove();
      BTS.sub_phase = 7;
      // 消失变量(下一步要消失28张图)
      BTS.custom_var = 28;
      setContent("05")

      return;
    } else {
      doms.forEach(function(dom){
        dom.style.left = (parseFloat(dom.style.left.replace("px","")) - (BTS.width / 10) ).toString() + "px";
      })
    }
    BTS.custom_var--;
  }

  // detail 逐个消失动画(28张)
  if ( BTS.sub_phase === 7) { 
    if ( BTS.custom_var > 0 ) {
      BTS.dom.children[1].remove()
      BTS.wait_frame = 10;
      BTS.custom_var--;
    } else {
      BTS.sub_phase = 8;

      // 移动端跳过点击rect
      if (BTS.mobile) {
        BTS.sub_phase = 10;
      }
 

      return;
    }
  }

  // 显示点击 rect
  if ( BTS.sub_phase === 8) { 
    var dom = BTS.dom.children[0]
    dom.style.opacity = 1;
    dom.style.top = "162px";
    dom.style.width = "50px";
    dom.style.height = "24px";
    BTS.sub_phase = 9;
    return;
  }

  // 消失矩形
  if ( BTS.sub_phase === 9) { 
    var dom = BTS.dom.children[0];
    var opacity = parseFloat(dom.style.opacity);
    if (opacity < 0) {
      dom.style.opacity = 0;
      // dom.remove()
      BTS.sub_phase = 10;
      // BTS.wait_frame = 40;
      BTS.custom_var = 10;
      return;
    } else {
      opacity -= 0.15;
      dom.style.opacity = opacity;
    }
  }

  // 滚动一下
  if ( BTS.sub_phase === 10) { 

    var doms = [ BTS.dom.children[1], BTS.dom.children[2]];
    // 最后一张 <= 0 为移动结束
    if ( doms[1].style.left === "0px" ) {
      BTS.dom.children[2].remove();
      BTS.sub_phase = 11;
      // 消失变量(下一步要消失11张图)
      BTS.custom_var = 11;
      // setContent("06")
      return;
    } else {
      doms.forEach(function(dom){
        dom.style.left = (parseFloat(dom.style.left.replace("px","")) + BTS.width / 10).toString() + "px";
      })
    }
    BTS.custom_var--;

  }

  // 消失11张 timeline
  if ( BTS.sub_phase === 11) { 
    if ( BTS.custom_var > 0 ) {
      BTS.dom.children[1].remove();
      BTS.wait_frame = 10;
      BTS.custom_var--;
    } else {
      BTS.sub_phase = 12;
      // BTS.wait_frame = 40;
      return;
    }
  }

  // 消失1张
  if ( BTS.sub_phase === 12) {
    BTS.dom.children[1].remove()
    // BTS.wait_frame = 40;
    BTS.sub_phase = 13;

    BTS.custom_var = BTS.mobile ? 10 : 15;
    

    // setContent("07")
    return;
  } 

  // 向下滚动
  if ( BTS.sub_phase === 13) {
    var dom = BTS.dom.children[1];
    if ( BTS.custom_var <= 0 ) {
      BTS.sub_phase = 14;
      
      BTS.custom_var = BTS.mobile ? 10 : 15;

      BTS.wait_frame = 20;
      return;
    } else {
      var move_x = BTS.mobile ? 45 : 48;
      dom.style.top = (parseFloat(dom.style.top.replace("px","")) - move_x).toString() + "px";
    }
    BTS.custom_var--;
  }

  // 向上滚动
  if ( BTS.sub_phase === 14) {
    var dom = BTS.dom.children[1];
    if ( BTS.custom_var <= 0 ) {
      BTS.sub_phase = 15;
      BTS.wait_frame = 50;


      // 移动端跳过点击rect
      if (BTS.mobile) {
        BTS.sub_phase = 17;
      }

      return;
    } else {
      dom.style.top = (parseFloat(dom.style.top.replace("px","")) + 18).toString() + "px";
    }
    BTS.custom_var--;
  }

  // 显示点击rect
  if ( BTS.sub_phase === 15) {
    var dom = BTS.dom.children[0]
    dom.style.opacity = 1;
    dom.style.top = "117px";
    dom.style.left = "184px";
    dom.style.width = "170px";
    dom.style.height = "24px";
    BTS.sub_phase = 16;
    return;
  }

  // 消失矩形
  if ( BTS.sub_phase === 16) { 
    var dom = BTS.dom.children[0];
    var opacity = parseFloat(dom.style.opacity);
    if (opacity < 0) {
      dom.style.opacity = 0;
      BTS.sub_phase = 17;
      // BTS.custom_var = 10;
      return;
    } else {
      opacity -= 0.15;
      dom.style.opacity = opacity;
    }
  }

  // 下一张滚动top复制上一张，并消失上一张
  if ( BTS.sub_phase === 17) { 
    var dom1 = BTS.dom.children[1];
    var dom2 = BTS.dom.children[2];
    dom2.style.top = dom1.style.top;
    dom1.remove();
    BTS.sub_phase = 18;
    BTS.wait_frame = 40;
    BTS.custom_var = BTS.mobile ? 10 : 15;
    return;
  }

  // 向滚动
  if ( BTS.sub_phase === 18) {
    var dom = BTS.dom.children[1];
    if ( BTS.custom_var <= 0 ) {
      BTS.sub_phase = 19;
      BTS.wait_frame = 40;
      return;
    } else {
      dom.style.top = (parseFloat(dom.style.top.replace("px","")) - 5).toString() + "px";
    }
    BTS.custom_var--;
  } 

  // 未完待续
  if ( BTS.sub_phase === 19) {
    BTS.dom.children[0].remove()
    BTS.dom.children[0].remove()
    BTS.sub_phase = 0;
    return;
  }

}

function initializeTimer(){
  BTS.timer_player = setInterval(function(){
    updatePlayer()
  },50)
}

function clear_vars(){
  BTS.custom_var = null;
  BTS.wait_frame = 0
  BTS.phase = 0;
  BTS.sub_phase = 0;
}

function showContainer(){
  var container = document.getElementById("container");
  var timer = setInterval(function(){
    var opacity = parseFloat(container.style.opacity || 0);
    opacity += 0.05
    container.style.opacity = opacity;
    if ( opacity >= 1 ) {
      clearInterval(timer);
      timer = null
      loadImages()
      initializeTimer()
    }
  },20)
}

// 适配手机
function fixMobile() {

  var download = document.getElementById("download");
  var prod = document.getElementById("prod");
  download.style.display = "none";
  prod.style.display = "none";

  // var width = window.outerWidth;
  // var height = window.outerHeight;

  // var container = document.getElementById("container");
  // container.style.width = window.outerWidth + "px";

  console.log(window.innerWidth)

}

function createMobileHeader() {

  // 清
  var container = document.getElementById("container");
  container.children[0].remove();
  container.children[0].remove();

  // 头部顶部标题和介绍
  var intro_top = document.createElement("div");
  intro_top.style.width = "100%";
  intro_top.style.marginTop = "50px";
  intro_top.style.textAlign = "center";
  intro_top.style.fontSize = "16px";
  intro_top.style.color = "#c7cce6";
  intro_top.style.height = "28px";
  intro_top.innerHTML = BTS.I18N.intro01;
  intro_top.setAttributeNode(createDomAttr("id", "prod-mobile-title"));

  var intro_top_content = document.createElement("div");
  intro_top_content.style.width = "90%";
  intro_top_content.style.margin = "0px 5%";
  intro_top_content.style.textAlign = "center";
  intro_top_content.style.fontSize = "12px";
  intro_top_content.style.marginTop = "4px";
  intro_top_content.style.lineHeight = "24px";
  intro_top_content.style.height = "57px";
  intro_top_content.style.color = "#7587af";
  intro_top_content.innerHTML = BTS.I18N.intro02;
  intro_top_content.setAttributeNode(createDomAttr("id", "prod-mobile-content"));

  // 构建 header
  var dom_header = document.createElement("div");
  dom_header.style.width = "100%";
  dom_header.style.height = "40px";
  dom_header.style.lineHeight = "40px";
  dom_header.style.color = "white";
  dom_header.style.backgroundColor = "#1e253e";
  dom_header.style.textAlign = "center";
  dom_header.style.position = "fixed";
  dom_header.style.top = "0";
  dom_header.style.left = "0";
  dom_header.style.zIndex = "5000";

  var dom_header_inner = document.createElement("div");
  dom_header_inner.style.width = "100%";
  dom_header_inner.style.height = "40px";
  dom_header_inner.style.position = "relative";
  dom_header_inner.className = "clearfix";

  var dom_header_logo = document.createElement("div");
  dom_header_logo.className = "fl";
  dom_header_logo.innerText = "BitShares Mobile";
  dom_header_logo.style.color = "#c7cce6";
  dom_header_logo.style.fontSize = "1.2em";
  dom_header_logo.style.marginLeft = "5%";
  dom_header_logo.setAttributeNode(createDomAttr("href", "./index.html"));

  var dom_header_problem = document.createElement("a");
  dom_header_problem.className = "fr";
  dom_header_problem.display = "block";
  dom_header_problem.innerText = BTS.I18N.mobileTopTextQa;
  dom_header_problem.style.color = "#c7cce6";
  dom_header_problem.style.fontSize = "0.8em";
  dom_header_problem.style.marginRight = "5%";
  dom_header_problem.setAttributeNode(createDomAttr("href", "./qa.html"));

  var bottom_bar = document.createElement("div");
  bottom_bar.style.height = "40px";
  bottom_bar.style.backgroundColor = "rgb(30, 37, 62)";
  bottom_bar.style.width = "100%";
  bottom_bar.style.zIndex = "5000";
  bottom_bar.style.position = "fixed";
  bottom_bar.style.bottom = "0px";
  bottom_bar.style.left = "0px";
  bottom_bar.style.padding = "0px";
  bottom_bar.className = "clearfix";

  var bottom_block = document.createElement("a");
  bottom_block.setAttributeNode(createDomAttr("href", "https://app.btspp.io"));
  bottom_block.style.display = "block";
  bottom_block.style.width = "100%";
  bottom_block.style.marginLeft = "0px";
  bottom_block.style.height = "40px";
  bottom_block.style.marginTop = "0px";
  bottom_block.className = "fl";
  bottom_block.style.textAlign = "center";
  // bottom_block.style.border = "1px solid rgb(199, 204, 230)";
  // bottom_block.style.borderRadius = "0px";
  bottom_block.style.backgroundColor = "#5786d2";

  // var dom_download_ios = document.createElement("img");
  // dom_download_ios.setAttributeNode(createDomAttr("src", "/assets/images/apple.png"));
  // dom_download_ios.style.width = "10px";
  // dom_download_ios.style.marginTop = "7px";

  // var dom_download_android = dom_download_ios.cloneNode()
  // dom_download_android.setAttributeNode(createDomAttr("src", "/assets/images/android.png"));
  // dom_download_android.style.paddingLeft = "5px";

  var ios_text = document.createElement("span");
  ios_text.style.color = "rgb(255, 255, 255)";
  ios_text.style.fontSzie = "13px";
  ios_text.style.paddingLeft = "0px";
  ios_text.style.lineHeight = "40px";
  ios_text.innerText = BTS.I18N.nameClickDownload;

  // bottom_block.appendChild(dom_download_ios)
  // bottom_block.appendChild(dom_download_android)
  bottom_block.appendChild(ios_text)
  bottom_bar.appendChild(bottom_block)

  dom_header_inner.appendChild(dom_header_logo)
  dom_header_inner.appendChild(dom_header_problem)
  dom_header.appendChild(dom_header_inner)

  container.appendChild(intro_top);
  container.appendChild(intro_top_content);
  container.appendChild(dom_header)
  container.appendChild(bottom_bar)


}

function createMobileSlide(){

  var container = document.getElementById("container");

  // 构建 外层
  var dom_player = document.createElement("div");
  dom_player.setAttributeNode(createDomAttr("id", "player"));
  dom_player.style.width = BTS.width + "px";
  dom_player.style.marginLeft = "20%";
  dom_player.style.zIndex = 10;
  dom_player.style.height = parseInt(BTS.width * (BTS.slide_inner_height / BTS.slide_inner_width)) + "px";
  dom_player.style.marginTop = "40px";
  container.appendChild(dom_player)

  // 构建手机背景
  var dom_back = document.createElement("img");
  dom_back.setAttributeNode(createDomAttr("src", "/assets/images/phonex.png"));
  dom_back.style.width = "68%";
  dom_back.style.margin = "0px 16%";
  dom_back.style.display = "block";
  dom_back.style.zIndex = "11";
  dom_back.style.position = "absolute";
  dom_back.style.top = "166px";
  container.appendChild(dom_back)

}

function createIntro() {

  var container = document.getElementById("container");

  var intro_01 = document.createElement("div");
  intro_01.style.width = "100%";
  intro_01.style.marginTop = "40px";
  intro_01.style.textAlign = "center";
  intro_01.style.fontSize = "16px";
  intro_01.style.color = "#c7cce6";
  intro_01.innerHTML = BTS.I18N.intro03;

  var intro_02 = document.createElement("div");
  intro_02.style.width = "90%";
  intro_02.style.margin = "0px 5%";
  intro_02.style.textAlign = "center";
  intro_02.style.fontSize = "12px";
  intro_02.style.color = "#7587af";
  intro_02.style.marginTop = "4px";
  intro_02.style.lineHeight = "24px";
  intro_02.innerHTML = BTS.I18N.intro04;

  var intro_03 = document.createElement("img");
  intro_03.setAttributeNode(createDomAttr("src", "/assets/images/m4.png"));
  intro_03.style.width = "90%";
  intro_03.style.margin = "0px 5%";
  intro_03.style.marginTop = "20px";
  intro_03.style.textAlign = "center";

  var intro_04 = document.createElement("div");
  intro_04.style.width = "100%";
  intro_04.style.marginTop = "40px";
  intro_04.style.textAlign = "center";
  intro_04.style.fontSize = "16px";
  intro_04.style.color = "#c7cce6";
  intro_04.innerHTML = BTS.I18N.intro05;

  
  var intro_05 = document.createElement("div");
  intro_05.style.width = "90%";
  intro_05.style.margin = "0px 5%";
  intro_05.style.marginTop = "4px";
  intro_05.style.textAlign = "center";
  intro_05.style.fontSize = "12px";
  intro_05.style.color = "#7587af";
  intro_05.style.lineHeight = "24px";
  intro_05.innerHTML = BTS.I18N.intro06;

  var intro_06 = document.createElement("img");
  intro_06.setAttributeNode(createDomAttr("src", "/assets/images/m5.png"));
  intro_06.style.width = "70%";
  intro_06.style.margin = "0px 15%";
  intro_06.style.marginTop = "20px";
  intro_06.style.textAlign = "center";
           
  var intro_07 = document.createElement("div");
  intro_07.style.width = "100%";
  intro_07.style.height = "90px";
  intro_07.style.marginTop = "20px";
  intro_07.style.paddingTop = "6px";
  intro_07.style.backgroundColor = "#282c40";
  intro_07.style.textAlign = "center";
  intro_07.style.fontSize = "12px";
  intro_07.style.color = "#ffffff";
  intro_07.style.lineHeight = "20px";
  intro_07.innerHTML =  BTS.I18N.nameContactUs + "<br/>contact@btsplusplus.com<br/>" + BTS.I18N.copyrightContent;
  intro_07.style.marginBottom = "32px";

  container.appendChild(intro_01);
  container.appendChild(intro_02);
  container.appendChild(intro_03);
  container.appendChild(intro_04);
  container.appendChild(intro_05);
  container.appendChild(intro_06);
  container.appendChild(intro_07);
}

// 创建手机布局
function createMobileLayout() {

  // 设定 宽 和 高
  BTS.width = window.innerWidth * 0.6;
  BTS.height = window.innerHeight * 0.6;

  // 动画
  createMobileHeader()
  createMobileSlide()

  // 产品介绍
  createIntro();

  // 联系我们

  BTS.dom = document.getElementById("player");

  BTS.dom_title = document.getElementById("prod-mobile-title");
  BTS.dom_content = document.getElementById("prod-mobile-content"); 

  showContainer()
}

function bindEvents(){
  var current_lang = localStorage.getItem("btspp-lang");
  
  var doc_en = document.getElementById('lang-en');
  if (doc_en != null){
    doc_en.addEventListener('click',function() {
      if ( current_lang !== "en" ) {
        localStorage.setItem("btspp-lang","en");
        window.location.href = "/en/index.html";
      }
    });
  }

  var doc_cn = document.getElementById('lang-zh-cn');
  if (doc_cn != null){
    doc_cn.addEventListener('click',function() {
      if ( current_lang !== "zh-cn" ) {
        localStorage.setItem("btspp-lang","zh-cn");
        window.location.href = "/zh-cn/index.html";
      }
    });
  }
}

function initI18nForPc(lang){
  BTS.I18N = BTS.I18N_JSON[lang].website;
  BTS.TEXTS = BTS.I18N.slide;
  showContainer();
}

function initI18nForPcMobile(lang){
  BTS.I18N = BTS.I18N_JSON[lang].website;
  BTS.TEXTS = BTS.I18N.slide;
  createMobileLayout();
}

// 弃用该方法
function downloadLangFile(lang, callback){
  $.ajax({
    url: "/assets/i18n/"+lang+".json?v=2018082610",
    type: "GET",
    crossDomain: true,
    dataType: "json",
    success: function(data) {
      callback(data);
    },
    complete: function(xhr, code) {
      console.log("complete")
    },
    error: function(xhr, code) {
      console.log(code)
      callback(null)
    }
  });
}

function main(){
  var lang = BTS.isEnLang ? "en" : "zh-cn";
  if ( BTS.mobile) {
    initI18nForPcMobile(lang);

    // 弃用
    // downloadLangFile(BTS.isEnLang ? "en" : "zh-cn", onDownloadLangFileForMobile);
  } else {
    // 加载大背景
    var body1 = document.getElementById("area1-background-wrap");
    var body2 = document.getElementById("body2");
    var body3 = document.getElementById("body3");

    body1.style.backgroundImage = "url(/assets/images/webback01.jpg)"
    body2.style.backgroundImage = "url(/assets/images/webback02.jpg)"
    body3.style.backgroundImage = "url(/assets/images/webback03.jpg)"

    initI18nForPc(lang);

    // 弃用
    // downloadLangFile(BTS.isEnLang ? "en" : "zh-cn", onDownloadLangFileForPC);
  }
  bindEvents();
}

window.addEventListener('load', function() {
  main();
})


