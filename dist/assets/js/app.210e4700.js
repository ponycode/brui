(function(e){function t(t){for(var n,i,c=t[0],u=t[1],o=t[2],p=0,f=[];p<c.length;p++)i=c[p],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);l&&l(t);while(f.length)f.shift()();return s.push.apply(s,o||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,c=1;c<r.length;c++){var u=r[c];0!==a[u]&&(n=!1)}n&&(s.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={app:0},s=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var o=0;o<c.length;o++)t(c[o]);var l=u;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"01b4":function(e,t,r){"use strict";var n=r("19b5"),a=r.n(n);a.a},"034f":function(e,t,r){"use strict";var n=r("64a9"),a=r.n(n);a.a},"0901":function(e,t,r){},"19b5":function(e,t,r){},4678:function(e,t,r){var n={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function a(e){var t=s(e);return r(t)}function s(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}a.keys=function(){return Object.keys(n)},a.resolve=s,e.exports=a,a.id="4678"},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("097d");var n=r("2b0e"),a=r("8c4f"),s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"menuContent"},[r("div",{staticClass:"row"},e._l(e.taps,(function(t){return r("div",{key:t.tapIndex,staticClass:"col text-center"},[r("h1",[e._v(e._s(t.tapName))]),r("div",{staticClass:"beerOnTapContainer"},[t.Keg?r("keg-on-tap",{attrs:{keg:t.Keg,"tap-index":t.tapIndex}}):r("div",[r("div",{staticClass:"emptyTap"},[r("font-awesome-icon",{attrs:{icon:"sad-cry"}})],1),e.fullscreen?e._e():r("b-button",{attrs:{size:"sm",variant:"outline-light"},on:{click:function(r){return e.addAKeg(t.tapIndex)}}},[e._v("Add a Keg")])],1)],1)])})),0),r("add-a-keg-modal",{ref:"addAKegModal"})],1)},i=[],c=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.beer&&!e.beer.empty?r("div",{staticClass:"beerOnTap text-center"},[r("h2",{staticClass:"mb-1"},[e._v(e._s(e.beer.name))]),e.fullscreen?e._e():r("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal",value:"removeKegConfirmation-"+e.tapIndex,expression:"'removeKegConfirmation-' + tapIndex"}],staticClass:"mt-0 mb-2",attrs:{variant:"outline-danger",size:"sm"}},[r("font-awesome-icon",{staticClass:"mr-2",attrs:{icon:"times-circle"}}),e._v("Remove Keg")],1),r("div",{staticClass:"beerImage mt-3"},[e.beer.imageUrl?r("img",{attrs:{src:e.beer.imageUrl}}):e._e()]),r("div",[r("span",{staticClass:"spec"},[e._v(e._s(e.beer.abv)+"% "),r("span",{staticClass:"unit"},[e._v("ABV")])]),e._v(", "),r("span",{staticClass:"spec"},[e._v(e._s(e.beer.ibu)+" "),r("span",{staticClass:"unit"},[e._v("IBU")])])]),r("p",{staticClass:"description"},[e._v(e._s(e.beer.description))]),r("b-modal",{ref:"modal",attrs:{id:"removeKegConfirmation-"+e.tapIndex,title:"Remove Keg?",size:"sm","ok-title":"Yes, Remove Keg","ok-variant":"danger"},on:{ok:e.removeKeg}},[r("h3",[e._v(e._s(e.beer.name))]),r("p",{staticClass:"mt-3"},[e._v("\n      Removing this keg will finalize all pour reporting.\n    ")])])],1):e._e()},u=[],o=r("be94"),l=(r("c5f6"),r("2f62")),p={name:"kegOnTap",props:{tapIndex:{type:Number,required:!0},keg:{type:Object,required:!1}},computed:Object(o["a"])({},Object(l["b"])({fullscreen:function(e){return e.fullscreen}}),{beer:function(){return this.keg?this.keg.Beer:null}}),methods:{removeKeg:function(){this.$store.dispatch("removeKegFromTap",{tapIndex:this.tapIndex})}}},f=p,d=(r("95a0"),r("2877")),m=Object(d["a"])(f,c,u,!1,null,"9d39a69e",null),b=m.exports,h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-modal",{ref:"modal",attrs:{id:"addAKegModal",title:"Add a Keg",size:"lg"},scopedSlots:e._u([{key:"modal-footer",fn:function(e){e.ok,e.cancel,e.hide;return[r("div")]}}])},[r("b-input-group",{scopedSlots:e._u([{key:"append",fn:function(){return[r("b-input-group-text",[r("font-awesome-icon",{attrs:{icon:"search"}})],1)]},proxy:!0}])},[r("b-form-input",{attrs:{placeholder:"Search for a beer",debounce:"500"},model:{value:e.searchTerm,callback:function(t){e.searchTerm=t},expression:"searchTerm"}})],1),e.searchTerm&&this.beers?r("div",{staticClass:"results mt-3"},e._l(e.beers,(function(t){return r("b-list-group",{key:t.beerId},[r("b-list-group-item",{attrs:{href:"#",button:""},on:{click:function(r){return e.selectBeer(t)}}},[e._v(e._s(t.name))])],1)})),1):e._e()],1)},v=[],g=(r("96cf"),r("1da1")),j=r("bc3a"),_=r.n(j);function w(){return x.apply(this,arguments)}function x(){return x=Object(g["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,_.a.get("/api/beers/recent");case 2:return t=e.sent,e.abrupt("return",t.data.beers);case 4:case"end":return e.stop()}}),e,this)}))),x.apply(this,arguments)}function T(e){return O.apply(this,arguments)}function O(){return O=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,_.a.get("/api/beers/".concat(t));case 2:return r=e.sent,e.abrupt("return",r.data.beerDetails);case 4:case"end":return e.stop()}}),e,this)}))),O.apply(this,arguments)}function y(e){return R.apply(this,arguments)}function R(){return R=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.beerId){e.next=2;break}throw new Error("beerId is required");case 2:return e.next=4,_.a.post("/api/beers/".concat(t.beerId),t);case 4:return r=e.sent,e.abrupt("return",r.data.beerDetails);case 6:case"end":return e.stop()}}),e,this)}))),R.apply(this,arguments)}function S(e){return E.apply(this,arguments)}function E(){return E=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,_.a.put("/api/beers",t);case 2:return r=e.sent,e.abrupt("return",r.data.beerDetails);case 4:case"end":return e.stop()}}),e,this)}))),E.apply(this,arguments)}function k(e){return C.apply(this,arguments)}function C(){return C=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,_.a.get("/api/beers",{params:{searchTerm:t}});case 2:return r=e.sent,e.abrupt("return",r.data.beers);case 4:case"end":return e.stop()}}),e,this)}))),C.apply(this,arguments)}var I,B,P={name:"AddAKegModal",data:function(){return{tapIndex:null,searchTerm:null,beers:null}},computed:{},methods:{show:function(e){this.tapIndex=e,this.$refs.modal.show()},performSearch:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.searching){e.next=2;break}return e.abrupt("return");case 2:if(this.searchTerm&&!(this.searchTerm.length<3)){e.next=5;break}return this.beers=null,e.abrupt("return");case 5:return e.prev=5,this.searching=!0,e.next=9,k(this.searchTerm);case 9:this.beers=e.sent,this.searching=!1,e.next=17;break;case 13:e.prev=13,e.t0=e["catch"](5),this.searching=!1,this.beers=null;case 17:case"end":return e.stop()}}),e,this,[[5,13]])})));return function(){return e.apply(this,arguments)}}(),selectBeer:function(e){this.$store.dispatch("putKegOnTap",{tapIndex:this.tapIndex,beerId:e.beerId,gallons:5}),this.$refs.modal.hide()}},watch:{searchTerm:function(){this.performSearch()}}},A=P,D=Object(d["a"])(A,h,v,!1,null,"b4bd6d68",null),N=D.exports,U={name:"menu",components:{KegOnTap:b,AddAKegModal:N},computed:Object(l["b"])({fullscreen:function(e){return e.fullscreen},taps:function(e){return e.taps}}),methods:{removeKegOnTapWithIndex:function(e){this.$store.dispatch("removeKegFromTap",{tapIndex:e})},addAKeg:function(e){this.$refs.addAKegModal.show(e)}},mounted:function(){this.$store.dispatch("fetchTaps")}},$=U,F=(r("01b4"),Object(d["a"])($,s,i,!1,null,"2c483752",null)),z=F.exports,L=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"settings"},[r("br"),r("b-form",{on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[r("b-row",[r("b-col",{attrs:{md:"4"}},[r("b-form-group",{attrs:{label:"Number of Taps"}},[r("b-form-select",{staticClass:"mb-3",attrs:{options:e.numberOfTapsOptions},model:{value:e.numberOfTaps,callback:function(t){e.numberOfTaps=t},expression:"numberOfTaps"}})],1)],1)],1),r("b-row",[r("b-col",{attrs:{md:"4"}},e._l(e.numberOfTaps,(function(t){return r("b-form-group",{key:t,attrs:{label:"Tap "+t+" Name"}},[r("b-input",{staticClass:"mb-3",model:{value:e.tapNames[t-1],callback:function(r){e.$set(e.tapNames,t-1,r)},expression:"tapNames[index - 1]"}})],1)})),1)],1),r("b-row",[r("b-col",{attrs:{md:"4"}},[r("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Save")])],1)],1)],1)],1)},M=[],K={name:"settings",data:function(){return{numberOfTapsOptions:[{value:1,text:"One, single tap kegarator"},{value:2,text:"Two, dual tap kegarator"},{value:3,text:"Triple tap kegarator"}],numberOfTaps:1,tapNames:[]}},computed:Object(o["a"])({},Object(l["b"])({settings:function(e){return e.settings}})),methods:{onSubmit:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("saveSettings",{numberOfTaps:this.numberOfTaps,tapNames:this.tapNames});case 2:this.$toasted.success("Settings Updated",{singleton:!0}).goAway(3e3);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},watch:{settings:function(){this.settings&&(this.numberOfTaps=this.settings.numberOfTaps,this.tapNames=this.settings.tapNames)}},mounted:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("fetchSettings");case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},H=K,Y=(r("c912"),Object(d["a"])(H,L,M,!1,null,"e51a0b28",null)),G=Y.exports,q=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"stats"},[r("br"),r("h2",[e._v("Stats")]),r("pours-chart-container"),r("table",{staticClass:"table mt-3"},[e._m(0),e._l(e.beerStats,(function(t){return r("tr",{key:t.beerId},[r("td",[e._v(e._s(t.name))]),r("td",[t.gallons>1?r("span",[e._v(e._s(t.gallons)+" gal.")]):t.floz>0?r("span",[e._v(e._s(t.floz)+" floz")]):r("span",[e._v("0 floz")])]),r("td",[e._v(e._s(t.numberOfPours))]),r("td",[e._v(e._s(t.daysOnTap))])])}))],2),r("br"),r("h2",[e._v("Pour History")]),r("table",{staticClass:"table"},[e._m(1),e._l(e.pours,(function(t){return r("tr",{key:t.pourId},[r("td",[e._v(e._s(e._f("formatDate")(t.createdAt)))]),r("td",[e._v(e._s(t.beerName))]),r("td",[e._v(e._s(Math.round(.0338*t.milliliters*100)/100)+" floz / "+e._s(t.milliliters)+" ml")]),r("td",[e._v(e._s(t.durationSeconds)+"s")]),r("td",[e._v(e._s(t.tickCount))])])}))],2)],1)},J=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("tr",[r("th",[e._v("Beer")]),r("th",[e._v("Poured")]),r("th",[e._v("Number of Pours")]),r("th",[e._v("Days on Tap")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("tr",[r("th",[e._v("Date")]),r("th",[e._v("Beer")]),r("th",[e._v("Floz. / Milliliters")]),r("th",[e._v("Duration")]),r("th",[e._v("Ticks")])])}],V=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[e.loaded&&e.chartData?r("pours-chart",{attrs:{chartdata:e.chartData,options:e.options}}):e._e()],1)},W=[],Z=r("1fca"),Q={extends:Z["a"],props:{chartdata:{type:Object,default:null},options:{type:Object,default:null}},mounted:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.renderChart(this.chartdata,this.options);case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},X=Q,ee=Object(d["a"])(X,I,B,!1,null,null,null),te=ee.exports,re={name:"PoursChartContainer",components:{PoursChart:te},data:function(){return{loaded:!1,options:{title:{display:!0,text:"Pours over last 3 months"},tooltips:{mode:"index",intersect:!1},responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{type:"time",time:{parser:"YYYY-MM-DD",unit:"day"},stacked:!0}],yAxes:[{stacked:!0}]}}}},computed:Object(o["a"])({},Object(l["b"])({chartData:function(e){return e.poursChartData}})),mounted:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.loaded=!1,e.next=3,this.$store.dispatch("fetchPoursChartData");case 3:this.loaded=!0;case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},ne=re,ae=Object(d["a"])(ne,V,W,!1,null,null,null),se=ae.exports,ie={name:"stats",components:{PoursChartContainer:se},computed:Object(o["a"])({},Object(l["b"])({pours:function(e){return e.pours},beerStats:function(e){return e.beerStats}})),mounted:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.$store.dispatch("fetchPours"),this.$store.dispatch("fetchBeerStats");case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},ce=ie,ue=(r("70bb"),Object(d["a"])(ce,q,J,!1,null,"e2b15dfc",null)),oe=ue.exports,le=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"beers"},[r("br"),r("h1",[e._v("Beers")]),e.beers?r("b-table",{staticClass:"beerTable",attrs:{striped:"",hover:"",items:e.beers,fields:e.fields,"no-select-on-click":!0},on:{"row-clicked":e.showDetails},scopedSlots:e._u([{key:"head(name)",fn:function(){return[r("div",{staticClass:"d-flex align-items-center justify-content-between"},[e._v("\n          Beer Name: "),r("b-button",{attrs:{size:"xs",variant:"primary",to:"/beers/new"}},[e._v("New Beer")])],1)]},proxy:!0}],null,!1,2493479699)}):e._e()],1)},pe=[],fe={name:"beers",data:function(){return{fields:[{key:"name",label:"Full Name"}]}},computed:Object(o["a"])({},Object(l["b"])({beers:function(e){return e.mostRecentBeers}})),methods:{showDetails:function(e){var t=e.beerId;this.$router.push({name:"beerDetails",params:{beerId:t}})},newBeer:function(){this.$router.push({name:"beerDetails"})}},mounted:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("fetchMostRecentBeers");case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},de=fe,me=(r("9562"),Object(d["a"])(de,le,pe,!1,null,"54cc3a33",null)),be=me.exports,he=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"beerDetails mt-3"},[r("router-link",{attrs:{to:"/beers"}},[r("font-awesome-icon",{attrs:{icon:"chevron-left"}}),e._v(" All Beers")],1),r("b-form",{on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[r("div",{staticClass:"row mt-3"},[r("div",{staticClass:"col-md-6 col-md-offset-2"},[r("div",[r("b-form-group",{attrs:{label:"Name","label-for":"beerName"}},[r("b-form-input",{attrs:{type:"text",required:"",placeholder:"Beer name"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),r("b-form-group",{attrs:{label:"Image","label-for":"beerImage"}},[r("b-form-input",{attrs:{type:"text",placeholder:"Beer image url"},model:{value:e.imageUrl,callback:function(t){e.imageUrl=t},expression:"imageUrl"}})],1),r("b-form-group",{attrs:{label:"ABV","label-for":"abv"}},[r("b-form-input",{attrs:{placeholder:"ABV"},model:{value:e.abv,callback:function(t){e.abv=t},expression:"abv"}})],1),r("b-form-group",{attrs:{label:"IBU","label-for":"ibu"}},[r("b-form-input",{attrs:{type:"number",placeholder:"IBU"},model:{value:e.ibu,callback:function(t){e.ibu=t},expression:"ibu"}})],1),r("b-form-group",{attrs:{label:"Description","label-for":"description"}},[r("b-form-textarea",{attrs:{placeholder:"Beer description",rows:3,"max-rows":6},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}})],1)],1)]),r("div",{staticClass:"col-md-4"},[e.imageUrl&&!e.empty?r("img",{staticClass:"beerImage",attrs:{src:e.imageUrl}}):e._e()])]),r("b-button",{attrs:{variant:"default-outline"},on:{click:e.reset}},[e._v("Reset")]),r("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v(e._s(e.saveButtonTitle))])],1)],1)},ve=[],ge=(r("7f7f"),{name:"beerDetails",props:{beerId:{type:String,required:!1}},data:function(){return{name:null,imageUrl:null,abv:null,ibu:null,description:null,empty:!0}},methods:{onSubmit:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.beerId){e.next=6;break}return e.next=3,this.$store.dispatch("updateBeerDetails",this.updatedBeer);case 3:this.$toasted.success("Beer Updated",{singleton:!0}).goAway(3e3),e.next=9;break;case 6:return e.next=8,this.$store.dispatch("createNewBeer",this.updatedBeer);case 8:this.$toasted.success("Beer Created",{singleton:!0}).goAway(3e3);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),reset:function(){var e=this.beer;e&&(this.name=e.name,this.imageUrl=e.imageUrl,this.abv=e.abv,this.ibu=e.ibu,this.description=e.description)}},computed:Object(o["a"])({},Object(l["b"])({beer:function(e){return e.beerDetails}}),{saveButtonTitle:function(){return this.beerId?"Update Beer":"Create Beer"},updatedBeer:function(){var e={};return this.beerId&&(e.beerId=this.beerId),e.name=this.name,e.imageUrl=this.imageUrl,e.abv=this.abv,e.ibu=this.ibu,e.description=this.description,e}}),watch:{beer:{immediate:!0,handler:function(){if(!this.beerId&&this.beer&&this.beer.beerId)return this.$router.push({name:"beerDetails",params:{beerId:this.beer.beerId}});this.reset()}}},mounted:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("fetchBeerDetails",this.beerId);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}),je=ge,_e=(r("e0b3"),Object(d["a"])(je,he,ve,!1,null,"6ff9741f",null)),we=_e.exports;n["default"].use(a["a"]);var xe,Te=new a["a"]({mode:"history",routes:[{path:"/",name:"menu",component:z},{path:"/settings",name:"settings",component:G},{path:"/stats",name:"stats",component:oe},{path:"/beers",name:"beers",component:be},{path:"/beers/new",name:"createBeer",component:we},{path:"/beers/:beerId",name:"beerDetails",component:we,props:!0}]}),Oe=r("ade3");function ye(e){return Re.apply(this,arguments)}function Re(){return Re=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,_.a.get("/api/settings",t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e,this)}))),Re.apply(this,arguments)}function Se(e){return Ee.apply(this,arguments)}function Ee(){return Ee=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,_.a.put("/api/settings",t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e,this)}))),Ee.apply(this,arguments)}function ke(){return Ce.apply(this,arguments)}function Ce(){return Ce=Object(g["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,_.a.get("/api/pours");case 2:return t=e.sent,e.abrupt("return",t.data.pours);case 4:case"end":return e.stop()}}),e,this)}))),Ce.apply(this,arguments)}function Ie(){return Be.apply(this,arguments)}function Be(){return Be=Object(g["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,_.a.get("/api/beers/recent/stats");case 2:return t=e.sent,e.abrupt("return",t.data.recentBeers);case 4:case"end":return e.stop()}}),e,this)}))),Be.apply(this,arguments)}function Pe(){return Ae.apply(this,arguments)}function Ae(){return Ae=Object(g["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,_.a.get("/api/pours/chart");case 2:return t=e.sent,e.abrupt("return",t.data.poursChart);case 4:case"end":return e.stop()}}),e,this)}))),Ae.apply(this,arguments)}function De(){return Ne.apply(this,arguments)}function Ne(){return Ne=Object(g["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,_.a.get("/api/taps");case 2:return t=e.sent,e.abrupt("return",t.data.taps);case 4:case"end":return e.stop()}}),e,this)}))),Ne.apply(this,arguments)}function Ue(e){return $e.apply(this,arguments)}function $e(){return $e=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r,n,a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.tapIndex,n=t.beerId,a=t.gallons,e.next=3,_.a.put("/api/taps/".concat(r,"/keg"),{beerId:n,gallons:a});case 3:return s=e.sent,e.abrupt("return",s.data);case 5:case"end":return e.stop()}}),e,this)}))),$e.apply(this,arguments)}function Fe(e){return ze.apply(this,arguments)}function ze(){return ze=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.tapIndex,e.next=3,_.a.delete("/api/taps/".concat(r,"/keg"));case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e,this)}))),ze.apply(this,arguments)}n["default"].use(l["a"]);var Le={SET_SETTINGS:"SET_SETTINGS",SET_BEERS:"SET_BEERS",SET_BEER:"SET_BEER",SET_TAPS:"SET_TAPS",FULLSCREEN:"FULLSCREEN",SET_POURS:"SET_POURS",POUR_START:"POUR_START",POUR_STATUS:"POUR_STATUS",POUR_END:"POUR_END",SET_BEER_STATS:"SET_BEER_STATS",SET_MOST_RECENT_BEERS:"SET_MOST_RECENT_BEERS",SET_BEER_DETAILS:"SET_BEER_DETAILS",SET_POUR_CHART_DATA:"SET_POUR_CHART_DATA"},Me=new l["a"].Store({state:{settings:null,beers:null,taps:null,fullscreen:!1,pours:null,currentPour:null,beerStats:null,mostRecentBeers:null,beerDetails:null,poursChartData:null},mutations:(xe={},Object(Oe["a"])(xe,Le.SET_SETTINGS,(function(e,t){e.settings=t})),Object(Oe["a"])(xe,Le.SET_BEERS,(function(e,t){e.beers=t})),Object(Oe["a"])(xe,Le.SET_BEER,(function(e,t){e.beers[t.tapIndex]=t})),Object(Oe["a"])(xe,Le.SET_TAPS,(function(e,t){e.taps=t})),Object(Oe["a"])(xe,Le.FULLSCREEN,(function(e,t){e.fullscreen=t})),Object(Oe["a"])(xe,Le.SET_POURS,(function(e,t){e.pours=t})),Object(Oe["a"])(xe,Le.POUR_START,(function(e,t){var r=t.milliliters,n=t.beerName,a=t.timeout;e.currentPour={milliliters:r,beerName:n,timeout:a}})),Object(Oe["a"])(xe,Le.POUR_STATUS,(function(e,t){var r=t.milliliters;e.currentPour&&(e.currentPour.milliliters=r)})),Object(Oe["a"])(xe,Le.POUR_END,(function(e){e.currentPour=null})),Object(Oe["a"])(xe,Le.SET_BEER_STATS,(function(e,t){e.beerStats=t})),Object(Oe["a"])(xe,Le.SET_MOST_RECENT_BEERS,(function(e,t){e.mostRecentBeers=t})),Object(Oe["a"])(xe,Le.SET_BEER_DETAILS,(function(e,t){e.beerDetails=t})),Object(Oe["a"])(xe,Le.SET_POUR_CHART_DATA,(function(e,t){e.poursChartData=t})),xe),actions:{fetchSettings:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.t0=r,e.t1=Le.SET_SETTINGS,e.next=5,ye();case 5:e.t2=e.sent,(0,e.t0)(e.t1,e.t2);case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),saveSettings:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,e.next=3,Se(r);case 3:r=e.sent,n(Le.SET_SETTINGS,r);case 5:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}(),fetchMostRecentBeers:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,w();case 3:n=e.sent,r(Le.SET_MOST_RECENT_BEERS,n);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),fetchBeerDetails:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(t,r){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,e.next=3,T(r);case 3:a=e.sent,n(Le.SET_BEER_DETAILS,a);case 5:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}(),updateBeerDetails:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(t,r){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,e.next=3,y(r);case 3:a=e.sent,n(Le.SET_BEER_DETAILS,a);case 5:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}(),createNewBeer:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(t,r){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,e.next=3,S(r);case 3:a=e.sent,n(Le.SET_BEER_DETAILS,a);case 5:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}(),fetchTaps:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,De();case 3:n=e.sent,r(Le.SET_TAPS,n);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),fetchPours:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,ke();case 3:n=e.sent,r(Le.SET_POURS,n);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),fetchBeerStats:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,Ie();case 3:n=e.sent,r(Le.SET_BEER_STATS,n);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),fetchPoursChartData:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,Pe();case 3:n=e.sent,r(Le.SET_POUR_CHART_DATA,n);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),putKegOnTap:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(t,r){var n,a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=r.tapIndex,a=r.beerId,s=r.gallons,e.next=3,Ue({tapIndex:n,beerId:a,gallons:s});case 3:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}(),removeKegFromTap:function(){var e=Object(g["a"])(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=r.tapIndex,e.next=3,Fe({tapIndex:n});case 3:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}()}}),Ke=r("5f5b"),He=(r("f9e3"),r("2dd8"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"root"},[r("b-navbar",{directives:[{name:"show",rawName:"v-show",value:!e.fullscreen,expression:"!fullscreen"}],attrs:{toggleable:"md",type:"dark",variant:"dark"}},[r("b-navbar-toggle",{attrs:{target:"nav_collapse"}}),r("b-navbar-brand",{attrs:{to:{name:"menu"}}},[r("font-awesome-icon",{staticClass:"mr-2",attrs:{icon:"arrows-alt"},on:{click:e.enterFullScreen}}),e._v(" BRUI")],1),r("b-collapse",{attrs:{"is-nav":"",id:"nav_collapse"}},[r("b-navbar-nav"),r("b-navbar-nav",{staticClass:"ml-auto"},[r("b-nav-item",{attrs:{to:{name:"beers"}}},[e._v("Beers")]),r("b-nav-item",{attrs:{to:{name:"stats"}}},[e._v("Stats")]),r("b-nav-item",{attrs:{to:{name:"settings"}}},[r("font-awesome-icon",{attrs:{icon:"cog"}}),e._v(" Settings")],1)],1)],1)],1),r("router-view",{staticClass:"container-fluid"}),r("a",{directives:[{name:"show",rawName:"v-show",value:e.fullscreen,expression:"fullscreen"}],staticClass:"exitFullscreen",on:{click:e.exitFullscreen}},[r("font-awesome-icon",{attrs:{icon:"compress-arrows-alt"}})],1),r("div",{staticClass:"pourModal",class:{pourModalVisible:e.currentPour}},[e.currentPour?r("div",[r("h1",{staticClass:"lead"},[e._v("You are Pouring")]),r("h2",[e._v(e._s(e.currentPour.beerName))]),r("h3",{staticClass:"text-success"},[e._v(e._s(Math.round(.0338*(e.currentPour.milliliters||0)*100)/100)+" floz")]),r("div",{staticClass:"text-center mt-4"},[r("svg",{attrs:{width:"111px",height:"150px",viewBox:"0 0 150 203",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[r("title",[e._v("Beer")]),r("desc",[e._v("Created with Sketch.")]),r("defs",[r("path",{attrs:{d:"M102.6,189.5 L20.4,189.5 C18.2,189.5 16.4,187.7 16.4,185.5 L0.6,4.6 C0.6,2.4 2.4,0.6 4.6,0.6 L117.6,0.6 C119.8,0.6 121.6,2.4 121.6,4.6 L106.6,185.5 C106.6,187.8 104.8,189.5 102.6,189.5 Z",id:"path-1"}})]),r("g",{attrs:{id:"Page-1",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"}},[r("g",{attrs:{id:"Beer"}},[r("path",{attrs:{d:"M125.9,202.1 L22.5,202.1 C18.9,202.1 15.9,199.1 15.9,195.5 L0.7,7.4 C0.7,3.8 3.7,0.8 7.3,0.8 L142.8,0.8 C146.4,0.8 149.4,3.8 149.4,7.4 L132.4,195.5 C132.5,199.1 129.5,202.1 125.9,202.1 Z",id:"Glass",fill:"#FFFFFF",opacity:"0.08"}}),r("polygon",{attrs:{id:"Reflection",fill:"#FFFFFF",opacity:"0.2",points:"60.9 202.1 32 202.1 13 0.8 41.9 0.8"}}),r("g",{attrs:{id:"Glass",transform:"translate(14.000000, 1.000000)"}},[r("mask",{attrs:{id:"mask-2",fill:"white"}},[r("use",{attrs:{"xlink:href":"#path-1"}})]),r("g",{attrs:{id:"Path"}}),r("g",{attrs:{id:"BeerHead",mask:"url(#mask-2)"}},[r("g",{ref:"beerHead",staticClass:"beerHead",attrs:{transform:"translate(-82.311516, 160.025045)",id:"Rectangle"}},[r("rect",{attrs:{fill:"#FFB241",x:"0.3",y:"27.3",width:"294",height:"164.7"}}),r("rect",{attrs:{fill:"#FFEBD3",x:"0.3",y:"0",width:"294",height:"29.3"}})])])])])])])])]):e._e()])],1)}),Ye=[],Ge={data:function(){return{}},computed:Object(o["a"])({},Object(l["b"])({fullscreen:function(e){return e.fullscreen},currentPour:function(e){return e.currentPour},beerInGlassOffset:function(e){if(!e.currentPour)return 0;var t=230,r=e.currentPour.milliliters/t,n=100;return Math.round(n*r)}})),methods:{enterFullScreen:function(){document.fullscreenEnabled&&document.documentElement.requestFullscreen(),this.$store.commit("FULLSCREEN",!0)},exitFullscreen:function(){document.fullscreenEnabled&&document.exitFullscreen(),this.$store.commit("FULLSCREEN",!1)}},watch:{beerInGlassOffset:function(e){if(this.$refs.beerHead){var t=160.025045;this.$refs.beerHead.setAttribute("transform","translate(-82.311516, ".concat(t-e,")"))}}},mounted:function(){var e=this;document.addEventListener("fullscreenchange",(function(){document.fullscreenEnabled&&(document.fullscreenElement?e.$store.commit("FULLSCREEN",!0):e.$store.commit("FULLSCREEN",!1))}))}},qe=Ge,Je=(r("034f"),Object(d["a"])(qe,He,Ye,!1,null,null,null)),Ve=Je.exports,We=r("a65d"),Ze=r.n(We),Qe=r("ecee"),Xe=r("c074"),et=r("ad3d");Qe["c"].add(Xe["d"],Xe["a"],Xe["c"],Xe["f"],Xe["b"],Xe["g"],Xe["e"],Xe["h"]),n["default"].component("font-awesome-icon",et["a"]);var tt=new WebSocket("ws://"+location.host+"/sockets");tt.addEventListener("open",(function(e){tt.send(JSON.stringify({event:"hello"}),e),nt()})),tt.addEventListener("message",(function(e){var t=JSON.parse(e.data);"pour_start"===t.type?Me.commit("POUR_START",t):"pour_status"===t.type?Me.commit("POUR_STATUS",t):"pour_end"===t.type?setTimeout((function(){Me.commit("POUR_END")}),2e3):"reload_taps"===t.type&&Me.dispatch("fetchTaps",!1)}));var rt=!0;function nt(){if(rt){var e=!1,t=!1;document.addEventListener("keydown",(function(r){-1!==["1","2","3"].indexOf(r.key)&&(t||(e=r.key,t||(t=!0,console.log("START POUR",e),tt.send(JSON.stringify({event:"start_simulated_pour",tapIndex:parseInt(e,10)-1})))))})),document.addEventListener("keyup",(function(r){-1!==["1","2","3"].indexOf(r.key)&&r.key===e&&(t&&(t=!1,console.log("END POUR",e),tt.send(JSON.stringify({event:"end_simulated_pour",tapIndex:parseInt(e,10)-1}))),e=!1)}))}}var at=r("c1df"),st=r.n(at);n["default"].filter("formatDate",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"MM/DD/YYYY hh:mm A";if(e)return st()(String(e)).format(t)})),n["default"].use(Ke["a"]),n["default"].config.productionTip=!1,n["default"].use(Ze.a,{iconPack:"fontawesome"}),new n["default"]({router:Te,store:Me,render:function(e){return e(Ve)}}).$mount("#app")},"64a9":function(e,t,r){},"70bb":function(e,t,r){"use strict";var n=r("a6df"),a=r.n(n);a.a},9562:function(e,t,r){"use strict";var n=r("dd80"),a=r.n(n);a.a},"95a0":function(e,t,r){"use strict";var n=r("0901"),a=r.n(n);a.a},a6df:function(e,t,r){},b91f:function(e,t,r){},c52e:function(e,t,r){},c912:function(e,t,r){"use strict";var n=r("b91f"),a=r.n(n);a.a},dd80:function(e,t,r){},e0b3:function(e,t,r){"use strict";var n=r("c52e"),a=r.n(n);a.a}});
//# sourceMappingURL=app.210e4700.js.map