/*
 * Spark JavaScript library v0.5.0
 * http://flowdev.co.uk/
 * 
 * Copyright 2010, Oliver Caldwell
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://github.com/Wolfy87/Spark
 * 
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 */
(function(){var n=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,o=0,q=Object.prototype.toString,g=false,f=true;[0,0].sort(function(){f=false;return 0});var c=function(y,e,B,C){B=B||[];e=e||document;var E=e;if(e.nodeType!==1&&e.nodeType!==9){return[]}if(!y||typeof y!=="string"){return B}var v,G,J,u,F,I,H,A,x=true,w=c.isXML(e),z=[],D=y;do{n.exec("");v=n.exec(D);if(v){D=v[3];z.push(v[1]);if(v[2]){u=v[3];break}}}while(v);if(z.length>1&&h.exec(y)){if(z.length===2&&j.relative[z[0]]){G=s(z[0]+z[1],e)}else{G=j.relative[z[0]]?[e]:c(z.shift(),e);while(z.length){y=z.shift();if(j.relative[y]){y+=z.shift()}G=s(y,G)}}}else{if(!C&&z.length>1&&e.nodeType===9&&!w&&j.match.ID.test(z[0])&&!j.match.ID.test(z[z.length-1])){F=c.find(z.shift(),e,w);e=F.expr?c.filter(F.expr,F.set)[0]:F.set[0]}if(e){F=C?{expr:z.pop(),set:l(C)}:c.find(z.pop(),z.length===1&&(z[0]==="~"||z[0]==="+")&&e.parentNode?e.parentNode:e,w);G=F.expr?c.filter(F.expr,F.set):F.set;if(z.length>0){J=l(G)}else{x=false}while(z.length){I=z.pop();H=I;if(!j.relative[I]){I=""}else{H=z.pop()}if(H==null){H=e}j.relative[I](J,H,w)}}else{J=z=[]}}if(!J){J=G}if(!J){c.error(I||y)}if(q.call(J)==="[object Array]"){if(!x){B.push.apply(B,J)}else{if(e&&e.nodeType===1){for(A=0;J[A]!=null;A++){if(J[A]&&(J[A]===true||J[A].nodeType===1&&c.contains(e,J[A]))){B.push(G[A])}}}else{for(A=0;J[A]!=null;A++){if(J[A]&&J[A].nodeType===1){B.push(G[A])}}}}}else{l(J,B)}if(u){c(u,E,B,C);c.uniqueSort(B)}return B};c.uniqueSort=function(u){if(p){g=f;u.sort(p);if(g){for(var e=1;e<u.length;e++){if(u[e]===u[e-1]){u.splice(e--,1)}}}}return u};c.matches=function(e,u){return c(e,null,null,u)};c.matchesSelector=function(e,u){return c(u,null,null,[e]).length>0};c.find=function(A,e,B){var z;if(!A){return[]}for(var w=0,v=j.order.length;w<v;w++){var x,y=j.order[w];if((x=j.leftMatch[y].exec(A))){var u=x[1];x.splice(1,1);if(u.substr(u.length-1)!=="\\"){x[1]=(x[1]||"").replace(/\\/g,"");z=j.find[y](x,e,B);if(z!=null){A=A.replace(j.match[y],"");break}}}}if(!z){z=e.getElementsByTagName("*")}return{set:z,expr:A}};c.filter=function(E,D,H,x){var z,e,v=E,J=[],B=D,A=D&&D[0]&&c.isXML(D[0]);while(E&&D.length){for(var C in j.filter){if((z=j.leftMatch[C].exec(E))!=null&&z[2]){var I,G,u=j.filter[C],w=z[1];e=false;z.splice(1,1);if(w.substr(w.length-1)==="\\"){continue}if(B===J){J=[]}if(j.preFilter[C]){z=j.preFilter[C](z,B,H,J,x,A);if(!z){e=I=true}else{if(z===true){continue}}}if(z){for(var y=0;(G=B[y])!=null;y++){if(G){I=u(G,z,y,B);var F=x^!!I;if(H&&I!=null){if(F){e=true}else{B[y]=false}}else{if(F){J.push(G);e=true}}}}}if(I!==undefined){if(!H){B=J}E=E.replace(j.match[C],"");if(!e){return[]}break}}}if(E===v){if(e==null){c.error(E)}else{break}}v=E}return B};c.error=function(e){throw"Syntax error, unrecognized expression: "+e};var j=c.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(e){return e.getAttribute("href")}},relative:{"+":function(z,u){var w=typeof u==="string",y=w&&!/\W/.test(u),A=w&&!y;if(y){u=u.toLowerCase()}for(var v=0,e=z.length,x;v<e;v++){if((x=z[v])){while((x=x.previousSibling)&&x.nodeType!==1){}z[v]=A||x&&x.nodeName.toLowerCase()===u?x||false:x===u}}if(A){c.filter(u,z,true)}},">":function(z,u){var y,x=typeof u==="string",v=0,e=z.length;if(x&&!/\W/.test(u)){u=u.toLowerCase();for(;v<e;v++){y=z[v];if(y){var w=y.parentNode;z[v]=w.nodeName.toLowerCase()===u?w:false}}}else{for(;v<e;v++){y=z[v];if(y){z[v]=x?y.parentNode:y.parentNode===u}}if(x){c.filter(u,z,true)}}},"":function(w,u,y){var x,v=o++,e=r;if(typeof u==="string"&&!/\W/.test(u)){u=u.toLowerCase();x=u;e=a}e("parentNode",u,v,w,x,y)},"~":function(w,u,y){var x,v=o++,e=r;if(typeof u==="string"&&!/\W/.test(u)){u=u.toLowerCase();x=u;e=a}e("previousSibling",u,v,w,x,y)}},find:{ID:function(u,v,w){if(typeof v.getElementById!=="undefined"&&!w){var e=v.getElementById(u[1]);return e&&e.parentNode?[e]:[]}},NAME:function(v,y){if(typeof y.getElementsByName!=="undefined"){var u=[],x=y.getElementsByName(v[1]);for(var w=0,e=x.length;w<e;w++){if(x[w].getAttribute("name")===v[1]){u.push(x[w])}}return u.length===0?null:u}},TAG:function(e,u){return u.getElementsByTagName(e[1])}},preFilter:{CLASS:function(w,u,v,e,z,A){w=" "+w[1].replace(/\\/g,"")+" ";if(A){return w}for(var x=0,y;(y=u[x])!=null;x++){if(y){if(z^(y.className&&(" "+y.className+" ").replace(/[\t\n]/g," ").indexOf(w)>=0)){if(!v){e.push(y)}}else{if(v){u[x]=false}}}}return false},ID:function(e){return e[1].replace(/\\/g,"")},TAG:function(u,e){return u[1].toLowerCase()},CHILD:function(e){if(e[1]==="nth"){var u=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2]==="even"&&"2n"||e[2]==="odd"&&"2n+1"||!/\D/.test(e[2])&&"0n+"+e[2]||e[2]);e[2]=(u[1]+(u[2]||1))-0;e[3]=u[3]-0}e[0]=o++;return e},ATTR:function(x,u,v,e,y,z){var w=x[1].replace(/\\/g,"");if(!z&&j.attrMap[w]){x[1]=j.attrMap[w]}if(x[2]==="~="){x[4]=" "+x[4]+" "}return x},PSEUDO:function(x,u,v,e,y){if(x[1]==="not"){if((n.exec(x[3])||"").length>1||/^\w/.test(x[3])){x[3]=c(x[3],null,null,u)}else{var w=c.filter(x[3],u,v,true^y);if(!v){e.push.apply(e,w)}return false}}else{if(j.match.POS.test(x[0])||j.match.CHILD.test(x[0])){return true}}return x},POS:function(e){e.unshift(true);return e}},filters:{enabled:function(e){return e.disabled===false&&e.type!=="hidden"},disabled:function(e){return e.disabled===true},checked:function(e){return e.checked===true},selected:function(e){e.parentNode.selectedIndex;return e.selected===true},parent:function(e){return !!e.firstChild},empty:function(e){return !e.firstChild},has:function(v,u,e){return !!c(e[3],v).length},header:function(e){return(/h\d/i).test(e.nodeName)},text:function(e){return"text"===e.type},radio:function(e){return"radio"===e.type},checkbox:function(e){return"checkbox"===e.type},file:function(e){return"file"===e.type},password:function(e){return"password"===e.type},submit:function(e){return"submit"===e.type},image:function(e){return"image"===e.type},reset:function(e){return"reset"===e.type},button:function(e){return"button"===e.type||e.nodeName.toLowerCase()==="button"},input:function(e){return(/input|select|textarea|button/i).test(e.nodeName)}},setFilters:{first:function(u,e){return e===0},last:function(v,u,e,w){return u===w.length-1},even:function(u,e){return e%2===0},odd:function(u,e){return e%2===1},lt:function(v,u,e){return u<e[3]-0},gt:function(v,u,e){return u>e[3]-0},nth:function(v,u,e){return e[3]-0===u},eq:function(v,u,e){return e[3]-0===u}},filter:{PSEUDO:function(v,A,z,B){var e=A[1],u=j.filters[e];if(u){return u(v,z,A,B)}else{if(e==="contains"){return(v.textContent||v.innerText||c.getText([v])||"").indexOf(A[3])>=0}else{if(e==="not"){var w=A[3];for(var y=0,x=w.length;y<x;y++){if(w[y]===v){return false}}return true}else{c.error("Syntax error, unrecognized expression: "+e)}}}},CHILD:function(e,w){var z=w[1],u=e;switch(z){case"only":case"first":while((u=u.previousSibling)){if(u.nodeType===1){return false}}if(z==="first"){return true}u=e;case"last":while((u=u.nextSibling)){if(u.nodeType===1){return false}}return true;case"nth":var v=w[2],C=w[3];if(v===1&&C===0){return true}var y=w[0],B=e.parentNode;if(B&&(B.sizcache!==y||!e.nodeIndex)){var x=0;for(u=B.firstChild;u;u=u.nextSibling){if(u.nodeType===1){u.nodeIndex=++x}}B.sizcache=y}var A=e.nodeIndex-C;if(v===0){return A===0}else{return(A%v===0&&A/v>=0)}}},ID:function(u,e){return u.nodeType===1&&u.getAttribute("id")===e},TAG:function(u,e){return(e==="*"&&u.nodeType===1)||u.nodeName.toLowerCase()===e},CLASS:function(u,e){return(" "+(u.className||u.getAttribute("class"))+" ").indexOf(e)>-1},ATTR:function(y,w){var v=w[1],e=j.attrHandle[v]?j.attrHandle[v](y):y[v]!=null?y[v]:y.getAttribute(v),z=e+"",x=w[2],u=w[4];return e==null?x==="!=":x==="="?z===u:x==="*="?z.indexOf(u)>=0:x==="~="?(" "+z+" ").indexOf(u)>=0:!u?z&&e!==false:x==="!="?z!==u:x==="^="?z.indexOf(u)===0:x==="$="?z.substr(z.length-u.length)===u:x==="|="?z===u||z.substr(0,u.length+1)===u+"-":false},POS:function(x,u,v,y){var e=u[2],w=j.setFilters[e];if(w){return w(x,v,u,y)}}}};var h=j.match.POS,b=function(u,e){return"\\"+(e-0+1)};for(var d in j.match){j.match[d]=new RegExp(j.match[d].source+(/(?![^\[]*\])(?![^\(]*\))/.source));j.leftMatch[d]=new RegExp(/(^(?:.|\r|\n)*?)/.source+j.match[d].source.replace(/\\(\d+)/g,b))}var l=function(u,e){u=Array.prototype.slice.call(u,0);if(e){e.push.apply(e,u);return e}return u};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType}catch(t){l=function(x,w){var v=0,u=w||[];if(q.call(x)==="[object Array]"){Array.prototype.push.apply(u,x)}else{if(typeof x.length==="number"){for(var e=x.length;v<e;v++){u.push(x[v])}}else{for(;x[v];v++){u.push(x[v])}}}return u}}var p,m;if(document.documentElement.compareDocumentPosition){p=function(u,e){if(u===e){g=true;return 0}if(!u.compareDocumentPosition||!e.compareDocumentPosition){return u.compareDocumentPosition?-1:1}return u.compareDocumentPosition(e)&4?-1:1}}else{p=function(B,A){var y,u,v=[],e=[],x=B.parentNode,z=A.parentNode,C=x;if(B===A){g=true;return 0}else{if(x===z){return m(B,A)}else{if(!x){return -1}else{if(!z){return 1}}}}while(C){v.unshift(C);C=C.parentNode}C=z;while(C){e.unshift(C);C=C.parentNode}y=v.length;u=e.length;for(var w=0;w<y&&w<u;w++){if(v[w]!==e[w]){return m(v[w],e[w])}}return w===y?m(B,e[w],-1):m(v[w],A,1)};m=function(u,e,v){if(u===e){return v}var w=u.nextSibling;while(w){if(w===e){return -1}w=w.nextSibling}return 1}}c.getText=function(e){var u="",w;for(var v=0;e[v];v++){w=e[v];if(w.nodeType===3||w.nodeType===4){u+=w.nodeValue}else{if(w.nodeType!==8){u+=c.getText(w.childNodes)}}}return u};(function(){var u=document.createElement("div"),v="script"+(new Date()).getTime(),e=document.documentElement;u.innerHTML="<a name='"+v+"'/>";e.insertBefore(u,e.firstChild);if(document.getElementById(v)){j.find.ID=function(x,y,z){if(typeof y.getElementById!=="undefined"&&!z){var w=y.getElementById(x[1]);return w?w.id===x[1]||typeof w.getAttributeNode!=="undefined"&&w.getAttributeNode("id").nodeValue===x[1]?[w]:undefined:[]}};j.filter.ID=function(y,w){var x=typeof y.getAttributeNode!=="undefined"&&y.getAttributeNode("id");return y.nodeType===1&&x&&x.nodeValue===w}}e.removeChild(u);e=u=null})();(function(){var e=document.createElement("div");e.appendChild(document.createComment(""));if(e.getElementsByTagName("*").length>0){j.find.TAG=function(u,y){var x=y.getElementsByTagName(u[1]);if(u[1]==="*"){var w=[];for(var v=0;x[v];v++){if(x[v].nodeType===1){w.push(x[v])}}x=w}return x}}e.innerHTML="<a href='#'></a>";if(e.firstChild&&typeof e.firstChild.getAttribute!=="undefined"&&e.firstChild.getAttribute("href")!=="#"){j.attrHandle.href=function(u){return u.getAttribute("href",2)}}e=null})();if(document.querySelectorAll){(function(){var e=c,w=document.createElement("div"),v="__sizzle__";w.innerHTML="<p class='TEST'></p>";if(w.querySelectorAll&&w.querySelectorAll(".TEST").length===0){return}c=function(B,A,x,z){A=A||document;B=B.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!z&&!c.isXML(A)){if(A.nodeType===9){try{return l(A.querySelectorAll(B),x)}catch(D){}}else{if(A.nodeType===1&&A.nodeName.toLowerCase()!=="object"){var y=A.getAttribute("id"),E=y||v;if(!y){A.setAttribute("id",E)}try{return l(A.querySelectorAll("#"+E+" "+B),x)}catch(C){}finally{if(!y){A.removeAttribute("id")}}}}}return e(B,A,x,z)};for(var u in e){c[u]=e[u]}w=null})()}(function(){var e=document.documentElement,v=e.matchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.msMatchesSelector,u=false;try{v.call(document.documentElement,"[test!='']:sizzle")}catch(w){u=true}if(v){c.matchesSelector=function(x,z){z=z.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!c.isXML(x)){try{if(u||!j.match.PSEUDO.test(z)&&!/!=/.test(z)){return v.call(x,z)}}catch(y){}}return c(z,null,null,[x]).length>0}}})();(function(){var e=document.createElement("div");e.innerHTML="<div class='test e'></div><div class='test'></div>";if(!e.getElementsByClassName||e.getElementsByClassName("e").length===0){return}e.lastChild.className="e";if(e.getElementsByClassName("e").length===1){return}j.order.splice(1,0,"CLASS");j.find.CLASS=function(u,v,w){if(typeof v.getElementsByClassName!=="undefined"&&!w){return v.getElementsByClassName(u[1])}};e=null})();function a(u,z,y,C,A,B){for(var w=0,v=C.length;w<v;w++){var e=C[w];if(e){var x=false;e=e[u];while(e){if(e.sizcache===y){x=C[e.sizset];break}if(e.nodeType===1&&!B){e.sizcache=y;e.sizset=w}if(e.nodeName.toLowerCase()===z){x=e;break}e=e[u]}C[w]=x}}}function r(u,z,y,C,A,B){for(var w=0,v=C.length;w<v;w++){var e=C[w];if(e){var x=false;e=e[u];while(e){if(e.sizcache===y){x=C[e.sizset];break}if(e.nodeType===1){if(!B){e.sizcache=y;e.sizset=w}if(typeof z!=="string"){if(e===z){x=true;break}}else{if(c.filter(z,[e]).length>0){x=e;break}}}e=e[u]}C[w]=x}}}if(document.documentElement.contains){c.contains=function(u,e){return u!==e&&(u.contains?u.contains(e):true)}}else{if(document.documentElement.compareDocumentPosition){c.contains=function(u,e){return !!(u.compareDocumentPosition(e)&16)}}else{c.contains=function(){return false}}}c.isXML=function(e){var u=(e?e.ownerDocument||e:0).documentElement;return u?u.nodeName!=="HTML":false};var s=function(e,A){var y,w=[],x="",v=A.nodeType?[A]:A;while((y=j.match.PSEUDO.exec(e))){x+=y[0];e=e.replace(j.match.PSEUDO,"")}e=j.relative[e]?e+"*":e;for(var z=0,u=v.length;z<u;z++){c(e,v[z],w)}return c.filter(x,w)};window.Sizzle=c;window.fixEventLocation=function(u){if(u.pageX==null){var e=(document.documentElement&&document.documentElement.scrollLeft!=null)?document.documentElement:document.body;docX=u.clientX+e.scrollLeft;docY=u.clientY+e.scrollTop;u.pageX=docX;u.pageY=docY}return u};window.Spark=window.$=function(u,v){var w=new Object();var e=new Object();if(u!=undefined){if(v!=undefined){e=c(u,v)}else{e=c(u)}}w={elements:e,event:function(x,z){for(var y in this.elements){if(this.elements[y].addEventListener){this.elements[y].addEventListener(x,function(A){z(fixEventLocation(A))},false)}else{if(this.elements[y].attachEvent){this.elements[y].attachEvent("on"+x,function(A){z(fixEventLocation(A))})}}}},content:function(y,x){for(var z in this.elements){if(y===undefined){return this.elements[z].innerHTML}else{if(x===undefined||x===false){this.elements[z].innerHTML=y}else{if(x===true){this.elements[z].innerHTML+=y}}}}},ajax:function(B,y,z,A){var x;if(window.XMLHttpRequest){x=new XMLHttpRequest()}else{x=new ActiveXObject("Microsoft.XMLHTTP")}B=B.toUpperCase();if(B=="GET"&&z!==undefined&&z!==false){y+="?"+z}if(A!=undefined){x.onreadystatechange=function(){if(x.readyState==4){A(x.responseText)}}}x.open(B,y,(A!=undefined)?true:false);if(B=="POST"){x.setRequestHeader("Content-type","application/x-www-form-urlencoded");if(z!==undefined&&date!==false){x.send(z)}else{x.send(null)}}else{x.send(null)}window.xmlhttp=x;if(A==undefined){return x.responseText}},cookie:function(x,E,B){if(E===undefined){var A=x+"=";var C=document.cookie.split(";");for(var D=0;D<C.length;D++){var F=C[D];while(F.charAt(0)==" "){F=F.substring(1,F.length)}if(F.indexOf(A)==0){return F.substring(A.length,F.length)}}return false}else{if(B===undefined){var z=new Date();z.setTime(z.getTime()+31536000000);var y="; expires="+z.toGMTString();document.cookie=x+"="+E+y+"; path=/"}else{var z=new Date();z.setTime(z.getTime()+B);var y="; expires="+z.toGMTString();document.cookie=x+"="+E+y+"; path=/"}}},focus:function(){for(var x in this.elements){this.elements[x].focus()}},opacity:function(C,F,G){for(var D in this.elements){this.elements[D].style.zoom=1;if(this.elements[D].currentStyle){var A=this.elements[D].currentStyle.opacity}else{if(window.getComputedStyle){var A=document.defaultView.getComputedStyle(this.elements[D],null).getPropertyValue("opacity")}}A=parseInt(A);if(C===undefined){return A*100}else{if(F===undefined){this.elements[D].style.opacity=C/100;this.elements[D].style.MozOpacity=C/100;this.elements[D].style.khtmlOpacity=C/100;this.elements[D].style.filter="alpha(opacity="+C+")"}else{this.elements[D].style.opacity=A;this.elements[D].style.MozOpacity=A;this.elements[D].style.khtmlOpacity=A;this.elements[D].style.filter="alpha(opacity="+(A*100)+")";var H=C-(A*100);var E=F/100;var y=H/100;var A=A*100;var z=[];for(var B=0;B<=100;B++){z[B]=setTimeout((function(J,I){return function(){var K=A+(y*J);I[D].style.opacity=K/100;I[D].style.MozOpacity=K/100;I[D].style.khtmlOpacity=K/100;I[D].style.filter="alpha(opacity="+K+")"}})(B,this.elements),B*E,this.elements)}if(G!==undefined){var x=setTimeout(G,100*E)}}}}},size:function(A,K,I,J){for(var G in this.elements){if(A!==undefined&&K!==undefined){if(I!==undefined){var z=A-parseInt(this.elements[G].offsetWidth);var x=K-parseInt(this.elements[G].offsetHeight);var H=I/100;var E=z/100;var F=x/100;var y=parseInt(this.elements[G].offsetWidth);var L=parseInt(this.elements[G].offsetHeight);var C=[];for(var D=0;D<=100;D++){C[D]=setTimeout((function(N,M){return function(){M[G].style.width=y+(E*N)+"px";M[G].style.height=L+(F*N)+"px"}})(D,this.elements),D*H,this.elements)}if(J!==undefined){var B=setTimeout(J,100*H)}}else{this.elements[G].style.width=A;this.elements[G].style.height=K}}else{return{width:this.elements[G].offsetWidth,height:this.elements[G].offsetHeight}}}},value:function(y,x){for(var z in this.elements){if(y===undefined){return this.elements[z].value}else{if(x===undefined||x===false){this.elements[z].value=y}else{if(x===true){this.elements[z].value+=y}}}}},visible:function(y){for(var x in this.elements){if(y===true){this.elements[x].style.display="block"}else{if(y===false){this.elements[x].style.display="none"}else{if(y===undefined){if(this.elements[x].style.display!="none"){this.elements[x].style.display="none"}else{this.elements[x].style.display="block"}}}}}},location:function(L,I,K,N){for(var H in this.elements){if(L!==undefined&&I!==undefined){if(K!==undefined){var F=L-parseInt(this.elements[H].offsetLeft);var C=I-parseInt(this.elements[H].offsetTop);var J=K/100;var z=F/100;var M=C/100;var E=parseInt(this.elements[H].offsetLeft);var D=parseInt(this.elements[H].offsetTop);var B=[];for(var G=0;G<=100;G++){B[G]=setTimeout((function(y,x){return function(){x[H].style.left=E+(z*y)+"px";x[H].style.top=D+(M*y)+"px"}})(G,this.elements),G*J,this.elements)}if(N!==undefined){var A=setTimeout(N,100*J)}}else{this.elements[H].style.left=L+"px";this.elements[H].style.top=I+"px"}}else{return{x:this.elements[H].offsetTop,y:this.elements[H].offsetWidth}}}}};return w};var k=new Array("ajax","cookie");for(i in k){window.Spark[k[i]]=window.$[k[i]]=window.Spark()[k[i]]}})();