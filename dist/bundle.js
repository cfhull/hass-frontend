!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e,t,n,r){return new(n||(n=Promise))(function(s,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function o(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){e.done?s(e.value):new n(function(t){t(e.value)}).then(a,o)}c((r=r.apply(e,t||[])).next())})}function s(e,t){var n,r,s,i,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return i={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(i){return function(o){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(s=2&i[0]?r.return:i[0]?r.throw||((s=r.return)&&s.call(r),0):r.next)&&!(s=s.call(r,i[1])).done)return s;switch(r=0,s&&(i=[2&i[0],s.value]),i[0]){case 0:case 1:s=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(s=(s=a.trys).length>0&&s[s.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){a.label=i[1];break}if(6===i[0]&&a.label<s[1]){a.label=s[1],s=i;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(i);break}s[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,o])}}}n.r(t);var i=2,a=4,o=function(){function e(e,t){this.options=t,this.commandId=1,this.commands={},this.eventListeners={},this.closeRequested=!1,this.setSocket(e)}return e.prototype.setSocket=function(e){var t=this,n=this.socket;if(this.socket=e,e.addEventListener("message",function(e){return t._handleMessage(e)}),e.addEventListener("close",function(e){return t._handleClose(e)}),n){var r=this.commands;this.commandId=1,this.commands={},Object.keys(r).forEach(function(e){var n=r[e];"eventCallback"in n&&t.subscribeEvents(n.eventCallback,n.eventType).then(function(e){n.unsubscribe=e,n.resolve()})}),this.fireEvent("ready")}},e.prototype.addEventListener=function(e,t){var n=this.eventListeners[e];n||(n=this.eventListeners[e]=[]),n.push(t)},e.prototype.removeEventListener=function(e,t){var n=this.eventListeners[e];if(n){var r=n.indexOf(t);-1!==r&&n.splice(r,1)}},e.prototype.fireEvent=function(e,t){var n=this;(this.eventListeners[e]||[]).forEach(function(e){return e(n,t)})},e.prototype.close=function(){this.closeRequested=!0,this.socket.close()},e.prototype.subscribeEvents=function(e,t){return r(this,void 0,void 0,function(){var n,i,a=this;return s(this,function(o){switch(o.label){case 0:return n=this._genCmdId(),[4,new Promise(function(o,c){i=a.commands[n]={resolve:o,reject:c,eventCallback:e,eventType:t,unsubscribe:function(){return r(a,void 0,void 0,function(){return s(this,function(e){switch(e.label){case 0:return[4,this.sendMessagePromise((t=n,{type:"unsubscribe_events",subscription:t}))];case 1:return e.sent(),delete this.commands[n],[2]}var t})})}};try{a.sendMessage(function(e){var t={type:"subscribe_events"};return e&&(t.event_type=e),t}(t),n)}catch(e){}})];case 1:return o.sent(),[2,function(){return i.unsubscribe()}]}})})},e.prototype.ping=function(){return this.sendMessagePromise({type:"ping"})},e.prototype.sendMessage=function(e,t){t||(t=this._genCmdId()),e.id=t,this.socket.send(JSON.stringify(e))},e.prototype.sendMessagePromise=function(e){var t=this;return new Promise(function(n,r){var s=t._genCmdId();t.commands[s]={resolve:n,reject:r},t.sendMessage(e,s)})},e.prototype._handleMessage=function(e){var t=JSON.parse(e.data);switch(t.type){case"event":this.commands[t.id].eventCallback(t.event);break;case"result":if(t.id in this.commands){var n=this.commands[t.id];t.success?(n.resolve(t.result),"eventCallback"in n||delete this.commands[t.id]):(n.reject(t.error),delete this.commands[t.id])}break;case"pong":this.commands[t.id].resolve(),delete this.commands[t.id]}},e.prototype._handleClose=function(e){var t=this;if(Object.keys(this.commands).forEach(function(e){var n=t.commands[e];"eventCallback"in n||n.reject({type:"result",success:!1,error:{code:3,message:"Connection lost"}})}),!this.closeRequested){this.fireEvent("disconnected");var n=Object.assign({},this.options,{setupRetry:0}),a=function(e){setTimeout(function(){return r(t,void 0,void 0,function(){var t,r;return s(this,function(s){switch(s.label){case 0:s.label=1;case 1:return s.trys.push([1,3,,4]),[4,n.createSocket(n)];case 2:return t=s.sent(),this.setSocket(t),[3,4];case 3:return(r=s.sent())===i?this.fireEvent("reconnect-error",r):a(e+1),[3,4];case 4:return[2]}})})},1e3*Math.min(e,5))};a(0)}},e.prototype._genCmdId=function(){return++this.commandId},e}(),c=function(){return location.protocol+"//"+location.host+"/"},u=function(e){return 1e3*e+Date.now()};function l(e,t,n){return r(this,void 0,void 0,function(){var r,a,o;return s(this,function(s){switch(s.label){case 0:return(r=new FormData).append("client_id",t),Object.keys(n).forEach(function(e){r.append(e,n[e])}),[4,fetch(e+"/auth/token",{method:"POST",credentials:"same-origin",body:r})];case 1:if(!(a=s.sent()).ok)throw 400===a.status||403===a.status?i:new Error("Unable to fetch tokens");return[4,a.json()];case 2:return(o=s.sent()).hassUrl=e,o.clientId=t,o.expires=u(o.expires_in),[2,o]}})})}var d=function(){function e(e,t){this.data=e,this._saveTokens=t}return Object.defineProperty(e.prototype,"wsUrl",{get:function(){return"ws"+this.data.hassUrl.substr(4)+"/api/websocket"},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"accessToken",{get:function(){return this.data.access_token},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"expired",{get:function(){return Date.now()>this.data.expires},enumerable:!0,configurable:!0}),e.prototype.refreshAccessToken=function(){return r(this,void 0,void 0,function(){var e;return s(this,function(t){switch(t.label){case 0:return[4,l(this.data.hassUrl,this.data.clientId,{grant_type:"refresh_token",refresh_token:this.data.refresh_token})];case 1:return(e=t.sent()).refresh_token=this.data.refresh_token,this.data=e,this._saveTokens&&this._saveTokens(e),[2]}})})},e.prototype.revoke=function(){return r(this,void 0,void 0,function(){var e;return s(this,function(t){switch(t.label){case 0:return(e=new FormData).append("action","revoke"),e.append("token",this.data.refresh_token),[4,fetch(this.data.hassUrl+"/auth/token",{method:"POST",credentials:"same-origin",body:e})];case 1:return t.sent(),this._saveTokens&&this._saveTokens(null),[2]}})})},e}();function h(e){return void 0===e&&(e={}),r(this,void 0,void 0,function(){var t,n,r,i,o,u,h;return s(this,function(s){switch(s.label){case 0:if(!("auth_callback"in(n=function(e){for(var t={},n=location.search.substr(1).split("&"),r=0;r<n.length;r++){var s=n[r].split("="),i=decodeURIComponent(s[0]),a=s.length>1?decodeURIComponent(s[1]):void 0;t[i]=a}return t}())))return[3,4];r=JSON.parse(atob(n.state)),s.label=1;case 1:return s.trys.push([1,3,,4]),[4,l(r.hassUrl,r.clientId,{code:n.code,grant_type:"authorization_code"})];case 2:return t=s.sent(),e.saveTokens&&e.saveTokens(t),[3,4];case 3:return i=s.sent(),console.log("Unable to fetch access token",i),[3,4];case 4:return t||!e.loadTokens?[3,6]:[4,e.loadTokens()];case 5:t=s.sent(),s.label=6;case 6:if(t)return[2,new d(t,e.saveTokens)];if(void 0===(o=e.hassUrl))throw a;return"/"===o[o.length-1]&&(o=o.substr(0,o.length-1)),u=e.clientId||c(),h=e.redirectUrl||location.protocol+"//"+location.host+location.pathname+location.search,function(e,t,n,r){n+=(n.includes("?")?"&":"?")+"auth_callback=1",document.location.href=function(e,t,n,r){var s=e+"/auth/authorize?response_type=code&client_id="+encodeURIComponent(t)+"&redirect_uri="+encodeURIComponent(n);return r&&(s+="&state="+encodeURIComponent(r)),s}(e,t,n,r)}(o,u,h,function(e){return btoa(JSON.stringify(e))}({hassUrl:o,clientId:u})),[2,new Promise(function(){})]}})})}var f=function(e,t,n,r){if(e[t])return e[t];var s,i=0,a=function(e){var t=[];function n(n,r){e=r?n:Object.assign({},e,n);for(var s=t,i=0;i<s.length;i++)s[i](e)}return{get state(){return e},action:function(t){function r(e){n(e,!1)}return function(){for(var n=[e],s=0;s<arguments.length;s++)n.push(arguments[s]);var i=t.apply(this,n);if(null!=i)return i.then?i.then(r):r(i)}},setState:n,subscribe:function(e){return t.push(e),function(){!function(e){for(var n=[],r=0;r<t.length;r++)t[r]===e?e=null:n.push(t[r]);t=n}(e)}}}}(),o=function(){return n(e).then(function(e){return a.setState(e,!0)})};return e[t]={get state(){return a.state},refresh:o,subscribe:function(t){i||(i++,r&&(s=r(e,a)),e.addEventListener("ready",o),o().catch(function(t){if(e.socket.readyState==e.socket.OPEN)throw t}));var n=a.subscribe(t);return void 0!==a.state&&t(a.state),function(){n(),--i||(s&&s.then(function(e){e()}),e.removeEventListener("ready",o))}}},e[t]},p=function(e){return e.sendMessagePromise({type:"get_states"})},m=function(e,t,n,r){return e.sendMessagePromise(function(e,t,n){var r={type:"call_service",domain:e,service:t};return n&&(r.service_data=n),r}(t,n,r))};function v(e){return r(this,void 0,void 0,function(){var t,n,r,i;return s(this,function(s){switch(s.label){case 0:return[4,p(e)];case 1:for(t=s.sent(),n={},r=0;r<t.length;r++)n[(i=t[r]).entity_id]=i;return[2,n]}})})}var b=function(e,t){return e.subscribeEvents(function(e){return function(e,t){var n,r=e.state;if(void 0!==r){var s=t.data,i=s.entity_id,a=s.new_state;if(a)e.setState(((n={})[a.entity_id]=a,n));else{var o=Object.assign({},r);delete o[i],e.setState(o,!0)}}}(t,e)},"state_changed")},y=function(e,t){return function(e){return f(e,"_ent",v,b)}(e).subscribe(t)},g={setupRetry:0,createSocket:function(e){if(!e.auth)throw a;var t=e.auth,n=t.wsUrl;return new Promise(function(a,o){return function e(a,o,c){var u=this,l=new WebSocket(n),d=!1,h=function(){if(l.removeEventListener("close",h),d)c(i);else if(0!==a){var t=-1===a?-1:a-1;setTimeout(function(){return e(t,o,c)},1e3)}else c(1)},f=function(e){return r(u,void 0,void 0,function(){var e;return s(this,function(n){switch(n.label){case 0:return n.trys.push([0,3,,4]),t.expired?[4,t.refreshAccessToken()]:[3,2];case 1:n.sent(),n.label=2;case 2:return l.send(JSON.stringify({type:"auth",access_token:t.accessToken})),[3,4];case 3:return e=n.sent(),d=e===i,l.close(),[3,4];case 4:return[2]}})})},p=function(e){return r(u,void 0,void 0,function(){return s(this,function(t){switch(JSON.parse(e.data).type){case"auth_invalid":d=!0,l.close();break;case"auth_ok":l.removeEventListener("open",f),l.removeEventListener("message",p),l.removeEventListener("close",h),l.removeEventListener("error",h),o(l)}return[2]})})};l.addEventListener("open",f),l.addEventListener("message",p),l.addEventListener("close",h),l.addEventListener("error",h)}(e.setupRetry,a,o)})}};const _=(()=>{let e;return{connect:async()=>{let t;try{t=await h({hassUrl:"https://biddy.duckdns.org:8123"})}catch(e){if(e!==a)return void alert(`Unknown error: ${e}`);{const e=prompt("What host to connect to?","https://biddy.duckdns.org");t=await h({hassUrl:e})}}e=await function(e){return r(this,void 0,void 0,function(){var t,n;return s(this,function(r){switch(r.label){case 0:return[4,(t=Object.assign({},g,e)).createSocket(t)];case 1:return n=r.sent(),[2,new o(n,t)]}})})}({auth:t})},subscribeEntities:t=>y(e,e=>t(e)),media:{play:t=>m(e,"media_player","media_play",{entity_id:t}),pause:t=>m(e,"media_player","media_pause",{entity_id:t}),setVolume:(t,n)=>m(e,"media_player","volume_set",{entity_id:t,volume_level:n})},callService:(t,n,r)=>m(e,t,n,r)}})();var k={create:async(e,t)=>{const n=await fetch(t),r=await n.text(),s=(new DOMParser).parseFromString(r,"text/html").querySelector("template"),i=e.attachShadow({mode:"open"}),a=s.content.cloneNode(!0);return i.appendChild(a),i},remove:(e,t)=>{(e.querySelectorAll(t)||[]).forEach(e=>e.remove())}};const w={};["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","bgsound","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","command","content","data","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","element","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","image","img","input","ins","isindex","kbd","keygen","label","legend","li","link","listing","main","map","mark","marquee","math","menu","menuitem","meta","meter","multicol","nav","nextid","nobr","noembed","noframes","noscript","object","ol","optgroup","option","output","p","param","picture","plaintext","pre","progress","q","rb","rbc","rp","rt","rtc","ruby","s","samp","script","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr","xmp"].forEach(e=>{w[e]=((t,...n)=>{const r=document.createElement(e);return Object.keys(t).forEach(e=>{r[e]=t[e]}),Array.isArray(n)||(n=[n]),n.forEach(e=>r.appendChild(e)),r})});customElements.define("spotify-manager",class extends HTMLElement{constructor(){super(),this.el}static get observedAttributes(){return["entity_id","state","volume","artist","album","song","artwork"]}static get state(){const e={};return this.observedAttributes.forEach(t=>{e[t]=this[t]}),e}async connectedCallback(){await k.create(this,"./components/media-manager/spotify-manager/spotify-manager.html"),this.el=this.render(),this.shadowRoot.appendChild(this.el)}attributeChangedCallback(e,t,n){if(this[e]=n,!this.shadowRoot)return;const r=new diffDOM.DiffDOM,s=r.diff(this.el,this.render());s.length>0&&r.apply(this.el,s)}render(){const{div:e,span:t,img:n,input:r,style:s}=w;return e({},s({innerHTML:'@import "./components/media-manager/spotify-manager/spotify-manager.css";'}),t({id:"state"}),e({className:"song-info"},n({id:"artwork",src:`https://biddy.duckdns.org${this.artwork}`}),e({id:"artist",innerHTML:this.artist}),e({id:"album",innerHTML:this.album}),e({id:"song",innerHTML:this.song})),e({className:"controls"},e({className:`state-toggle${"playing"===this.state?" playing":""}`,onclick:()=>{"playing"===this.state?_.media.pause(this.entity_id):"paused"!==this.state&&"idle"!==this.state||_.media.play(this.entity_id)}}),r({id:"volume",type:"range",min:"0",max:"1",step:"0.01",value:this.volume,onchange:async e=>{const t=e.currentTarget;await _.media.setVolume(this.entity_id,t.value)}})))}});class E extends HTMLElement{constructor(){super()}static get observedAttributes(){return["entity_id","name","volume","isVolumeMuted","state"]}async connectedCallback(){await k.create(this,"./components/media-manager/snapcast-client/snapcast-client.html");this.initEvents(),E.observedAttributes.forEach(e=>this.render(e,null,this[e]))}attributeChangedCallback(e,t,n){this[e]=n,this.render(e,t,n)}async initEvents(){this.shadowRoot.querySelector("#volume").onchange=(async e=>{const t=e.currentTarget;await _.media.setVolume(this.entity_id,t.value)})}render(e,t,n){if(this.shadowRoot){const t=this.shadowRoot.querySelector(`#${e}`);if(t)switch(e){case"volume":t.value=n;break;case"name":t.innerHTML=n}}}}customElements.define("snapcast-client",E);customElements.define("media-manager",class extends HTMLElement{constructor(){super()}async connectedCallback(){await k.create(this,"./components/media-manager/media-manager.html"),_.connect().then(()=>{_.subscribeEntities(e=>{const t=Object.keys(e).filter(e=>e.startsWith("media_player")).reduce((t,n)=>(t.push(e[n]),t),[]);this.updateEntities(t)})})}updateEntities(e){const t=e.find(e=>e.entity_id.startsWith("media_player.spotify"));let n=Array.from(this.shadowRoot.querySelectorAll("spotify-manager")).find(e=>e.entity_id===t.entity_id);n||(n=document.createElement("spotify-manager"),this.shadowRoot.appendChild(n)),n.setAttribute("entity_id",t.entity_id),n.setAttribute("state",t.state),n.setAttribute("volume",t.attributes.volume_level),n.setAttribute("artist",t.attributes.media_artist),n.setAttribute("album",t.attributes.media_album_name),n.setAttribute("song",t.attributes.media_title),n.setAttribute("artwork",t.attributes.entity_picture);const r=e.filter(e=>e.entity_id.startsWith("media_player.snapcast_client")&&"on"===e.state);let s=this.shadowRoot.querySelector(".snapcast-container");s||((s=document.createElement("div")).classList.add("snapcast-container"),this.shadowRoot.appendChild(s)),r.forEach(e=>{let t=Array.from(this.shadowRoot.querySelectorAll("snapcast-client")).find(t=>t.entity_id===e.entity_id);t||(t=document.createElement("snapcast-client"),s.appendChild(t)),t.setAttribute("entity_id",e.entity_id),t.setAttribute("name",e.attributes.friendly_name),t.setAttribute("volume",e.attributes.volume_level),t.setAttribute("isVolumeMuted",e.attributes.is_volume_muted),t.setAttribute("state",e.attributes.state)})}})}]);