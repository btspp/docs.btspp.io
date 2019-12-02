"use strict";

var DEFALUT_LANG = "en";
var DEFAULT_ACTION_NAME = "index.html";

function redirectByLang(){
  var url = location.href;
  var arr = url.split("/")
  var action_name = arr[arr.length - 1];

  if (!action_name || action_name === "") {
    action_name = DEFAULT_ACTION_NAME;
  }

  // var lang = localStorage.getItem("btspp-lang");
  // if ( !lang ) {
    var lang = DEFALUT_LANG;
    localStorage.setItem("btspp-lang",DEFALUT_LANG);
  // }
  // window.location.href = "/" + lang + "/" + action_name;
  // TODO:英文版尚未完成，目前都跳转到zh界面。
  window.location.href = "/en/" + action_name;
}

function main() {
  redirectByLang();
}

window.addEventListener('load', function() {
  main();
})