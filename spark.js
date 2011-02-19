/*
 * Spark JavaScript library v2.3.2
 * http://sparkjs.co.uk/
 * 
 * Copyright 2011, Oliver Caldwell
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://github.com/Wolfy87/Spark
 * 
 * Includes sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Includes json2.js
 * http://www.json.org/json2.js
 */
window.SparkFn=new Object();window.SparkIn=function(){window.$=window.Spark=function(c,e){var b=new Object();if(c!==undefined){if(typeof c=="string"){b=(e)?Sizzle(c,e):Sizzle(c)}else{if(typeof HTMLElement==="object"?c instanceof HTMLElement:typeof c==="object"&&c.nodeType===1&&typeof c.nodeName=="string"){b={0:c}}else{b=c}}}var d=new Object();for(var g in SparkFn){d[g]=SparkFn[g]}d.elements=b;return d};if(window.SparkBk===undefined){window.SparkBk=window.$}for(var a in Spark()){$[a]=Spark[a]=Spark()[a]}};SparkFn.html=function(c,a){var b=null;for(var d in this.elements){if(this.elements.hasOwnProperty(d)){b=this.elements[d];if(c===undefined){return b.innerHTML}else{(!a)?b.innerHTML=c:b.innerHTML+=c}}}return this};SparkFn.text=function(c,a){var b=null;for(var d in this.elements){if(this.elements.hasOwnProperty(d)){b=this.elements[d];if(c===undefined){if(document.all){return b.innerText}else{return b.textContent}}else{if(document.all){(!a)?b.innerText=c:b.innerText+=c}else{(!a)?b.textContent=c:b.textContent+=c}}}}return this};SparkFn.fixEvent=function(d){var b=this.client().browser;if(b=="Explorer"){d.pageX=d.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;d.pageY=d.clientY+document.body.scrollTop+document.documentElement.scrollTop}if(d.target===undefined){d.target=d.srcElement}var c=d.target;if(c.offsetParent&&b=="Firefox"){var a=offsetY=0;do{a+=c.offsetLeft;offsetY+=c.offsetTop}while(c=c.offsetParent);d.offsetX=a;d.offsetY=offsetY}return d};SparkFn.ready=function(b){window.alreadyRunFlag=0;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){alreadyRunFlag=1;b()},false)}else{if(document.all&&!window.opera){document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');var a=document.getElementById("contentloadtag");a.onreadystatechange=function(){if(this.readyState=="complete"){alreadyrunflag=1;b()}}}}window.onload=function(){setTimeout("if(!alreadyRunFlag) callback()",0)}};SparkFn.event=function(c,h){var a=null;var b=null;var g=null;for(var d in this.elements){if(this.elements.hasOwnProperty(d)){a=this.elements[d];b=function(i){if(h(Spark.fixEvent(i))===false){if(i.preventDefault){i.preventDefault()}else{i.returnValue=false}}};g=this.data(a,"Spark.event."+c);this.data(a,"Spark.event."+c,b);if(a.addEventListener){if(g){a.removeEventListener(c,g,false)}a.addEventListener(c,b,false)}else{if(g){a.detachEvent(c,g)}a.attachEvent("on"+c,b)}}}return this};SparkFn.attribute=function(d){var c=null;for(var g in this.elements){if(this.elements.hasOwnProperty(g)){c=this.elements[g];if(d!==undefined){for(var b in d){c[b]=d[b]}}else{return c}}}return this};SparkFn.client=function(){var a={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.os=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(e){for(var b=0;b<e.length;b++){var c=e[b].string;var d=e[b].prop;this.versionSearchString=e[b].versionSearch||e[b].identity;if(c){if(c.indexOf(e[b].subString)!=-1){return e[b].identity}}else{if(d){return e[b].identity}}}},searchVersion:function(c){var b=c.indexOf(this.versionSearchString);if(b==-1){return}return parseFloat(c.substring(b+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};a.init();return a};SparkFn.computed=function(){if(window.getComputedStyle){return window.getComputedStyle(this.elements[0],null)}return this.elements[0].currentStyle};SparkFn.cookie=function(d,g,j){if(g===undefined){var h=d+"=";var a=document.cookie.split(";");for(var e in a){if(a.hasOwnProperty(e)){var k=a[e];while(k.charAt(0)==" "){k=k.substring(1,k.length)}if(k.indexOf(h)==0){return k.substring(h.length,k.length)}}}return false}else{var b=new Date();b.setTime(b.getTime()+((j!==undefined)?j:2628000000));document.cookie=d+"="+g+"; expires="+b.toGMTString()+"; path=/"}};SparkFn.css=function(j){var h=null;var i=null;var o=null;var g=null;var r=null;var p=null;var m=null;var l=null;for(var k in this.elements){if(this.elements.hasOwnProperty(k)){h=this.elements[k];if(j!==undefined){for(var m in j){if(m.indexOf("-")!==-1){h.style[m.replace(/-([a-z])/gi,function(b,a){return a.toUpperCase()})]=j[m]}else{h.style[m]=j[m]}if(m=="opacity"){h.style.MozOpacity=j[m];h.style.KhtmlOpacity=j[m];h.style.filter="alpha(opacity="+(j[m]*100)+")";h.style.zoom="1"}if(m=="rotation"){g=parseInt(j[m])*(Math.PI*2/360);i=Math.sin(g);o=Math.cos(g);h.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11="+o+", M12=-"+i+",M21="+i+", M22="+o+', sizingMethod="auto expand")';r=Math.abs(o);m=Math.abs(i);var q=(r-1)*(h.offsetWidth/2)+m*(h.offsetHeight/2);p=Math.abs(i);l=Math.abs(o);var n=p*(h.offsetWidth/2)+(l-1)*(h.offsetHeight/2);h.style.left=Math.round(parseInt(h.left)+k-q)+"px";h.style.top=Math.round(parseInt(h.top)+f-n)+"px";h.style.WebkitTransform="rotate("+j[m]+")";h.style.MozTransform="rotate("+j[m]+")";h.style.OTransform="rotate("+j[m]+")";h.style.transform="rotate("+j[m]+")";h.style.zoom="1"}}}else{return h.style}}}return this};SparkFn.data=(function(){var b={};var a=1;return function(e,d,g){var c=e.uniqueID||(e.uniqueID=a++);b[c]||(b[c]={});if(typeof g!="undefined"){b[c][d]=g}else{return b[c][d]}}})();SparkFn.each=function(c){var a=null;for(var b in this.elements){if(this.elements.hasOwnProperty(b)){a=this.elements[b];c(a)}}return this};SparkFn.json=function(b,a){if(b=="encode"){return JSON.stringify(a)}else{if(b=="decode"){return JSON.parse(a)}}};SparkFn.noConflict=function(){var a=Spark;window.$=SparkBk;return a};SparkFn.jsonp=function(a,c,b){a+="?callback="+c;if(b!==undefined){a+="&"+b}this.load(a)};SparkFn.load=function(c){var b=document.getElementsByTagName("head")[0];var a=document.createElement("script");a.type="text/javascript";a.src=c;b.appendChild(a)};SparkFn.stop=function(){var c=null;var g=null;for(var d in this.elements){if(this.elements.hasOwnProperty(d)){c=this.elements[d];if(this.data(c,"Spark.animations")===undefined){this.data(c,"Spark.animations","")}g=this.data(c,"Spark.animations").split(",");for(var b in g){clearTimeout(g[b])}}}return this};SparkFn.transition=function(i,a,h,g){var c=null;var b=null;if(g===undefined){g=new Function()}if(a===undefined){a=600}if(h===undefined){var h=false}if(!this.offset){this.offset=0}for(var d in this.elements){if(this.elements.hasOwnProperty(d)){c=this.elements[d];switch(i){case"slidedown":Spark(c).css({overflow:"hidden",display:"block"});b=Spark(c).attribute().offsetHeight;Spark(c).css({height:0});Spark(c).animate({height:b},a,h,g);break;case"slideup":b=Spark(c).attribute().offsetHeight;Spark(c).css({overflow:"hidden",height:b});Spark(c).animate({height:0},a,h,function(){Spark(c).css({height:b+"px",display:"none"});g()});break;case"fadein":Spark(c).css({display:"block",opacity:0});Spark(c).animate({opacity:1},a,h,g);break;case"fadeout":Spark(c).animate({opacity:0},a,h,function(){Spark(c).css({opacity:1,display:"none"});g()});break;case"sneakin":Spark(c).css({overflow:"hidden",display:"block",opacity:0});b=Spark(c).attribute().offsetHeight;Spark(c).css({height:0});Spark(c).animate({height:b,opacity:1},a,h,g);break;case"sneakout":b=Spark(c).attribute().offsetHeight;Spark(c).css({overflow:"hidden",height:b});Spark(c).animate({height:0,opacity:0},a,h,function(){Spark(c).css({height:b+"px",display:"none"});g()});break}}}this.offset+=a;return this};SparkFn.animate=function(j,a,q,h){var k={inQuad:function(i,e,x,p){return x*(i/=p)*i+e},outQuad:function(i,e,x,p){return -x*(i/=p)*(i-2)+e},inOutQuad:function(i,e,x,p){if((i/=p/2)<1){return x/2*i*i+e}return -x/2*((--i)*(i-2)-1)+e},inCubic:function(i,e,x,p){return x*(i/=p)*i*i+e},outCubic:function(i,e,x,p){return x*((i=i/p-1)*i*i+1)+e},inOutCubic:function(i,e,x,p){if((i/=p/2)<1){return x/2*i*i*i+e}return x/2*((i-=2)*i*i+2)+e},inQuart:function(i,e,x,p){return x*(i/=p)*i*i*i+e},outQuart:function(i,e,x,p){return -x*((i=i/p-1)*i*i*i-1)+e},inOutQuart:function(i,e,x,p){if((i/=p/2)<1){return x/2*i*i*i*i+e}return -x/2*((i-=2)*i*i*i-2)+e},inQuint:function(i,e,x,p){return x*(i/=p)*i*i*i*i+e},outQuint:function(i,e,x,p){return x*((i=i/p-1)*i*i*i*i+1)+e},inOutQuint:function(i,e,x,p){if((i/=p/2)<1){return x/2*i*i*i*i*i+e}return x/2*((i-=2)*i*i*i*i+2)+e},inSine:function(i,e,x,p){return -x*Math.cos(i/p*(Math.PI/2))+x+e},outSine:function(i,e,x,p){return x*Math.sin(i/p*(Math.PI/2))+e},inOutSine:function(i,e,x,p){return -x/2*(Math.cos(Math.PI*i/p)-1)+e},inExpo:function(i,e,x,p){return(i==0)?e:x*Math.pow(2,10*(i/p-1))+e},outExpo:function(i,e,x,p){return(i==p)?e+x:x*(-Math.pow(2,-10*i/p)+1)+e},inOutExpo:function(i,e,x,p){if(i==0){return e}if(i==p){return e+x}if((i/=p/2)<1){return x/2*Math.pow(2,10*(i-1))+e}return x/2*(-Math.pow(2,-10*--i)+2)+e},inCirc:function(i,e,x,p){return -x*(Math.sqrt(1-(i/=p)*i)-1)+e},outCirc:function(i,e,x,p){return x*Math.sqrt(1-(i=i/p-1)*i)+e},inOutCirc:function(i,e,x,p){if((i/=p/2)<1){return -x/2*(Math.sqrt(1-i*i)-1)+e}return x/2*(Math.sqrt(1-(i-=2)*i)+1)+e},inElastic:function(x,e,A,z,i,y){if(x==0){return e}if((x/=z)==1){return e+A}if(!y){y=z*0.3}if(i<Math.abs(A)){i=A;s=y/4}else{i=Math.abs(A);s:y/(2*Math.PI)*Math.asin(A/i)}return -(i*Math.pow(2,10*(x-=1))*Math.sin((x*z-s)*(2*Math.PI)/y))+e},outElastic:function(x,e,B,A,i,z){if(x==0){return e}if((x/=A)==1){return e+B}if(!z){z=A*0.3}if(i<Math.abs(B)){i=B;var y=z/4}else{i=Math.abs(B);var y=z/(2*Math.PI)*Math.asin(B/i)}return i*Math.pow(2,-10*x)*Math.sin((x*A-y)*(2*Math.PI)/z)+B+e},inOutElastic:function(x,e,B,A,i,z){if(x==0){return e}if((x/=A/2)==2){return e+B}if(!z){z=A*(0.3*1.5)}if(i<Math.abs(B)){i=B;var y=z/4}else{i=Math.abs(B);var y=z/(2*Math.PI)*Math.asin(B/i)}if(x<1){return -0.5*(i*Math.pow(2,10*(x-=1))*Math.sin((x*A-y)*(2*Math.PI)/z))+e}return i*Math.pow(2,-10*(x-=1))*Math.sin((x*A-y)*(2*Math.PI)/z)*0.5+B+e},inBack:function(i,e,y,x,p){if(p==undefined){p:1.70158}return y*(i/=x)*i*((p+1)*i-p)+e},outBack:function(i,e,y,x,p){if(p==undefined){p:1.70158}return y*((i=i/x-1)*i*((p+1)*i+p)+1)+e},inOutBack:function(i,e,y,x,p){if(p==undefined){p:1.70158}if((i/=x/2)<1){return y/2*(i*i*(((p*=(1.525))+1)*i-p))+e}return y/2*((i-=2)*i*(((p*=(1.525))+1)*i+p)+2)+e},inBounce:function(i,e,x,p){return x-this.outBounce(p-i,0,x,p)+e},outBounce:function(i,e,x,p){if((i/=p)<(1/2.75)){return x*(7.5625*i*i)+e}else{if(i<(2/2.75)){return x*(7.5625*(i-=(1.5/2.75))*i+0.75)+e}else{if(i<(2.5/2.75)){return x*(7.5625*(i-=(2.25/2.75))*i+0.9375)+e}else{return x*(7.5625*(i-=(2.625/2.75))*i+0.984375)+e}}}},inOutBounce:function(i,e,x,p){if(i<p/2){return this.inBounce(i*2,0,x,p)*0.5+e}return this.outBounce(i*2-p,0,x,p)*0.5+x*0.5+e}};if(!a){var a=600}if(!q){var q="outQuad"}if(!this.offset){this.offset=0}var g=60;var d=null;var r=null;var v=null;var m=null;var l=null;var n=null;var b=null;var w=null;var c=null;for(var u in this.elements){if(this.elements.hasOwnProperty(u)){c=this.elements[u];for(var o in j){if(c.style[o]===undefined||c.style[o]===""){d=Spark(c).computed()[o];c.style[o]=(d)?d:1}if(c.style[o]=="auto"&&o=="height"){c.style[o]=c.offsetHeight}else{if(c.style[o]=="auto"&&o=="width"){c.style[o]=c.offsetWidth}}r=(o=="opacity")?parseFloat(c.style[o]):parseInt(c.style[o]);v=((o=="opacity")?parseFloat(j[o]):parseInt(j[o]))-r;m=a/(1000/g);n=(isNaN(j[o]))?j[o].replace(/[0-9]/g,""):"px";if(o=="opacity"){n=""}this.data(c,"Spark.animations","START");w=new Object();for(var t=0;t<=m;t++){b=k[q](t,r,v,m)+n;this.data(c,"Spark.animations",this.data(c,"Spark.animations")+","+setTimeout((function(e,i,p,x){return function(){w[p]=x;Spark(i).css(w)}})(t,c,o,b),t*(1000/g)+this.offset,c,o,b))}this.data(c,"Spark.animations",this.data(c,"Spark.animations")+","+setTimeout((function(p,x,i,e){return function(){w[x]=j[x];Spark(p).css(w)}})(c,o,j,n),a+this.offset,c,o,j,n));this.data(c,"Spark.animations",this.data(c,"Spark.animations").replace("START,",""))}}}if(h){setTimeout(h,a)}this.offset+=a;return this};SparkFn.ajax=function(e,b,c,d){var a=(typeof XMLHttpRequest=="undefined")?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest;e=e.toUpperCase();if(e=="GET"&&c){b+="?"+c}if(d){a.onreadystatechange=function(){if(a.readyState==4){if(a.status==200){d(a.responseText)}else{d(false)}}}}a.open(e,b,(d)?true:false);if(e=="POST"){a.setRequestHeader("Content-type","application/x-www-form-urlencoded");a.send((c)?c:null)}else{a.send(null)}if(!d){if(a.status==200){return a.responseText}else{return false}}};SparkFn.classes=function(g,a){var c=null;for(var d in this.elements){if(this.elements.hasOwnProperty(d)){c=this.elements[d];switch(g){case"has":return new RegExp("\\b"+a+"\\b").test(c.className);break;case"add":if(!this.classes("has",a)){c.className+=(c.className)?" "+a:a}break;case"remove":var b=(c.className.match(" "+a))?" "+a:a;c.className=c.className.replace(b,"");break}}}return this};SparkFn.add=function(b,c,d){var a=document.createElement(b);if(c){Spark(a).attribute(c)}if(d){Spark(a).css(d)}for(var g in this.elements){if(this.elements.hasOwnProperty(g)){this.elements[g].appendChild(a)}}return this};(function(){var r=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,k=0,d=Object.prototype.toString,q=false,j=true;[0,0].sort(function(){j=false;return 0});var b=function(y,e,B,C){B=B||[];e=e||document;var E=e;if(e.nodeType!==1&&e.nodeType!==9){return[]}if(!y||typeof y!=="string"){return B}var v,G,J,u,F,I,H,A,x=true,w=b.isXML(e),z=[],D=y;do{r.exec("");v=r.exec(D);if(v){D=v[3];z.push(v[1]);if(v[2]){u=v[3];break}}}while(v);if(z.length>1&&l.exec(y)){if(z.length===2&&g.relative[z[0]]){G=i(z[0]+z[1],e)}else{G=g.relative[z[0]]?[e]:b(z.shift(),e);while(z.length){y=z.shift();if(g.relative[y]){y+=z.shift()}G=i(y,G)}}}else{if(!C&&z.length>1&&e.nodeType===9&&!w&&g.match.ID.test(z[0])&&!g.match.ID.test(z[z.length-1])){F=b.find(z.shift(),e,w);e=F.expr?b.filter(F.expr,F.set)[0]:F.set[0]}if(e){F=C?{expr:z.pop(),set:a(C)}:b.find(z.pop(),z.length===1&&(z[0]==="~"||z[0]==="+")&&e.parentNode?e.parentNode:e,w);G=F.expr?b.filter(F.expr,F.set):F.set;if(z.length>0){J=a(G)}else{x=false}while(z.length){I=z.pop();H=I;if(!g.relative[I]){I=""}else{H=z.pop()}if(H==null){H=e}g.relative[I](J,H,w)}}else{J=z=[]}}if(!J){J=G}if(!J){b.error(I||y)}if(d.call(J)==="[object Array]"){if(!x){B.push.apply(B,J)}else{if(e&&e.nodeType===1){for(A=0;J[A]!=null;A++){if(J[A]&&(J[A]===true||J[A].nodeType===1&&b.contains(e,J[A]))){B.push(G[A])}}}else{for(A=0;J[A]!=null;A++){if(J[A]&&J[A].nodeType===1){B.push(G[A])}}}}}else{a(J,B)}if(u){b(u,E,B,C);b.uniqueSort(B)}return B};b.uniqueSort=function(u){if(c){q=j;u.sort(c);if(q){for(var e=1;e<u.length;e++){if(u[e]===u[e-1]){u.splice(e--,1)}}}}return u};b.matches=function(e,u){return b(e,null,null,u)};b.matchesSelector=function(e,u){return b(u,null,null,[e]).length>0};b.find=function(A,e,B){var z;if(!A){return[]}for(var w=0,v=g.order.length;w<v;w++){var x,y=g.order[w];if((x=g.leftMatch[y].exec(A))){var u=x[1];x.splice(1,1);if(u.substr(u.length-1)!=="\\"){x[1]=(x[1]||"").replace(/\\/g,"");z=g.find[y](x,e,B);if(z!=null){A=A.replace(g.match[y],"");break}}}}if(!z){z=typeof e.getElementsByTagName!=="undefined"?e.getElementsByTagName("*"):[]}return{set:z,expr:A}};b.filter=function(E,D,H,x){var z,e,v=E,J=[],B=D,A=D&&D[0]&&b.isXML(D[0]);while(E&&D.length){for(var C in g.filter){if((z=g.leftMatch[C].exec(E))!=null&&z[2]){var I,G,u=g.filter[C],w=z[1];e=false;z.splice(1,1);if(w.substr(w.length-1)==="\\"){continue}if(B===J){J=[]}if(g.preFilter[C]){z=g.preFilter[C](z,B,H,J,x,A);if(!z){e=I=true}else{if(z===true){continue}}}if(z){for(var y=0;(G=B[y])!=null;y++){if(G){I=u(G,z,y,B);var F=x^!!I;if(H&&I!=null){if(F){e=true}else{B[y]=false}}else{if(F){J.push(G);e=true}}}}}if(I!==undefined){if(!H){B=J}E=E.replace(g.match[C],"");if(!e){return[]}break}}}if(E===v){if(e==null){b.error(E)}else{break}}v=E}return B};b.error=function(e){throw"Syntax error, unrecognized expression: "+e};var g=b.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(e){return e.getAttribute("href")}},relative:{"+":function(z,u){var w=typeof u==="string",y=w&&!/\W/.test(u),A=w&&!y;if(y){u=u.toLowerCase()}for(var v=0,e=z.length,x;v<e;v++){if((x=z[v])){while((x=x.previousSibling)&&x.nodeType!==1){}z[v]=A||x&&x.nodeName.toLowerCase()===u?x||false:x===u}}if(A){b.filter(u,z,true)}},">":function(z,u){var y,x=typeof u==="string",v=0,e=z.length;if(x&&!/\W/.test(u)){u=u.toLowerCase();for(;v<e;v++){y=z[v];if(y){var w=y.parentNode;z[v]=w.nodeName.toLowerCase()===u?w:false}}}else{for(;v<e;v++){y=z[v];if(y){z[v]=x?y.parentNode:y.parentNode===u}}if(x){b.filter(u,z,true)}}},"":function(w,u,y){var x,v=k++,e=t;if(typeof u==="string"&&!/\W/.test(u)){u=u.toLowerCase();x=u;e=p}e("parentNode",u,v,w,x,y)},"~":function(w,u,y){var x,v=k++,e=t;if(typeof u==="string"&&!/\W/.test(u)){u=u.toLowerCase();x=u;e=p}e("previousSibling",u,v,w,x,y)}},find:{ID:function(u,v,w){if(typeof v.getElementById!=="undefined"&&!w){var e=v.getElementById(u[1]);return e&&e.parentNode?[e]:[]}},NAME:function(v,y){if(typeof y.getElementsByName!=="undefined"){var u=[],x=y.getElementsByName(v[1]);for(var w=0,e=x.length;w<e;w++){if(x[w].getAttribute("name")===v[1]){u.push(x[w])}}return u.length===0?null:u}},TAG:function(e,u){if(typeof u.getElementsByTagName!=="undefined"){return u.getElementsByTagName(e[1])}}},preFilter:{CLASS:function(w,u,v,e,z,A){w=" "+w[1].replace(/\\/g,"")+" ";if(A){return w}for(var x=0,y;(y=u[x])!=null;x++){if(y){if(z^(y.className&&(" "+y.className+" ").replace(/[\t\n\r]/g," ").indexOf(w)>=0)){if(!v){e.push(y)}}else{if(v){u[x]=false}}}}return false},ID:function(e){return e[1].replace(/\\/g,"")},TAG:function(u,e){return u[1].toLowerCase()},CHILD:function(e){if(e[1]==="nth"){if(!e[2]){b.error(e[0])}e[2]=e[2].replace(/^\+|\s*/g,"");var u=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2]==="even"&&"2n"||e[2]==="odd"&&"2n+1"||!/\D/.test(e[2])&&"0n+"+e[2]||e[2]);e[2]=(u[1]+(u[2]||1))-0;e[3]=u[3]-0}else{if(e[2]){b.error(e[0])}}e[0]=k++;return e},ATTR:function(x,u,v,e,y,z){var w=x[1]=x[1].replace(/\\/g,"");if(!z&&g.attrMap[w]){x[1]=g.attrMap[w]}x[4]=(x[4]||x[5]||"").replace(/\\/g,"");if(x[2]==="~="){x[4]=" "+x[4]+" "}return x},PSEUDO:function(x,u,v,e,y){if(x[1]==="not"){if((r.exec(x[3])||"").length>1||/^\w/.test(x[3])){x[3]=b(x[3],null,null,u)}else{var w=b.filter(x[3],u,v,true^y);if(!v){e.push.apply(e,w)}return false}}else{if(g.match.POS.test(x[0])||g.match.CHILD.test(x[0])){return true}}return x},POS:function(e){e.unshift(true);return e}},filters:{enabled:function(e){return e.disabled===false&&e.type!=="hidden"},disabled:function(e){return e.disabled===true},checked:function(e){return e.checked===true},selected:function(e){e.parentNode.selectedIndex;return e.selected===true},parent:function(e){return !!e.firstChild},empty:function(e){return !e.firstChild},has:function(v,u,e){return !!b(e[3],v).length},header:function(e){return(/h\d/i).test(e.nodeName)},text:function(e){return"text"===e.type},radio:function(e){return"radio"===e.type},checkbox:function(e){return"checkbox"===e.type},file:function(e){return"file"===e.type},password:function(e){return"password"===e.type},submit:function(e){return"submit"===e.type},image:function(e){return"image"===e.type},reset:function(e){return"reset"===e.type},button:function(e){return"button"===e.type||e.nodeName.toLowerCase()==="button"},input:function(e){return(/input|select|textarea|button/i).test(e.nodeName)}},setFilters:{first:function(u,e){return e===0},last:function(v,u,e,w){return u===w.length-1},even:function(u,e){return e%2===0},odd:function(u,e){return e%2===1},lt:function(v,u,e){return u<e[3]-0},gt:function(v,u,e){return u>e[3]-0},nth:function(v,u,e){return e[3]-0===u},eq:function(v,u,e){return e[3]-0===u}},filter:{PSEUDO:function(v,A,z,B){var e=A[1],u=g.filters[e];if(u){return u(v,z,A,B)}else{if(e==="contains"){return(v.textContent||v.innerText||b.getText([v])||"").indexOf(A[3])>=0}else{if(e==="not"){var w=A[3];for(var y=0,x=w.length;y<x;y++){if(w[y]===v){return false}}return true}else{b.error(e)}}}},CHILD:function(e,w){var z=w[1],u=e;switch(z){case"only":case"first":while((u=u.previousSibling)){if(u.nodeType===1){return false}}if(z==="first"){return true}u=e;case"last":while((u=u.nextSibling)){if(u.nodeType===1){return false}}return true;case"nth":var v=w[2],C=w[3];if(v===1&&C===0){return true}var y=w[0],B=e.parentNode;if(B&&(B.sizcache!==y||!e.nodeIndex)){var x=0;for(u=B.firstChild;u;u=u.nextSibling){if(u.nodeType===1){u.nodeIndex=++x}}B.sizcache=y}var A=e.nodeIndex-C;if(v===0){return A===0}else{return(A%v===0&&A/v>=0)}}},ID:function(u,e){return u.nodeType===1&&u.getAttribute("id")===e},TAG:function(u,e){return(e==="*"&&u.nodeType===1)||u.nodeName.toLowerCase()===e},CLASS:function(u,e){return(" "+(u.className||u.getAttribute("class"))+" ").indexOf(e)>-1},ATTR:function(y,w){var v=w[1],e=g.attrHandle[v]?g.attrHandle[v](y):y[v]!=null?y[v]:y.getAttribute(v),z=e+"",x=w[2],u=w[4];return e==null?x==="!=":x==="="?z===u:x==="*="?z.indexOf(u)>=0:x==="~="?(" "+z+" ").indexOf(u)>=0:!u?z&&e!==false:x==="!="?z!==u:x==="^="?z.indexOf(u)===0:x==="$="?z.substr(z.length-u.length)===u:x==="|="?z===u||z.substr(0,u.length+1)===u+"-":false},POS:function(x,u,v,y){var e=u[2],w=g.setFilters[e];if(w){return w(x,v,u,y)}}}};var l=g.match.POS,h=function(u,e){return"\\"+(e-0+1)};for(var o in g.match){g.match[o]=new RegExp(g.match[o].source+(/(?![^\[]*\])(?![^\(]*\))/.source));g.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+g.match[o].source.replace(/\\(\d+)/g,h))}var a=function(u,e){u=Array.prototype.slice.call(u,0);if(e){e.push.apply(e,u);return e}return u};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType}catch(m){a=function(x,w){var v=0,u=w||[];if(d.call(x)==="[object Array]"){Array.prototype.push.apply(u,x)}else{if(typeof x.length==="number"){for(var e=x.length;v<e;v++){u.push(x[v])}}else{for(;x[v];v++){u.push(x[v])}}}return u}}var c,n;if(document.documentElement.compareDocumentPosition){c=function(u,e){if(u===e){q=true;return 0}if(!u.compareDocumentPosition||!e.compareDocumentPosition){return u.compareDocumentPosition?-1:1}return u.compareDocumentPosition(e)&4?-1:1}}else{c=function(B,A){var y,u,v=[],e=[],x=B.parentNode,z=A.parentNode,C=x;if(B===A){q=true;return 0}else{if(x===z){return n(B,A)}else{if(!x){return -1}else{if(!z){return 1}}}}while(C){v.unshift(C);C=C.parentNode}C=z;while(C){e.unshift(C);C=C.parentNode}y=v.length;u=e.length;for(var w=0;w<y&&w<u;w++){if(v[w]!==e[w]){return n(v[w],e[w])}}return w===y?n(B,e[w],-1):n(v[w],A,1)};n=function(u,e,v){if(u===e){return v}var w=u.nextSibling;while(w){if(w===e){return -1}w=w.nextSibling}return 1}}b.getText=function(e){var u="",w;for(var v=0;e[v];v++){w=e[v];if(w.nodeType===3||w.nodeType===4){u+=w.nodeValue}else{if(w.nodeType!==8){u+=b.getText(w.childNodes)}}}return u};(function(){var u=document.createElement("div"),v="script"+(new Date()).getTime(),e=document.documentElement;u.innerHTML="<a name='"+v+"'/>";e.insertBefore(u,e.firstChild);if(document.getElementById(v)){g.find.ID=function(x,y,z){if(typeof y.getElementById!=="undefined"&&!z){var w=y.getElementById(x[1]);return w?w.id===x[1]||typeof w.getAttributeNode!=="undefined"&&w.getAttributeNode("id").nodeValue===x[1]?[w]:undefined:[]}};g.filter.ID=function(y,w){var x=typeof y.getAttributeNode!=="undefined"&&y.getAttributeNode("id");return y.nodeType===1&&x&&x.nodeValue===w}}e.removeChild(u);e=u=null})();(function(){var e=document.createElement("div");e.appendChild(document.createComment(""));if(e.getElementsByTagName("*").length>0){g.find.TAG=function(u,y){var x=y.getElementsByTagName(u[1]);if(u[1]==="*"){var w=[];for(var v=0;x[v];v++){if(x[v].nodeType===1){w.push(x[v])}}x=w}return x}}e.innerHTML="<a href='#'></a>";if(e.firstChild&&typeof e.firstChild.getAttribute!=="undefined"&&e.firstChild.getAttribute("href")!=="#"){g.attrHandle.href=function(u){return u.getAttribute("href",2)}}e=null})();if(document.querySelectorAll){(function(){var e=b,w=document.createElement("div"),v="__sizzle__";w.innerHTML="<p class='TEST'></p>";if(w.querySelectorAll&&w.querySelectorAll(".TEST").length===0){return}b=function(G,y,B,F){y=y||document;if(!F&&!b.isXML(y)){var E=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(G);if(E&&(y.nodeType===1||y.nodeType===9)){if(E[1]){return a(y.getElementsByTagName(G),B)}else{if(E[2]&&g.find.CLASS&&y.getElementsByClassName){return a(y.getElementsByClassName(E[2]),B)}}}if(y.nodeType===9){if(G==="body"&&y.body){return a([y.body],B)}else{if(E&&E[3]){var A=y.getElementById(E[3]);if(A&&A.parentNode){if(A.id===E[3]){return a([A],B)}}else{return a([],B)}}}try{return a(y.querySelectorAll(G),B)}catch(C){}}else{if(y.nodeType===1&&y.nodeName.toLowerCase()!=="object"){var z=y.getAttribute("id"),x=z||v,I=y.parentNode,H=/^\s*[+~]/.test(G);if(!z){y.setAttribute("id",x)}else{x=x.replace(/'/g,"\\$&")}if(H&&I){y=y.parentNode}try{if(!H||I){return a(y.querySelectorAll("[id='"+x+"'] "+G),B)}}catch(D){}finally{if(!z){y.removeAttribute("id")}}}}}return e(G,y,B,F)};for(var u in e){b[u]=e[u]}w=null})()}(function(){var e=document.documentElement,v=e.matchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.msMatchesSelector,u=false;try{v.call(document.documentElement,"[test!='']:sizzle")}catch(w){u=true}if(v){b.matchesSelector=function(x,z){z=z.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!b.isXML(x)){try{if(u||!g.match.PSEUDO.test(z)&&!/!=/.test(z)){return v.call(x,z)}}catch(y){}}return b(z,null,null,[x]).length>0}}})();(function(){var e=document.createElement("div");e.innerHTML="<div class='test e'></div><div class='test'></div>";if(!e.getElementsByClassName||e.getElementsByClassName("e").length===0){return}e.lastChild.className="e";if(e.getElementsByClassName("e").length===1){return}g.order.splice(1,0,"CLASS");g.find.CLASS=function(u,v,w){if(typeof v.getElementsByClassName!=="undefined"&&!w){return v.getElementsByClassName(u[1])}};e=null})();function p(u,z,y,C,A,B){for(var w=0,v=C.length;w<v;w++){var e=C[w];if(e){var x=false;e=e[u];while(e){if(e.sizcache===y){x=C[e.sizset];break}if(e.nodeType===1&&!B){e.sizcache=y;e.sizset=w}if(e.nodeName.toLowerCase()===z){x=e;break}e=e[u]}C[w]=x}}}function t(u,z,y,C,A,B){for(var w=0,v=C.length;w<v;w++){var e=C[w];if(e){var x=false;e=e[u];while(e){if(e.sizcache===y){x=C[e.sizset];break}if(e.nodeType===1){if(!B){e.sizcache=y;e.sizset=w}if(typeof z!=="string"){if(e===z){x=true;break}}else{if(b.filter(z,[e]).length>0){x=e;break}}}e=e[u]}C[w]=x}}}if(document.documentElement.contains){b.contains=function(u,e){return u!==e&&(u.contains?u.contains(e):true)}}else{if(document.documentElement.compareDocumentPosition){b.contains=function(u,e){return !!(u.compareDocumentPosition(e)&16)}}else{b.contains=function(){return false}}}b.isXML=function(e){var u=(e?e.ownerDocument||e:0).documentElement;return u?u.nodeName!=="HTML":false};var i=function(e,A){var y,w=[],x="",v=A.nodeType?[A]:A;while((y=g.match.PSEUDO.exec(e))){x+=y[0];e=e.replace(g.match.PSEUDO,"")}e=g.relative[e]?e+"*":e;for(var z=0,u=v.length;z<u;z++){b(e,v[z],w)}return b.filter(x,w)};window.Sizzle=b})();var JSON;if(!JSON){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());SparkIn();