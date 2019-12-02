"use strict";

var doc = document;

function main(){
  var jump_id = location.hash.replace("#","");
  if ( jump_id ) {
    var div = document.getElementById(jump_id)
    div.classList.add("active");
  }
}

window.addEventListener('load', function() {
  main();
})