parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"xd/O":[function(require,module,exports) {
var r={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(t){var e,o,h,a,n,c,d,C="",i=0;for(t=r._utf8_encode(t);i<t.length;)a=(e=t.charCodeAt(i++))>>2,n=(3&e)<<4|(o=t.charCodeAt(i++))>>4,c=(15&o)<<2|(h=t.charCodeAt(i++))>>6,d=63&h,isNaN(o)?c=d=64:isNaN(h)&&(d=64),C=C+this._keyStr.charAt(a)+this._keyStr.charAt(n)+this._keyStr.charAt(c)+this._keyStr.charAt(d);return C},decode:function(t){var e,o,h,a,n,c,d="",C=0;for(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");C<t.length;)e=this._keyStr.indexOf(t.charAt(C++))<<2|(a=this._keyStr.indexOf(t.charAt(C++)))>>4,o=(15&a)<<4|(n=this._keyStr.indexOf(t.charAt(C++)))>>2,h=(3&n)<<6|(c=this._keyStr.indexOf(t.charAt(C++))),d+=String.fromCharCode(e),64!=n&&(d+=String.fromCharCode(o)),64!=c&&(d+=String.fromCharCode(h));return d=r._utf8_decode(d)},_utf8_encode:function(r){r=r.replace(/\r\n/g,"\n");for(var t="",e=0;e<r.length;e++){var o=r.charCodeAt(e);o<128?t+=String.fromCharCode(o):o>127&&o<2048?(t+=String.fromCharCode(o>>6|192),t+=String.fromCharCode(63&o|128)):(t+=String.fromCharCode(o>>12|224),t+=String.fromCharCode(o>>6&63|128),t+=String.fromCharCode(63&o|128))}return t},_utf8_decode:function(r){for(var t="",e=0,o=c1=c2=0;e<r.length;)(o=r.charCodeAt(e))<128?(t+=String.fromCharCode(o),e++):o>191&&o<224?(c2=r.charCodeAt(e+1),t+=String.fromCharCode((31&o)<<6|63&c2),e+=2):(c2=r.charCodeAt(e+1),c3=r.charCodeAt(e+2),t+=String.fromCharCode((15&o)<<12|(63&c2)<<6|63&c3),e+=3);return t}};module.exports=r;
},{}],"rHLc":[function(require,module,exports) {
var r={},t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n=r.util={rotl:function(r,t){return r<<t|r>>>32-t},rotr:function(r,t){return r<<32-t|r>>>t},endian:function(r){if(r.constructor==Number)return 16711935&n.rotl(r,8)|4278255360&n.rotl(r,24);for(var t=0;t<r.length;t++)r[t]=n.endian(r[t]);return r},randomBytes:function(r){for(var t=[];r>0;r--)t.push(Math.floor(256*Math.random()));return t},stringToBytes:function(r){for(var t=[],n=0;n<r.length;n++)t.push(r.charCodeAt(n));return t},bytesToString:function(r){for(var t=[],n=0;n<r.length;n++)t.push(String.fromCharCode(r[n]));return t.join("")},stringToWords:function(r){for(var t=[],n=0,e=0;n<r.length;n++,e+=8)t[e>>>5]|=r.charCodeAt(n)<<24-e%32;return t},bytesToWords:function(r){for(var t=[],n=0,e=0;n<r.length;n++,e+=8)t[e>>>5]|=r[n]<<24-e%32;return t},wordsToBytes:function(r){for(var t=[],n=0;n<32*r.length;n+=8)t.push(r[n>>>5]>>>24-n%32&255);return t},bytesToHex:function(r){for(var t=[],n=0;n<r.length;n++)t.push((r[n]>>>4).toString(16)),t.push((15&r[n]).toString(16));return t.join("")},hexToBytes:function(r){for(var t=[],n=0;n<r.length;n+=2)t.push(parseInt(r.substr(n,2),16));return t},bytesToBase64:function(r){if("function"==typeof btoa)return btoa(n.bytesToString(r));for(var e,o=[],s=0;s<r.length;s++)switch(s%3){case 0:o.push(t.charAt(r[s]>>>2)),e=(3&r[s])<<4;break;case 1:o.push(t.charAt(e|r[s]>>>4)),e=(15&r[s])<<2;break;case 2:o.push(t.charAt(e|r[s]>>>6)),o.push(t.charAt(63&r[s])),e=-1}for(null!=e&&-1!=e&&o.push(t.charAt(e));o.length%4!=0;)o.push("=");return o.join("")},base64ToBytes:function(r){if("function"==typeof atob)return n.stringToBytes(atob(r));r=r.replace(/[^A-Z0-9+\/]/gi,"");for(var e=[],o=0;o<r.length;o++)switch(o%4){case 1:e.push(t.indexOf(r.charAt(o-1))<<2|t.indexOf(r.charAt(o))>>>4);break;case 2:e.push((15&t.indexOf(r.charAt(o-1)))<<4|t.indexOf(r.charAt(o))>>>2);break;case 3:e.push((3&t.indexOf(r.charAt(o-1)))<<6|t.indexOf(r.charAt(o)))}return e}};r.mode={},r.HMAC=function(r,t,e,o){for(var s=e=e.length>4*r._blocksize?r(e,{asBytes:!0}):n.stringToBytes(e),a=e.slice(0),u=0;u<4*r._blocksize;u++)s[u]^=92,a[u]^=54;var i=r(n.bytesToString(s)+r(n.bytesToString(a)+t,{asString:!0}),{asBytes:!0});return o&&o.asBytes?i:o&&o.asString?n.bytesToString(i):n.bytesToHex(i)};var e=r.SHA1=function(r,t){var o=n.wordsToBytes(e._sha1(r));return t&&t.asBytes?o:t&&t.asString?n.bytesToString(o):n.bytesToHex(o)};e._sha1=function(r){var t=n.stringToWords(r),e=8*r.length,o=[],s=1732584193,a=-271733879,u=-1732584194,i=271733878,h=-1009589776;t[e>>5]|=128<<24-e%32,t[15+(e+64>>>9<<4)]=e;for(var f=0;f<t.length;f+=16){for(var c=s,g=a,l=u,b=i,y=h,p=0;p<80;p++){if(p<16)o[p]=t[f+p];else{var v=o[p-3]^o[p-8]^o[p-14]^o[p-16];o[p]=v<<1|v>>>31}var d=(s<<5|s>>>27)+h+(o[p]>>>0)+(p<20?1518500249+(a&u|~a&i):p<40?1859775393+(a^u^i):p<60?(a&u|a&i|u&i)-1894007588:(a^u^i)-899497514);h=i,i=u,u=a<<30|a>>>2,a=s,s=d}s+=c,a+=g,u+=l,i+=b,h+=y}return[s,a,u,i,h]},e._blocksize=16,module.exports=r;
},{}],"Focm":[function(require,module,exports) {
var e=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=require("./Base64"),i=require("./Crypto"),r=function(){function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this,r),this.expiredAt=this.getPolicyExpiredAt(e.expire),this.OSSAccessKeyId=e.AccessKeyId,this.policy=this.getPolicyBase64(e.maxSize,this.expiredAt),this.signature=this.getSignature(this.policy,e.AccessKeySecret),this.name=Date.now()+"-"+this.getRandomString()}return e(r,[{key:"getPolicyBase64",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,t={expiration:arguments[1],conditions:[["content-length-range",0,1024*e*1024]]};return n.encode(JSON.stringify(t))}},{key:"getSignature",value:function(e,t){var n=i.HMAC(i.SHA1,e,t,{asBytes:!0});return i.util.bytesToBase64(n)}},{key:"getPolicyExpiredAt",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:7200,t=new Date;return t.setHours(t.getHours()+e/60/60),t.toISOString()}},{key:"getRandomString",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:16,t="qwertyuiopasdfghjklzxcvbnm1234567890";if(e>t.length)for(var n=0;n<e/t.length+1;)n++,t+=t;return t.split("").map(function(e){return t[Math.ceil(Math.random()*(t.length-1))]}).join("").slice(0,e)}}]),r}();module.exports=r,window.OSSUploader=r;
},{"./Base64":"xd/O","./Crypto":"rHLc"}]},{},["Focm"], null)
//# sourceMappingURL=/index.map