var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function n(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}function r(e){if(b(e)){let t={};for(let n=0;n<e.length;n++){let a=e[n],o=T(a)?i(a):r(a);if(o)for(let e in o)t[e]=o[e]}return t}else if(T(e)||D(e))return e}function i(e){let t={};return e.replace(ge,``).split(me).forEach(e=>{if(e){let n=e.split(he);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function a(e){let t=``;if(T(e))t=e;else if(b(e))for(let n=0;n<e.length;n++){let r=a(e[n]);r&&(t+=r+` `)}else if(D(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}function o(e){return!!e||e===``}function s(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=c(e[r],t[r]);return n}function c(e,t){if(e===t)return!0;let n=C(e),r=C(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=E(e),r=E(t),n||r)return e===t;if(n=b(e),r=b(t),n||r)return n&&r?s(e,t):!1;if(n=D(e),r=D(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!c(e[n],t[n]))return!1}}return String(e)===String(t)}function l(e,t){return e.findIndex(e=>c(e,t))}var u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,ee,te,ne,re,j,ie,M,ae,oe,se,ce,N,le,ue,de,fe,pe,me,he,ge,_e,ve,ye,be,xe,Se,Ce=e((()=>{u={},d=[],f=()=>{},p=()=>!1,m=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),h=e=>e.startsWith(`onUpdate:`),g=Object.assign,_=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},v=Object.prototype.hasOwnProperty,y=(e,t)=>v.call(e,t),b=Array.isArray,x=e=>A(e)===`[object Map]`,S=e=>A(e)===`[object Set]`,C=e=>A(e)===`[object Date]`,w=e=>typeof e==`function`,T=e=>typeof e==`string`,E=e=>typeof e==`symbol`,D=e=>typeof e==`object`&&!!e,O=e=>(D(e)||w(e))&&w(e.then)&&w(e.catch),k=Object.prototype.toString,A=e=>k.call(e),ee=e=>A(e).slice(8,-1),te=e=>A(e)===`[object Object]`,ne=e=>T(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,re=n(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),j=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},ie=/-\w/g,M=j(e=>e.replace(ie,e=>e.slice(1).toUpperCase())),ae=/\B([A-Z])/g,oe=j(e=>e.replace(ae,`-$1`).toLowerCase()),se=j(e=>e.charAt(0).toUpperCase()+e.slice(1)),ce=j(e=>e?`on${se(e)}`:``),N=(e,t)=>!Object.is(e,t),le=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},ue=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},de=e=>{let t=parseFloat(e);return isNaN(t)?e:t},pe=()=>fe||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{},me=/;(?![^(]*\))/g,he=/:([^]+)/,ge=/\/\*[^]*?\*\//g,_e=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,ve=n(_e),_e+``,ye=e=>!!(e&&e.__v_isRef===!0),be=e=>T(e)?e:e==null?``:b(e)||D(e)&&(e.toString===k||!w(e.toString))?ye(e)?be(e.value):JSON.stringify(e,xe,2):String(e),xe=(e,t)=>ye(t)?xe(e,t.value):x(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[Se(t,r)+` =>`]=n,e),{})}:S(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Se(e))}:E(t)?Se(t):D(t)&&!b(t)&&!te(t)?String(t):t,Se=(e,t=``)=>E(e)?`Symbol(${e.description??t})`:e}));function we(){return z}function Te(e,t=!1){if(e.flags|=8,t){e.next=bt,bt=e;return}e.next=yt,yt=e}function Ee(){vt++}function De(){if(--vt>0)return;if(bt){let e=bt;for(bt=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;yt;){let t=yt;for(yt=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function Oe(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function ke(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Me(r),Ne(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Ae(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(je(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function je(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===St)||(e.globalVersion=St,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ae(e))))return;e.flags|=2;let t=e.dep,n=B,r=V;B=e,V=!0;try{Oe(e);let n=e.fn(e._value);(t.version===0||N(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{B=n,V=r,ke(e),e.flags&=-3}}function Me(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Me(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Ne(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}function Pe(){xt.push(V),V=!1}function Fe(){let e=xt.pop();V=e===void 0?!0:e}function Ie(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=B;B=void 0;try{t()}finally{B=e}}}function Le(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Le(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}function P(e,t,n){if(V&&B){let t=Tt.get(e);t||Tt.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new wt),r.map=t,r.key=n),r.track()}}function Re(e,t,n,r,i,a){let o=Tt.get(e);if(!o){St++;return}let s=e=>{e&&e.trigger()};if(Ee(),t===`clear`)o.forEach(s);else{let i=b(e),a=i&&ne(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Ot||!E(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Ot)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(Et)),x(e)&&s(o.get(Dt)));break;case`delete`:i||(s(o.get(Et)),x(e)&&s(o.get(Dt)));break;case`set`:x(e)&&s(o.get(Et));break}}De()}function ze(e){let t=L(e);return t===e?t:(P(t,`iterate`,Ot),I(e)?t:t.map(H))}function Be(e){return P(e=L(e),`iterate`,Ot),e}function F(e,t){return it(e)?Jt(rt(e)?H(t):t):H(t)}function Ve(e,t,n){let r=Be(e),i=r[t]();return r!==e&&!I(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}function He(e,t,n,r,i,a){let o=Be(e),s=o!==e&&!I(e),c=o[t];if(c!==At[t]){let t=c.apply(e,a);return s?H(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,F(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function Ue(e,t,n,r){let i=Be(e),a=i!==e&&!I(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=F(e,t)),n.call(this,t,F(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?F(e,c):c}function We(e,t,n){let r=L(e);P(r,`iterate`,Ot);let i=r[t](...n);return(i===-1||i===!1)&&at(n[0])?(n[0]=L(n[0]),r[t](...n)):i}function Ge(e,t,n=[]){Pe(),Ee();let r=L(e)[t].apply(e,n);return De(),Fe(),r}function Ke(e){E(e)||(e=String(e));let t=L(this);return P(t,`has`,e),t.hasOwnProperty(e)}function qe(e,t,n){return function(...r){let i=this.__v_raw,a=L(i),o=x(a),s=e===`entries`||e===Symbol.iterator&&o,c=e===`keys`&&o,l=i[e](...r),u=n?zt:t?Jt:H;return!t&&P(a,`iterate`,c?Dt:Et),g(Object.create(l),{next(){let{value:e,done:t}=l.next();return t?{value:e,done:t}:{value:s?[u(e[0]),u(e[1])]:u(e),done:t}}})}}function Je(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function Ye(e,t){let n={get(n){let r=this.__v_raw,i=L(r),a=L(n);e||(N(n,a)&&P(i,`get`,n),P(i,`get`,a));let{has:o}=Bt(i),s=t?zt:e?Jt:H;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&P(L(t),`iterate`,Et),t.size},has(t){let n=this.__v_raw,r=L(n),i=L(t);return e||(N(t,i)&&P(r,`has`,t),P(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=L(a),s=t?zt:e?Jt:H;return!e&&P(o,`iterate`,Et),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return g(n,e?{add:Je(`add`),set:Je(`set`),delete:Je(`delete`),clear:Je(`clear`)}:{add(e){let n=L(this),r=Bt(n),i=L(e),a=!t&&!I(e)&&!it(e)?i:e;return r.has.call(n,a)||N(e,a)&&r.has.call(n,e)||N(i,a)&&r.has.call(n,i)||(n.add(a),Re(n,`add`,a,a)),this},set(e,n){!t&&!I(n)&&!it(n)&&(n=L(n));let r=L(this),{has:i,get:a}=Bt(r),o=i.call(r,e);o||=(e=L(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?N(n,s)&&Re(r,`set`,e,n,s):Re(r,`add`,e,n),this},delete(e){let t=L(this),{has:n,get:r}=Bt(t),i=n.call(t,e);i||=(e=L(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&Re(t,`delete`,e,void 0,a),o},clear(){let e=L(this),t=e.size!==0,n=e.clear();return t&&Re(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=qe(r,e,t)}),n}function Xe(e,t){let n=Ye(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(y(n,r)&&r in t?n:t,r,i)}function Ze(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function Qe(e){return e.__v_skip||!Object.isExtensible(e)?0:Ze(ee(e))}function $e(e){return it(e)?e:nt(e,!1,It,Vt,Wt)}function et(e){return nt(e,!1,Rt,Ht,Gt)}function tt(e){return nt(e,!0,Lt,Ut,Kt)}function nt(e,t,n,r,i){if(!D(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let a=Qe(e);if(a===0)return e;let o=i.get(e);if(o)return o;let s=new Proxy(e,a===2?r:n);return i.set(e,s),s}function rt(e){return it(e)?rt(e.__v_raw):!!(e&&e.__v_isReactive)}function it(e){return!!(e&&e.__v_isReadonly)}function I(e){return!!(e&&e.__v_isShallow)}function at(e){return e?!!e.__v_raw:!1}function L(e){let t=e&&e.__v_raw;return t?L(t):e}function ot(e){return!y(e,`__v_skip`)&&Object.isExtensible(e)&&ue(e,`__v_skip`,!0),e}function R(e){return e?e.__v_isRef===!0:!1}function st(e){return ct(e,!1)}function ct(e,t){return R(e)?e:new Yt(e,t)}function lt(e){return R(e)?e.value:e}function ut(e){return rt(e)?e:new Proxy(e,Xt)}function dt(e,t,n=!1){let r,i;return w(e)?r=e:(r=e.get,i=e.set),new Zt(r,i,n)}function ft(e,t=!1,n=en){if(n){let t=$t.get(n);t||$t.set(n,t=[]),t.push(e)}}function pt(e,t,n=u){let{immediate:r,deep:i,once:a,scheduler:o,augmentJob:s,call:c}=n,l=e=>i?e:I(e)||i===!1||i===0?mt(e,1):mt(e),d,p,m,h,g=!1,v=!1;if(R(e)?(p=()=>e.value,g=I(e)):rt(e)?(p=()=>l(e),g=!0):b(e)?(v=!0,g=e.some(e=>rt(e)||I(e)),p=()=>e.map(e=>{if(R(e))return e.value;if(rt(e))return l(e);if(w(e))return c?c(e,2):e()})):p=w(e)?t?c?()=>c(e,2):e:()=>{if(m){Pe();try{m()}finally{Fe()}}let t=en;en=d;try{return c?c(e,3,[h]):e(h)}finally{en=t}}:f,t&&i){let e=p,t=i===!0?1/0:i;p=()=>mt(e(),t)}let y=we(),x=()=>{d.stop(),y&&y.active&&_(y.effects,d)};if(a&&t){let e=t;t=(...t)=>{e(...t),x()}}let S=v?Array(e.length).fill(Qt):Qt,C=e=>{if(!(!(d.flags&1)||!d.dirty&&!e))if(t){let e=d.run();if(i||g||(v?e.some((e,t)=>N(e,S[t])):N(e,S))){m&&m();let n=en;en=d;try{let n=[e,S===Qt?void 0:v&&S[0]===Qt?[]:S,h];S=e,c?c(t,3,n):t(...n)}finally{en=n}}}else d.run()};return s&&s(C),d=new _t(p),d.scheduler=o?()=>o(C,!1):C,h=e=>ft(e,!1,d),m=d.onStop=()=>{let e=$t.get(d);if(e){if(c)c(e,4);else for(let t of e)t();$t.delete(d)}},t?r?C(!0):S=d.run():o?o(C.bind(null,!0),!0):d.run(),x.pause=d.pause.bind(d),x.resume=d.resume.bind(d),x.stop=x,x}function mt(e,t=1/0,n){if(t<=0||!D(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,R(e))mt(e.value,t,n);else if(b(e))for(let r=0;r<e.length;r++)mt(e[r],t,n);else if(S(e)||x(e))e.forEach(e=>{mt(e,t,n)});else if(te(e)){for(let r in e)mt(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&mt(e[r],t,n)}return e}var z,ht,B,gt,_t,vt,yt,bt,V,xt,St,Ct,wt,Tt,Et,Dt,Ot,kt,At,jt,Mt,Nt,Pt,Ft,It,Lt,Rt,zt,Bt,Vt,Ht,Ut,Wt,Gt,Kt,qt,H,Jt,Yt,Xt,Zt,Qt,$t,en,tn=e((()=>{Ce(),ht=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=z,!e&&z&&(this.index=(z.scopes||=[]).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){let t=z;try{return z=this,e()}finally{z=t}}}on(){++this._on===1&&(this.prevScope=z,z=this)}off(){this._on>0&&--this._on===0&&(z=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}},gt=new WeakSet,_t=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,z&&z.active&&z.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,gt.has(this)&&(gt.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Te(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ie(this),Oe(this);let e=B,t=V;B=this,V=!0;try{return this.fn()}finally{ke(this),B=e,V=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Me(e);this.deps=this.depsTail=void 0,Ie(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?gt.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ae(this)&&this.run()}get dirty(){return Ae(this)}},vt=0,V=!0,xt=[],St=0,Ct=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},wt=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!B||!V||B===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==B)t=this.activeLink=new Ct(B,this),B.deps?(t.prevDep=B.depsTail,B.depsTail.nextDep=t,B.depsTail=t):B.deps=B.depsTail=t,Le(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=B.depsTail,t.nextDep=void 0,B.depsTail.nextDep=t,B.depsTail=t,B.deps===t&&(B.deps=e)}return t}trigger(e){this.version++,St++,this.notify(e)}notify(e){Ee();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{De()}}},Tt=new WeakMap,Et=Symbol(``),Dt=Symbol(``),Ot=Symbol(``),kt={__proto__:null,[Symbol.iterator](){return Ve(this,Symbol.iterator,e=>F(this,e))},concat(...e){return ze(this).concat(...e.map(e=>b(e)?ze(e):e))},entries(){return Ve(this,`entries`,e=>(e[1]=F(this,e[1]),e))},every(e,t){return He(this,`every`,e,t,void 0,arguments)},filter(e,t){return He(this,`filter`,e,t,e=>e.map(e=>F(this,e)),arguments)},find(e,t){return He(this,`find`,e,t,e=>F(this,e),arguments)},findIndex(e,t){return He(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return He(this,`findLast`,e,t,e=>F(this,e),arguments)},findLastIndex(e,t){return He(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return He(this,`forEach`,e,t,void 0,arguments)},includes(...e){return We(this,`includes`,e)},indexOf(...e){return We(this,`indexOf`,e)},join(e){return ze(this).join(e)},lastIndexOf(...e){return We(this,`lastIndexOf`,e)},map(e,t){return He(this,`map`,e,t,void 0,arguments)},pop(){return Ge(this,`pop`)},push(...e){return Ge(this,`push`,e)},reduce(e,...t){return Ue(this,`reduce`,e,t)},reduceRight(e,...t){return Ue(this,`reduceRight`,e,t)},shift(){return Ge(this,`shift`)},some(e,t){return He(this,`some`,e,t,void 0,arguments)},splice(...e){return Ge(this,`splice`,e)},toReversed(){return ze(this).toReversed()},toSorted(e){return ze(this).toSorted(e)},toSpliced(...e){return ze(this).toSpliced(...e)},unshift(...e){return Ge(this,`unshift`,e)},values(){return Ve(this,`values`,e=>F(this,e))}},At=Array.prototype,jt=n(`__proto__,__v_isRef,__isVue`),Mt=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(E)),Nt=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?qt:Kt:i?Gt:Wt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=b(e);if(!r){let e;if(a&&(e=kt[t]))return e;if(t===`hasOwnProperty`)return Ke}let o=Reflect.get(e,t,R(e)?e:n);if((E(t)?Mt.has(t):jt(t))||(r||P(e,`get`,t),i))return o;if(R(o)){let e=a&&ne(t)?o:o.value;return r&&D(e)?tt(e):e}return D(o)?r?tt(o):$e(o):o}},Pt=class extends Nt{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=b(e)&&ne(t);if(!this._isShallow){let e=it(i);if(!I(n)&&!it(n)&&(i=L(i),n=L(n)),!a&&R(i)&&!R(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:y(e,t),s=Reflect.set(e,t,n,R(e)?e:r);return e===L(r)&&(o?N(n,i)&&Re(e,`set`,t,n,i):Re(e,`add`,t,n)),s}deleteProperty(e,t){let n=y(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&Re(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!E(t)||!Mt.has(t))&&P(e,`has`,t),n}ownKeys(e){return P(e,`iterate`,b(e)?`length`:Et),Reflect.ownKeys(e)}},Ft=class extends Nt{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},It=new Pt,Lt=new Ft,Rt=new Pt(!0),zt=e=>e,Bt=e=>Reflect.getPrototypeOf(e),Vt={get:Xe(!1,!1)},Ht={get:Xe(!1,!0)},Ut={get:Xe(!0,!1)},Wt=new WeakMap,Gt=new WeakMap,Kt=new WeakMap,qt=new WeakMap,H=e=>D(e)?$e(e):e,Jt=e=>D(e)?tt(e):e,Yt=class{constructor(e,t){this.dep=new wt,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:L(e),this._value=t?e:H(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||I(e)||it(e);e=n?e:L(e),N(e,t)&&(this._rawValue=e,this._value=n?e:H(e),this.dep.trigger())}},Xt={get:(e,t,n)=>t===`__v_raw`?e:lt(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return R(i)&&!R(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}},Zt=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new wt(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=St-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&B!==this)return Te(this,!0),!0}get value(){let e=this.dep.track();return je(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}},Qt={},$t=new WeakMap,en=void 0}));function nn(e,t,n,r){try{return r?e(...r):e()}catch(e){rn(e,t,n)}}function U(e,t,n,r){if(w(e)){let i=nn(e,t,n,r);return i&&O(i)&&i.catch(e=>{rn(e,t,n)}),i}if(b(e)){let i=[];for(let a=0;a<e.length;a++)i.push(U(e[a],t,n,r));return i}}function rn(e,t,n,r=!0){let i=t?t.vnode:null,{errorHandler:a,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||u;if(t){let r=t.parent,i=t.proxy,o=`https://vuejs.org/error-reference/#runtime-${n}`;for(;r;){let t=r.ec;if(t){for(let n=0;n<t.length;n++)if(t[n](e,i,o)===!1)return}r=r.parent}if(a){Pe(),nn(a,null,10,[e,i,o]),Fe();return}}an(e,n,i,r,o)}function an(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}function on(e){let t=Zr||Xr;return e?t.then(this?e.bind(this):e):t}function sn(e){let t=J+1,n=q.length;for(;t<n;){let r=t+n>>>1,i=q[r],a=Qr(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function cn(e){if(!(e.flags&1)){let t=Qr(e),n=q[q.length-1];!n||!(e.flags&2)&&t>=Qr(n)?q.push(e):q.splice(sn(t),0,e),e.flags|=1,ln()}}function ln(){Zr||=Xr.then(pn)}function un(e){b(e)?qr.push(...e):Jr&&e.id===-1?Jr.splice(Yr+1,0,e):e.flags&1||(qr.push(e),e.flags|=1),ln()}function dn(e,t,n=J+1){for(;n<q.length;n++){let t=q[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;q.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function fn(e){if(qr.length){let e=[...new Set(qr)].sort((e,t)=>Qr(e)-Qr(t));if(qr.length=0,Jr){Jr.push(...e);return}for(Jr=e,Yr=0;Yr<Jr.length;Yr++){let e=Jr[Yr];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}Jr=null,Yr=0}}function pn(e){try{for(J=0;J<q.length;J++){let e=q[J];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),nn(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;J<q.length;J++){let e=q[J];e&&(e.flags&=-2)}J=-1,q.length=0,fn(e),Zr=null,(q.length||qr.length)&&pn(e)}}function mn(e){let t=Y;return Y=e,$r=e&&e.type.__scopeId||null,t}function hn(e,t=Y,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&Tr(-1);let i=mn(t),a;try{a=e(...n)}finally{mn(i),r._d&&Tr(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function gn(e,t){if(Y===null)return e;let n=Gr(Y),r=e.dirs||=[];for(let e=0;e<t.length;e++){let[i,a,o,s=u]=t[e];i&&(w(i)&&(i={mounted:i,updated:i}),i.deep&&mt(a),r.push({dir:i,instance:n,value:a,oldValue:void 0,arg:o,modifiers:s}))}return e}function _n(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(Pe(),U(c,n,8,[e.el,s,e,t]),Fe())}}function vn(e,t){if($){let n=$.provides,r=$.parent&&$.parent.provides;r===n&&(n=$.provides=Object.create(r)),n[e]=t}}function yn(e,t,n=!1){let r=ea();if(r||Ei){let i=Ei?Ei._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&w(t)?t.call(r&&r.proxy):t}}function bn(e,t,n){return xn(e,t,n)}function xn(e,t,n=u){let{immediate:r,deep:i,flush:a,once:o}=n,s=g({},n),c=t&&r||!t&&a!==`post`,l;if(aa){if(a===`sync`){let e=ti();l=e.__watcherHandles||=[]}else if(!c){let e=()=>{};return e.stop=f,e.resume=f,e.pause=f,e}}let d=$;s.call=(e,t,n)=>U(e,d,t,n);let p=!1;a===`post`?s.scheduler=e=>{X(e,d&&d.suspense)}:a!==`sync`&&(p=!0,s.scheduler=(e,t)=>{t?e():cn(e)}),s.augmentJob=e=>{t&&(e.flags|=4),p&&(e.flags|=2,d&&(e.id=d.uid,e.i=d))};let m=pt(e,t,s);return aa&&(l?l.push(m):c&&m()),m}function Sn(e,t,n){let r=this.proxy,i=T(e)?e.includes(`.`)?Cn(r,e):()=>r[e]:e.bind(r,r),a;w(t)?a=t:(a=t.handler,n=t);let o=ra(this),s=xn(i,a.bind(r),n);return o(),s}function Cn(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function wn(e,t){e.shapeFlag&6&&e.component?(e.transition=t,wn(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Tn(e,t){return w(e)?g({name:e.name},t,{setup:e}):e}function En(e){e.ids=[e.ids[0]+ e.ids[2]+++`-`,0,0]}function Dn(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}function On(e,t,n,r,i=!1){if(b(e)){e.forEach((e,a)=>On(e,t&&(b(t)?t[a]:t),n,r,i));return}if(oi(r)&&!i){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&On(e,t,n,r.component.subTree);return}let a=r.shapeFlag&4?Gr(r.component):r.el,o=i?null:a,{i:s,r:c}=e,l=t&&t.r,d=s.refs===u?s.refs={}:s.refs,f=s.setupState,m=L(f),h=f===u?p:e=>Dn(d,e)?!1:y(m,e),g=(e,t)=>!(t&&Dn(d,t));if(l!=null&&l!==c){if(kn(t),T(l))d[l]=null,h(l)&&(f[l]=null);else if(R(l)){let e=t;g(l,e.k)&&(l.value=null),e.k&&(d[e.k]=null)}}if(w(c))nn(c,s,12,[o,d]);else{let t=T(c),r=R(c);if(t||r){let s=()=>{if(e.f){let n=t?h(c)?f[c]:d[c]:g(c)||!e.k?c.value:d[e.k];if(i)b(n)&&_(n,a);else if(b(n))n.includes(a)||n.push(a);else if(t)d[c]=[a],h(c)&&(f[c]=d[c]);else{let t=[a];g(c,e.k)&&(c.value=t),e.k&&(d[e.k]=t)}}else t?(d[c]=o,h(c)&&(f[c]=o)):r&&(g(c,e.k)&&(c.value=o),e.k&&(d[e.k]=o))};if(o){let t=()=>{s(),ai.delete(e)};t.id=-1,ai.set(e,t),X(t,n)}else kn(e),s()}}}function kn(e){let t=ai.get(e);t&&(t.flags|=8,ai.delete(e))}function An(e,t){Mn(e,`a`,t)}function jn(e,t){Mn(e,`da`,t)}function Mn(e,t,n=$){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(Pn(t,r,n),n){let e=n.parent;for(;e&&e.parent;)si(e.parent.vnode)&&Nn(r,t,n,e),e=e.parent}}function Nn(e,t,n,r){let i=Pn(t,e,r,!0);mi(()=>{_(r[t],i)},n)}function Pn(e,t,n=$,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{Pe();let i=ra(n),a=U(t,n,e,r);return i(),Fe(),a};return r?i.unshift(a):i.push(a),a}}function Fn(e,t=$){Pn(`ec`,e,t)}function In(e,t,n,r){let i,a=n&&n[r],o=b(e);if(o||T(e)){let n=o&&rt(e),r=!1,s=!1;n&&(r=!I(e),s=it(e),e=Be(e)),i=Array(e.length);for(let n=0,o=e.length;n<o;n++)i[n]=t(r?s?Jt(H(e[n])):H(e[n]):e[n],n,void 0,a&&a[n])}else if(typeof e==`number`){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,a&&a[n])}else if(D(e))if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,o=n.length;r<o;r++){let o=n[r];i[r]=t(e[o],o,r,a&&a[r])}}else i=[];return n&&(n[r]=i),i}function Ln(e){return b(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}function Rn(e){let t=Hn(e),n=e.proxy,r=e.ctx;Ci=!1,t.beforeCreate&&Bn(t.beforeCreate,e,`bc`);let{data:i,computed:a,methods:o,watch:s,provide:c,inject:l,created:u,beforeMount:d,mounted:p,beforeUpdate:m,updated:h,activated:g,deactivated:_,beforeDestroy:v,beforeUnmount:y,destroyed:x,unmounted:S,render:C,renderTracked:T,renderTriggered:E,errorCaptured:O,serverPrefetch:k,expose:A,inheritAttrs:ee,components:te,directives:ne,filters:re}=t;if(l&&zn(l,r,null),o)for(let e in o){let t=o[e];w(t)&&(r[e]=t.bind(n))}if(i){let t=i.call(n,n);D(t)&&(e.data=$e(t))}if(Ci=!0,a)for(let e in a){let t=a[e],i=la({get:w(t)?t.bind(n,n):w(t.get)?t.get.bind(n,n):f,set:!w(t)&&w(t.set)?t.set.bind(n):f});Object.defineProperty(r,e,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e})}if(s)for(let e in s)Vn(s[e],r,n,e);if(c){let e=w(c)?c.call(n):c;Reflect.ownKeys(e).forEach(t=>{vn(t,e[t])})}u&&Bn(u,e,`c`);function j(e,t){b(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(j(li,d),j(ui,p),j(di,m),j(fi,h),j(An,g),j(jn,_),j(Fn,O),j(_i,T),j(gi,E),j(pi,y),j(mi,S),j(hi,k),b(A))if(A.length){let t=e.exposed||={};A.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={};C&&e.render===f&&(e.render=C),ee!=null&&(e.inheritAttrs=ee),te&&(e.components=te),ne&&(e.directives=ne),k&&En(e)}function zn(e,t,n=f){b(e)&&(e=Kn(e));for(let n in e){let r=e[n],i;i=D(r)?`default`in r?yn(r.from||n,r.default,!0):yn(r.from||n):yn(r),R(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function Bn(e,t,n){U(b(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function Vn(e,t,n,r){let i=r.includes(`.`)?Cn(n,r):()=>n[r];if(T(e)){let n=t[e];w(n)&&bn(i,n)}else if(w(e))bn(i,e.bind(n));else if(D(e))if(b(e))e.forEach(e=>Vn(e,t,n,r));else{let r=w(e.handler)?e.handler.bind(n):t[e.handler];w(r)&&bn(i,r,e)}}function Hn(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>Un(c,e,o,!0)),Un(c,t,o)),D(t)&&a.set(t,c),c}function Un(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&Un(e,a,n,!0),i&&i.forEach(t=>Un(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=wi[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}function Wn(e,t){return t?e?function(){return g(w(e)?e.call(this,this):e,w(t)?t.call(this,this):t)}:t:e}function Gn(e,t){return qn(Kn(e),Kn(t))}function Kn(e){if(b(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function W(e,t){return e?[...new Set([].concat(e,t))]:t}function qn(e,t){return e?g(Object.create(null),e,t):t}function Jn(e,t){return e?b(e)&&b(t)?[...new Set([...e,...t])]:g(Object.create(null),Ln(e),Ln(t??{})):t}function Yn(e,t){if(!e)return t;if(!t)return e;let n=g(Object.create(null),e);for(let r in t)n[r]=W(e[r],t[r]);return n}function Xn(){return{app:null,config:{isNativeTag:p,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}function Zn(e,t){return function(n,r=null){w(n)||(n=g({},n)),r!=null&&!D(r)&&(r=null);let i=Xn(),a=new WeakSet,o=[],s=!1,c=i.app={_uid:Ti++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:ua,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&w(e.install)?(a.add(e),e.install(c,...t)):w(e)&&(a.add(e),e(c,...t))),c},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),c},component(e,t){return t?(i.components[e]=t,c):i.components[e]},directive(e,t){return t?(i.directives[e]=t,c):i.directives[e]},mount(a,o,l){if(!s){let u=c._ceVNode||Zi(n,r);return u.appContext=i,l===!0?l=`svg`:l===!1&&(l=void 0),o&&t?t(u,a):e(u,a,l),s=!0,c._container=a,a.__vue_app__=c,Gr(u.component)}},onUnmount(e){o.push(e)},unmount(){s&&(U(o,c._instance,16),e(null,c._container),delete c._container.__vue_app__)},provide(e,t){return i.provides[e]=t,c},runWithContext(e){let t=Ei;Ei=c;try{return e()}finally{Ei=t}}};return c}}function Qn(e,t,...n){if(e.isUnmounted)return;let r=e.vnode.props||u,i=n,a=t.startsWith(`update:`),o=a&&Di(r,t.slice(7));o&&(o.trim&&(i=n.map(e=>T(e)?e.trim():e)),o.number&&(i=n.map(de)));let s,c=r[s=ce(t)]||r[s=ce(M(t))];!c&&a&&(c=r[s=ce(oe(t))]),c&&U(c,e,6,i);let l=r[s+`Once`];if(l){if(!e.emitted)e.emitted={};else if(e.emitted[s])return;e.emitted[s]=!0,U(l,e,6,i)}}function $n(e,t,n=!1){let r=n?Oi:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},s=!1;if(!w(e)){let r=e=>{let n=$n(e,t,!0);n&&(s=!0,g(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!s?(D(e)&&r.set(e,null),null):(b(a)?a.forEach(e=>o[e]=null):g(o,a),D(e)&&r.set(e,o),o)}function er(e,t){return!e||!m(t)?!1:(t=t.slice(2).replace(/Once$/,``),y(e,t[0].toLowerCase()+t.slice(1))||y(e,oe(t))||y(e,t))}function tr(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:o,attrs:s,emit:c,render:l,renderCache:u,props:d,data:f,setupState:p,ctx:m,inheritAttrs:g}=e,_=mn(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=K(l.call(t,e,u,d,p,f,m)),y=s}else{let e=t;v=K(e.length>1?e(d,{attrs:s,slots:o,emit:c}):e(d,null)),y=t.props?s:ki(s)}}catch(t){qi.length=0,rn(t,e,1),v=Zi(Gi)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(h)&&(y=Ai(y,a)),b=Mr(b,y,!1,!0))}return n.dirs&&(b=Mr(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&wn(b,n.transition),v=b,mn(_),v}function nr(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?rr(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(ir(o,r,n)&&!er(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?rr(r,o,l):!0:!!o;return!1}function rr(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(ir(t,e,a)&&!er(n,a))return!0}return!1}function ir(e,t,n){let r=e[n],i=t[n];return n===`style`&&D(r)&&D(i)?!c(r,i):r!==i}function ar({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}function or(e,t,n,r=!1){let i={},a=Mi();e.propsDefaults=Object.create(null),cr(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);n?e.props=r?i:et(i):e.type.props?e.props=i:e.props=a,e.attrs=a}function sr(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=L(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(er(e.emitsOptions,o))continue;let u=t[o];if(c)if(y(a,o))u!==a[o]&&(a[o]=u,l=!0);else{let t=M(o);i[t]=lr(c,s,t,u,e,!1)}else u!==a[o]&&(a[o]=u,l=!0)}}}else{cr(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!y(t,a)&&((r=oe(a))===a||!y(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=lr(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!y(t,e))&&(delete a[e],l=!0)}l&&Re(e.attrs,`set`,``)}function cr(e,t,n,r){let[i,a]=e.propsOptions,o=!1,s;if(t)for(let c in t){if(re(c))continue;let l=t[c],u;i&&y(i,u=M(c))?!a||!a.includes(u)?n[u]=l:(s||={})[u]=l:er(e.emitsOptions,c)||(!(c in r)||l!==r[c])&&(r[c]=l,o=!0)}if(a){let t=L(n),r=s||u;for(let o=0;o<a.length;o++){let s=a[o];n[s]=lr(i,t,s,r[s],e,!y(r,s))}}return o}function lr(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=y(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&w(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=ra(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===oe(n))&&(r=!0))}return r}function ur(e,t,n=!1){let r=n?Pi:t.propsCache,i=r.get(e);if(i)return i;let a=e.props,o={},s=[],c=!1;if(!w(e)){let r=e=>{c=!0;let[n,r]=ur(e,t,!0);g(o,n),r&&s.push(...r)};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}if(!a&&!c)return D(e)&&r.set(e,d),d;if(b(a))for(let e=0;e<a.length;e++){let t=M(a[e]);dr(t)&&(o[t]=u)}else if(a)for(let e in a){let t=M(e);if(dr(t)){let n=a[e],r=o[t]=b(n)||w(n)?{type:n}:g({},n),i=r.type,c=!1,l=!0;if(b(i))for(let e=0;e<i.length;++e){let t=i[e],n=w(t)&&t.name;if(n===`Boolean`){c=!0;break}else n===`String`&&(l=!1)}else c=w(i)&&i.name===`Boolean`;r[0]=c,r[1]=l,(c||y(r,`default`))&&s.push(t)}}let l=[o,s];return D(e)&&r.set(e,l),l}function dr(e){return e[0]!==`$`&&!re(e)}function fr(e){return pr(e)}function pr(e,t){let n=pe();n.__VUE__=!0;let{insert:r,remove:i,patchProp:a,createElement:o,createText:s,createComment:c,setText:l,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=f,insertStaticContent:_}=e,v=(e,t,n,r=null,i=null,a=null,o=void 0,s=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!kr(e,t)&&(r=he(e),N(e,i,a,!0),e=null),t.patchFlag===-2&&(c=!1,t.dynamicChildren=null);let{type:l,ref:u,shapeFlag:d}=t;switch(l){case Wi:y(e,t,n,r);break;case Gi:b(e,t,n,r);break;case Ki:e??x(t,n,r,o);break;case Z:ee(e,t,n,r,i,a,o,s,c);break;default:d&1?w(e,t,n,r,i,a,o,s,c):d&6?te(e,t,n,r,i,a,o,s,c):(d&64||d&128)&&l.process(e,t,n,r,i,a,o,s,c,ve)}u!=null&&i?On(u,e&&e.ref,a,t||e,!t):u==null&&e&&e.ref!=null&&On(e.ref,null,a,e,!0)},y=(e,t,n,i)=>{if(e==null)r(t.el=s(t.children),n,i);else{let n=t.el=e.el;t.children!==e.children&&l(n,t.children)}},b=(e,t,n,i)=>{e==null?r(t.el=c(t.children||``),n,i):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,i)=>{let a;for(;e&&e!==t;)a=h(e),r(e,n,i),e=a;r(t,n,i)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),i(e),e=n;i(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)T(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),O(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},T=(e,t,n,i,s,c,l,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=o(e.type,c,m&&m.is,m),h&8?p(d,e.children):h&16&&D(e.children,d,null,i,s,mr(e,c),l,u),_&&_n(e,null,i,`created`),E(d,e,e.scopeId,l,i),m){for(let e in m)e!==`value`&&!re(e)&&a(d,e,null,m[e],c,i);`value`in m&&a(d,`value`,null,m.value,c),(f=m.onVnodeBeforeMount)&&Lr(f,i,e)}_&&_n(e,null,i,`beforeMount`);let v=gr(s,g);v&&g.beforeEnter(d),r(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&X(()=>{try{f&&Lr(f,i,e),v&&g.enter(d),_&&_n(e,null,i,`mounted`)}finally{}},s)},E=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||Ui(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;E(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},D=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++)v(null,e[l]=s?Pr(e[l]):K(e[l]),t,n,r,i,a,o,s)},O=(e,t,n,r,i,o,s)=>{let c=t.el=e.el,{patchFlag:l,dynamicChildren:d,dirs:f}=t;l|=e.patchFlag&16;let m=e.props||u,h=t.props||u,g;if(n&&hr(n,!1),(g=h.onVnodeBeforeUpdate)&&Lr(g,n,t,e),f&&_n(t,e,n,`beforeUpdate`),n&&hr(n,!0),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(c,``),d?k(e.dynamicChildren,d,c,n,r,mr(t,i),o):s||ae(e,t,c,null,n,r,mr(t,i),o,!1),l>0){if(l&16)A(c,m,h,n,i);else if(l&2&&m.class!==h.class&&a(c,`class`,null,h.class,i),l&4&&a(c,`style`,m.style,h.style,i),l&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let r=e[t],o=m[r],s=h[r];(s!==o||r===`value`)&&a(c,r,o,s,i,n)}}l&1&&e.children!==t.children&&p(c,t.children)}else !s&&d==null&&A(c,m,h,n,i);((g=h.onVnodeUpdated)||f)&&X(()=>{g&&Lr(g,n,t,e),f&&_n(t,e,n,`updated`)},r)},k=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s];v(c,l,c.el&&(c.type===Z||!kr(c,l)||c.shapeFlag&198)?m(c.el):n,null,r,i,a,o,!0)}},A=(e,t,n,r,i)=>{if(t!==n){if(t!==u)for(let o in t)!re(o)&&!(o in n)&&a(e,o,t[o],null,i,r);for(let o in n){if(re(o))continue;let s=n[o],c=t[o];s!==c&&o!==`value`&&a(e,o,c,s,i,r)}`value`in n&&a(e,`value`,t.value,n.value,i)}},ee=(e,t,n,i,a,o,c,l,u)=>{let d=t.el=e?e.el:s(``),f=t.anchor=e?e.anchor:s(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(l=l?l.concat(h):h),e==null?(r(d,n,i),r(f,n,i),D(t.children||[],n,f,a,o,c,l,u)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(k(e.dynamicChildren,m,n,a,o,c,l),(t.key!=null||a&&t===a.subTree)&&_r(e,t,!0)):ae(e,t,n,f,a,o,c,l,u)},te=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):ne(t,n,r,i,a,o,c):j(e,t,c)},ne=(e,t,n,r,i,a,o)=>{let s=e.component=Rr(e,r,i);if(si(e)&&(s.ctx.renderer=ve),Br(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,ie,o),!e.el){let r=s.subTree=Zi(Gi);b(null,r,t,n),e.placeholder=r.el}}else ie(s,e,t,n,i,a,o)},j=(e,t,n)=>{let r=t.component=e.component;if(nr(e,t,n))if(r.asyncDep&&!r.asyncResolved){M(r,t,n);return}else r.next=t,r.update();else t.el=e.el,r.vnode=t},ie=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=yr(e);if(n){t&&(t.el=c.el,M(e,t,o)),n.asyncDep.then(()=>{X(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;hr(e,!1),t?(t.el=c.el,M(e,t,o)):t=c,n&&le(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&Lr(d,s,t,c),hr(e,!0);let f=tr(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),he(p),e,i,a),t.el=f.el,u===null&&ar(e,f.el),r&&X(r,i),(d=t.props&&t.props.onVnodeUpdated)&&X(()=>Lr(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=oi(t);if(hr(e,!1),l&&le(l),!m&&(o=c&&c.onVnodeBeforeMount)&&Lr(o,d,t),hr(e,!0),s&&be){let t=()=>{e.subTree=tr(e),be(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=tr(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&X(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;X(()=>Lr(o,d,e),i)}(t.shapeFlag&256||d&&oi(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&X(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new _t(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>cn(u),hr(e,!0),l()},M=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,sr(e,t.props,r,n),Hi(e,t.children,n),Pe(),dn(e),Fe()},ae=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){se(l,d,n,r,i,a,o,s,c);return}else if(f&256){oe(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&me(l,i,a),d!==l&&p(n,d)):u&16?m&16?se(l,d,n,r,i,a,o,s,c):me(l,i,a,!0):(u&8&&p(n,``),m&16&&D(d,n,r,i,a,o,s,c))},oe=(e,t,n,r,i,a,o,s,c)=>{e||=d,t||=d;let l=e.length,u=t.length,f=Math.min(l,u),p;for(p=0;p<f;p++){let r=t[p]=c?Pr(t[p]):K(t[p]);v(e[p],r,n,null,i,a,o,s,c)}l>u?me(e,i,a,!0,!1,f):D(t,n,r,i,a,o,s,c,f)},se=(e,t,n,r,i,a,o,s,c)=>{let l=0,u=t.length,f=e.length-1,p=u-1;for(;l<=f&&l<=p;){let r=e[l],u=t[l]=c?Pr(t[l]):K(t[l]);if(kr(r,u))v(r,u,n,null,i,a,o,s,c);else break;l++}for(;l<=f&&l<=p;){let r=e[f],l=t[p]=c?Pr(t[p]):K(t[p]);if(kr(r,l))v(r,l,n,null,i,a,o,s,c);else break;f--,p--}if(l>f){if(l<=p){let e=p+1,d=e<u?t[e].el:r;for(;l<=p;)v(null,t[l]=c?Pr(t[l]):K(t[l]),n,d,i,a,o,s,c),l++}}else if(l>p)for(;l<=f;)N(e[l],i,a,!0),l++;else{let m=l,h=l,g=new Map;for(l=h;l<=p;l++){let e=t[l]=c?Pr(t[l]):K(t[l]);e.key!=null&&g.set(e.key,l)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(l=0;l<b;l++)C[l]=0;for(l=m;l<=f;l++){let r=e[l];if(y>=b){N(r,i,a,!0);continue}let u;if(r.key!=null)u=g.get(r.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&kr(r,t[_])){u=_;break}u===void 0?N(r,i,a,!0):(C[u-h]=l+1,u>=S?S=u:x=!0,v(r,t[u],n,null,i,a,o,s,c),y++)}let w=x?vr(C):d;for(_=w.length-1,l=b-1;l>=0;l--){let e=h+l,d=t[e],f=t[e+1],p=e+1<u?f.el||xr(f):r;C[l]===0?v(null,d,n,p,i,a,o,s,c):x&&(_<0||l!==w[_]?ce(d,n,p,2):_--)}}},ce=(e,t,n,a,o=null)=>{let{el:s,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){ce(e.component.subTree,t,n,a);return}if(d&128){e.suspense.move(t,n,a);return}if(d&64){c.move(e,t,n,ve);return}if(c===Z){r(s,t,n);for(let e=0;e<u.length;e++)ce(u[e],t,n,a);r(e.anchor,t,n);return}if(c===Ki){S(e,t,n);return}if(a!==2&&d&1&&l)if(a===0)l.beforeEnter(s),r(s,t,n),X(()=>l.enter(s),o);else{let{leave:a,delayLeave:o,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?i(s):r(s,t,n)},d=()=>{s._isLeaving&&s[ii](!0),a(s,()=>{u(),c&&c()})};o?o(s,u,d):d()}else r(s,t,n)},N=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if(d===-2&&(i=!1),s!=null&&(Pe(),On(s,null,n,e,!0),Fe()),p!=null&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!oi(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&Lr(_,t,e),u&6)fe(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&_n(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,ve,r):l&&!l.hasOnce&&(a!==Z||d>0&&d&64)?me(l,t,n,!1,!0):(a===Z&&d&384||!i&&u&16)&&me(c,t,n),r&&ue(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&X(()=>{_&&Lr(_,t,e),h&&_n(e,null,t,`unmounted`),v&&(e.el=null)},n)},ue=e=>{let{type:t,el:n,anchor:r,transition:a}=e;if(t===Z){de(n,r);return}if(t===Ki){C(e);return}let o=()=>{i(n),a&&!a.persisted&&a.afterLeave&&a.afterLeave()};if(e.shapeFlag&1&&a&&!a.persisted){let{leave:t,delayLeave:r}=a,i=()=>t(n,o);r?r(e.el,o,i):i()}else o()},de=(e,t)=>{let n;for(;e!==t;)n=h(e),i(e),e=n;i(t)},fe=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;br(c),br(l),r&&le(r),i.stop(),a&&(a.flags|=8,N(o,e,t,n)),s&&X(s,t),X(()=>{e.isUnmounted=!0},t)},me=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)N(e[o],t,n,r,i)},he=e=>{if(e.shapeFlag&6)return he(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[ni];return n?h(n):t},ge=!1,_e=(e,t,n)=>{let r;e==null?t._vnode&&(N(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ge||=(ge=!0,dn(r),fn(),!1)},ve={p:v,um:N,m:ce,r:ue,mt:ne,mc:D,pc:ae,pbc:k,n:he,o:e},ye,be;return t&&([ye,be]=t(ve)),{render:_e,hydrate:ye,createApp:Zn(_e,ye)}}function mr({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function hr({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function gr(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function _r(e,t,n=!1){let r=e.children,i=t.children;if(b(r)&&b(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=Pr(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&_r(t,a)),a.type===Wi&&(a.patchFlag===-1&&(a=i[e]=Pr(a)),a.el=t.el),a.type===Gi&&!a.el&&(a.el=t.el)}}function vr(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-- >0;)n[a]=o,o=t[o];return n}function yr(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:yr(t)}function br(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function xr(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?xr(t.subTree):null}function Sr(e,t){t&&t.pendingBranch?b(e)?t.effects.push(...e):t.effects.push(e):un(e)}function Cr(e=!1){qi.push(Q=e?null:[])}function wr(){qi.pop(),Q=qi[qi.length-1]||null}function Tr(e,t=!1){Ji+=e,e<0&&Q&&t&&(Q.hasOnce=!0)}function Er(e){return e.dynamicChildren=Ji>0?Q||d:null,wr(),Ji>0&&Q&&Q.push(e),e}function Dr(e,t,n,r,i,a){return Er(G(e,t,n,r,i,a,!0))}function Or(e){return e?e.__v_isVNode===!0:!1}function kr(e,t){return e.type===t.type&&e.key===t.key}function G(e,t=null,n=null,r=0,i=null,a=e===Z?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Yi(t),ref:t&&Xi(t),scopeId:$r,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:Y};return s?(Fr(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=T(n)?8:16),Ji>0&&!o&&Q&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&Q.push(c),c}function Ar(e,t=null,n=null,i=0,o=null,s=!1){if((!e||e===vi)&&(e=Gi),Or(e)){let r=Mr(e,t,!0);return n&&Fr(r,n),Ji>0&&!s&&Q&&(r.shapeFlag&6?Q[Q.indexOf(e)]=r:Q.push(r)),r.patchFlag=-2,r}if(Kr(e)&&(e=e.__vccOpts),t){t=jr(t);let{class:e,style:n}=t;e&&!T(e)&&(t.class=a(e)),D(n)&&(at(n)&&!b(n)&&(n=g({},n)),t.style=r(n))}let c=T(e)?1:Ui(e)?128:ri(e)?64:D(e)?4:w(e)?2:0;return G(e,t,n,i,o,c,s,!0)}function jr(e){return e?at(e)||Ni(e)?g({},e):e:null}function Mr(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?Ir(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Yi(l),ref:t&&t.ref?n&&a?b(a)?a.concat(Xi(t)):[a,Xi(t)]:Xi(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Z?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Mr(e.ssContent),ssFallback:e.ssFallback&&Mr(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&wn(u,c.clone(u)),u}function Nr(e=` `,t=0){return Zi(Wi,null,e,t)}function K(e){return e==null||typeof e==`boolean`?Zi(Gi):b(e)?Zi(Z,null,e.slice()):Or(e)?Pr(e):Zi(Wi,null,String(e))}function Pr(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Mr(e)}function Fr(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(b(t))n=16;else if(typeof t==`object`)if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),Fr(e,n()),n._c&&(n._d=!0));return}else{n=32;let r=t._;!r&&!Ni(t)?t._ctx=Y:r===3&&Y&&(Y.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else w(t)?(t={default:t,_ctx:Y},n=32):(t=String(t),r&64?(n=16,t=[Nr(t)]):n=8);e.children=t,e.shapeFlag|=n}function Ir(...e){let t={};for(let n=0;n<e.length;n++){let i=e[n];for(let e in i)if(e===`class`)t.class!==i.class&&(t.class=a([t.class,i.class]));else if(e===`style`)t.style=r([t.style,i.style]);else if(m(e)){let n=t[e],r=i[e];r&&n!==r&&!(b(n)&&n.includes(r))?t[e]=n?[].concat(n,r):r:r==null&&n==null&&!h(e)&&(t[e]=r)}else e!==``&&(t[e]=i[e])}return t}function Lr(e,t,n,r=null){U(e,t,7,[n,r])}function Rr(e,t,n){let r=e.type,i=(t?t.appContext:e.appContext)||Qi,a={uid:$i++,vnode:e,type:r,parent:t,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new ht(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(i.provides),ids:t?t.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:ur(r,i),emitsOptions:$n(r,i),emit:null,emitted:null,propsDefaults:u,inheritAttrs:r.inheritAttrs,ctx:u,data:u,props:u,attrs:u,slots:u,refs:u,setupState:u,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=t?t.root:a,a.emit=Qn.bind(null,a),e.ce&&e.ce(a),a}function zr(e){return e.vnode.shapeFlag&4}function Br(e,t=!1,n=!1){t&&na(t);let{props:r,children:i}=e.vnode,a=zr(e);or(e,r,a,t),Vi(e,i,n||t);let o=a?Vr(e,t):void 0;return t&&na(!1),o}function Vr(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Si);let{setup:r}=n;if(r){Pe();let n=e.setupContext=r.length>1?Wr(e):null,i=ra(e),a=nn(r,e,0,[e.props,n]),o=O(a);if(Fe(),i(),(o||e.sp)&&!oi(e)&&En(e),o){if(a.then(ia,ia),t)return a.then(n=>{Hr(e,n,t)}).catch(t=>{rn(t,e,0)});e.asyncDep=a}else Hr(e,a,t)}else Ur(e,t)}function Hr(e,t,n){w(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:D(t)&&(e.setupState=ut(t)),Ur(e,n)}function Ur(e,t,n){let r=e.type;if(!e.render){if(!t&&oa&&!r.render){let t=r.template||Hn(e).template;if(t){let{isCustomElement:n,compilerOptions:i}=e.appContext.config,{delimiters:a,compilerOptions:o}=r;r.render=oa(t,g(g({isCustomElement:n,delimiters:a},i),o))}}e.render=r.render||f,sa&&sa(e)}{let t=ra(e);Pe();try{Rn(e)}finally{Fe(),t()}}}function Wr(e){return{attrs:new Proxy(e.attrs,ca),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function Gr(e){return e.exposed?e.exposeProxy||=new Proxy(ut(ot(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in bi)return bi[n](e)},has(e,t){return t in e||t in bi}}):e.proxy}function Kr(e){return w(e)&&`__vccOpts`in e}var q,J,qr,Jr,Yr,Xr,Zr,Qr,Y,$r,ei,ti,ni,ri,ii,ai,oi,si,ci,li,ui,di,fi,pi,mi,hi,gi,_i,vi,yi,bi,xi,Si,Ci,wi,Ti,Ei,Di,Oi,ki,Ai,ji,Mi,Ni,Pi,Fi,Ii,Li,Ri,zi,Bi,Vi,Hi,X,Ui,Z,Wi,Gi,Ki,qi,Q,Ji,Yi,Xi,Zi,Qi,$i,$,ea,ta,na,ra,ia,aa,oa,sa,ca,la,ua,da=e((()=>{tn(),Ce(),q=[],J=-1,qr=[],Jr=null,Yr=0,Xr=Promise.resolve(),Zr=null,Qr=e=>e.id==null?e.flags&2?-1:1/0:e.id,Y=null,$r=null,ei=Symbol.for(`v-scx`),ti=()=>yn(ei),ni=Symbol(`_vte`),ri=e=>e.__isTeleport,ii=Symbol(`_leaveCb`),ai=new WeakMap,pe().requestIdleCallback,pe().cancelIdleCallback,oi=e=>!!e.type.__asyncLoader,si=e=>e.type.__isKeepAlive,ci=e=>(t,n=$)=>{(!aa||e===`sp`)&&Pn(e,(...e)=>t(...e),n)},li=ci(`bm`),ui=ci(`m`),di=ci(`bu`),fi=ci(`u`),pi=ci(`bum`),mi=ci(`um`),hi=ci(`sp`),gi=ci(`rtg`),_i=ci(`rtc`),vi=Symbol.for(`v-ndc`),yi=e=>e?zr(e)?Gr(e):yi(e.parent):null,bi=g(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>yi(e.parent),$root:e=>yi(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Hn(e),$forceUpdate:e=>e.f||=()=>{cn(e.update)},$nextTick:e=>e.n||=on.bind(e.proxy),$watch:e=>Sn.bind(e)}),xi=(e,t)=>e!==u&&!e.__isScriptSetup&&y(e,t),Si={get({_:e},t){if(t===`__v_skip`)return!0;let{ctx:n,setupState:r,data:i,props:a,accessCache:o,type:s,appContext:c}=e;if(t[0]!==`$`){let e=o[t];if(e!==void 0)switch(e){case 1:return r[t];case 2:return i[t];case 4:return n[t];case 3:return a[t]}else if(xi(r,t))return o[t]=1,r[t];else if(i!==u&&y(i,t))return o[t]=2,i[t];else if(y(a,t))return o[t]=3,a[t];else if(n!==u&&y(n,t))return o[t]=4,n[t];else Ci&&(o[t]=0)}let l=bi[t],d,f;if(l)return t===`$attrs`&&P(e.attrs,`get`,``),l(e);if((d=s.__cssModules)&&(d=d[t]))return d;if(n!==u&&y(n,t))return o[t]=4,n[t];if(f=c.config.globalProperties,y(f,t))return f[t]},set({_:e},t,n){let{data:r,setupState:i,ctx:a}=e;return xi(i,t)?(i[t]=n,!0):r!==u&&y(r,t)?(r[t]=n,!0):y(e.props,t)||t[0]===`$`&&t.slice(1)in e?!1:(a[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:i,props:a,type:o}},s){let c;return!!(n[s]||e!==u&&s[0]!==`$`&&y(e,s)||xi(t,s)||y(a,s)||y(r,s)||y(bi,s)||y(i.config.globalProperties,s)||(c=o.__cssModules)&&c[s])},defineProperty(e,t,n){return n.get==null?y(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}},Ci=!0,wi={data:Wn,props:Jn,emits:Jn,methods:qn,computed:qn,beforeCreate:W,created:W,beforeMount:W,mounted:W,beforeUpdate:W,updated:W,beforeDestroy:W,beforeUnmount:W,destroyed:W,unmounted:W,activated:W,deactivated:W,errorCaptured:W,serverPrefetch:W,components:qn,directives:qn,watch:Yn,provide:Wn,inject:Gn},Ti=0,Ei=null,Di=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${M(t)}Modifiers`]||e[`${oe(t)}Modifiers`],Oi=new WeakMap,ki=e=>{let t;for(let n in e)(n===`class`||n===`style`||m(n))&&((t||={})[n]=e[n]);return t},Ai=(e,t)=>{let n={};for(let r in e)(!h(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n},ji={},Mi=()=>Object.create(ji),Ni=e=>Object.getPrototypeOf(e)===ji,Pi=new WeakMap,Fi=e=>e===`_`||e===`_ctx`||e===`$stable`,Ii=e=>b(e)?e.map(K):[K(e)],Li=(e,t,n)=>{if(t._n)return t;let r=hn((...e)=>Ii(t(...e)),n);return r._c=!1,r},Ri=(e,t,n)=>{let r=e._ctx;for(let n in e){if(Fi(n))continue;let i=e[n];if(w(i))t[n]=Li(n,i,r);else if(i!=null){let e=Ii(i);t[n]=()=>e}}},zi=(e,t)=>{let n=Ii(t);e.slots.default=()=>n},Bi=(e,t,n)=>{for(let r in t)(n||!Fi(r))&&(e[r]=t[r])},Vi=(e,t,n)=>{let r=e.slots=Mi();if(e.vnode.shapeFlag&32){let e=t._;e?(Bi(r,t,n),n&&ue(r,`_`,e,!0)):Ri(t,r)}else t&&zi(e,t)},Hi=(e,t,n)=>{let{vnode:r,slots:i}=e,a=!0,o=u;if(r.shapeFlag&32){let e=t._;e?n&&e===1?a=!1:Bi(i,t,n):(a=!t.$stable,Ri(t,i)),o=t}else t&&(zi(e,t),o={default:1});if(a)for(let e in i)!Fi(e)&&o[e]==null&&delete i[e]},X=Sr,Ui=e=>e.__isSuspense,Z=Symbol.for(`v-fgt`),Wi=Symbol.for(`v-txt`),Gi=Symbol.for(`v-cmt`),Ki=Symbol.for(`v-stc`),qi=[],Q=null,Ji=1,Yi=({key:e})=>e??null,Xi=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:T(e)||R(e)||w(e)?{i:Y,r:e,k:t,f:!!n}:e),Zi=Ar,Qi=Xn(),$i=0,$=null,ea=()=>$||Y;{let e=pe(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};ta=t(`__VUE_INSTANCE_SETTERS__`,e=>$=e),na=t(`__VUE_SSR_SETTERS__`,e=>aa=e)}ra=e=>{let t=$;return ta(e),e.scope.on(),()=>{e.scope.off(),ta(t)}},ia=()=>{$&&$.scope.off(),ta(null)},aa=!1,ca={get(e,t){return P(e,`get`,``),e[t]}},la=(e,t)=>dt(e,t,aa),ua=`3.5.32`}));function fa(e,t,n){let r=e[Ha];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}function pa(e,t,n){let r=e.style,i=T(n),a=!1;if(n&&!i){if(t)if(T(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??ma(r,t,``)}else for(let e in t)n[e]??ma(r,e,``);for(let e in n)e===`display`&&(a=!0),ma(r,e,n[e])}else if(i){if(t!==n){let e=r[Ga];e&&(n+=`;`+e),r.cssText=n,a=Ka.test(n)}}else t&&e.removeAttribute(`style`);Ua in e&&(e[Ua]=a?r.display:``,e[Wa]&&(r.display=`none`))}function ma(e,t,n){if(b(n))n.forEach(n=>ma(e,t,n));else if(n??=``,t.startsWith(`--`))e.setProperty(t,n);else{let r=ha(e,t);qa.test(n)?e.setProperty(oe(r),n.replace(qa,``),`important`):e[r]=n}}function ha(e,t){let n=Ya[t];if(n)return n;let r=M(t);if(r!==`filter`&&r in e)return Ya[t]=r;r=se(r);for(let n=0;n<Ja.length;n++){let i=Ja[n]+r;if(i in e)return Ya[t]=i}return t}function ga(e,t,n,r,i,a=ve(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(Xa,t.slice(6,t.length)):e.setAttributeNS(Xa,t,n):n==null||a&&!o(n)?e.removeAttribute(t):e.setAttribute(t,a?``:E(n)?String(n):n)}function _a(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?Ia(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let s=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=o(n):n==null&&r===`string`?(n=``,s=!0):r===`number`&&(n=0,s=!0)}try{e[t]=n}catch{}s&&e.removeAttribute(i||t)}function va(e,t,n,r){e.addEventListener(t,n,r)}function ya(e,t,n,r){e.removeEventListener(t,n,r)}function ba(e,t,n,r,i=null){let a=e[Za]||(e[Za]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=xa(t);r?va(e,n,a[t]=Sa(r,i),s):o&&(ya(e,n,o,s),a[t]=void 0)}}function xa(e){let t;if(Qa.test(e)){t={};let n;for(;n=e.match(Qa);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[e[2]===`:`?e.slice(3):oe(e.slice(2)),t]}function Sa(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;U(Ca(e,n.value),t,5,[e])};return n.value=e,n.attached=to(),n}function Ca(e,t){if(b(t)){let n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(e=>t=>!t._stopped&&e&&e(t))}else return t}function wa(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&no(t)&&w(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return no(t)&&T(n)?!1:t in e}function Ta(e,t){let n=e._def.props;if(!n)return!1;let r=M(t);return Array.isArray(n)?n.some(e=>M(e)===r):Object.keys(n).some(e=>M(e)===r)}function Ea(e){e.target.composing=!0}function Da(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event(`input`)))}function Oa(e,t,n){return t&&(e=e.trim()),n&&(e=de(e)),e}function ka(e,t){let n=e.multiple,r=b(t);if(!(n&&!r&&!S(t))){for(let i=0,a=e.options.length;i<a;i++){let a=e.options[i],o=Aa(a);if(n)if(r){let e=typeof o;e===`string`||e===`number`?a.selected=t.some(e=>String(e)===String(o)):a.selected=l(t,o)>-1}else a.selected=t.has(o);else if(c(Aa(a),t)){e.selectedIndex!==i&&(e.selectedIndex=i);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Aa(e){return`_value`in e?e._value:e.value}function ja(){return lo||=fr(co)}function Ma(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function Na(e){return T(e)?document.querySelector(e):e}var Pa,Fa,Ia,La,Ra,za,Ba,Va,Ha,Ua,Wa,Ga,Ka,qa,Ja,Ya,Xa,Za,Qa,$a,eo,to,no,ro,io,ao,oo,so,co,lo,uo,fo=e((()=>{if(da(),da(),Ce(),Pa=void 0,Fa=typeof window<`u`&&window.trustedTypes,Fa)try{Pa=Fa.createPolicy(`vue`,{createHTML:e=>e})}catch{}Ia=Pa?e=>Pa.createHTML(e):e=>e,La=`http://www.w3.org/2000/svg`,Ra=`http://www.w3.org/1998/Math/MathML`,za=typeof document<`u`?document:null,Ba=za&&za.createElement(`template`),Va={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?za.createElementNS(La,e):t===`mathml`?za.createElementNS(Ra,e):n?za.createElement(e,{is:n}):za.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>za.createTextNode(e),createComment:e=>za.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>za.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===a||!(i=i.nextSibling)););else{Ba.innerHTML=Ia(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=Ba.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Ha=Symbol(`_vtc`),Ua=Symbol(`_vod`),Wa=Symbol(`_vsh`),Ga=Symbol(``),Ka=/(?:^|;)\s*display\s*:/,qa=/\s*!important$/,Ja=[`Webkit`,`Moz`,`ms`],Ya={},Xa=`http://www.w3.org/1999/xlink`,Za=Symbol(`_vei`),Qa=/(?:Once|Passive|Capture)$/,$a=0,eo=Promise.resolve(),to=()=>$a||=(eo.then(()=>$a=0),Date.now()),no=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,ro=(e,t,n,r,i,a)=>{let o=i===`svg`;t===`class`?fa(e,r,o):t===`style`?pa(e,n,r):m(t)?h(t)||ba(e,t,n,r,a):(t[0]===`.`?(t=t.slice(1),!0):t[0]===`^`?(t=t.slice(1),!1):wa(e,t,r,o))?(_a(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&ga(e,t,r,o,a,t!==`value`)):e._isVueCE&&(Ta(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!T(r)))?_a(e,M(t),r,a,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),ga(e,t,r,o))},io=e=>{let t=e.props[`onUpdate:modelValue`]||!1;return b(t)?e=>le(t,e):t},ao=Symbol(`_assign`),oo={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e[ao]=io(i);let a=r||i.props&&i.props.type===`number`;va(e,t?`change`:`input`,t=>{t.target.composing||e[ao](Oa(e.value,n,a))}),(n||a)&&va(e,`change`,()=>{e.value=Oa(e.value,n,a)}),t||(va(e,`compositionstart`,Ea),va(e,`compositionend`,Da),va(e,`change`,Da))},mounted(e,{value:t}){e.value=t??``},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:a}},o){if(e[ao]=io(o),e.composing)return;let s=(a||e.type===`number`)&&!/^0\d/.test(e.value)?de(e.value):e.value,c=t??``;if(s===c)return;let l=e.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===e&&e.type!==`range`&&(r&&t===n||i&&e.value.trim()===c)||(e.value=c)}},so={deep:!0,created(e,{value:t,modifiers:{number:n}},r){let i=S(t);va(e,`change`,()=>{let t=Array.prototype.filter.call(e.options,e=>e.selected).map(e=>n?de(Aa(e)):Aa(e));e[ao](e.multiple?i?new Set(t):t:t[0]),e._assigning=!0,on(()=>{e._assigning=!1})}),e[ao]=io(r)},mounted(e,{value:t}){ka(e,t)},beforeUpdate(e,t,n){e[ao]=io(n)},updated(e,{value:t}){e._assigning||ka(e,t)}},co=g({patchProp:ro},Va),uo=((...e)=>{let t=ja().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=Na(e);if(!r)return;let i=t._component;!w(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,Ma(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t})})),po=e((()=>{fo()}));function mo(e){return/[.*+?^${}()|[\]\\]/.test(e)?`\\`+e:e}var ho,go,_o,vo,yo,bo,xo=e((()=>{ho={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3},go=class{constructor(){this.comment=``,this.numChars=0,this.options={}}},_o=`1Row.3-D.3D Diagonal.3D-ASCII.3x5.4Max.5 Line Oblique.AMC 3 Line.AMC 3 Liv1.AMC AAA01.AMC Neko.AMC Razor.AMC Razor2.AMC Slash.AMC Slider.AMC Thin.AMC Tubes.AMC Untitled.ANSI Compact.ANSI Regular.ANSI Shadow.ASCII 12.ASCII 9.ASCII New Roman.Acrobatic.Alligator.Alligator2.Alpha.Alphabet.Arrows.Avatar.B1FF.Babyface Lame.Babyface Leet.Banner.Banner3-D.Banner3.Banner4.Barbwire.Basic.Bear.Bell.Benjamin.Big ASCII 12.Big ASCII 9.Big Chief.Big Money-ne.Big Money-nw.Big Money-se.Big Money-sw.Big Mono 12.Big Mono 9.Big.Bigfig.Binary.Block.Blocks.Bloody.BlurVision ASCII.Bolger.Braced.Bright.Broadway KB.Broadway.Bubble.Bulbhead.Caligraphy.Caligraphy2.Calvin S.Cards.Catwalk.Chiseled.Chunky.Circle.Classy.Coder Mini.Coinstak.Cola.Colossal.Computer.Contessa.Contrast.Cosmike.Cosmike2.Crawford.Crawford2.Crazy.Cricket.Cursive.Cyberlarge.Cybermedium.Cybersmall.Cygnet.DANC4.DOS Rebel.DWhistled.Dancing Font.Decimal.Def Leppard.Delta Corps Priest 1.DiamFont.Diamond.Diet Cola.Digital.Doh.Doom.Dot Matrix.Double Shorts.Double.Dr Pepper.Efti Chess.Efti Font.Efti Italic.Efti Piti.Efti Robot.Efti Wall.Efti Water.Electronic.Elite.Emboss 2.Emboss.Epic.Fender.Filter.Fire Font-k.Fire Font-s.Flipped.Flower Power.Font Font.Four Tops.Fraktur.Fun Face.Fun Faces.Future Smooth.Future Thin.Future.Fuzzy.Georgi16.Georgia11.Ghost.Ghoulish.Glenyn.Goofy.Gothic.Graceful.Gradient.Graffiti.Greek.Heart Left.Heart Right.Henry 3D.Hex.Hieroglyphs.Hollywood.Horizontal Left.Horizontal Right.ICL-1900.Impossible.Invita.Isometric1.Isometric2.Isometric3.Isometric4.Italic.Ivrit.JS Block Letters.JS Bracket Letters.JS Capital Curves.JS Cursive.JS Stick Letters.Jacky.Jazmine.Jerusalem.Katakana.Kban.Keyboard.Knob.Konto Slant.Konto.LCD.Larry 3D 2.Larry 3D.Lean.Letter.Letters.Lil Devil.Line Blocks.Linux.Lockergnome.Madrid.Marquee.Maxfour.Merlin1.Merlin2.Mike.Mini.Mirror.Mnemonic.Modular.Mono 12.Mono 9.Morse.Morse2.Moscow.Mshebrew210.Muzzle.NScript.NT Greek.NV Script.Nancyj-Fancy.Nancyj-Improved.Nancyj-Underlined.Nancyj.Nipples.O8.OS2.Octal.Ogre.Old Banner.Pagga.Patorjk's Cheese.Patorjk-HeX.Pawp.Peaks Slant.Peaks.Pebbles.Pepper.Poison.Puffy.Puzzle.Pyramid.Rammstein.Rebel.Rectangles.Red Phoenix.Relief.Relief2.Reverse.Roman.Rot13.Rotated.Rounded.Rowan Cap.Rozzo.RubiFont.Runic.Runyc.S Blood.SL Script.Santa Clara.Script.Serifcap.Shaded Blocky.Shadow.Shimrod.Short.Slant Relief.Slant.Slide.Small ASCII 12.Small ASCII 9.Small Block.Small Braille.Small Caps.Small Isometric1.Small Keyboard.Small Mono 12.Small Mono 9.Small Poison.Small Script.Small Shadow.Small Slant.Small Tengwar.Small.Soft.Speed.Spliff.Stacey.Stampate.Stampatello.Standard.Star Strips.Star Wars.Stellar.Stforek.Stick Letters.Stop.Straight.Stronger Than All.Sub-Zero.Swamp Land.Swan.Sweet.THIS.Tanja.Tengwar.Term.Terrace.Test1.The Edge.Thick.Thin.Thorned.Three Point.Ticks Slant.Ticks.Tiles.Tinker-Toy.Tmplr.Tombstone.Train.Trek.Tsalagi.Tubular.Twisted.Two Point.USA Flag.Univers.Upside Down Text.Varsity.Wavescape.Wavy.Weird.Wet Letter.Whimsy.WideTerm.Wow.miniwi`.split(`.`),vo={"ANSI-Compact":`ANSI Compact`},yo=e=>vo[e]?vo[e]:e,bo=(()=>{let{FULL_WIDTH:e=0,FITTING:t,SMUSHING:n,CONTROLLED_SMUSHING:r}=ho,i={},a={font:`Standard`,fontPath:`./fonts`,fetchFontIfMissing:!0};function o(e,t,n){let r=mo(e.trim().slice(-1))||`@`,i=t===n-1?RegExp(r+r+`?\\s*$`):RegExp(r+`\\s*$`);return e.replace(i,``)}function s(i=-1,a=null){let o={},s,c=[[16384,`vLayout`,n],[8192,`vLayout`,t],[4096,`vRule5`,!0],[2048,`vRule4`,!0],[1024,`vRule3`,!0],[512,`vRule2`,!0],[256,`vRule1`,!0],[128,`hLayout`,n],[64,`hLayout`,t],[32,`hRule6`,!0],[16,`hRule5`,!0],[8,`hRule4`,!0],[4,`hRule3`,!0],[2,`hRule2`,!0],[1,`hRule1`,!0]];s=a===null?i:a;for(let[e,t,n]of c)s>=e?(s-=e,o[t]===void 0&&(o[t]=n)):t!==`vLayout`&&t!==`hLayout`&&(o[t]=!1);return o.hLayout===void 0?i===0?o.hLayout=t:i===-1?o.hLayout=e:o.hRule1||o.hRule2||o.hRule3||o.hRule4||o.hRule5||o.hRule6?o.hLayout=r:o.hLayout=n:o.hLayout===n&&(o.hRule1||o.hRule2||o.hRule3||o.hRule4||o.hRule5||o.hRule6)&&(o.hLayout=r),o.vLayout===void 0?o.vRule1||o.vRule2||o.vRule3||o.vRule4||o.vRule5?o.vLayout=r:o.vLayout=e:o.vLayout===n&&(o.vRule1||o.vRule2||o.vRule3||o.vRule4||o.vRule5)&&(o.vLayout=r),o}function c(e,t,n=``){return e===t&&e!==n?e:!1}function l(e,t){let n=`|/\\[]{}()<>`;if(e===`_`){if(n.indexOf(t)!==-1)return t}else if(t===`_`&&n.indexOf(e)!==-1)return e;return!1}function u(e,t){let n=`| /\\ [] {} () <>`,r=n.indexOf(e),i=n.indexOf(t);if(r!==-1&&i!==-1&&r!==i&&Math.abs(r-i)!==1){let e=Math.max(r,i),t=e+1;return n.substring(e,t)}return!1}function d(e,t){let n=`[] {} ()`,r=n.indexOf(e),i=n.indexOf(t);return r!==-1&&i!==-1&&Math.abs(r-i)<=1?`|`:!1}function f(e,t){return{"/\\":`|`,"\\/":`Y`,"><":`X`}[e+t]||!1}function p(e,t,n=``){return e===n&&t===n?n:!1}function m(e,t){return e===t?e:!1}function h(e,t){return l(e,t)}function g(e,t){return u(e,t)}function _(e,t){return e===`-`&&t===`_`||e===`_`&&t===`-`?`=`:!1}function v(e,t){return e===`|`&&t===`|`?`|`:!1}function y(e,t,n){return t===` `||t===``||t===n&&e!==` `?e:t}function b(r,i,a){if(a.fittingRules&&a.fittingRules.vLayout===e)return`invalid`;let o,s=Math.min(r.length,i.length),c,l,u=!1,d;if(s===0)return`invalid`;for(o=0;o<s;o++)if(c=r.substring(o,o+1),l=i.substring(o,o+1),c!==` `&&l!==` `){if(a.fittingRules&&a.fittingRules.vLayout===t)return`invalid`;if(a.fittingRules&&a.fittingRules.vLayout===n)return`end`;if(v(c,l)){u||=!1;continue}if(d=!1,d=a.fittingRules&&a.fittingRules.vRule1?m(c,l):d,d=!d&&a.fittingRules&&a.fittingRules.vRule2?h(c,l):d,d=!d&&a.fittingRules&&a.fittingRules.vRule3?g(c,l):d,d=!d&&a.fittingRules&&a.fittingRules.vRule4?_(c,l):d,u=!0,!d)return`invalid`}return u?`end`:`valid`}function x(e,t,n){let r=e.length,i=e.length,a,o,s,c=1,l,u,d;for(;c<=r;){for(a=e.slice(Math.max(0,i-c),i),o=t.slice(0,Math.min(r,c)),s=o.length,d=``,l=0;l<s;l++)if(u=b(a[l],o[l],n),u===`end`)d=u;else if(u===`invalid`){d=u;break}else d===``&&(d=`valid`);if(d===`invalid`){c--;break}if(d===`end`)break;d===`valid`&&c++}return Math.min(r,c)}function S(e,r,i){let a,o=Math.min(e.length,r.length),s,c,l=``,u,d=i.fittingRules||{};for(a=0;a<o;a++)s=e.substring(a,a+1),c=r.substring(a,a+1),s!==` `&&c!==` `?d.vLayout===t||d.vLayout===n?l+=y(s,c):(u=!1,u=d.vRule5?v(s,c):u,u=!u&&d.vRule1?m(s,c):u,u=!u&&d.vRule2?h(s,c):u,u=!u&&d.vRule3?g(s,c):u,u=!u&&d.vRule4?_(s,c):u,l+=u):l+=y(s,c);return l}function C(e,t,n,r){let i=e.length,a=t.length,o=e.slice(0,Math.max(0,i-n)),s=e.slice(Math.max(0,i-n),i),c=t.slice(0,Math.min(n,a)),l,u,d,f=[],p;for(u=s.length,l=0;l<u;l++)d=l>=a?s[l]:S(s[l],c[l],r),f.push(d);return p=t.slice(Math.min(n,a),a),[...o,...f,...p]}function w(e,t){let n=` `.repeat(t);return e.map(e=>e+n)}function T(e,t,n){let r=e[0].length,i=t[0].length,a;return r>i?t=w(t,r-i):i>r&&(e=w(e,i-r)),a=x(e,t,n),C(e,t,a,n)}function E(r,i,a){let o=a.fittingRules||{};if(o.hLayout===e)return 0;let s,m=r.length,h=i.length,g=m,_=1,v=!1,y,b,x,S;if(m===0)return 0;distCal:for(;_<=g;){let e=m-_;for(y=r.substring(e,e+_),b=i.substring(0,Math.min(_,h)),s=0;s<Math.min(_,h);s++)if(x=y.substring(s,s+1),S=b.substring(s,s+1),x!==` `&&S!==` `){if(o.hLayout===t){--_;break distCal}else if(o.hLayout===n){(x===a.hardBlank||S===a.hardBlank)&&--_;break distCal}else if(v=!0,!(o.hRule1&&c(x,S,a.hardBlank)||o.hRule2&&l(x,S)||o.hRule3&&u(x,S)||o.hRule4&&d(x,S)||o.hRule5&&f(x,S)||o.hRule6&&p(x,S,a.hardBlank))){--_;break distCal}}if(v)break;_++}return Math.min(g,_)}function D(e,r,i,a){let o,s,m=[],h,g,_,v,b,x,S,C,w=a.fittingRules||{};if(typeof a.height!=`number`)throw Error(`height is not defined.`);for(o=0;o<a.height;o++){S=e[o],C=r[o],b=S.length,x=C.length,h=b-i,g=S.slice(0,Math.max(0,h)),_=``;let T=Math.max(0,b-i),E=S.substring(T,T+i),D=C.substring(0,Math.min(i,x));for(s=0;s<i;s++){let e=s<b?E.substring(s,s+1):` `,r=s<x?D.substring(s,s+1):` `;if(e!==` `&&r!==` `)if(w.hLayout===t||w.hLayout===n)_+=y(e,r,a.hardBlank);else{let t=w.hRule1&&c(e,r,a.hardBlank)||w.hRule2&&l(e,r)||w.hRule3&&u(e,r)||w.hRule4&&d(e,r)||w.hRule5&&f(e,r)||w.hRule6&&p(e,r,a.hardBlank)||y(e,r,a.hardBlank);_+=t}else _+=y(e,r,a.hardBlank)}v=i>=x?``:C.substring(i,i+Math.max(0,x-i)),m[o]=g+_+v}return m}function O(e){return Array(e).fill(``)}let k=function(e){return Math.max(...e.map(e=>e.length))};function A(e,t,n){return e.reduce(function(e,t){return D(e,t.fig,t.overlap||0,n)},O(t))}function ee(e,t,n){for(let r=e.length-1;r>0;r--){let i=A(e.slice(0,r),t,n);if(k(i)<=n.width)return{outputFigText:i,chars:e.slice(r)}}return{outputFigText:O(t),chars:e}}function te(t,n,r){let i,a,o=0,s,c,l,u=r.height,d=[],f,p={chars:[],overlap:o},m=[],h,g,_,v,y;if(typeof u!=`number`)throw Error(`height is not defined.`);c=O(u);let b=r.fittingRules||{};for(r.printDirection===1&&(t=t.split(``).reverse().join(``)),l=t.length,i=0;i<l;i++)if(h=t.substring(i,i+1),g=h.match(/\s/),a=n[h.charCodeAt(0)],v=null,a){if(b.hLayout!==e){for(o=1e4,s=0;s<u;s++)o=Math.min(o,E(c[s],a[s],r));o=o===1e4?0:o}if(r.width>0&&(r.whitespaceBreak?(_=A(p.chars.concat([{fig:a,overlap:o}]),u,r),v=A(m.concat([{fig:_,overlap:p.overlap}]),u,r),f=k(v)):(v=D(c,a,o,r),f=k(v)),f>=r.width&&i>0&&(r.whitespaceBreak?(c=A(m.slice(0,-1),u,r),m.length>1&&(d.push(c),c=O(u)),m=[]):(d.push(c),c=O(u)))),r.width>0&&r.whitespaceBreak&&((!g||i===l-1)&&p.chars.push({fig:a,overlap:o}),g||i===l-1)){for(y=null;v=A(p.chars,u,r),f=k(v),f>=r.width;)y=ee(p.chars,u,r),p={chars:y.chars},d.push(y.outputFigText);f>0&&(y?m.push({fig:v,overlap:1}):m.push({fig:v,overlap:p.overlap})),g&&(m.push({fig:a,overlap:o}),c=O(u)),i===l-1&&(c=A(m,u,r)),p={chars:[],overlap:o};continue}c=D(c,a,o,r)}return k(c)>0&&d.push(c),r.showHardBlanks||d.forEach(function(e){for(l=e.length,s=0;s<l;s++)e[s]=e[s].replace(RegExp(`\\`+r.hardBlank,`g`),` `)}),t===``&&d.length===0&&d.push(Array(u).fill(``)),d}let ne=function(i,a){let o,s=a.fittingRules||{};if(i===`default`)o={hLayout:s.hLayout,hRule1:s.hRule1,hRule2:s.hRule2,hRule3:s.hRule3,hRule4:s.hRule4,hRule5:s.hRule5,hRule6:s.hRule6};else if(i===`full`)o={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(i===`fitted`)o={hLayout:t,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(i===`controlled smushing`)o={hLayout:r,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(i===`universal smushing`)o={hLayout:n,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return o},re=function(i,a){let o={},s=a.fittingRules||{};if(i===`default`)o={vLayout:s.vLayout,vRule1:s.vRule1,vRule2:s.vRule2,vRule3:s.vRule3,vRule4:s.vRule4,vRule5:s.vRule5};else if(i===`full`)o={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(i===`fitted`)o={vLayout:t,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(i===`controlled smushing`)o={vLayout:r,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(i===`universal smushing`)o={vLayout:n,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return o},j=function(e,t,n){n=n.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let r=yo(e),a=n.split(`
`),o=[],s,c,l;for(c=a.length,s=0;s<c;s++)o=o.concat(te(a[s],i[r],t));for(c=o.length,l=o[0],s=1;s<c;s++)l=T(l,o[s],t);return l?l.join(`
`):``};function ie(e,t){let n;if(n=typeof structuredClone<`u`?structuredClone(e):JSON.parse(JSON.stringify(e)),n.showHardBlanks=t.showHardBlanks||!1,n.width=t.width||-1,n.whitespaceBreak=t.whitespaceBreak||!1,t.horizontalLayout){let r=ne(t.horizontalLayout,e);r&&Object.assign(n.fittingRules,r)}if(t.verticalLayout){let r=re(t.verticalLayout,e);r&&Object.assign(n.fittingRules,r)}return n.printDirection=t.printDirection!==null&&t.printDirection!==void 0?t.printDirection:e.printDirection,n}let M=async function(e,t,n){return M.text(e,t,n)};return M.text=async function(e,t,n){e+=``;let r,i;typeof t==`function`?(i=t,r={font:a.font}):typeof t==`string`?(r={font:t},i=n):t?(r=t,i=n):(r={font:a.font},i=n);let o=r.font||a.font;try{let t=await M.loadFont(o),n=t?j(o,ie(t,r),e):``;return i&&i(null,n),n}catch(e){let t=e instanceof Error?e:Error(String(e));if(i)return i(t),``;throw t}},M.textSync=function(e,t){e+=``,typeof t==`string`?t={font:t}:t||={};let n=t.font||a.font;return j(n,ie(M.loadFontSync(n),t),e)},M.metadata=async function(e,t){e+=``;try{let n=await M.loadFont(e);if(!n)throw Error(`Error loading font.`);let r=i[yo(e)]||{},a=[n,r.comment||``];return t&&t(null,n,r.comment),a}catch(e){let n=e instanceof Error?e:Error(String(e));if(t)return t(n),null;throw n}},M.defaults=function(e){return e&&typeof e==`object`&&Object.assign(a,e),typeof structuredClone<`u`?structuredClone(a):JSON.parse(JSON.stringify(a))},M.parseFont=function(e,t,n=!0){if(i[e]&&!n)return i[e].options;t=t.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let r=new go,a=t.split(`
`),c=a.shift();if(!c)throw Error(`Invalid font file: missing header`);let l=c.split(` `),u={hardBlank:l[0].substring(5,6),height:parseInt(l[1],10),baseline:parseInt(l[2],10),maxLength:parseInt(l[3],10),oldLayout:parseInt(l[4],10),numCommentLines:parseInt(l[5],10),printDirection:l[6]?parseInt(l[6],10):0,fullLayout:l[7]?parseInt(l[7],10):null,codeTagCount:l[8]?parseInt(l[8],10):null};if((u.hardBlank||``).length!==1||[u.height,u.baseline,u.maxLength,u.oldLayout,u.numCommentLines].some(e=>e==null||isNaN(e))||u.height==null||u.numCommentLines==null)throw Error(`FIGlet header contains invalid values.`);u.fittingRules=s(u.oldLayout,u.fullLayout),r.options=u;let d=[];for(let e=32;e<=126;e++)d.push(e);if(d.push(196,214,220,228,246,252,223),a.length<u.numCommentLines+u.height*d.length)throw Error(`FIGlet file is missing data. Line length: ${a.length}. Comment lines: ${u.numCommentLines}. Height: ${u.height}. Num chars: ${d.length}.`);for(r.comment=a.splice(0,u.numCommentLines).join(`
`),r.numChars=0;a.length>0&&r.numChars<d.length;){let e=d[r.numChars];r[e]=a.splice(0,u.height);for(let t=0;t<u.height;t++)r[e][t]===void 0?r[e][t]=``:r[e][t]=o(r[e][t],t,u.height);r.numChars++}for(;a.length>0;){let e=a.shift();if(!e||e.trim()===``)break;let t=e.split(` `)[0],n;if(/^-?0[xX][0-9a-fA-F]+$/.test(t))n=parseInt(t,16);else if(/^-?0[0-7]+$/.test(t))n=parseInt(t,8);else if(/^-?[0-9]+$/.test(t))n=parseInt(t,10);else throw Error(`Error parsing data. Invalid data: ${t}`);if(n===-1||n<-2147483648||n>2147483647)throw Error(`Error parsing data. ${n===-1?`The char code -1 is not permitted.`:`The char code cannot be ${n<-2147483648?`less than -2147483648`:`greater than 2147483647`}.`}`);r[n]=a.splice(0,u.height);for(let e=0;e<u.height;e++)r[n][e]===void 0?r[n][e]=``:r[n][e]=o(r[n][e],e,u.height);r.numChars++}return i[e]=r,u},M.loadedFonts=()=>Object.keys(i),M.clearLoadedFonts=()=>{Object.keys(i).forEach(e=>{delete i[e]})},M.loadFont=async function(e,t){let n=yo(e);if(i[n]){let e=i[n].options;return t&&t(null,e),Promise.resolve(e)}try{if(!a.fetchFontIfMissing)throw Error(`Font is not loaded: ${n}`);let e=await fetch(`${a.fontPath}/${n}.flf`);if(!e.ok)throw Error(`Network response was not ok: ${e.status}`);let r=await e.text(),i=M.parseFont(n,r);return t&&t(null,i),i}catch(e){let n=e instanceof Error?e:Error(String(e));if(t)return t(n),null;throw n}},M.loadFontSync=function(e){let t=yo(e);if(i[t])return i[t].options;throw Error(`Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.`)},M.preloadFonts=async function(e,t){try{for(let t of e){let e=yo(t),n=await fetch(`${a.fontPath}/${e}.flf`);if(!n.ok)throw Error(`Failed to preload fonts. Error fetching font: ${e}, status code: ${n.statusText}`);let r=await n.text();M.parseFont(e,r)}t&&t()}catch(e){let n=e instanceof Error?e:Error(String(e));if(t){t(n);return}throw e}},M.fonts=function(e){return new Promise(function(t,n){t(_o),e&&e(null,_o)})},M.fontsSync=function(){return _o},M.figFonts=i,M})()})),So=e((()=>{xo()})),Co,wo=e((()=>{Co=`flf2a$ 6 5 16 15 13 0 24463 229
Standard by Glenn Chappell & Ian Chai 3/93 -- based on Frank's .sig
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Modified for figlet 2.2 by John Cowan <cowan@ccil.org>
  to add Latin-{2,3,4,5} support (Unicode U+0100-017F).
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

Font modified May 20, 2012 by patorjk to add the 0xCA0 character
 $@
 $@
 $@
 $@
 $@
 $@@
  _ @
 | |@
 | |@
 |_|@
 (_)@
    @@
  _ _ @
 ( | )@
  V V @
   $  @
   $  @
      @@
    _  _   @
  _| || |_ @
 |_  ..  _|@
 |_      _|@
   |_||_|  @
           @@
   _  @
  | | @
 / __)@
 \\__ \\@
 (   /@
  |_| @@
  _  __@
 (_)/ /@
   / / @
  / /_ @
 /_/(_)@
       @@
   ___   @
  ( _ )  @
  / _ \\/\\@
 | (_>  <@
  \\___/\\/@
         @@
  _ @
 ( )@
 |/ @
  $ @
  $ @
    @@
   __@
  / /@
 | | @
 | | @
 | | @
  \\_\\@@
 __  @
 \\ \\ @
  | |@
  | |@
  | |@
 /_/ @@
       @
 __/\\__@
 \\    /@
 /_  _\\@
   \\/  @
       @@
        @
    _   @
  _| |_ @
 |_   _|@
   |_|  @
        @@
    @
    @
    @
  _ @
 ( )@
 |/ @@
        @
        @
  _____ @
 |_____|@
    $   @
        @@
    @
    @
    @
  _ @
 (_)@
    @@
     __@
    / /@
   / / @
  / /  @
 /_/   @
       @@
   ___  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
  _ @
 / |@
 | |@
 | |@
 |_|@
    @@
  ____  @
 |___ \\ @
   __) |@
  / __/ @
 |_____|@
        @@
  _____ @
 |___ / @
   |_ \\ @
  ___) |@
 |____/ @
        @@
  _  _   @
 | || |  @
 | || |_ @
 |__   _|@
    |_|  @
         @@
  ____  @
 | ___| @
 |___ \\ @
  ___) |@
 |____/ @
        @@
   __   @
  / /_  @
 | '_ \\ @
 | (_) |@
  \\___/ @
        @@
  _____ @
 |___  |@
    / / @
   / /  @
  /_/   @
        @@
   ___  @
  ( _ ) @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
   ___  @
  / _ \\ @
 | (_) |@
  \\__, |@
    /_/ @
        @@
    @
  _ @
 (_)@
  _ @
 (_)@
    @@
    @
  _ @
 (_)@
  _ @
 ( )@
 |/ @@
   __@
  / /@
 / / @
 \\ \\ @
  \\_\\@
     @@
        @
  _____ @
 |_____|@
 |_____|@
    $   @
        @@
 __  @
 \\ \\ @
  \\ \\@
  / /@
 /_/ @
     @@
  ___ @
 |__ \\@
   / /@
  |_| @
  (_) @
      @@
    ____  @
   / __ \\ @
  / / _\` |@
 | | (_| |@
  \\ \\__,_|@
   \\____/ @@
     _    @
    / \\   @
   / _ \\  @
  / ___ \\ @
 /_/   \\_\\@
          @@
  ____  @
 | __ ) @
 |  _ \\ @
 | |_) |@
 |____/ @
        @@
   ____ @
  / ___|@
 | |    @
 | |___ @
  \\____|@
        @@
  ____  @
 |  _ \\ @
 | | | |@
 | |_| |@
 |____/ @
        @@
  _____ @
 | ____|@
 |  _|  @
 | |___ @
 |_____|@
        @@
  _____ @
 |  ___|@
 | |_   @
 |  _|  @
 |_|    @
        @@
   ____ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
  _   _ @
 | | | |@
 | |_| |@
 |  _  |@
 |_| |_|@
        @@
  ___ @
 |_ _|@
  | | @
  | | @
 |___|@
      @@
      _ @
     | |@
  _  | |@
 | |_| |@
  \\___/ @
        @@
  _  __@
 | |/ /@
 | ' / @
 | . \\ @
 |_|\\_\\@
       @@
  _     @
 | |    @
 | |    @
 | |___ @
 |_____|@
        @@
  __  __ @
 |  \\/  |@
 | |\\/| |@
 | |  | |@
 |_|  |_|@
         @@
  _   _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
        @@
   ___  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
  ____  @
 |  _ \\ @
 | |_) |@
 |  __/ @
 |_|    @
        @@
   ___  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\__\\_\\@
        @@
  ____  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
        @@
  ____  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
  _____ @
 |_   _|@
   | |  @
   | |  @
   |_|  @
        @@
  _   _ @
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
        @@
 __     __@
 \\ \\   / /@
  \\ \\ / / @
   \\ V /  @
    \\_/   @
          @@
 __        __@
 \\ \\      / /@
  \\ \\ /\\ / / @
   \\ V  V /  @
    \\_/\\_/   @
             @@
 __  __@
 \\ \\/ /@
  \\  / @
  /  \\ @
 /_/\\_\\@
       @@
 __   __@
 \\ \\ / /@
  \\ V / @
   | |  @
   |_|  @
        @@
  _____@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
  __ @
 | _|@
 | | @
 | | @
 | | @
 |__|@@
 __    @
 \\ \\   @
  \\ \\  @
   \\ \\ @
    \\_\\@
       @@
  __ @
 |_ |@
  | |@
  | |@
  | |@
 |__|@@
  /\\ @
 |/\\|@
   $ @
   $ @
   $ @
     @@
        @
        @
        @
        @
  _____ @
 |_____|@@
  _ @
 ( )@
  \\|@
  $ @
  $ @
    @@
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
  _     @
 | |__  @
 | '_ \\ @
 | |_) |@
 |_.__/ @
        @@
       @
   ___ @
  / __|@
 | (__ @
  \\___|@
       @@
      _ @
   __| |@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
       @
   ___ @
  / _ \\@
 |  __/@
  \\___|@
       @@
   __ @
  / _|@
 | |_ @
 |  _|@
 |_|  @
      @@
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
  _     @
 | |__  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
  _ @
 (_)@
 | |@
 | |@
 |_|@
    @@
    _ @
   (_)@
   | |@
   | |@
  _/ |@
 |__/ @@
  _    @
 | | __@
 | |/ /@
 |   < @
 |_|\\_\\@
       @@
  _ @
 | |@
 | |@
 | |@
 |_|@
    @@
            @
  _ __ ___  @
 | '_ \` _ \\ @
 | | | | | |@
 |_| |_| |_|@
            @@
        @
  _ __  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
        @
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
        @
  _ __  @
 | '_ \\ @
 | |_) |@
 | .__/ @
 |_|    @@
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
     |_|@@
       @
  _ __ @
 | '__|@
 | |   @
 |_|   @
       @@
      @
  ___ @
 / __|@
 \\__ \\@
 |___/@
      @@
  _   @
 | |_ @
 | __|@
 | |_ @
  \\__|@
      @@
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
        @
 __   __@
 \\ \\ / /@
  \\ V / @
   \\_/  @
        @@
           @
 __      __@
 \\ \\ /\\ / /@
  \\ V  V / @
   \\_/\\_/  @
           @@
       @
 __  __@
 \\ \\/ /@
  >  < @
 /_/\\_\\@
       @@
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
      @
  ____@
 |_  /@
  / / @
 /___|@
      @@
    __@
   / /@
  | | @
 < <  @
  | | @
   \\_\\@@
  _ @
 | |@
 | |@
 | |@
 | |@
 |_|@@
 __   @
 \\ \\  @
  | | @
   > >@
  | | @
 /_/  @@
  /\\/|@
 |/\\/ @
   $  @
   $  @
   $  @
      @@
  _   _ @
 (_)_(_)@
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
  _   _ @
 (_)_(_)@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\___/ @
        @@
  _   _ @
 (_)_(_)@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
  _   _ @
 (_)_(_)@
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
   ___ @
  / _ \\@
 | |/ /@
 | |\\ \\@
 | ||_/@
 |_|   @@
160  NO-BREAK SPACE
 $@
 $@
 $@
 $@
 $@
 $@@
161  INVERTED EXCLAMATION MARK
  _ @
 (_)@
 | |@
 | |@
 |_|@
    @@
162  CENT SIGN
    _  @
   | | @
  / __)@
 | (__ @
  \\   )@
   |_| @@
163  POUND SIGN
    ___  @
   / ,_\\ @
 _| |_   @
  | |___ @
 (_,____|@
         @@
164  CURRENCY SIGN
 /\\___/\\@
 \\  _  /@
 | (_) |@
 / ___ \\@
 \\/   \\/@
        @@
165  YEN SIGN
  __ __ @
  \\ V / @
 |__ __|@
 |__ __|@
   |_|  @
        @@
166  BROKEN BAR
  _ @
 | |@
 |_|@
  _ @
 | |@
 |_|@@
167  SECTION SIGN
    __ @
  _/ _)@
 / \\ \\ @
 \\ \\\\ \\@
  \\ \\_/@
 (__/  @@
168  DIAERESIS
  _   _ @
 (_) (_)@
  $   $ @
  $   $ @
  $   $ @
        @@
169  COPYRIGHT SIGN
    _____   @
   / ___ \\  @
  / / __| \\ @
 | | (__   |@
  \\ \\___| / @
   \\_____/  @@
170  FEMININE ORDINAL INDICATOR
  __ _ @
 / _\` |@
 \\__,_|@
 |____|@
    $  @
       @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
   ____@
  / / /@
 / / / @
 \\ \\ \\ @
  \\_\\_\\@
       @@
172  NOT SIGN
        @
  _____ @
 |___  |@
     |_|@
    $   @
        @@
173  SOFT HYPHEN
       @
       @
  ____ @
 |____|@
    $  @
       @@
174  REGISTERED SIGN
    _____   @
   / ___ \\  @
  / | _ \\ \\ @
 |  |   /  |@
  \\ |_|_\\ / @
   \\_____/  @@
175  MACRON
  _____ @
 |_____|@
    $   @
    $   @
    $   @
        @@
176  DEGREE SIGN
   __  @
  /  \\ @
 | () |@
  \\__/ @
    $  @
       @@
177  PLUS-MINUS SIGN
    _   @
  _| |_ @
 |_   _|@
  _|_|_ @
 |_____|@
        @@
178  SUPERSCRIPT TWO
  ___ @
 |_  )@
  / / @
 /___|@
   $  @
      @@
179  SUPERSCRIPT THREE
  ____@
 |__ /@
  |_ \\@
 |___/@
   $  @
      @@
180  ACUTE ACCENT
  __@
 /_/@
  $ @
  $ @
  $ @
    @@
181  MICRO SIGN
        @
  _   _ @
 | | | |@
 | |_| |@
 | ._,_|@
 |_|    @@
182  PILCROW SIGN
   _____ @
  /     |@
 | (| | |@
  \\__ | |@
    |_|_|@
         @@
183  MIDDLE DOT
    @
  _ @
 (_)@
  $ @
  $ @
    @@
184  CEDILLA
    @
    @
    @
    @
  _ @
 )_)@@
185  SUPERSCRIPT ONE
  _ @
 / |@
 | |@
 |_|@
  $ @
    @@
186  MASCULINE ORDINAL INDICATOR
  ___ @
 / _ \\@
 \\___/@
 |___|@
   $  @
      @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
 ____  @
 \\ \\ \\ @
  \\ \\ \\@
  / / /@
 /_/_/ @
       @@
188  VULGAR FRACTION ONE QUARTER
  _   __    @
 / | / / _  @
 | |/ / | | @
 |_/ /|_  _|@
  /_/   |_| @
            @@
189  VULGAR FRACTION ONE HALF
  _   __   @
 / | / /__ @
 | |/ /_  )@
 |_/ / / / @
  /_/ /___|@
           @@
190  VULGAR FRACTION THREE QUARTERS
  ____  __    @
 |__ / / / _  @
  |_ \\/ / | | @
 |___/ /|_  _|@
    /_/   |_| @
              @@
191  INVERTED QUESTION MARK
   _  @
  (_) @
  | | @
 / /_ @
 \\___|@
      @@
192  LATIN CAPITAL LETTER A WITH GRAVE
   __   @
   \\_\\  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
193  LATIN CAPITAL LETTER A WITH ACUTE
    __  @
   /_/  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
195  LATIN CAPITAL LETTER A WITH TILDE
   /\\/| @
  |/\\/  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
  _   _ @
 (_)_(_)@
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
    _   @
   (o)  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
198  LATIN CAPITAL LETTER AE
     ______ @
    /  ____|@
   / _  _|  @
  / __ |___ @
 /_/ |_____|@
            @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
   ____ @
  / ___|@
 | |    @
 | |___ @
  \\____|@
    )_) @@
200  LATIN CAPITAL LETTER E WITH GRAVE
   __   @
  _\\_\\_ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
201  LATIN CAPITAL LETTER E WITH ACUTE
    __  @
  _/_/_ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
 | ____|@
 |  _|_ @
 |_____|@
        @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
  _   _ @
 (_)_(_)@
 | ____|@
 |  _|_ @
 |_____|@
        @@
204  LATIN CAPITAL LETTER I WITH GRAVE
  __  @
  \\_\\ @
 |_ _|@
  | | @
 |___|@
      @@
205  LATIN CAPITAL LETTER I WITH ACUTE
   __ @
  /_/ @
 |_ _|@
  | | @
 |___|@
      @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
 |_ _|@
  | | @
 |___|@
      @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
  |_ _| @
   | |  @
  |___| @
        @@
208  LATIN CAPITAL LETTER ETH
    ____  @
   |  _ \\ @
  _| |_| |@
 |__ __| |@
   |____/ @
          @@
209  LATIN CAPITAL LETTER N WITH TILDE
   /\\/|@
  |/\\/ @
 | \\| |@
 | .\` |@
 |_|\\_|@
       @@
210  LATIN CAPITAL LETTER O WITH GRAVE
   __   @
   \\_\\  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
211  LATIN CAPITAL LETTER O WITH ACUTE
    __  @
   /_/  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
213  LATIN CAPITAL LETTER O WITH TILDE
   /\\/| @
  |/\\/  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
215  MULTIPLICATION SIGN
     @
     @
 /\\/\\@
 >  <@
 \\/\\/@
     @@
216  LATIN CAPITAL LETTER O WITH STROKE
   ____ @
  / _// @
 | |// |@
 | //| |@
  //__/ @
        @@
217  LATIN CAPITAL LETTER U WITH GRAVE
   __   @
  _\\_\\_ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
218  LATIN CAPITAL LETTER U WITH ACUTE
    __  @
  _/_/_ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
 | | | |@
 | |_| |@
  \\___/ @
        @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\___/ @
        @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
    __  @
 __/_/__@
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
222  LATIN CAPITAL LETTER THORN
  _     @
 | |___ @
 |  __ \\@
 |  ___/@
 |_|    @
        @@
223  LATIN SMALL LETTER SHARP S
   ___ @
  / _ \\@
 | |/ /@
 | |\\ \\@
 | ||_/@
 |_|   @@
224  LATIN SMALL LETTER A WITH GRAVE
   __   @
   \\_\\_ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
225  LATIN SMALL LETTER A WITH ACUTE
    __  @
   /_/_ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
227  LATIN SMALL LETTER A WITH TILDE
   /\\/| @
  |/\\/_ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
228  LATIN SMALL LETTER A WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
229  LATIN SMALL LETTER A WITH RING ABOVE
    __  @
   (()) @
  / _ '|@
 | (_| |@
  \\__,_|@
        @@
230  LATIN SMALL LETTER AE
           @
   __ ____ @
  / _\`  _ \\@
 | (_|  __/@
  \\__,____|@
           @@
231  LATIN SMALL LETTER C WITH CEDILLA
       @
   ___ @
  / __|@
 | (__ @
  \\___|@
   )_) @@
232  LATIN SMALL LETTER E WITH GRAVE
   __  @
   \\_\\ @
  / _ \\@
 |  __/@
  \\___|@
       @@
233  LATIN SMALL LETTER E WITH ACUTE
    __ @
   /_/ @
  / _ \\@
 |  __/@
  \\___|@
       @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
   //\\ @
  |/_\\|@
  / _ \\@
 |  __/@
  \\___|@
       @@
235  LATIN SMALL LETTER E WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
 |  __/ @
  \\___| @
        @@
236  LATIN SMALL LETTER I WITH GRAVE
 __ @
 \\_\\@
 | |@
 | |@
 |_|@
    @@
237  LATIN SMALL LETTER I WITH ACUTE
  __@
 /_/@
 | |@
 | |@
 |_|@
    @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
  | | @
  | | @
  |_| @
      @@
239  LATIN SMALL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
   | |  @
   | |  @
   |_|  @
        @@
240  LATIN SMALL LETTER ETH
   /\\/\\ @
   >  < @
  _\\/\\ |@
 / __\` |@
 \\____/ @
        @@
241  LATIN SMALL LETTER N WITH TILDE
   /\\/| @
  |/\\/  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
242  LATIN SMALL LETTER O WITH GRAVE
   __   @
   \\_\\  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
243  LATIN SMALL LETTER O WITH ACUTE
    __  @
   /_/  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
245  LATIN SMALL LETTER O WITH TILDE
   /\\/| @
  |/\\/  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
246  LATIN SMALL LETTER O WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
247  DIVISION SIGN
        @
    _   @
  _(_)_ @
 |_____|@
   (_)  @
        @@
248  LATIN SMALL LETTER O WITH STROKE
         @
   ____  @
  / _//\\ @
 | (//) |@
  \\//__/ @
         @@
249  LATIN SMALL LETTER U WITH GRAVE
   __   @
  _\\_\\_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
250  LATIN SMALL LETTER U WITH ACUTE
    __  @
  _/_/_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
252  LATIN SMALL LETTER U WITH DIAERESIS
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
253  LATIN SMALL LETTER Y WITH ACUTE
    __  @
  _/_/_ @
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
254  LATIN SMALL LETTER THORN
  _     @
 | |__  @
 | '_ \\ @
 | |_) |@
 | .__/ @
 |_|    @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
0x0100  LATIN CAPITAL LETTER A WITH MACRON
   ____ @
  /___/ @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
0x0101  LATIN SMALL LETTER A WITH MACRON
    ___ @
   /_ _/@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0102  LATIN CAPITAL LETTER A WITH BREVE
  _   _ @
  \\\\_// @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
0x0103  LATIN SMALL LETTER A WITH BREVE
   \\_/  @
   ___  @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0104  LATIN CAPITAL LETTER A WITH OGONEK
        @
    _   @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
     (_(@@
0x0105  LATIN SMALL LETTER A WITH OGONEK
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
     (_(@@
0x0106  LATIN CAPITAL LETTER C WITH ACUTE
     __ @
   _/_/ @
  / ___|@
 | |___ @
  \\____|@
        @@
0x0107  LATIN SMALL LETTER C WITH ACUTE
    __ @
   /__/@
  / __|@
 | (__ @
  \\___|@
       @@
0x0108  LATIN CAPITAL LETTER C WITH CIRCUMFLEX
     /\\ @
   _//\\\\@
  / ___|@
 | |___ @
  \\____|@
        @@
0x0109  LATIN SMALL LETTER C WITH CIRCUMFLEX
    /\\ @
   /_\\ @
  / __|@
 | (__ @
  \\___|@
       @@
0x010A  LATIN CAPITAL LETTER C WITH DOT ABOVE
    []  @
   ____ @
  / ___|@
 | |___ @
  \\____|@
        @@
0x010B  LATIN SMALL LETTER C WITH DOT ABOVE
   []  @
   ___ @
  / __|@
 | (__ @
  \\___|@
       @@
0x010C  LATIN CAPITAL LETTER C WITH CARON
   \\\\// @
   _\\/_ @
  / ___|@
 | |___ @
  \\____|@
        @@
0x010D  LATIN SMALL LETTER C WITH CARON
   \\\\//@
   _\\/ @
  / __|@
 | (__ @
  \\___|@
       @@
0x010E  LATIN CAPITAL LETTER D WITH CARON
   \\\\// @
  __\\/  @
 |  _ \\ @
 | |_| |@
 |____/ @
        @@
0x010F  LATIN SMALL LETTER D WITH CARON
  \\/  _ @
   __| |@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0110  LATIN CAPITAL LETTER D WITH STROKE
   ____   @
  |_ __ \\ @
 /| |/ | |@
 /|_|/_| |@
  |_____/ @
          @@
0x0111  LATIN SMALL LETTER D WITH STROKE
    ---|@
   __| |@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0112  LATIN CAPITAL LETTER E WITH MACRON
   ____ @
  /___/ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x0113  LATIN SMALL LETTER E WITH MACRON
    ____@
   /_ _/@
  / _ \\ @
 |  __/ @
  \\___| @
        @@
0x0114  LATIN CAPITAL LETTER E WITH BREVE
  _   _ @
  \\\\_// @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x0115  LATIN SMALL LETTER E WITH BREVE
  \\\\  //@
    --  @
  / _ \\ @
 |  __/ @
  \\___| @
        @@
0x0116  LATIN CAPITAL LETTER E WITH DOT ABOVE
    []  @
  _____ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x0117  LATIN SMALL LETTER E WITH DOT ABOVE
    [] @
    __ @
  / _ \\@
 |  __/@
  \\___|@
       @@
0x0118  LATIN CAPITAL LETTER E WITH OGONEK
        @
  _____ @
 | ____|@
 |  _|_ @
 |_____|@
    (__(@@
0x0119  LATIN SMALL LETTER E WITH OGONEK
       @
   ___ @
  / _ \\@
 |  __/@
  \\___|@
    (_(@@
0x011A  LATIN CAPITAL LETTER E WITH CARON
   \\\\// @
  __\\/_ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x011B  LATIN SMALL LETTER E WITH CARON
   \\\\//@
    \\/ @
  / _ \\@
 |  __/@
  \\___|@
       @@
0x011C  LATIN CAPITAL LETTER G WITH CIRCUMFLEX
   _/\\_ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
0x011D  LATIN SMALL LETTER G WITH CIRCUMFLEX
     /\\ @
   _/_ \\@
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
0x011E  LATIN CAPITAL LETTER G WITH BREVE
   _\\/_ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
0x011F  LATIN SMALL LETTER G WITH BREVE
  \\___/ @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
0x0120  LATIN CAPITAL LETTER G WITH DOT ABOVE
   _[]_ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
0x0121  LATIN SMALL LETTER G WITH DOT ABOVE
   []   @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
0x0122  LATIN CAPITAL LETTER G WITH CEDILLA
   ____ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
   )__) @@
0x0123  LATIN SMALL LETTER G WITH CEDILLA
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |_))))@@
0x0124  LATIN CAPITAL LETTER H WITH CIRCUMFLEX
  _/ \\_ @
 | / \\ |@
 | |_| |@
 |  _  |@
 |_| |_|@
        @@
0x0125  LATIN SMALL LETTER H WITH CIRCUMFLEX
  _  /\\ @
 | |//\\ @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0126  LATIN CAPITAL LETTER H WITH STROKE
  _   _ @
 | |=| |@
 | |_| |@
 |  _  |@
 |_| |_|@
        @@
0x0127  LATIN SMALL LETTER H WITH STROKE
  _     @
 |=|__  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0128  LATIN CAPITAL LETTER I WITH TILDE
  /\\//@
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x0129  LATIN SMALL LETTER I WITH TILDE
    @
 /\\/@
 | |@
 | |@
 |_|@
    @@
0x012A  LATIN CAPITAL LETTER I WITH MACRON
 /___/@
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x012B  LATIN SMALL LETTER I WITH MACRON
  ____@
 /___/@
  | | @
  | | @
  |_| @
      @@
0x012C  LATIN CAPITAL LETTER I WITH BREVE
  \\__/@
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x012D  LATIN SMALL LETTER I WITH BREVE
    @
 \\_/@
 | |@
 | |@
 |_|@
    @@
0x012E  LATIN CAPITAL LETTER I WITH OGONEK
  ___ @
 |_ _|@
  | | @
  | | @
 |___|@
  (__(@@
0x012F  LATIN SMALL LETTER I WITH OGONEK
  _  @
 (_) @
 | | @
 | | @
 |_|_@
  (_(@@
0x0130  LATIN CAPITAL LETTER I WITH DOT ABOVE
  _[] @
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x0131  LATIN SMALL LETTER DOTLESS I
    @
  _ @
 | |@
 | |@
 |_|@
    @@
0x0132  LATIN CAPITAL LIGATURE IJ
  ___  _ @
 |_ _|| |@
  | | | |@
  | |_| |@
 |__|__/ @
         @@
0x0133  LATIN SMALL LIGATURE IJ
  _   _ @
 (_) (_)@
 | | | |@
 | | | |@
 |_|_/ |@
   |__/ @@
0x0134  LATIN CAPITAL LETTER J WITH CIRCUMFLEX
      /\\ @
     /_\\|@
  _  | | @
 | |_| | @
  \\___/  @
         @@
0x0135  LATIN SMALL LETTER J WITH CIRCUMFLEX
    /\\@
   /_\\@
   | |@
   | |@
  _/ |@
 |__/ @@
0x0136  LATIN CAPITAL LETTER K WITH CEDILLA
  _  _  @
 | |/ / @
 | ' /  @
 | . \\  @
 |_|\\_\\ @
    )__)@@
0x0137  LATIN SMALL LETTER K WITH CEDILLA
  _    @
 | | __@
 | |/ /@
 |   < @
 |_|\\_\\@
    )_)@@
0x0138  LATIN SMALL LETTER KRA
       @
  _ __ @
 | |/ \\@
 |   < @
 |_|\\_\\@
       @@
0x0139  LATIN CAPITAL LETTER L WITH ACUTE
  _   //@
 | | // @
 | |    @
 | |___ @
 |_____|@
        @@
0x013A  LATIN SMALL LETTER L WITH ACUTE
  //@
 | |@
 | |@
 | |@
 |_|@
    @@
0x013B  LATIN CAPITAL LETTER L WITH CEDILLA
  _     @
 | |    @
 | |    @
 | |___ @
 |_____|@
    )__)@@
0x013C  LATIN SMALL LETTER L WITH CEDILLA
  _   @
 | |  @
 | |  @
 | |  @
 |_|  @
   )_)@@
0x013D  LATIN CAPITAL LETTER L WITH CARON
  _ \\\\//@
 | | \\/ @
 | |    @
 | |___ @
 |_____|@
        @@
0x013E  LATIN SMALL LETTER L WITH CARON
  _ \\\\//@
 | | \\/ @
 | |    @
 | |    @
 |_|    @
        @@
0x013F  LATIN CAPITAL LETTER L WITH MIDDLE DOT
  _     @
 | |    @
 | | [] @
 | |___ @
 |_____|@
        @@
0x0140  LATIN SMALL LETTER L WITH MIDDLE DOT
  _    @
 | |   @
 | | []@
 | |   @
 |_|   @
       @@
0x0141  LATIN CAPITAL LETTER L WITH STROKE
  __    @
 | //   @
 |//|   @
 // |__ @
 |_____|@
        @@
0x0142  LATIN SMALL LETTER L WITH STROKE
  _ @
 | |@
 |//@
 //|@
 |_|@
    @@
0x0143  LATIN CAPITAL LETTER N WITH ACUTE
  _/ /_ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
        @@
0x0144  LATIN SMALL LETTER N WITH ACUTE
     _  @
  _ /_/ @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0145  LATIN CAPITAL LETTER N WITH CEDILLA
  _   _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
 )_)    @@
0x0146  LATIN SMALL LETTER N WITH CEDILLA
        @
  _ __  @
 | '_ \\ @
 | | | |@
 |_| |_|@
 )_)    @@
0x0147  LATIN CAPITAL LETTER N WITH CARON
  _\\/ _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
        @@
0x0148  LATIN SMALL LETTER N WITH CARON
  \\\\//  @
  _\\/_  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0149  LATIN SMALL LETTER N PRECEDED BY APOSTROPHE
          @
  _  __   @
 ( )| '_\\ @
 |/| | | |@
   |_| |_|@
          @@
0x014A  LATIN CAPITAL LETTER ENG
  _   _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\ |@
     )_)@@
0x014B  LATIN SMALL LETTER ENG
  _ __  @
 | '_ \\ @
 | | | |@
 |_| | |@
     | |@
    |__ @@
0x014C  LATIN CAPITAL LETTER O WITH MACRON
   ____ @
  /_ _/ @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
0x014D  LATIN SMALL LETTER O WITH MACRON
   ____ @
  /_ _/ @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
0x014E  LATIN CAPITAL LETTER O WITH BREVE
  \\   / @
   _-_  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x014F  LATIN SMALL LETTER O WITH BREVE
  \\   / @
   _-_  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x0150  LATIN CAPITAL LETTER O WITH DOUBLE ACUTE
    ___ @
   /_/_/@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x0151  LATIN SMALL LETTER O WITH DOUBLE ACUTE
    ___ @
   /_/_/@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x0152  LATIN CAPITAL LIGATURE OE
   ___  ___ @
  / _ \\| __|@
 | | | |  | @
 | |_| | |__@
  \\___/|____@
            @@
0x0153  LATIN SMALL LIGATURE OE
             @
   ___   ___ @
  / _ \\ / _ \\@
 | (_) |  __/@
  \\___/ \\___|@
             @@
0x0154  LATIN CAPITAL LETTER R WITH ACUTE
  _/_/  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
        @@
0x0155  LATIN SMALL LETTER R WITH ACUTE
     __@
  _ /_/@
 | '__|@
 | |   @
 |_|   @
       @@
0x0156  LATIN CAPITAL LETTER R WITH CEDILLA
  ____  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
 )_)    @@
0x0157  LATIN SMALL LETTER R WITH CEDILLA
       @
  _ __ @
 | '__|@
 | |   @
 |_|   @
   )_) @@
0x0158  LATIN CAPITAL LETTER R WITH CARON
  _\\_/  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
        @@
0x0159  LATIN SMALL LETTER R WITH CARON
  \\\\// @
  _\\/_ @
 | '__|@
 | |   @
 |_|   @
       @@
0x015A  LATIN CAPITAL LETTER S WITH ACUTE
  _/_/  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
0x015B  LATIN SMALL LETTER S WITH ACUTE
    __@
  _/_/@
 / __|@
 \\__ \\@
 |___/@
      @@
0x015C  LATIN CAPITAL LETTER S WITH CIRCUMFLEX
  _/\\_  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
0x015D  LATIN SMALL LETTER S WITH CIRCUMFLEX
      @
  /_\\_@
 / __|@
 \\__ \\@
 |___/@
      @@
0x015E  LATIN CAPITAL LETTER S WITH CEDILLA
  ____  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
    )__)@@
0x015F  LATIN SMALL LETTER S WITH CEDILLA
      @
  ___ @
 / __|@
 \\__ \\@
 |___/@
   )_)@@
0x0160  LATIN CAPITAL LETTER S WITH CARON
  _\\_/  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
0x0161  LATIN SMALL LETTER S WITH CARON
  \\\\//@
  _\\/ @
 / __|@
 \\__ \\@
 |___/@
      @@
0x0162  LATIN CAPITAL LETTER T WITH CEDILLA
  _____ @
 |_   _|@
   | |  @
   | |  @
   |_|  @
    )__)@@
0x0163  LATIN SMALL LETTER T WITH CEDILLA
  _   @
 | |_ @
 | __|@
 | |_ @
  \\__|@
   )_)@@
0x0164  LATIN CAPITAL LETTER T WITH CARON
  _____ @
 |_   _|@
   | |  @
   | |  @
   |_|  @
        @@
0x0165  LATIN SMALL LETTER T WITH CARON
  \\/  @
 | |_ @
 | __|@
 | |_ @
  \\__|@
      @@
0x0166  LATIN CAPITAL LETTER T WITH STROKE
  _____ @
 |_   _|@
   | |  @
  -|-|- @
   |_|  @
        @@
0x0167  LATIN SMALL LETTER T WITH STROKE
  _   @
 | |_ @
 | __|@
 |-|_ @
  \\__|@
      @@
0x0168  LATIN CAPITAL LETTER U WITH TILDE
        @
  _/\\/_ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x0169  LATIN SMALL LETTER U WITH TILDE
        @
  _/\\/_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x016A  LATIN CAPITAL LETTER U WITH MACRON
   ____ @
  /__ _/@
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x016B  LATIN SMALL LETTER U WITH MACRON
   ____ @
  / _  /@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x016C  LATIN CAPITAL LETTER U WITH BREVE
        @
   \\_/_ @
 | | | |@
 | |_| |@
  \\____|@
        @@
0x016D  LATIN SMALL LETTER U WITH BREVE
        @
   \\_/_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x016E  LATIN CAPITAL LETTER U WITH RING ABOVE
    O   @
  __  _ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x016F  LATIN SMALL LETTER U WITH RING ABOVE
    O   @
  __ __ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x0170  LATIN CAPITAL LETTER U WITH DOUBLE ACUTE
   -- --@
  /_//_/@
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x0171  LATIN SMALL LETTER U WITH DOUBLE ACUTE
    ____@
  _/_/_/@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x0172  LATIN CAPITAL LETTER U WITH OGONEK
  _   _ @
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
    (__(@@
0x0173  LATIN SMALL LETTER U WITH OGONEK
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
     (_(@@
0x0174  LATIN CAPITAL LETTER W WITH CIRCUMFLEX
 __    /\\  __@
 \\ \\  //\\\\/ /@
  \\ \\ /\\ / / @
   \\ V  V /  @
    \\_/\\_/   @
             @@
0x0175  LATIN SMALL LETTER W WITH CIRCUMFLEX
      /\\   @
 __  //\\\\__@
 \\ \\ /\\ / /@
  \\ V  V / @
   \\_/\\_/  @
           @@
0x0176  LATIN CAPITAL LETTER Y WITH CIRCUMFLEX
    /\\  @
 __//\\\\ @
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
0x0177  LATIN SMALL LETTER Y WITH CIRCUMFLEX
    /\\  @
   //\\\\ @
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
0x0178  LATIN CAPITAL LETTER Y WITH DIAERESIS
  []  []@
 __    _@
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
0x0179  LATIN CAPITAL LETTER Z WITH ACUTE
  __/_/@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
0x017A  LATIN SMALL LETTER Z WITH ACUTE
    _ @
  _/_/@
 |_  /@
  / / @
 /___|@
      @@
0x017B  LATIN CAPITAL LETTER Z WITH DOT ABOVE
  __[]_@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
0x017C  LATIN SMALL LETTER Z WITH DOT ABOVE
   [] @
  ____@
 |_  /@
  / / @
 /___|@
      @@
0x017D  LATIN CAPITAL LETTER Z WITH CARON
  _\\_/_@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
0x017E  LATIN SMALL LETTER Z WITH CARON
  \\\\//@
  _\\/_@
 |_  /@
  / / @
 /___|@
      @@
0x017F  LATIN SMALL LETTER LONG S
     __ @
    / _|@
 |-| |  @
 |-| |  @
   |_|  @
        @@
0x02C7  CARON
 \\\\//@
  \\/ @
    $@
    $@
    $@
    $@@
0x02D8  BREVE
 \\\\_//@
  \\_/ @
     $@
     $@
     $@
     $@@
0x02D9  DOT ABOVE
 []@
  $@
  $@
  $@
  $@
  $@@
0x02DB  OGONEK
    $@
    $@
    $@
    $@
    $@
 )_) @@
0x02DD  DOUBLE ACUTE ACCENT
  _ _ @
 /_/_/@
     $@
     $@
     $@
     $@@
0xCA0  KANNADA LETTER TTHA
   _____)@
  /_ ___/@
  / _ \\  @
 | (_) | @
 $\\___/$ @
         @@
         `})),To,Eo=e((()=>{To=`flf2a$ 6 5 16 15 10 0 18319
Slant by Glenn Chappell 3/93 -- based on Standard
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

     $$@
    $$ @
   $$  @
  $$   @
 $$    @
$$     @@
    __@
   / /@
  / / @
 /_/  @
(_)   @
      @@
 _ _ @
( | )@
|/|/ @
 $   @
$    @
     @@
     __ __ @
  __/ // /_@
 /_  _  __/@
/_  _  __/ @
 /_//_/    @
           @@
     __@
   _/ /@
  / __/@
 (_  ) @
/  _/  @
/_/    @@
   _   __@
  (_)_/_/@
   _/_/  @
 _/_/_   @
/_/ (_)  @
         @@
   ___   @
  ( _ )  @
 / __ \\/|@
/ /_/  < @
\\____/\\/ @
         @@
  _ @
 ( )@
 |/ @
 $  @
$   @
    @@
     __@
   _/_/@
  / /  @
 / /   @
/ /    @
|_|    @@
     _ @
    | |@
    / /@
   / / @
 _/_/  @
/_/    @@
       @
  __/|_@
 |    /@
/_ __| @
 |/    @
       @@
       @
    __ @
 __/ /_@
/_  __/@
 /_/   @
       @@
   @
   @
   @
 _ @
( )@
|/ @@
       @
       @
 ______@
/_____/@
  $    @
       @@
   @
   @
   @
 _ @
(_)@
   @@
       __@
     _/_/@
   _/_/  @
 _/_/    @
/_/      @
         @@
   ____ @
  / __ \\@
 / / / /@
/ /_/ / @
\\____/  @
        @@
   ___@
  <  /@
  / / @
 / /  @
/_/   @
      @@
   ___ @
  |__ \\@
  __/ /@
 / __/ @
/____/ @
       @@
   _____@
  |__  /@
   /_ < @
 ___/ / @
/____/  @
        @@
   __ __@
  / // /@
 / // /_@
/__  __/@
  /_/   @
        @@
    ______@
   / ____/@
  /___ \\  @
 ____/ /  @
/_____/   @
          @@
   _____@
  / ___/@
 / __ \\ @
/ /_/ / @
\\____/  @
        @@
 _____@
/__  /@
  / / @
 / /  @
/_/   @
      @@
   ____ @
  ( __ )@
 / __  |@
/ /_/ / @
\\____/  @
        @@
   ____ @
  / __ \\@
 / /_/ /@
 \\__, / @
/____/  @
        @@
     @
   _ @
  (_)@
 _   @
(_)  @
     @@
     @
   _ @
  (_)@
 _   @
( )  @
|/   @@
  __@
 / /@
/ / @
\\ \\ @
 \\_\\@
    @@
       @
  _____@
 /____/@
/____/ @
  $    @
       @@
__  @
\\ \\ @
 \\ \\@
 / /@
/_/ @
    @@
  ___ @
 /__ \\@
  / _/@
 /_/  @
(_)   @
      @@
   ______ @
  / ____ \\@
 / / __ \`/@
/ / /_/ / @
\\ \\__,_/  @
 \\____/   @@
    ___ @
   /   |@
  / /| |@
 / ___ |@
/_/  |_|@
        @@
    ____ @
   / __ )@
  / __  |@
 / /_/ / @
/_____/  @
         @@
   ______@
  / ____/@
 / /     @
/ /___   @
\\____/   @
         @@
    ____ @
   / __ \\@
  / / / /@
 / /_/ / @
/_____/  @
         @@
    ______@
   / ____/@
  / __/   @
 / /___   @
/_____/   @
          @@
    ______@
   / ____/@
  / /_    @
 / __/    @
/_/       @
          @@
   ______@
  / ____/@
 / / __  @
/ /_/ /  @
\\____/   @
         @@
    __  __@
   / / / /@
  / /_/ / @
 / __  /  @
/_/ /_/   @
          @@
    ____@
   /  _/@
   / /  @
 _/ /   @
/___/   @
        @@
       __@
      / /@
 __  / / @
/ /_/ /  @
\\____/   @
         @@
    __ __@
   / //_/@
  / ,<   @
 / /| |  @
/_/ |_|  @
         @@
    __ @
   / / @
  / /  @
 / /___@
/_____/@
       @@
    __  ___@
   /  |/  /@
  / /|_/ / @
 / /  / /  @
/_/  /_/   @
           @@
    _   __@
   / | / /@
  /  |/ / @
 / /|  /  @
/_/ |_/   @
          @@
   ____ @
  / __ \\@
 / / / /@
/ /_/ / @
\\____/  @
        @@
    ____ @
   / __ \\@
  / /_/ /@
 / ____/ @
/_/      @
         @@
   ____ @
  / __ \\@
 / / / /@
/ /_/ / @
\\___\\_\\ @
        @@
    ____ @
   / __ \\@
  / /_/ /@
 / _, _/ @
/_/ |_|  @
         @@
   _____@
  / ___/@
  \\__ \\ @
 ___/ / @
/____/  @
        @@
  ______@
 /_  __/@
  / /   @
 / /    @
/_/     @
        @@
   __  __@
  / / / /@
 / / / / @
/ /_/ /  @
\\____/   @
         @@
 _    __@
| |  / /@
| | / / @
| |/ /  @
|___/   @
        @@
 _       __@
| |     / /@
| | /| / / @
| |/ |/ /  @
|__/|__/   @
           @@
   _  __@
  | |/ /@
  |   / @
 /   |  @
/_/|_|  @
        @@
__  __@
\\ \\/ /@
 \\  / @
 / /  @
/_/   @
      @@
 _____@
/__  /@
  / / @
 / /__@
/____/@
      @@
     ___@
    / _/@
   / /  @
  / /   @
 / /    @
/__/    @@
__    @
\\ \\   @
 \\ \\  @
  \\ \\ @
   \\_\\@
      @@
     ___@
    /  /@
    / / @
   / /  @
 _/ /   @
/__/    @@
  //|@
 |/||@
  $  @
 $   @
$    @
     @@
       @
       @
       @
       @
 ______@
/_____/@@
  _ @
 ( )@
  V @
 $  @
$   @
    @@
        @
  ____ _@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
    __  @
   / /_ @
  / __ \\@
 / /_/ /@
/_.___/ @
        @@
       @
  _____@
 / ___/@
/ /__  @
\\___/  @
       @@
       __@
  ____/ /@
 / __  / @
/ /_/ /  @
\\__,_/   @
         @@
      @
  ___ @
 / _ \\@
/  __/@
\\___/ @
      @@
    ____@
   / __/@
  / /_  @
 / __/  @
/_/     @
        @@
         @
   ____ _@
  / __ \`/@
 / /_/ / @
 \\__, /  @
/____/   @@
    __  @
   / /_ @
  / __ \\@
 / / / /@
/_/ /_/ @
        @@
    _ @
   (_)@
  / / @
 / /  @
/_/   @
      @@
       _ @
      (_)@
     / / @
    / /  @
 __/ /   @
/___/    @@
    __  @
   / /__@
  / //_/@
 / ,<   @
/_/|_|  @
        @@
    __@
   / /@
  / / @
 / /  @
/_/   @
      @@
            @
   ____ ___ @
  / __ \`__ \\@
 / / / / / /@
/_/ /_/ /_/ @
            @@
        @
   ____ @
  / __ \\@
 / / / /@
/_/ /_/ @
        @@
       @
  ____ @
 / __ \\@
/ /_/ /@
\\____/ @
       @@
         @
    ____ @
   / __ \\@
  / /_/ /@
 / .___/ @
/_/      @@
        @
  ____ _@
 / __ \`/@
/ /_/ / @
\\__, /  @
  /_/   @@
        @
   _____@
  / ___/@
 / /    @
/_/     @
        @@
        @
   _____@
  / ___/@
 (__  ) @
/____/  @
        @@
   __ @
  / /_@
 / __/@
/ /_  @
\\__/  @
      @@
        @
  __  __@
 / / / /@
/ /_/ / @
\\__,_/  @
        @@
       @
 _   __@
| | / /@
| |/ / @
|___/  @
       @@
          @
 _      __@
| | /| / /@
| |/ |/ / @
|__/|__/  @
          @@
        @
   _  __@
  | |/_/@
 _>  <  @
/_/|_|  @
        @@
         @
   __  __@
  / / / /@
 / /_/ / @
 \\__, /  @
/____/   @@
     @
 ____@
/_  /@
 / /_@
/___/@
     @@
     __@
   _/_/@
 _/_/  @
< <    @
/ /    @
\\_\\    @@
     __@
    / /@
   / / @
  / /  @
 / /   @
/_/    @@
     _ @
    | |@
    / /@
   _>_>@
 _/_/  @
/_/    @@
  /\\//@
 //\\/ @
  $   @
 $    @
$     @
      @@
    _  _ @
   (_)(_)@
  / _ |  @
 / __ |  @
/_/ |_|  @
         @@
   _   _ @
  (_)_(_)@
 / __ \\  @
/ /_/ /  @
\\____/   @
         @@
   _   _ @
  (_) (_)@
 / / / / @
/ /_/ /  @
\\____/   @
         @@
   _   _ @
  (_)_(_)@
 / __ \`/ @
/ /_/ /  @
\\__,_/   @
         @@
   _   _ @
  (_)_(_)@
 / __ \\  @
/ /_/ /  @
\\____/   @
         @@
   _   _ @
  (_) (_)@
 / / / / @
/ /_/ /  @
\\__,_/   @
         @@
     ____ @
    / __ \\@
   / / / /@
  / /_| | @
 / //__/  @
/_/       @@
160  NO-BREAK SPACE
     $$@
    $$ @
   $$  @
  $$   @
 $$    @
$$     @@
161  INVERTED EXCLAMATION MARK
    _ @
   (_)@
  / / @
 / /  @
/_/   @
      @@
162  CENT SIGN
     __@
  __/ /@
 / ___/@
/ /__  @
\\  _/  @
/_/    @@
163  POUND SIGN
     ____ @
    / ,__\\@
 __/ /_   @
 _/ /___  @
(_,____/  @
          @@
164  CURRENCY SIGN
    /|___/|@
   | __  / @
  / /_/ /  @
 /___  |   @
|/   |/    @
           @@
165  YEN SIGN
    ____@
  _| / /@
 /_  __/@
/_  __/ @
 /_/    @
        @@
166  BROKEN BAR
     __@
    / /@
   /_/ @
  __   @
 / /   @
/_/    @@
167  SECTION SIGN
     __ @
   _/ _)@
  / | | @
 | || | @
 | |_/  @
(__/    @@
168  DIAERESIS
  _   _ @
 (_) (_)@
  $   $ @
 $   $  @
$   $   @
        @@
169  COPYRIGHT SIGN
    ______  @
   / _____\\ @
  / / ___/ |@
 / / /__  / @
|  \\___/ /  @
 \\______/   @@
170  FEMININE ORDINAL INDICATOR
   ___ _@
  / _ \`/@
 _\\_,_/ @
/____/  @
 $      @
        @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
  ____@
 / / /@
/ / / @
\\ \\ \\ @
 \\_\\_\\@
      @@
172  NOT SIGN
       @
 ______@
/___  /@
   /_/ @
 $     @
       @@
173  SOFT HYPHEN
      @
      @
 _____@
/____/@
  $   @
      @@
174  REGISTERED SIGN
    ______  @
   / ___  \\ @
  / / _ \\  |@
 / / , _/ / @
| /_/|_| /  @
 \\______/   @@
175  MACRON
 ______@
/_____/@
  $    @
 $     @
$      @
       @@
176  DEGREE SIGN
  ___ @
 / _ \\@
/ // /@
\\___/ @
 $    @
      @@
177  PLUS-MINUS SIGN
      __ @
   __/ /_@
  /_  __/@
 __/_/_  @
/_____/  @
         @@
178  SUPERSCRIPT TWO
   ___ @
  |_  |@
 / __/ @
/____/ @
 $     @
       @@
179  SUPERSCRIPT THREE
   ____@
  |_  /@
 _/_ < @
/____/ @
 $     @
       @@
180  ACUTE ACCENT
  __@
 /_/@
  $ @
 $  @
$   @
    @@
181  MICRO SIGN
          @
    __  __@
   / / / /@
  / /_/ / @
 / ._,_/  @
/_/       @@
182  PILCROW SIGN
  _______@
 / _    /@
/ (/ / / @
\\_  / /  @
 /_/_/   @
         @@
183  MIDDLE DOT
   @
 _ @
(_)@
 $ @
$  @
   @@
184  CEDILLA
   @
   @
   @
   @
 _ @
/_)@@
185  SUPERSCRIPT ONE
  ___@
 <  /@
 / / @
/_/  @
$    @
     @@
186  MASCULINE ORDINAL INDICATOR
   ___ @
  / _ \\@
 _\\___/@
/____/ @
 $     @
       @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
____  @
\\ \\ \\ @
 \\ \\ \\@
 / / /@
/_/_/ @
      @@
188  VULGAR FRACTION ONE QUARTER
  ___   __ @
 <  / _/_/ @
 / /_/_/___@
/_//_// / /@
 /_/ /_  _/@
      /_/  @@
189  VULGAR FRACTION ONE HALF
  ___   __   @
 <  / _/_/__ @
 / /_/_/|_  |@
/_//_/ / __/ @
 /_/  /____/ @
             @@
190  VULGAR FRACTION THREE QUARTERS
   ____    __ @
  |_  /  _/_/ @
 _/_ < _/_/___@
/____//_// / /@
    /_/ /_  _/@
         /_/  @@
191  INVERTED QUESTION MARK
    _ @
   (_)@
 _/ / @
/ _/_ @
\\___/ @
      @@
192  LATIN CAPITAL LETTER A WITH GRAVE
    __ @
   _\\_\\@
  / _ |@
 / __ |@
/_/ |_|@
       @@
193  LATIN CAPITAL LETTER A WITH ACUTE
     __@
   _/_/@
  / _ |@
 / __ |@
/_/ |_|@
       @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
     //|@
   _|/||@
  / _ | @
 / __ | @
/_/ |_| @
        @@
195  LATIN CAPITAL LETTER A WITH TILDE
     /\\//@
   _//\\/ @
  / _ |  @
 / __ |  @
/_/ |_|  @
         @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
    _  _ @
   (_)(_)@
  / _ |  @
 / __ |  @
/_/ |_|  @
         @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
    (())@
   /   |@
  / /| |@
 / ___ |@
/_/  |_|@
        @@
198  LATIN CAPITAL LETTER AE
    __________@
   /     ____/@
  / /|  __/   @
 / __  /___   @
/_/ /_____/   @
              @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
   ______@
  / ____/@
 / /     @
/ /___   @
\\____/   @
 /_)     @@
200  LATIN CAPITAL LETTER E WITH GRAVE
    __ @
   _\\_\\@
  / __/@
 / _/  @
/___/  @
       @@
201  LATIN CAPITAL LETTER E WITH ACUTE
     __@
   _/_/@
  / __/@
 / _/  @
/___/  @
       @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
     //|@
   _|/||@
  / __/ @
 / _/   @
/___/   @
        @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
    _  _ @
   (_)(_)@
  / __/  @
 / _/    @
/___/    @
         @@
204  LATIN CAPITAL LETTER I WITH GRAVE
    __ @
   _\\_\\@
  /  _/@
 _/ /  @
/___/  @
       @@
205  LATIN CAPITAL LETTER I WITH ACUTE
     __@
   _/_/@
  /  _/@
 _/ /  @
/___/  @
       @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
     //|@
   _|/||@
  /  _/ @
 _/ /   @
/___/   @
        @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
    _  _ @
   (_)(_)@
  /  _/  @
 _/ /    @
/___/    @
         @@
208  LATIN CAPITAL LETTER ETH
     ____ @
    / __ \\@
 __/ /_/ /@
/_  __/ / @
 /_____/  @
          @@
209  LATIN CAPITAL LETTER N WITH TILDE
     /\\//@
   _//\\/ @
  / |/ / @
 /    /  @
/_/|_/   @
         @@
210  LATIN CAPITAL LETTER O WITH GRAVE
    __ @
  __\\_\\@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
211  LATIN CAPITAL LETTER O WITH ACUTE
     __@
  __/_/@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
    //|@
  _|/||@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
213  LATIN CAPITAL LETTER O WITH TILDE
    /\\//@
  _//\\/ @
 / __ \\ @
/ /_/ / @
\\____/  @
        @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
   _   _ @
  (_)_(_)@
 / __ \\  @
/ /_/ /  @
\\____/   @
         @@
215  MULTIPLICATION SIGN
     @
     @
 /|/|@
 > < @
|/|/ @
     @@
216  LATIN CAPITAL LETTER O WITH STROKE
   _____ @
  / _// \\@
 / //// /@
/ //// / @
\\_//__/  @
         @@
217  LATIN CAPITAL LETTER U WITH GRAVE
    __  @
  __\\_\\_@
 / / / /@
/ /_/ / @
\\____/  @
        @@
218  LATIN CAPITAL LETTER U WITH ACUTE
     __ @
  __/_/_@
 / / / /@
/ /_/ / @
\\____/  @
        @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
    //| @
  _|/||_@
 / / / /@
/ /_/ / @
\\____/  @
        @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
   _   _ @
  (_) (_)@
 / / / / @
/ /_/ /  @
\\____/   @
         @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
   __ @
__/_/_@
\\ \\/ /@
 \\  / @
 /_/  @
      @@
222  LATIN CAPITAL LETTER THORN
    __  @
   / /_ @
  / __ \\@
 / ____/@
/_/     @
        @@
223  LATIN SMALL LETTER SHARP S
     ____ @
    / __ \\@
   / / / /@
  / /_| | @
 / //__/  @
/_/       @@
224  LATIN SMALL LETTER A WITH GRAVE
    __  @
  __\\_\\_@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
225  LATIN SMALL LETTER A WITH ACUTE
     __ @
  __/_/_@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
    //| @
  _|/||_@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
227  LATIN SMALL LETTER A WITH TILDE
    /\\//@
  _//\\/_@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
228  LATIN SMALL LETTER A WITH DIAERESIS
   _   _ @
  (_)_(_)@
 / __ \`/ @
/ /_/ /  @
\\__,_/   @
         @@
229  LATIN SMALL LETTER A WITH RING ABOVE
     __ @
  __(())@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
230  LATIN SMALL LETTER AE
           @
  ____ ___ @
 / __ \` _ \\@
/ /_/   __/@
\\__,_____/ @
           @@
231  LATIN SMALL LETTER C WITH CEDILLA
       @
  _____@
 / ___/@
/ /__  @
\\___/  @
/_)    @@
232  LATIN SMALL LETTER E WITH GRAVE
   __ @
  _\\_\\@
 / _ \\@
/  __/@
\\___/ @
      @@
233  LATIN SMALL LETTER E WITH ACUTE
    __@
  _/_/@
 / _ \\@
/  __/@
\\___/ @
      @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
    //|@
  _|/||@
 / _ \\ @
/  __/ @
\\___/  @
       @@
235  LATIN SMALL LETTER E WITH DIAERESIS
   _  _ @
  (_)(_)@
 / _ \\  @
/  __/  @
\\___/   @
        @@
236  LATIN SMALL LETTER I WITH GRAVE
   __ @
   \\_\\@
  / / @
 / /  @
/_/   @
      @@
237  LATIN SMALL LETTER I WITH ACUTE
    __@
   /_/@
  / / @
 / /  @
/_/   @
      @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
    //|@
   |/||@
  / /  @
 / /   @
/_/    @
       @@
239  LATIN SMALL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / /   @
 / /    @
/_/     @
        @@
240  LATIN SMALL LETTER ETH
     || @
    =||=@
 ___ || @
/ __\` | @
\\____/  @
        @@
241  LATIN SMALL LETTER N WITH TILDE
     /\\//@
   _//\\/ @
  / __ \\ @
 / / / / @
/_/ /_/  @
         @@
242  LATIN SMALL LETTER O WITH GRAVE
    __ @
  __\\_\\@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
243  LATIN SMALL LETTER O WITH ACUTE
     __@
  __/_/@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
    //|@
  _|/||@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
245  LATIN SMALL LETTER O WITH TILDE
    /\\//@
  _//\\/ @
 / __ \\ @
/ /_/ / @
\\____/  @
        @@
246  LATIN SMALL LETTER O WITH DIAERESIS
   _   _ @
  (_)_(_)@
 / __ \\  @
/ /_/ /  @
\\____/   @
         @@
247  DIVISION SIGN
       @
    _  @
 __(_)_@
/_____/@
 (_)   @
       @@
248  LATIN SMALL LETTER O WITH STROKE
        @
  _____ @
 / _// \\@
/ //// /@
\\_//__/ @
        @@
249  LATIN SMALL LETTER U WITH GRAVE
    __  @
  __\\_\\_@
 / / / /@
/ /_/ / @
\\__,_/  @
        @@
250  LATIN SMALL LETTER U WITH ACUTE
     __ @
  __/_/_@
 / / / /@
/ /_/ / @
\\__,_/  @
        @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
    //| @
  _|/||_@
 / / / /@
/ /_/ / @
\\__,_/  @
        @@
252  LATIN SMALL LETTER U WITH DIAERESIS
   _   _ @
  (_) (_)@
 / / / / @
/ /_/ /  @
\\__,_/   @
         @@
253  LATIN SMALL LETTER Y WITH ACUTE
      __ @
   __/_/_@
  / / / /@
 / /_/ / @
 \\__, /  @
/____/   @@
254  LATIN SMALL LETTER THORN
     __  @
    / /_ @
   / __ \\@
  / /_/ /@
 / .___/ @
/_/      @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
    _   _ @
   (_) (_)@
  / / / / @
 / /_/ /  @
 \\__, /   @
/____/    @@
`})),Do,Oo=e((()=>{Do=`flf2a$ 5 4 16 0 14 0 4992
Shadow by Glenn Chappell 6/93 -- based on Standard & SmShadow
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

---

Font modified June 17, 2007 by patorjk 
This was to widen the space character.
$ $$@
$ $$@
$ $$@
$ $$@
$ $$@@
 $|$@
 $|$@
 _|$@
 _)$@
    @@
 $| )$@
 V V$ @
  $$  @
  $$  @
      @@
   $|  |$  @
 _  |_ |_|$@
 _  |_ |_|$@
   _| _|$  @
           @@
   $|$ @
 $ __)$@
 \\__ \\$@
 (   /$@
   _|$ @@
 _)  /$@
   $/$ @
  $/$  @
 _/ _)$@
       @@
 $ _ )$  @
  $_ \\ \\$@
 $( \`  <$@
 \\___/\\/$@
         @@
 $)$@
 /$ @
 $$ @
 $$ @
    @@
  $/$@
 $|$ @
 $|$ @
 $|$ @
 \\_\\$@@
 \\ \\$ @
   $|$@
   $|$@
   $|$@
  _/$ @@
   $\\$  @
 \\    /$@
 $_  _\\$@
   \\/$  @
        @@
        @
   $|$  @
 _   _|$@
   _|$  @
        @@
    @
    @
    @
 $)$@
 /$ @@
        @
        @
 _____|$@
   $$   @
        @@
    @
    @
    @
 _)$@
    @@
    $/$@
   $/$ @
  $/$  @
 _/$   @
       @@
  $_ \\$ @
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
 _ |$@
  $|$@
  $|$@
  _|$@
     @@
 ___ \\$ @
    ) |$@
  $__/$ @
 _____|$@
        @@
 ___ /$ @
   _ \\$ @
    ) |$@
 ____/$ @
        @@
 $|  |$  @
 $|  |$  @
 ___ __|$@
    _|$  @
         @@
 $___|$ @
 $__ \\$ @
    ) |$@
 ____/$ @
        @@
  $/$   @
 $ _ \\$ @
 $(   |$@
 \\___/$ @
        @@
 ___  |$@
    $/$ @
   $/$  @
  _/$   @
        @@
 $ _ )$ @
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
  $_ \\$ @
 $(   |$@
 \\__  |$@
   __/$ @
        @@
    @
 _)$@
 $$ @
 _)$@
    @@
    @
 _)$@
 $$ @
 $)$@
 /$ @@
   $/$@
  $/$ @
 \\ \\$ @
  \\_\\$@
      @@
        @
 _____|$@
 _____|$@
        @
        @@
 \\ \\$ @
  \\ \\$@
   $/$@
  _/$ @
      @@
 __ \\$@
   $/$@
  _|$ @
  _)$ @
      @@
   $__ \\$ @
  $/ _\` |$@
 $| (   |$@
 \\ \\__,_|$@
  \\____/$ @@
    $\\$   @
   $_ \\$  @
  $___ \\$ @
 _/    _\\$@
          @@
 $__ )$ @
 $__ \\$ @
 $|   |$@
 ____/$ @
        @@
  $___|$@
 $|$    @
 $|$    @
 \\____|$@
        @@
 $__ \\$ @
 $|   |$@
 $|   |$@
 ____/$ @
        @@
 $____|$@
 $__|$  @
 $|$    @
 _____|$@
        @@
 $____|$@
 $|$    @
 $__|$  @
 _|$    @
        @@
  $___|$@
 $|$    @
 $|   |$@
 \\____|$@
        @@
 $|   |$@
 $|   |$@
 $___ |$@
 _|  _|$@
        @@
 _ _|$@
  $|$ @
  $|$ @
 ___|$@
      @@
     $|$@
     $|$@
 $\\   |$@
 \\___/$ @
        @@
 $|  /$@
 $' /$ @
 $. \\$ @
 _|\\_\\$@
       @@
 $|$    @
 $|$    @
 $|$    @
 _____|$@
        @@
 $ \\  |$@
 $|\\/ |$@
 $|   |$@
 _|  _|$@
        @@
 $ \\  |$@
 $  \\ |$@
 $|\\  |$@
 _| \\_|$@
        @@
  $_ \\$ @
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
 $ _ \\$ @
 $|   |$@
 $___/$ @
 _|$    @
        @@
  $_ \\$ @
 $|   |$@
 $|   |$@
 \\__\\_\\$@
        @@
 $ _ \\$ @
 $|   |$@
 $__ <$ @
 _| \\_\\$@
        @@
  $___|$ @
 \\___ \\$ @
      $|$@
 _____/$ @
         @@
 __ __|$@
   $|$  @
   $|$  @
   _|$  @
        @@
 $|   |$@
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
 \\ \\     /$@
  \\ \\   /$ @
   \\ \\ /$  @
    \\_/$   @
           @@
 \\ \\        /$@
  \\ \\  \\   /$ @
   \\ \\  \\ /$  @
    \\_/\\_/$   @
              @@
 \\ \\  /$@
  \\  /$ @
   $ \\$ @
  _/\\_\\$@
        @@
 \\ \\   /$@
  \\   /$ @
    $|$  @
    _|$  @
         @@
 __  /$@
   $/$ @
  $/$  @
 ____|$@
       @@
 $_|$@
 $|$ @
 $|$ @
 $|$ @
 __|$@@
 \\ \\$   @
  \\ \\$  @
   \\ \\$ @
    \\_\\$@
        @@
 _ |$@
  $|$@
  $|$@
  $|$@
 __|$@@
 /\\\\$@
  $$ @
  $$ @
  $$ @
     @@
        @
        @
        @
   $$   @
 _____|$@@
 $)$@
 \\|$@
 $$ @
 $$ @
    @@
        @
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
 $|$    @
 $__ \\$ @
 $|   |$@
 _.__/$ @
        @@
       @
  $__|$@
 $($   @
 \\___|$@
       @@
     $|$@
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
       @
  $_ \\$@
 $ __/$@
 \\___|$@
       @@
  $_|$@
 $|$  @
 $__|$@
 _|$  @
      @@
        @
  $_\` |$@
 $(   |$@
 \\__, |$@
 |___/$ @@
 $|$    @
 $__ \\$ @
 $| | |$@
 _| |_|$@
        @@
 _)$@
 $|$@
 $|$@
 _|$@
    @@
    _)$@
    $|$@
    $|$@
    $|$@
 ___/$ @@
 $|$   @
 $|  /$@
 $  <$ @
 _|\\_\\$@
       @@
 $|$@
 $|$@
 $|$@
 _|$@
    @@
            @
 $__ \`__ \\$ @
 $|   |   |$@
 _|  _|  _|$@
            @@
        @
 $__ \\$ @
 $|   |$@
 _|  _|$@
        @@
        @
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
        @
 $__ \\$ @
 $|   |$@
 $.__/$ @
 _|$    @@
        @
  $_\` |$@
 $(   |$@
 \\__, |$@
     _|$@@
       @
 $ __|$@
 $|$   @
 _|$   @
       @@
       @
  $__|$@
 \\__ \\$@
 ____/$@
       @@
 $|$  @
 $__|$@
 $|$  @
 \\__|$@
      @@
        @
 $|   |$@
 $|   |$@
 \\__,_|$@
        @@
         @
 \\ \\   /$@
  \\ \\ /$ @
   \\_/$  @
         @@
            @
 \\ \\  \\   /$@
  \\ \\  \\ /$ @
   \\_/\\_/$  @
            @@
        @
 \\ \\  /$@
  \`  <$ @
  _/\\_\\$@
        @@
        @
 $|   |$@
 $|   |$@
 \\__, |$@
 ____/$ @@
      @
 _  /$@
  $/$ @
 ___|$@
      @@
    $/$@
   $|$ @
 < <$  @
   $|$ @
   \\_\\$@@
 $|$@
 $|$@
 $|$@
 $|$@
 _|$@@
 \\ \\$  @
   $|$ @
   \` >$@
   $|$ @
  _/$  @@
 / _/$@
  $$  @
  $$  @
  $$  @
      @@
  _) \\ _)$@
   $_ \\$  @
  $___ \\$ @
 _/    _\\$@
          @@
 _)  _)$@
  $_ \\$ @
 $|   |$@
 \\___/$ @
        @@
 _)  _)$@
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
 _)  _)$@
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
 _)  _)$@
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
 _)  _)$@
 $|   |$@
 $|   |$@
 \\__,_|$@
        @@
  $_ \\$@
 $|  /$@
 $|\\ \\$@
 $|__/$@
 _|$   @@
160  NO-BREAK SPACE
 $ $@
 $ $@
 $ $@
 $ $@
 $ $@@
161  INVERTED EXCLAMATION MARK
 _)$@
 $|$@
 $|$@
 _|$@
    @@
162  CENT SIGN
   $|$ @
  $__)$@
 $($   @
 \\   )$@
   _|$ @@
163  POUND SIGN
    $,_\\$ @
 _  |_$   @
   $|$    @
  _,____|$@
          @@
164  CURRENCY SIGN
 \\  _  /$@
  $(   |$@
  $___ \\$@
 \\/    /$@
         @@
165  YEN SIGN
 \\ \\ /$ @
 __ __|$@
 __ __|$@
   _|$  @
        @@
166  BROKEN BAR
 $|$@
 _|$@
    @
 $|$@
 _|$@@
167  SECTION SIGN
    $_)$@
  $\\ \\$ @
 \\ \\\\ \\$@
  \\ \\_/$@
 (__/$  @@
168  DIAERESIS
 _)  _)$@
 $    $ @
 $    $ @
 $    $ @
        @@
169  COPYRIGHT SIGN
   $    \\$  @
  $  __| \\$ @
 $  (     |$@
 \\ \\___| /$ @
  \\_____/$  @@
170  FEMININE ORDINAL INDICATOR
  $_\` |$@
 \\__,_|$@
 _____|$@
   $$   @
        @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
   $/ /$@
  $/ /$ @
 \\ \\ \\$ @
  \\_\\_\\$@
        @@
172  NOT SIGN
         @
 _____ |$@
      _|$@
    $$   @
         @@
173  SOFT HYPHEN
        @
        @
 _____|$@
   $$   @
        @@
174  REGISTERED SIGN
   $    \\$  @
  $  _ \\ \\$ @
 $     /  |$@
 \\  _|_\\ /$ @
  \\_____/$  @@
175  MACRON
 _____|$@
   $$   @
   $$   @
   $$   @
        @@
176  DEGREE SIGN
  $ \\$ @
 $(  |$@
 \\__/$ @
   $$  @
       @@
177  PLUS-MINUS SIGN
   $|$  @
 _   _|$@
   _|$  @
 _____|$@
        @@
178  SUPERSCRIPT TWO
 _  )$@
  $/$ @
 ___|$@
  $$  @
      @@
179  SUPERSCRIPT THREE
 __ /$@
  _ \\$@
 ___/$@
  $$  @
      @@
180  ACUTE ACCENT
 _/$@
 $$ @
 $$ @
 $$ @
    @@
181  MICRO SIGN
        @
 $|   |$@
 $|   |$@
 $._,_|$@
 _|$    @@
182  PILCROW SIGN
  $    |$@
 $(  | |$@
 \\__ | |$@
    _|_|$@
         @@
183  MIDDLE DOT
    @
 _)$@
 $$ @
 $$ @
    @@
184  CEDILLA
    @
    @
    @
 $$ @
 _)$@@
185  SUPERSCRIPT ONE
 _ |$@
  $|$@
  _|$@
  $$ @
     @@
186  MASCULINE ORDINAL INDICATOR
  $_ \\$@
 \\___/$@
 ____|$@
   $$  @
       @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
 \\ \\ \\$ @
  \\ \\ \\$@
   $/ /$@
  _/_/$ @
        @@
188  VULGAR FRACTION ONE QUARTER
 _ |   /$    @
  $|  / | |$ @
  _| / __ _|$@
   _/    _|$ @
             @@
189  VULGAR FRACTION ONE HALF
 _ |   /$   @
  $|  /_  )$@
  _| /   /$ @
   _/  ___|$@
            @@
190  VULGAR FRACTION THREE QUARTERS
 __ /   /$    @
  _ \\  / | |$ @
 ___/ / __ _|$@
    _/    _|$ @
              @@
191  INVERTED QUESTION MARK
   _)$ @
   $|$ @
  $/$  @
 \\___|$@
       @@
192  LATIN CAPITAL LETTER A WITH GRAVE
  \\_\\$  @
   $\\$  @
  $_ \\$ @
 _/  _\\$@
        @@
193  LATIN CAPITAL LETTER A WITH ACUTE
   _/$  @
   $\\$  @
  $_ \\$ @
 _/  _\\$@
        @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
   /\\\\$ @
   $\\$  @
  $_ \\$ @
 _/  _\\$@
        @@
195  LATIN CAPITAL LETTER A WITH TILDE
  / _/$ @
   $\\$  @
  $_ \\$ @
 _/  _\\$@
        @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
  _) \\ _)$@
   $_ \\$  @
  $___ \\$ @
 _/    _\\$@
          @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
    ( )$  @
   $_ \\$  @
  $___ \\$ @
 _/    _\\$@
          @@
198  LATIN CAPITAL LETTER AE
    $ ____|$@
   $/ __|$  @
  $__ |$    @
 _/  _____|$@
            @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
  $___|$@
 $|$    @
 $|$    @
 \\____|$@
    _)$ @@
200  LATIN CAPITAL LETTER E WITH GRAVE
  \\_\\$  @
 $____|$@
 $ _|$  @
 _____|$@
        @@
201  LATIN CAPITAL LETTER E WITH ACUTE
   _/$  @
 $____|$@
 $ _|$  @
 _____|$@
        @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
   /\\\\$ @
 $____|$@
 $ _|_$ @
 _____|$@
        @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
 _)  _)$@
 $____|$@
 $ _|$  @
 _____|$@
        @@
204  LATIN CAPITAL LETTER I WITH GRAVE
 \\_\\$ @
 _ _|$@
 | |$ @
 ___|$@
      @@
205  LATIN CAPITAL LETTER I WITH ACUTE
  _/$ @
 _ _|$@
  $|$ @
 ___|$@
      @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
 /\\\\$ @
 _ _|$@
  $|$ @
 ___|$@
      @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
 _)  _)$@
  _ _|$ @
   $|$  @
  ___|$ @
        @@
208  LATIN CAPITAL LETTER ETH
    __ \\$ @
    |   |$@
 __ __| |$@
   ____/$ @
          @@
209  LATIN CAPITAL LETTER N WITH TILDE
  / _/$@
 $ \\ |$@
 $.  |$@
 _|\\_|$@
       @@
210  LATIN CAPITAL LETTER O WITH GRAVE
  \\_\\$  @
  $_ \\$ @
 $|   |$@
 \\___/$ @
        @@
211  LATIN CAPITAL LETTER O WITH ACUTE
   _/$  @
  $_ \\$ @
 $|   |$@
 \\___/$ @
        @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   /\\\\$ @
  $_ \\$ @
 $|   |$@
 \\___/$ @
        @@
213  LATIN CAPITAL LETTER O WITH TILDE
  / _/$ @
  $_ \\$ @
 $|   |$@
 \\___/$ @
        @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
 _)  _)$@
  $_ \\$ @
 $|   |$@
 \\___/$ @
        @@
215  MULTIPLICATION SIGN
      @
  \\ \\$@
 ,  '$@
 \\/\\/$@
      @@
216  LATIN CAPITAL LETTER O WITH STROKE
  $_ /$ @
 $| / |$@
 $ /  |$@
 _/__/$ @
        @@
217  LATIN CAPITAL LETTER U WITH GRAVE
  \\_\\$  @
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
218  LATIN CAPITAL LETTER U WITH ACUTE
   _/$  @
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
   /\\\\$ @
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
 _)  _)$@
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
    _/$ @
 \\ \\  /$@
  \\  /$ @
   _|$  @
        @@
222  LATIN CAPITAL LETTER THORN
 $|$    @
 $ __ \\$@
 $ ___/$@
 _|$    @
        @@
223  LATIN SMALL LETTER SHARP S
  $_ \\$@
 $|  /$@
 $|\\ \\$@
 $|__/$@
 _|$   @@
224  LATIN SMALL LETTER A WITH GRAVE
  \\_\\$  @
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
225  LATIN SMALL LETTER A WITH ACUTE
   _/_$ @
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
   /\\\\$ @
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
227  LATIN SMALL LETTER A WITH TILDE
  / _/$ @
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
228  LATIN SMALL LETTER A WITH DIAERESIS
 _)  _)$@
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
229  LATIN SMALL LETTER A WITH RING ABOVE
   ( )$ @
  $_ '|$@
 $(   |$@
 \\__,_|$@
        @@
230  LATIN SMALL LETTER AE
           @
  $_\`  _ \\$@
 $(    __/$@
 \\__,____|$@
           @@
231  LATIN SMALL LETTER C WITH CEDILLA
       @
  $__|$@
 $($   @
 \\___|$@
   _)$ @@
232  LATIN SMALL LETTER E WITH GRAVE
  \\_\\$ @
  $_ \\$@
 $ __/$@
 \\___|$@
       @@
233  LATIN SMALL LETTER E WITH ACUTE
   _/$ @
  $_ \\$@
 $ __/$@
 \\___|$@
       @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
  /\\\\$ @
  $_ \\$@
 $ __/$@
 \\___|$@
       @@
235  LATIN SMALL LETTER E WITH DIAERESIS
 _)  _)$@
  $_ \\$ @
 $ __/$ @
 \\___|$ @
        @@
236  LATIN SMALL LETTER I WITH GRAVE
 \\_\\$@
  $|$@
  $|$@
  _|$@
     @@
237  LATIN SMALL LETTER I WITH ACUTE
 _/$@
 $|$@
 $|$@
 _|$@
    @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
 /\\\\$@
 $|$ @
 $|$ @
 _|$ @
     @@
239  LATIN SMALL LETTER I WITH DIAERESIS
 _)  _)$@
   $|$  @
   $|$  @
   _|$  @
        @@
240  LATIN SMALL LETTER ETH
   \`  <$ @
   \\/\\ |$@
  $__\` |$@
 \\____/$ @
         @@
241  LATIN SMALL LETTER N WITH TILDE
  / _/$ @
 $'_ \\$ @
 $|   |$@
 _|  _|$@
        @@
242  LATIN SMALL LETTER O WITH GRAVE
  \\_\\$  @
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
243  LATIN SMALL LETTER O WITH ACUTE
   _/$  @
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
   /\\\\$ @
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
245  LATIN SMALL LETTER O WITH TILDE
  / _/$ @
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
246  LATIN SMALL LETTER O WITH DIAERESIS
 _)  _)$@
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
247  DIVISION SIGN
        @
   _)$  @
 _____|$@
   _)$  @
        @@
248  LATIN SMALL LETTER O WITH STROKE
         @
  $_ /\\$ @
 $( /  |$@
 \\_/__/$ @
         @@
249  LATIN SMALL LETTER U WITH GRAVE
  \\_\\$  @
 $|   |$@
 $|   |$@
 \\__,_|$@
        @@
250  LATIN SMALL LETTER U WITH ACUTE
   _/$  @
 $|   |$@
 $|   |$@
 \\__,_|$@
        @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   /\\\\$ @
 $|   |$@
 $|   |$@
 \\__,_|$@
        @@
252  LATIN SMALL LETTER U WITH DIAERESIS
 _)  _)$@
 $|   |$@
 $|   |$@
 \\__,_|$@
        @@
253  LATIN SMALL LETTER Y WITH ACUTE
   _/$  @
 $|   |$@
 $|   |$@
 \\__, |$@
 ____/$ @@
254  LATIN SMALL LETTER THORN
 $|$    @
 $__ \\$ @
 $|   |$@
 $.__/$ @
 _|$    @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
 _)  _)$@
 $|   |$@
 $|   |$@
 \\__, |$@
 ____/$ @@
`})),ko,Ao=e((()=>{ko=`flf2a$ 8 6 27 0 10 0 576
Block by Glenn Chappell 4/93 -- straight version of Lean
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

$  $@
$  $@
$  $@
$  $@
$  $@
$  $@
$  $@
$  $@@
   $$@
 _| $@
 _| $@
 _| $@
   $$@
 _| $@
   $$@
     @@
 _|  _| $@
 _|  _| $@
       $$@
   $$    @
   $$    @
   $$    @
         @
         @@
         $$  @
   _|  _|   $@
 _|_|_|_|_| $@
   _|  _|   $@
 _|_|_|_|_| $@
   _|  _|   $@
         $$  @
             @@
     $$  @
   _|   $@
 _|_|_| $@
 _|_|   $@
   _|_| $@
 _|_|_| $@
   _|   $@
     $$  @@
           $$@
 _|_|    _| $@
 _|_|  _|   $@
     _|     $@
   _|  _|_| $@
 _|    _|_| $@
           $$@
             @@
     $$      @
   _|   $    @
 _|  _|     $@
   _|_|  _| $@
 _|    _|   $@
   _|_|  _| $@
           $$@
             @@
   _| $@
 _|   $@
   $$  @
 $$    @
 $$    @
 $$    @
       @
       @@
   _| $@
 _|   $@
 _| $  @
 _| $  @
 _| $  @
 _|   $@
   _| $@
     $$@@
 _|   $@
   _| $@
   _| $@
   _| $@
   _| $@
   _| $@
 _|   $@
   $$  @@
           $$@
 _|  _|  _| $@
   _|_|_|   $@
 _|_|_|_|_| $@
   _|_|_|   $@
 _|  _|  _| $@
           $$@
             @@
       $$    @
     _| $    @
     _|     $@
 _|_|_|_|_| $@
     _|     $@
     _| $    @
       $$    @
             @@
       @
       @
       @
       @
     $$@
   _| $@
 _|   $@
   $$  @@
             @
             @
           $$@
 _|_|_|_|_| $@
           $$@
             @
             @
             @@
     @
     @
     @
     @
   $$@
 _| $@
   $$@
     @@
           $$@
         _| $@
       _|   $@
     _|   $  @
   _|   $    @
 _|   $      @
   $$        @
             @@
     $$  @
   _|   $@
 _|  _| $@
 _|  _| $@
 _|  _| $@
   _|   $@
     $$  @
         @@
     $$@
   _| $@
 _|_| $@
   _| $@
   _| $@
   _| $@
     $$@
       @@
       $$  @
   _|_|   $@
 _|    _| $@
     _|   $@
   _|     $@
 _|_|_|_| $@
         $$@
           @@
       $$  @
 _|_|_|   $@
       _| $@
   _|_|   $@
       _| $@
 _|_|_|   $@
       $$  @
           @@
       $$  @
 _|  _| $  @
 _|  _|   $@
 _|_|_|_| $@
     _|   $@
     _| $  @
       $$  @
           @@
         $$@
 _|_|_|_| $@
 _|       $@
 _|_|_|   $@
       _| $@
 _|_|_|   $@
       $$  @
           @@
         $$@
   _|_|_| $@
 _|       $@
 _|_|_|   $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
           $$@
 _|_|_|_|_| $@
         _| $@
       _|   $@
     _|   $  @
   _|   $    @
     $$      @
             @@
       $$  @
   _|_|   $@
 _|    _| $@
   _|_|   $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
       $$  @
   _|_|   $@
 _|    _| $@
   _|_|_| $@
       _| $@
 _|_|_|   $@
       $$  @
           @@
     @
   $$@
 _| $@
   $$@
   $$@
 _| $@
   $$@
     @@
       @
     $$@
   _| $@
     $$@
     $$@
   _| $@
 _|   $@
   $$  @@
       $$@
     _| $@
   _|   $@
 _|   $  @
   _|   $@
     _| $@
       $$@
         @@
             @
           $$@
 _|_|_|_|_| $@
           $$@
 _|_|_|_|_| $@
           $$@
             @
             @@
   $$    @
 _|   $  @
   _|   $@
     _| $@
   _|   $@
 _|   $  @
   $$    @
         @@
     $$  @
 _|_|   $@
     _| $@
 _|_|   $@
     $$  @
 _| $    @
   $$    @
         @@
               $$  @
     _|_|_|_|_|   $@
   _|          _| $@
 _|    _|_|_|  _| $@
 _|  _|    _|  _| $@
 _|    _|_|_|_|   $@
   _|             $@
     _|_|_|_|_|_| $@@
       $$  @
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|_|_|   $@
 _|    _| $@
 _|_|_|   $@
       $$  @
           @@
         $$@
   _|_|_| $@
 _|       $@
 _|   $    @
 _|       $@
   _|_|_| $@
         $$@
           @@
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
 _|    _| $@
 _|_|_|   $@
       $$  @
           @@
         $$@
 _|_|_|_| $@
 _|       $@
 _|_|_| $  @
 _|       $@
 _|_|_|_| $@
         $$@
           @@
         $$@
 _|_|_|_| $@
 _|       $@
 _|_|_| $  @
 _|     $  @
 _| $      @
   $$      @
           @@
         $$@
   _|_|_| $@
 _|       $@
 _|  _|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
         $$@
 _|    _| $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
       $$@
 _|_|_| $@
   _|   $@
   _| $  @
   _|   $@
 _|_|_| $@
       $$@
         @@
         $$@
       _| $@
       _| $@
       _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
         $$@
 _|    _| $@
 _|  _|   $@
 _|_|   $  @
 _|  _|   $@
 _|    _| $@
         $$@
           @@
   $$      @
 _| $      @
 _| $      @
 _| $      @
 _|       $@
 _|_|_|_| $@
         $$@
           @@
           $$@
 _|      _| $@
 _|_|  _|_| $@
 _|  _|  _| $@
 _|      _| $@
 _|      _| $@
           $$@
             @@
           $$@
 _|      _| $@
 _|_|    _| $@
 _|  _|  _| $@
 _|    _|_| $@
 _|      _| $@
           $$@
             @@
       $$  @
   _|_|   $@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|_|_|   $@
 _|     $  @
 _| $      @
   $$      @
           @@
       $$    @
   _|_|   $  @
 _|    _| $  @
 _|  _|_| $  @
 _|    _|   $@
   _|_|  _| $@
           $$@
             @@
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
         $$@
   _|_|_| $@
 _|       $@
   _|_|   $@
       _| $@
 _|_|_|   $@
       $$  @
           @@
           $$@
 _|_|_|_|_| $@
     _|     $@
     _| $    @
     _| $    @
     _| $    @
       $$    @
             @@
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
           $$@
 _|      _| $@
 _|      _| $@
 _|      _| $@
   _|  _|   $@
     _|   $  @
       $$    @
             @@
               $$@
 _|          _| $@
 _|          _| $@
 _|    _|    _| $@
   _|  _|  _|   $@
     _|  _|   $  @
           $$    @
                 @@
           $$@
 _|      _| $@
   _|  _|   $@
     _|   $  @
   _|  _|   $@
 _|      _| $@
           $$@
             @@
           $$@
 _|      _| $@
   _|  _|   $@
     _|   $  @
     _| $    @
     _| $    @
       $$    @
             @@
           $$@
 _|_|_|_|_| $@
       _|   $@
     _|   $  @
   _|       $@
 _|_|_|_|_| $@
           $$@
             @@
 _|_| $@
 _|   $@
 _| $  @
 _| $  @
 _| $  @
 _|   $@
 _|_| $@
     $$@@
   $$        @
 _|   $      @
   _|   $    @
     _|   $  @
       _|   $@
         _| $@
           $$@
             @@
 _|_| $@
   _| $@
   _| $@
   _| $@
   _| $@
   _| $@
 _|_| $@
     $$@@
   _|   $@
 _|  _| $@
       $$@
   $$    @
   $$    @
   $$    @
         @
         @@
             @
             @
     $$      @
     $$      @
     $$      @
     $$      @
           $$@
 _|_|_|_|_| $@@
 _|   $@
   _| $@
     $$@
   $$  @
   $$  @
   $$  @
       @
       @@
           @
         $$@
   _|_|_| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
   $$      @
 _|     $  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
 _|_|_|   $@
       $$  @
           @@
           @
         $$@
   _|_|_| $@
 _|       $@
 _|       $@
   _|_|_| $@
         $$@
           @@
         $$@
       _| $@
   _|_|_| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
           @
       $$  @
   _|_|   $@
 _|_|_|_| $@
 _|       $@
   _|_|_| $@
         $$@
           @@
         $$@
     _|_| $@
   _|     $@
 _|_|_|_| $@
   _|     $@
   _| $    @
     $$    @
           @@
           @
         $$@
   _|_|_| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
       _| $@
   _|_|   $@@
   $$      @
 _|     $  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
   $$@
 _| $@
   $$@
 _| $@
 _| $@
 _| $@
   $$@
     @@
     $$@
   _| $@
     $$@
   _| $@
   _| $@
   _| $@
   _| $@
 _|   $@@
   $$      @
 _|     $  @
 _|  _| $  @
 _|_|   $  @
 _|  _|   $@
 _|    _| $@
         $$@
           @@
   $$@
 _| $@
 _| $@
 _| $@
 _| $@
 _| $@
   $$@
     @@
                 @
             $$  @
 _|_|_|  _|_|   $@
 _|    _|    _| $@
 _|    _|    _| $@
 _|    _|    _| $@
               $$@
                 @@
           @
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
           @
       $$  @
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
           @
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
 _|_|_|   $@
 _|     $  @
 _| $      @@
           @
         $$@
   _|_|_| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
       _| $@
       _| $@@
           @
         $$@
 _|  _|_| $@
 _|_|     $@
 _|   $    @
 _| $      @
   $$      @
           @@
           @
         $$@
   _|_|_| $@
 _|_|     $@
     _|_| $@
 _|_|_|   $@
       $$  @
           @@
     $$    @
   _|     $@
 _|_|_|_|  @
   _|     $@
   _|     $@
     _|_| $@
         $$@
           @@
           @
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
             @
           $$@
 _|      _| $@
 _|      _| $@
   _|  _|   $@
     _|   $  @
       $$    @
             @@
                     @
                   $$@
 _|      _|      _| $@
 _|      _|      _| $@
   _|  _|  _|  _|   $@
     _|      _|   $  @
               $$    @
                     @@
           @
         $$@
 _|    _| $@
   _|_|   $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
           @
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
       _| $@
   _|_|   $@@
           @
         $$@
 _|_|_|_| $@
     _|   $@
   _|     $@
 _|_|_|_| $@
         $$@
           @@
     _| $@
   _|   $@
   _|   $@
 _|   $  @
   _|   $@
   _|   $@
     _| $@
       $$@@
 _| $@
 _| $@
 _| $@
 _| $@
 _| $@
 _| $@
 _| $@
 _| $@@
 _|   $  @
   _|   $@
   _|   $@
     _| $@
   _|   $@
   _|   $@
 _|   $  @
   $$    @@
   _|  _| $@
 _|  _|   $@
       $$  @
     $$    @
     $$    @
     $$    @
           @
           @@
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
 _|    _| $@
         $$@
   _|_|_| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
       $$  @
   _|_|   $@
 _|    _| $@
 _|  _|   $@
 _|    _| $@
 _|  _|   $@
 _|     $  @
   $$      @@
160  NO-BREAK SPACE
 $  $@
 $  $@
 $  $@
 $  $@
 $  $@
 $  $@
 $  $@
 $  $@@
161  INVERTED EXCLAMATION MARK
   $$@
 _| $@
   $$@
 _| $@
 _| $@
 _| $@
   $$@
     @@
162  CENT SIGN
       $$  @
     _|   $@
   _|_|_| $@
 _|  _|   $@
 _|  _|   $@
   _|_|_| $@
     _|   $@
       $$  @@
163  POUND SIGN
         $$    @
     _|_|   $  @
   _|    _| $  @
 _|_|_|     $  @
   _|         $@
 _|_|_|    _| $@
 _|_|  _|_|   $@
               @@
164  CURRENCY SIGN
             $$@
 _|        _| $@
   _|_|_|_|   $@
   _|    _| $  @
   _|    _| $  @
   _|_|_|_|   $@
 _|        _| $@
             $$@@
165  YEN SIGN
           $$@
 _|      _| $@
   _|  _|   $@
 _|_|_|_|_| $@
     _|     $@
 _|_|_|_|_| $@
     _|     $@
       $$    @@
166  BROKEN BAR
 _| $@
 _| $@
 _| $@
   $$@
   $$@
 _| $@
 _| $@
 _| $@@
167  SECTION SIGN
   _|_| $@
 _|     $@
   _|   $@
 _|  _| $@
   _|   $@
     _| $@
 _|_|   $@
     $$  @@
168  DIAERESIS
 _|    _| $@
         $$@
 $      $  @
 $      $  @
 $      $  @
 $      $  @
           @
           @@
169  COPYRIGHT SIGN
     _|_|_|_|   $  @
   _|        _|   $@
 _|    _|_|_|  _| $@
 _|  _|        _| $@
 _|  _|        _| $@
 _|    _|_|_|  _| $@
   _|        _|   $@
     _|_|_|_|   $  @@
170  FEMININE ORDINAL INDICATOR
         $$@
   _|_|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
 _|_|_|_| $@
           @
           @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
           $$@
     _|  _| $@
   _|  _|   $@
 _|  _|   $  @
   _|  _|   $@
     _|  _| $@
           $$@
             @@
172  NOT SIGN
             @
             @
           $$@
 _|_|_|_|_| $@
         _| $@
           $$@
             @
             @@
173  SOFT HYPHEN
           @
           @
         $$@
 _|_|_|_| $@
         $$@
     $$    @
           @
           @@
174  REGISTERED SIGN
     _|_|_|_|   $  @
   _|        _|   $@
 _|  _|_|_|    _| $@
 _|  _|    _|  _| $@
 _|  _|_|_|    _| $@
 _|  _|    _|  _| $@
   _|        _|   $@
     _|_|_|_|   $  @@
175  MACRON
 _|_|_|_|_| $@
           $$@
     $$      @
     $$      @
     $$      @
     $$      @
             @
             @@
176  DEGREE SIGN
   _|   $@
 _|  _| $@
   _|   $@
     $$  @
   $$    @
   $$    @
         @
         @@
177  PLUS-MINUS SIGN
       $$    @
     _| $    @
     _|     $@
 _|_|_|_|_| $@
     _|     $@
 _|_|_|_|_| $@
           $$@
             @@
178  SUPERSCRIPT TWO
     $$  @
 _|_|   $@
     _| $@
   _|   $@
 _|_|_| $@
       $$@
         @
         @@
179  SUPERSCRIPT THREE
       $$@
 _|_|_| $@
   _|   $@
     _| $@
 _|_|   $@
     $$  @
         @
         @@
180  ACUTE ACCENT
   _| $@
 _|   $@
   $$  @
 $$    @
 $$    @
 $$    @
       @
       @@
181  MICRO SIGN
           @
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
 _|_|_|_| $@
 _|       $@
 _| $      @@
182  PILCROW SIGN
           $$@
   _|_|_|_| $@
 _|_|_|  _| $@
   _|_|  _| $@
     _|  _| $@
     _|  _| $@
           $$@
             @@
183  MIDDLE DOT
     @
     @
   $$@
 _| $@
   $$@
 $$  @
     @
     @@
184  CEDILLA
       @
       @
       @
       @
       @
     $$@
   _| $@
 _|_| $@@
185  SUPERSCRIPT ONE
     $$@
   _| $@
 _|_| $@
   _| $@
   _| $@
     $$@
       @
       @@
186  MASCULINE ORDINAL INDICATOR
       $$  @
   _|_|   $@
 _|    _| $@
   _|_|   $@
         $$@
 _|_|_|_| $@
           @
           @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
       $$    @
 _|  _|   $  @
   _|  _|   $@
     _|  _| $@
   _|  _|   $@
 _|  _|   $  @
       $$    @
             @@
188  VULGAR FRACTION ONE QUARTER
               $$        @
   _|        _|       $  @
 _|_|      _|  _|  _| $  @
   _|    _|    _|  _|   $@
   _|  _|      _|_|_|_| $@
     _|            _|   $@
                     $$  @
                         @@
189  VULGAR FRACTION ONE HALF
               $$      @
   _|        _|     $  @
 _|_|      _|  _|_|   $@
   _|    _|        _| $@
   _|  _|        _|   $@
     _|        _|_|_| $@
                     $$@
                       @@
190  VULGAR FRACTION THREE QUARTERS
               $$        @
 _|_|_|      _|       $  @
   _|      _|  _|  _| $  @
     _|  _|    _|  _|   $@
 _|_|  _|      _|_|_|_| $@
     _|            _|   $@
                     $$  @
                         @@
191  INVERTED QUESTION MARK
       $$@
     _| $@
       $$@
   _|_| $@
 _|     $@
   _|_| $@
       $$@
         @@
192  LATIN CAPITAL LETTER A WITH GRAVE
   _|   $  @
     _| $  @
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
193  LATIN CAPITAL LETTER A WITH ACUTE
     _| $  @
   _|   $  @
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
         $$@
   _|_|   $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
195  LATIN CAPITAL LETTER A WITH TILDE
   _|  _| $@
 _|  _|   $@
       $$  @
   _|_|   $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
   _|_|   $@
 _|    _| $@
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
198  LATIN CAPITAL LETTER AE
               $$@
   _|_|_|_|_|_| $@
 _|    _|       $@
 _|_|_|_|_|_| $  @
 _|    _|       $@
 _|    _|_|_|_| $@
               $$@
                 @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
         $$@
   _|_|_| $@
 _|       $@
 _|   $    @
 _|       $@
   _|_|_| $@
     _|   $@
   _|_| $  @@
200  LATIN CAPITAL LETTER E WITH GRAVE
   _|   $  @
     _|   $@
 _|_|_|_| $@
 _|_|_| $  @
 _|       $@
 _|_|_|_| $@
         $$@
           @@
201  LATIN CAPITAL LETTER E WITH ACUTE
     _| $  @
   _|     $@
 _|_|_|_| $@
 _|_|_| $  @
 _|       $@
 _|_|_|_| $@
         $$@
           @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|_|_| $  @
 _|       $@
 _|_|_|_| $@
         $$@
           @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
 _|    _| $@
         $$@
 _|_|_|_| $@
 _|_|_| $  @
 _|       $@
 _|_|_|_| $@
         $$@
           @@
204  LATIN CAPITAL LETTER I WITH GRAVE
 _|   $  @
   _|   $@
 _|_|_| $@
   _|   $@
   _|   $@
 _|_|_| $@
       $$@
         @@
205  LATIN CAPITAL LETTER I WITH ACUTE
     _| $@
   _|   $@
 _|_|_| $@
   _|   $@
   _|   $@
 _|_|_| $@
       $$@
         @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
   _|   $@
 _|  _| $@
 _|_|_| $@
   _|   $@
   _|   $@
 _|_|_| $@
       $$@
         @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
 _|  _| $@
       $$@
 _|_|_| $@
   _|   $@
   _|   $@
 _|_|_| $@
       $$@
         @@
208  LATIN CAPITAL LETTER ETH
         $$  @
   _|_|_|   $@
   _|    _| $@
 _|_|_|  _| $@
   _|    _| $@
   _|_|_|   $@
         $$  @
             @@
209  LATIN CAPITAL LETTER N WITH TILDE
   _|  _| $@
 _|  _|   $@
 _|    _| $@
 _|_|  _| $@
 _|  _|_| $@
 _|    _| $@
         $$@
           @@
210  LATIN CAPITAL LETTER O WITH GRAVE
   _|   $  @
     _| $  @
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
211  LATIN CAPITAL LETTER O WITH ACUTE
     _| $  @
   _|   $  @
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
213  LATIN CAPITAL LETTER O WITH TILDE
   _|  _| $@
 _|  _|   $@
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
215  MULTIPLICATION SIGN
         @
       $$@
 _|  _| $@
   _|   $@
 _|  _| $@
       $$@
         @
         @@
216  LATIN CAPITAL LETTER O WITH STROKE
           $$@
   _|_|_|_| $@
 _|    _|_| $@
 _|  _|  _| $@
 _|_|    _| $@
 _|_|_|_|   $@
         $$  @
             @@
217  LATIN CAPITAL LETTER U WITH GRAVE
   _|   $  @
     _| $  @
         $$@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
218  LATIN CAPITAL LETTER U WITH ACUTE
     _| $  @
   _|   $  @
         $$@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
       _| $  @
     _|     $@
 _|      _| $@
   _|  _|   $@
     _|   $  @
     _| $    @
       $$    @
             @@
222  LATIN CAPITAL LETTER THORN
   $$      @
 _|     $  @
 _|_|_|   $@
 _|    _| $@
 _|_|_|   $@
 _|     $  @
   $$      @
           @@
223  LATIN SMALL LETTER SHARP S
       $$  @
   _|_|   $@
 _|    _| $@
 _|  _|   $@
 _|    _| $@
 _|  _|   $@
 _|     $  @
   $$      @@
224  LATIN SMALL LETTER A WITH GRAVE
   _|   $  @
     _| $  @
         $$@
   _|_|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
225  LATIN SMALL LETTER A WITH ACUTE
       _| $@
     _|   $@
         $$@
   _|_|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
     _|   $@
   _|  _| $@
         $$@
   _|_|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
227  LATIN SMALL LETTER A WITH TILDE
   _|  _| $@
 _|  _|   $@
         $$@
   _|_|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
228  LATIN SMALL LETTER A WITH DIAERESIS
 _|    _| $@
         $$@
   _|_|_| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
229  LATIN SMALL LETTER A WITH RING ABOVE
     _|   $@
   _|  _| $@
     _|   $@
   _|_|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
230  LATIN SMALL LETTER AE
                   @
               $$  @
   _|_|_|  _|_|   $@
 _|    _|_|_|_|_| $@
 _|    _|_|       $@
   _|_|_|  _|_|_| $@
                 $$@
                   @@
231  LATIN SMALL LETTER C WITH CEDILLA
           @
         $$@
   _|_|_| $@
 _|       $@
 _|       $@
   _|_|_| $@
     _|   $@
   _|_| $  @@
232  LATIN SMALL LETTER E WITH GRAVE
   _|     $@
     _| $  @
   _|_|   $@
 _|_|_|_| $@
 _|       $@
   _|_|_| $@
         $$@
           @@
233  LATIN SMALL LETTER E WITH ACUTE
       _| $@
     _|   $@
   _|_|   $@
 _|_|_|_| $@
 _|       $@
   _|_|_| $@
         $$@
           @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
   _|_|   $@
 _|_|_|_| $@
 _|       $@
   _|_|_| $@
         $$@
           @@
235  LATIN SMALL LETTER E WITH DIAERESIS
 _|    _| $@
         $$@
   _|_|   $@
 _|_|_|_| $@
 _|       $@
   _|_|_| $@
         $$@
           @@
236  LATIN SMALL LETTER I WITH GRAVE
 _|   $@
   _| $@
     $$@
   _| $@
   _| $@
   _| $@
     $$@
       @@
237  LATIN SMALL LETTER I WITH ACUTE
   _| $@
 _|   $@
   $$  @
 _| $  @
 _| $  @
 _| $  @
   $$  @
       @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
   _|   $@
 _|  _| $@
       $$@
   _| $  @
   _| $  @
   _| $  @
     $$  @
         @@
239  LATIN SMALL LETTER I WITH DIAERESIS
 _|  _| $@
       $$@
   _| $  @
   _| $  @
   _| $  @
   _| $  @
     $$  @
         @@
240  LATIN SMALL LETTER ETH
 _|  _| $  @
   _|   $  @
 _|  _|   $@
   _|_|_| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
241  LATIN SMALL LETTER N WITH TILDE
   _|  _| $@
 _|  _|   $@
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
242  LATIN SMALL LETTER O WITH GRAVE
   _|   $  @
     _| $  @
       $$  @
   _|_|   $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
243  LATIN SMALL LETTER O WITH ACUTE
     _| $  @
   _|   $  @
       $$  @
   _|_|   $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
245  LATIN SMALL LETTER O WITH TILDE
   _|_|_| $@
 _|  _|   $@
       $$  @
   _|_|   $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
246  LATIN SMALL LETTER O WITH DIAERESIS
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
247  DIVISION SIGN
       $$    @
     _| $    @
           $$@
 _|_|_|_|_| $@
           $$@
     _| $    @
       $$    @
             @@
248  LATIN SMALL LETTER O WITH STROKE
           @
         $$@
   _|_|_| $@
 _|  _|_| $@
 _|_|  _| $@
 _|_|_|   $@
       $$  @
           @@
249  LATIN SMALL LETTER U WITH GRAVE
 _|   $    @
   _| $    @
         $$@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
250  LATIN SMALL LETTER U WITH ACUTE
       _| $@
     _|   $@
         $$@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
252  LATIN SMALL LETTER U WITH DIAERESIS
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
253  LATIN SMALL LETTER Y WITH ACUTE
     _| $  @
   _|   $  @
         $$@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
       _| $@
   _|_|   $@@
254  LATIN SMALL LETTER THORN
   $$      @
 _|     $  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
 _|_|_|   $@
 _|     $  @
 _| $      @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
       _| $@
   _|_|   $@@
`})),jo,Mo=e((()=>{jo=`flf2a 4 3 8 15 11 0 10127 242
Bubble by Glenn Chappell 4/93
Includes characters 128-255
Enhanced for Latin-2,3,4 by John Cowan <cowan@ccil.org>
Latin character sets supported only if your screen font does
figlet release 2.2 -- November 1996
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.
 @
 @
 @
 @@
   _  @
  / \\ @
 ( ! )@
  \\_/ @@
   _  @
  / \\ @
 ( " )@
  \\_/ @@
   _  @
  / \\ @
 ( # )@
  \\_/ @@
   _  @
  / \\ @
 ( $ )@
  \\_/ @@
   _  @
  / \\ @
 ( % )@
  \\_/ @@
   _  @
  / \\ @
 ( & )@
  \\_/ @@
   _  @
  / \\ @
 ( ' )@
  \\_/ @@
   _  @
  / \\ @
 ( ( )@
  \\_/ @@
   _  @
  / \\ @
 ( ) )@
  \\_/ @@
   _  @
  / \\ @
 ( * )@
  \\_/ @@
   _  @
  / \\ @
 ( + )@
  \\_/ @@
   _  @
  / \\ @
 ( , )@
  \\_/ @@
   _  @
  / \\ @
 ( - )@
  \\_/ @@
   _  @
  / \\ @
 ( . )@
  \\_/ @@
   _  @
  / \\ @
 ( / )@
  \\_/ @@
   _  @
  / \\ @
 ( 0 )@
  \\_/ @@
   _  @
  / \\ @
 ( 1 )@
  \\_/ @@
   _  @
  / \\ @
 ( 2 )@
  \\_/ @@
   _  @
  / \\ @
 ( 3 )@
  \\_/ @@
   _  @
  / \\ @
 ( 4 )@
  \\_/ @@
   _  @
  / \\ @
 ( 5 )@
  \\_/ @@
   _  @
  / \\ @
 ( 6 )@
  \\_/ @@
   _  @
  / \\ @
 ( 7 )@
  \\_/ @@
   _  @
  / \\ @
 ( 8 )@
  \\_/ @@
   _  @
  / \\ @
 ( 9 )@
  \\_/ @@
   _  @
  / \\ @
 ( : )@
  \\_/ @@
   _  @
  / \\ @
 ( ; )@
  \\_/ @@
   _  @
  / \\ @
 ( < )@
  \\_/ @@
   _  @
  / \\ @
 ( = )@
  \\_/ @@
   _  @
  / \\ @
 ( > )@
  \\_/ @@
   _  @
  / \\ @
 ( ? )@
  \\_/ @@
   _  @
  / \\ @
 ( @ )@
  \\_/ @@
   _  @
  / \\ @
 ( A )@
  \\_/ @@
   _  @
  / \\ @
 ( B )@
  \\_/ @@
   _  @
  / \\ @
 ( C )@
  \\_/ @@
   _  @
  / \\ @
 ( D )@
  \\_/ @@
   _  @
  / \\ @
 ( E )@
  \\_/ @@
   _  @
  / \\ @
 ( F )@
  \\_/ @@
   _  @
  / \\ @
 ( G )@
  \\_/ @@
   _  @
  / \\ @
 ( H )@
  \\_/ @@
   _  @
  / \\ @
 ( I )@
  \\_/ @@
   _  @
  / \\ @
 ( J )@
  \\_/ @@
   _  @
  / \\ @
 ( K )@
  \\_/ @@
   _  @
  / \\ @
 ( L )@
  \\_/ @@
   _  @
  / \\ @
 ( M )@
  \\_/ @@
   _  @
  / \\ @
 ( N )@
  \\_/ @@
   _  @
  / \\ @
 ( O )@
  \\_/ @@
   _  @
  / \\ @
 ( P )@
  \\_/ @@
   _  @
  / \\ @
 ( Q )@
  \\_/ @@
   _  @
  / \\ @
 ( R )@
  \\_/ @@
   _  @
  / \\ @
 ( S )@
  \\_/ @@
   _  @
  / \\ @
 ( T )@
  \\_/ @@
   _  @
  / \\ @
 ( U )@
  \\_/ @@
   _  @
  / \\ @
 ( V )@
  \\_/ @@
   _  @
  / \\ @
 ( W )@
  \\_/ @@
   _  @
  / \\ @
 ( X )@
  \\_/ @@
   _  @
  / \\ @
 ( Y )@
  \\_/ @@
   _  @
  / \\ @
 ( Z )@
  \\_/ @@
   _  @
  / \\ @
 ( [ )@
  \\_/ @@
   _  @
  / \\ @
 ( \\ )@
  \\_/ @@
   _  @
  / \\ @
 ( ] )@
  \\_/ @@
   _  @
  / \\ @
 ( ^ )@
  \\_/ @@
   _  @
  / \\ @
 ( _ )@
  \\_/ @@
   _  @
  / \\ @
 ( \` )@
  \\_/ @@
   _  @
  / \\ @
 ( a )@
  \\_/ @@
   _  @
  / \\ @
 ( b )@
  \\_/ @@
   _  @
  / \\ @
 ( c )@
  \\_/ @@
   _  @
  / \\ @
 ( d )@
  \\_/ @@
   _  @
  / \\ @
 ( e )@
  \\_/ @@
   _  @
  / \\ @
 ( f )@
  \\_/ @@
   _  @
  / \\ @
 ( g )@
  \\_/ @@
   _  @
  / \\ @
 ( h )@
  \\_/ @@
   _  @
  / \\ @
 ( i )@
  \\_/ @@
   _  @
  / \\ @
 ( j )@
  \\_/ @@
   _  @
  / \\ @
 ( k )@
  \\_/ @@
   _  @
  / \\ @
 ( l )@
  \\_/ @@
   _  @
  / \\ @
 ( m )@
  \\_/ @@
   _  @
  / \\ @
 ( n )@
  \\_/ @@
   _  @
  / \\ @
 ( o )@
  \\_/ @@
   _  @
  / \\ @
 ( p )@
  \\_/ @@
   _  @
  / \\ @
 ( q )@
  \\_/ @@
   _  @
  / \\ @
 ( r )@
  \\_/ @@
   _  @
  / \\ @
 ( s )@
  \\_/ @@
   _  @
  / \\ @
 ( t )@
  \\_/ @@
   _  @
  / \\ @
 ( u )@
  \\_/ @@
   _  @
  / \\ @
 ( v )@
  \\_/ @@
   _  @
  / \\ @
 ( w )@
  \\_/ @@
   _  @
  / \\ @
 ( x )@
  \\_/ @@
   _  @
  / \\ @
 ( y )@
  \\_/ @@
   _  @
  / \\ @
 ( z )@
  \\_/ @@
   _  @
  / \\ @
 ( { )@
  \\_/ @@
   _  @
  / \\ @
 ( | )@
  \\_/ @@
   _  @
  / \\ @
 ( } )@
  \\_/ @@
   _  @
  / \\ @
 ( ~ )@
  \\_/ @@
   _  @
  / \\ @
 ( � )@
  \\_/ @@
   _  @
  / \\ @
 ( � )@
  \\_/ @@
   _  @
  / \\ @
 ( � )@
  \\_/ @@
   _  @
  / \\ @
 ( � )@
  \\_/ @@
   _  @
  / \\ @
 ( � )@
  \\_/ @@
   _  @
  / \\ @
 ( � )@
  \\_/ @@
   _  @
  / \\ @
 ( � )@
  \\_/ @@
128
   _  @
  / \\ @
 ( � )@
  \\_/ @@
129
   _  @
  / \\ @
 ( � )@
  \\_/ @@
130
   _  @
  / \\ @
 ( � )@
  \\_/ @@
131
   _  @
  / \\ @
 ( � )@
  \\_/ @@
132
   _  @
  / \\ @
 ( � )@
  \\_/ @@
133
   _  @
  / \\ @
 ( � )@
  \\_/ @@
134
   _  @
  / \\ @
 ( � )@
  \\_/ @@
135
   _  @
  / \\ @
 ( � )@
  \\_/ @@
136
   _  @
  / \\ @
 ( � )@
  \\_/ @@
137
   _  @
  / \\ @
 ( � )@
  \\_/ @@
138
   _  @
  / \\ @
 ( � )@
  \\_/ @@
139
   _  @
  / \\ @
 ( � )@
  \\_/ @@
140
   _  @
  / \\ @
 ( � )@
  \\_/ @@
141
   _  @
  / \\ @
 ( � )@
  \\_/ @@
142
   _  @
  / \\ @
 ( � )@
  \\_/ @@
143
   _  @
  / \\ @
 ( � )@
  \\_/ @@
144
   _  @
  / \\ @
 ( � )@
  \\_/ @@
145
   _  @
  / \\ @
 ( � )@
  \\_/ @@
146
   _  @
  / \\ @
 ( � )@
  \\_/ @@
147
   _  @
  / \\ @
 ( � )@
  \\_/ @@
148
   _  @
  / \\ @
 ( � )@
  \\_/ @@
149
   _  @
  / \\ @
 ( � )@
  \\_/ @@
150
   _  @
  / \\ @
 ( � )@
  \\_/ @@
151
   _  @
  / \\ @
 ( � )@
  \\_/ @@
152
   _  @
  / \\ @
 ( � )@
  \\_/ @@
153
   _  @
  / \\ @
 ( � )@
  \\_/ @@
154
   _  @
  / \\ @
 ( � )@
  \\_/ @@
155
   _  @
  / \\ @
 ( � )@
  \\_/ @@
156
   _  @
  / \\ @
 ( � )@
  \\_/ @@
157
   _  @
  / \\ @
 ( � )@
  \\_/ @@
158
   _  @
  / \\ @
 ( � )@
  \\_/ @@
159
   _  @
  / \\ @
 ( � )@
  \\_/ @@
160  NO-BREAK SPACE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
161  INVERTED EXCLAMATION MARK
   _  @
  / \\ @
 ( � )@
  \\_/ @@
162  CENT SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
163  POUND SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
164  CURRENCY SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
165  YEN SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
166  BROKEN BAR
   _  @
  / \\ @
 ( � )@
  \\_/ @@
167  SECTION SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
168  DIAERESIS
   _  @
  / \\ @
 ( � )@
  \\_/ @@
169  COPYRIGHT SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
170  FEMININE ORDINAL INDICATOR
   _  @
  / \\ @
 ( � )@
  \\_/ @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
   _  @
  / \\ @
 ( � )@
  \\_/ @@
172  NOT SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
173  SOFT HYPHEN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
174  REGISTERED SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
175  MACRON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
176  DEGREE SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
177  PLUS-MINUS SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
178  SUPERSCRIPT TWO
   _  @
  / \\ @
 ( � )@
  \\_/ @@
179  SUPERSCRIPT THREE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
180  ACUTE ACCENT
   _  @
  / \\ @
 ( � )@
  \\_/ @@
181  MICRO SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
182  PILCROW SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
183  MIDDLE DOT
   _  @
  / \\ @
 ( � )@
  \\_/ @@
184  CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
185  SUPERSCRIPT ONE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
186  MASCULINE ORDINAL INDICATOR
   _  @
  / \\ @
 ( � )@
  \\_/ @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
   _  @
  / \\ @
 ( � )@
  \\_/ @@
188  VULGAR FRACTION ONE QUARTER
   _  @
  / \\ @
 ( � )@
  \\_/ @@
189  VULGAR FRACTION ONE HALF
   _  @
  / \\ @
 ( � )@
  \\_/ @@
190  VULGAR FRACTION THREE QUARTERS
   _  @
  / \\ @
 ( � )@
  \\_/ @@
191  INVERTED QUESTION MARK
   _  @
  / \\ @
 ( � )@
  \\_/ @@
192  LATIN CAPITAL LETTER A WITH GRAVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
193  LATIN CAPITAL LETTER A WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
195  LATIN CAPITAL LETTER A WITH TILDE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
   _  @
  / \\ @
 ( � )@
  \\_/ @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
198  LATIN CAPITAL LETTER AE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
200  LATIN CAPITAL LETTER E WITH GRAVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
201  LATIN CAPITAL LETTER E WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
   _  @
  / \\ @
 ( � )@
  \\_/ @@
204  LATIN CAPITAL LETTER I WITH GRAVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
205  LATIN CAPITAL LETTER I WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
   _  @
  / \\ @
 ( � )@
  \\_/ @@
208  LATIN CAPITAL LETTER ETH
   _  @
  / \\ @
 ( � )@
  \\_/ @@
209  LATIN CAPITAL LETTER N WITH TILDE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
210  LATIN CAPITAL LETTER O WITH GRAVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
211  LATIN CAPITAL LETTER O WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
213  LATIN CAPITAL LETTER O WITH TILDE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
   _  @
  / \\ @
 ( � )@
  \\_/ @@
215  MULTIPLICATION SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
216  LATIN CAPITAL LETTER O WITH STROKE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
217  LATIN CAPITAL LETTER U WITH GRAVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
218  LATIN CAPITAL LETTER U WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
   _  @
  / \\ @
 ( � )@
  \\_/ @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
222  LATIN CAPITAL LETTER THORN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
223  LATIN SMALL LETTER SHARP S
   _  @
  / \\ @
 ( � )@
  \\_/ @@
224  LATIN SMALL LETTER A WITH GRAVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
225  LATIN SMALL LETTER A WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
227  LATIN SMALL LETTER A WITH TILDE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
228  LATIN SMALL LETTER A WITH DIAERESIS
   _  @
  / \\ @
 ( � )@
  \\_/ @@
229  LATIN SMALL LETTER A WITH RING ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
230  LATIN SMALL LETTER AE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
231  LATIN SMALL LETTER C WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
232  LATIN SMALL LETTER E WITH GRAVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
233  LATIN SMALL LETTER E WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
235  LATIN SMALL LETTER E WITH DIAERESIS
   _  @
  / \\ @
 ( � )@
  \\_/ @@
236  LATIN SMALL LETTER I WITH GRAVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
237  LATIN SMALL LETTER I WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
239  LATIN SMALL LETTER I WITH DIAERESIS
   _  @
  / \\ @
 ( � )@
  \\_/ @@
240  LATIN SMALL LETTER ETH
   _  @
  / \\ @
 ( � )@
  \\_/ @@
241  LATIN SMALL LETTER N WITH TILDE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
242  LATIN SMALL LETTER O WITH GRAVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
243  LATIN SMALL LETTER O WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
245  LATIN SMALL LETTER O WITH TILDE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
246  LATIN SMALL LETTER O WITH DIAERESIS
   _  @
  / \\ @
 ( � )@
  \\_/ @@
247  DIVISION SIGN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
248  LATIN SMALL LETTER O WITH STROKE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
249  LATIN SMALL LETTER U WITH GRAVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
250  LATIN SMALL LETTER U WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
252  LATIN SMALL LETTER U WITH DIAERESIS
   _  @
  / \\ @
 ( � )@
  \\_/ @@
253  LATIN SMALL LETTER Y WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
254  LATIN SMALL LETTER THORN
   _  @
  / \\ @
 ( � )@
  \\_/ @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0100  LATIN CAPITAL LETTER A WITH MACRON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0101  LATIN SMALL LETTER A WITH MACRON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0102  LATIN CAPITAL LETTER A WITH BREVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0103  LATIN SMALL LETTER A WITH BREVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0104  LATIN CAPITAL LETTER A WITH OGONEK
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0105  LATIN SMALL LETTER A WITH OGONEK
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0106  LATIN CAPITAL LETTER C WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0107  LATIN SMALL LETTER C WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0108  LATIN CAPITAL LETTER C WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0109  LATIN SMALL LETTER C WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x010A  LATIN CAPITAL LETTER C WITH DOT ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x010B  LATIN SMALL LETTER C WITH DOT ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x010C  LATIN CAPITAL LETTER C WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x010D  LATIN SMALL LETTER C WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x010E  LATIN CAPITAL LETTER D WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x010F  LATIN SMALL LETTER D WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0110  LATIN CAPITAL LETTER D WITH STROKE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0111  LATIN SMALL LETTER D WITH STROKE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0112  LATIN CAPITAL LETTER E WITH MACRON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0113  LATIN SMALL LETTER E WITH MACRON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0116  LATIN CAPITAL LETTER E WITH DOT ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0117  LATIN SMALL LETTER E WITH DOT ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0118  LATIN CAPITAL LETTER E WITH OGONEK
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0119  LATIN SMALL LETTER E WITH OGONEK
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x011A  LATIN CAPITAL LETTER E WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x011B  LATIN SMALL LETTER E WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x011C  LATIN CAPITAL LETTER G WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x011D  LATIN SMALL LETTER G WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x011E  LATIN CAPITAL LETTER G WITH BREVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x011F  LATIN SMALL LETTER G WITH BREVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0120  LATIN CAPITAL LETTER G WITH DOT ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0121  LATIN SMALL LETTER G WITH DOT ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0122  LATIN CAPITAL LETTER G WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0123  LATIN SMALL LETTER G WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0124  LATIN CAPITAL LETTER H WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0125  LATIN SMALL LETTER H WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0126  LATIN CAPITAL LETTER H WITH STROKE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0127  LATIN SMALL LETTER H WITH STROKE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0128  LATIN CAPITAL LETTER I WITH TILDE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0129  LATIN SMALL LETTER I WITH TILDE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x012A  LATIN CAPITAL LETTER I WITH MACRON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x012B  LATIN SMALL LETTER I WITH MACRON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x012E  LATIN CAPITAL LETTER I WITH OGONEK
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x012F  LATIN SMALL LETTER I WITH OGONEK
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0130  LATIN CAPITAL LETTER I WITH DOT ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0131  LATIN SMALL LETTER DOTLESS I
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0134  LATIN CAPITAL LETTER J WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0135  LATIN SMALL LETTER J WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0136  LATIN CAPITAL LETTER K WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0137  LATIN SMALL LETTER K WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0138  LATIN SMALL LETTER KRA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0139  LATIN CAPITAL LETTER L WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x013A  LATIN SMALL LETTER L WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x013B  LATIN CAPITAL LETTER L WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x013C  LATIN SMALL LETTER L WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x013D  LATIN CAPITAL LETTER L WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x013E  LATIN SMALL LETTER L WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0141  LATIN CAPITAL LETTER L WITH STROKE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0142  LATIN SMALL LETTER L WITH STROKE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0143  LATIN CAPITAL LETTER N WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0144  LATIN SMALL LETTER N WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0145  LATIN CAPITAL LETTER N WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0146  LATIN SMALL LETTER N WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0147  LATIN CAPITAL LETTER N WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0148  LATIN SMALL LETTER N WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x014A  LATIN CAPITAL LETTER ENG
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x014B  LATIN SMALL LETTER ENG
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x014C  LATIN CAPITAL LETTER O WITH MACRON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x014D  LATIN SMALL LETTER O WITH MACRON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0150  LATIN CAPITAL LETTER O WITH DOUBLE ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0151  LATIN SMALL LETTER O WITH DOUBLE ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0154  LATIN CAPITAL LETTER R WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0155  LATIN SMALL LETTER R WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0156  LATIN CAPITAL LETTER R WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0157  LATIN SMALL LETTER R WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0158  LATIN CAPITAL LETTER R WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0159  LATIN SMALL LETTER R WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x015A  LATIN CAPITAL LETTER S WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x015B  LATIN SMALL LETTER S WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x015C  LATIN CAPITAL LETTER S WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x015D  LATIN SMALL LETTER S WITH CIRCUMFLEX
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x015E  LATIN CAPITAL LETTER S WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x015F  LATIN SMALL LETTER S WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0160  LATIN CAPITAL LETTER S WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0161  LATIN SMALL LETTER S WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0162  LATIN CAPITAL LETTER T WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0163  LATIN SMALL LETTER T WITH CEDILLA
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0164  LATIN CAPITAL LETTER T WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0165  LATIN SMALL LETTER T WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0166  LATIN CAPITAL LETTER T WITH STROKE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0167  LATIN SMALL LETTER T WITH STROKE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0168  LATIN CAPITAL LETTER U WITH TILDE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0169  LATIN SMALL LETTER U WITH TILDE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x016A  LATIN CAPITAL LETTER U WITH MACRON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x016B  LATIN SMALL LETTER U WITH MACRON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x016C  LATIN CAPITAL LETTER U WITH BREVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x016D  LATIN SMALL LETTER U WITH BREVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x016E  LATIN CAPITAL LETTER U WITH RING ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x016F  LATIN SMALL LETTER U WITH RING ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0170  LATIN CAPITAL LETTER U WITH DOUBLE ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0171  LATIN SMALL LETTER U WITH DOUBLE ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0172  LATIN CAPITAL LETTER U WITH OGONEK
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0173  LATIN SMALL LETTER U WITH OGONEK
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x0179  LATIN CAPITAL LETTER Z WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x017A  LATIN SMALL LETTER Z WITH ACUTE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x017B  LATIN CAPITAL LETTER Z WITH DOT ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x017C  LATIN SMALL LETTER Z WITH DOT ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x017D  LATIN CAPITAL LETTER Z WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x017E  LATIN SMALL LETTER Z WITH CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x02C7  CARON
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x02D8  BREVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x02D9  DOT ABOVE
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x02DB  OGONEK
   _  @
  / \\ @
 ( � )@
  \\_/ @@
0x02DD  DOUBLE ACUTE ACCENT
   _  @
  / \\ @
 ( � )@
  \\_/ @@
`})),No,Po=e((()=>{No=`flf2a 3 2 6 1 11 0 16513
Digital by Glenn Chappell 1/94 -- based on Bubble
Includes characters 128-255
Enhanced for Latin-2,3,4 by John Cowan <cowan@ccil.org>
Latin character sets supported only if your screen font does
figlet release 2.2 -- November 1996
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.
 @
 @
 @@
 +-+@
 |!|@
 +-+@@
 +-+@
 |"|@
 +-+@@
 +-+@
 |#|@
 +-+@@
 +-+@
 |$|@
 +-+@@
 +-+@
 |%|@
 +-+@@
 +-+@
 |&|@
 +-+@@
 +-+@
 |'|@
 +-+@@
 +-+@
 |(|@
 +-+@@
 +-+@
 |)|@
 +-+@@
 +-+@
 |*|@
 +-+@@
 +-+@
 |+|@
 +-+@@
 +-+@
 |,|@
 +-+@@
 +-+@
 |-|@
 +-+@@
 +-+@
 |.|@
 +-+@@
 +-+@
 |/|@
 +-+@@
 +-+@
 |0|@
 +-+@@
 +-+@
 |1|@
 +-+@@
 +-+@
 |2|@
 +-+@@
 +-+@
 |3|@
 +-+@@
 +-+@
 |4|@
 +-+@@
 +-+@
 |5|@
 +-+@@
 +-+@
 |6|@
 +-+@@
 +-+@
 |7|@
 +-+@@
 +-+@
 |8|@
 +-+@@
 +-+@
 |9|@
 +-+@@
 +-+@
 |:|@
 +-+@@
 +-+@
 |;|@
 +-+@@
 +-+@
 |<|@
 +-+@@
 +-+@
 |=|@
 +-+@@
 +-+@
 |>|@
 +-+@@
 +-+@
 |?|@
 +-+@@
 +-+@
 |@|@
 +-+@@
 +-+@
 |A|@
 +-+@@
 +-+@
 |B|@
 +-+@@
 +-+@
 |C|@
 +-+@@
 +-+@
 |D|@
 +-+@@
 +-+@
 |E|@
 +-+@@
 +-+@
 |F|@
 +-+@@
 +-+@
 |G|@
 +-+@@
 +-+@
 |H|@
 +-+@@
 +-+@
 |I|@
 +-+@@
 +-+@
 |J|@
 +-+@@
 +-+@
 |K|@
 +-+@@
 +-+@
 |L|@
 +-+@@
 +-+@
 |M|@
 +-+@@
 +-+@
 |N|@
 +-+@@
 +-+@
 |O|@
 +-+@@
 +-+@
 |P|@
 +-+@@
 +-+@
 |Q|@
 +-+@@
 +-+@
 |R|@
 +-+@@
 +-+@
 |S|@
 +-+@@
 +-+@
 |T|@
 +-+@@
 +-+@
 |U|@
 +-+@@
 +-+@
 |V|@
 +-+@@
 +-+@
 |W|@
 +-+@@
 +-+@
 |X|@
 +-+@@
 +-+@
 |Y|@
 +-+@@
 +-+@
 |Z|@
 +-+@@
 +-+@
 |[|@
 +-+@@
 +-+@
 |\\|@
 +-+@@
 +-+@
 |]|@
 +-+@@
 +-+@
 |^|@
 +-+@@
 +-+@
 |_|@
 +-+@@
 +-+@
 |\`|@
 +-+@@
 +-+@
 |a|@
 +-+@@
 +-+@
 |b|@
 +-+@@
 +-+@
 |c|@
 +-+@@
 +-+@
 |d|@
 +-+@@
 +-+@
 |e|@
 +-+@@
 +-+@
 |f|@
 +-+@@
 +-+@
 |g|@
 +-+@@
 +-+@
 |h|@
 +-+@@
 +-+@
 |i|@
 +-+@@
 +-+@
 |j|@
 +-+@@
 +-+@
 |k|@
 +-+@@
 +-+@
 |l|@
 +-+@@
 +-+@
 |m|@
 +-+@@
 +-+@
 |n|@
 +-+@@
 +-+@
 |o|@
 +-+@@
 +-+@
 |p|@
 +-+@@
 +-+@
 |q|@
 +-+@@
 +-+@
 |r|@
 +-+@@
 +-+@
 |s|@
 +-+@@
 +-+@
 |t|@
 +-+@@
 +-+@
 |u|@
 +-+@@
 +-+@
 |v|@
 +-+@@
 +-+@
 |w|@
 +-+@@
 +-+@
 |x|@
 +-+@@
 +-+@
 |y|@
 +-+@@
 +-+@
 |z|@
 +-+@@
 +-+@
 |{|@
 +-+@@
 +-+@
 |||@
 +-+@@
 +-+@
 |}|@
 +-+@@
 +-+@
 |~|@
 +-+@@
 +-+@
 |�|@
 +-+@@
 +-+@
 |�|@
 +-+@@
 +-+@
 |�|@
 +-+@@
 +-+@
 |�|@
 +-+@@
 +-+@
 |�|@
 +-+@@
 +-+@
 |�|@
 +-+@@
 +-+@
 |�|@
 +-+@@
128
 +-+@
 |�|@
 +-+@@
129
 +-+@
 |�|@
 +-+@@
130
 +-+@
 |�|@
 +-+@@
131
 +-+@
 |�|@
 +-+@@
132
 +-+@
 |�|@
 +-+@@
133
 +-+@
 |�|@
 +-+@@
134
 +-+@
 |�|@
 +-+@@
135
 +-+@
 |�|@
 +-+@@
136
 +-+@
 |�|@
 +-+@@
137
 +-+@
 |�|@
 +-+@@
138
 +-+@
 |�|@
 +-+@@
139
 +-+@
 |�|@
 +-+@@
140
 +-+@
 |�|@
 +-+@@
141
 +-+@
 |�|@
 +-+@@
142
 +-+@
 |�|@
 +-+@@
143
 +-+@
 |�|@
 +-+@@
144
 +-+@
 |�|@
 +-+@@
145
 +-+@
 |�|@
 +-+@@
146
 +-+@
 |�|@
 +-+@@
147
 +-+@
 |�|@
 +-+@@
148
 +-+@
 |�|@
 +-+@@
149
 +-+@
 |�|@
 +-+@@
150
 +-+@
 |�|@
 +-+@@
151
 +-+@
 |�|@
 +-+@@
152
 +-+@
 |�|@
 +-+@@
153
 +-+@
 |�|@
 +-+@@
154
 +-+@
 |�|@
 +-+@@
155
 +-+@
 |�|@
 +-+@@
156
 +-+@
 |�|@
 +-+@@
157
 +-+@
 |�|@
 +-+@@
158
 +-+@
 |�|@
 +-+@@
159
 +-+@
 |�|@
 +-+@@
160  NO-BREAK SPACE
 +-+@
 |�|@
 +-+@@
161  INVERTED EXCLAMATION MARK
 +-+@
 |�|@
 +-+@@
162  CENT SIGN
 +-+@
 |�|@
 +-+@@
163  POUND SIGN
 +-+@
 |�|@
 +-+@@
164  CURRENCY SIGN
 +-+@
 |�|@
 +-+@@
165  YEN SIGN
 +-+@
 |�|@
 +-+@@
166  BROKEN BAR
 +-+@
 |�|@
 +-+@@
167  SECTION SIGN
 +-+@
 |�|@
 +-+@@
168  DIAERESIS
 +-+@
 |�|@
 +-+@@
169  COPYRIGHT SIGN
 +-+@
 |�|@
 +-+@@
170  FEMININE ORDINAL INDICATOR
 +-+@
 |�|@
 +-+@@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
 +-+@
 |�|@
 +-+@@
172  NOT SIGN
 +-+@
 |�|@
 +-+@@
173  SOFT HYPHEN
 +-+@
 |�|@
 +-+@@
174  REGISTERED SIGN
 +-+@
 |�|@
 +-+@@
175  MACRON
 +-+@
 |�|@
 +-+@@
176  DEGREE SIGN
 +-+@
 |�|@
 +-+@@
177  PLUS-MINUS SIGN
 +-+@
 |�|@
 +-+@@
178  SUPERSCRIPT TWO
 +-+@
 |�|@
 +-+@@
179  SUPERSCRIPT THREE
 +-+@
 |�|@
 +-+@@
180  ACUTE ACCENT
 +-+@
 |�|@
 +-+@@
181  MICRO SIGN
 +-+@
 |�|@
 +-+@@
182  PILCROW SIGN
 +-+@
 |�|@
 +-+@@
183  MIDDLE DOT
 +-+@
 |�|@
 +-+@@
184  CEDILLA
 +-+@
 |�|@
 +-+@@
185  SUPERSCRIPT ONE
 +-+@
 |�|@
 +-+@@
186  MASCULINE ORDINAL INDICATOR
 +-+@
 |�|@
 +-+@@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
 +-+@
 |�|@
 +-+@@
188  VULGAR FRACTION ONE QUARTER
 +-+@
 |�|@
 +-+@@
189  VULGAR FRACTION ONE HALF
 +-+@
 |�|@
 +-+@@
190  VULGAR FRACTION THREE QUARTERS
 +-+@
 |�|@
 +-+@@
191  INVERTED QUESTION MARK
 +-+@
 |�|@
 +-+@@
192  LATIN CAPITAL LETTER A WITH GRAVE
 +-+@
 |�|@
 +-+@@
193  LATIN CAPITAL LETTER A WITH ACUTE
 +-+@
 |�|@
 +-+@@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
195  LATIN CAPITAL LETTER A WITH TILDE
 +-+@
 |�|@
 +-+@@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
 +-+@
 |�|@
 +-+@@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
 +-+@
 |�|@
 +-+@@
198  LATIN CAPITAL LETTER AE
 +-+@
 |�|@
 +-+@@
199  LATIN CAPITAL LETTER C WITH CEDILLA
 +-+@
 |�|@
 +-+@@
200  LATIN CAPITAL LETTER E WITH GRAVE
 +-+@
 |�|@
 +-+@@
201  LATIN CAPITAL LETTER E WITH ACUTE
 +-+@
 |�|@
 +-+@@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
 +-+@
 |�|@
 +-+@@
204  LATIN CAPITAL LETTER I WITH GRAVE
 +-+@
 |�|@
 +-+@@
205  LATIN CAPITAL LETTER I WITH ACUTE
 +-+@
 |�|@
 +-+@@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
 +-+@
 |�|@
 +-+@@
208  LATIN CAPITAL LETTER ETH
 +-+@
 |�|@
 +-+@@
209  LATIN CAPITAL LETTER N WITH TILDE
 +-+@
 |�|@
 +-+@@
210  LATIN CAPITAL LETTER O WITH GRAVE
 +-+@
 |�|@
 +-+@@
211  LATIN CAPITAL LETTER O WITH ACUTE
 +-+@
 |�|@
 +-+@@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
213  LATIN CAPITAL LETTER O WITH TILDE
 +-+@
 |�|@
 +-+@@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
 +-+@
 |�|@
 +-+@@
215  MULTIPLICATION SIGN
 +-+@
 |�|@
 +-+@@
216  LATIN CAPITAL LETTER O WITH STROKE
 +-+@
 |�|@
 +-+@@
217  LATIN CAPITAL LETTER U WITH GRAVE
 +-+@
 |�|@
 +-+@@
218  LATIN CAPITAL LETTER U WITH ACUTE
 +-+@
 |�|@
 +-+@@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
 +-+@
 |�|@
 +-+@@
221  LATIN CAPITAL LETTER Y WITH ACUTE
 +-+@
 |�|@
 +-+@@
222  LATIN CAPITAL LETTER THORN
 +-+@
 |�|@
 +-+@@
223  LATIN SMALL LETTER SHARP S
 +-+@
 |�|@
 +-+@@
224  LATIN SMALL LETTER A WITH GRAVE
 +-+@
 |�|@
 +-+@@
225  LATIN SMALL LETTER A WITH ACUTE
 +-+@
 |�|@
 +-+@@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
227  LATIN SMALL LETTER A WITH TILDE
 +-+@
 |�|@
 +-+@@
228  LATIN SMALL LETTER A WITH DIAERESIS
 +-+@
 |�|@
 +-+@@
229  LATIN SMALL LETTER A WITH RING ABOVE
 +-+@
 |�|@
 +-+@@
230  LATIN SMALL LETTER AE
 +-+@
 |�|@
 +-+@@
231  LATIN SMALL LETTER C WITH CEDILLA
 +-+@
 |�|@
 +-+@@
232  LATIN SMALL LETTER E WITH GRAVE
 +-+@
 |�|@
 +-+@@
233  LATIN SMALL LETTER E WITH ACUTE
 +-+@
 |�|@
 +-+@@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
235  LATIN SMALL LETTER E WITH DIAERESIS
 +-+@
 |�|@
 +-+@@
236  LATIN SMALL LETTER I WITH GRAVE
 +-+@
 |�|@
 +-+@@
237  LATIN SMALL LETTER I WITH ACUTE
 +-+@
 |�|@
 +-+@@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
239  LATIN SMALL LETTER I WITH DIAERESIS
 +-+@
 |�|@
 +-+@@
240  LATIN SMALL LETTER ETH
 +-+@
 |�|@
 +-+@@
241  LATIN SMALL LETTER N WITH TILDE
 +-+@
 |�|@
 +-+@@
242  LATIN SMALL LETTER O WITH GRAVE
 +-+@
 |�|@
 +-+@@
243  LATIN SMALL LETTER O WITH ACUTE
 +-+@
 |�|@
 +-+@@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
245  LATIN SMALL LETTER O WITH TILDE
 +-+@
 |�|@
 +-+@@
246  LATIN SMALL LETTER O WITH DIAERESIS
 +-+@
 |�|@
 +-+@@
247  DIVISION SIGN
 +-+@
 |�|@
 +-+@@
248  LATIN SMALL LETTER O WITH STROKE
 +-+@
 |�|@
 +-+@@
249  LATIN SMALL LETTER U WITH GRAVE
 +-+@
 |�|@
 +-+@@
250  LATIN SMALL LETTER U WITH ACUTE
 +-+@
 |�|@
 +-+@@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
252  LATIN SMALL LETTER U WITH DIAERESIS
 +-+@
 |�|@
 +-+@@
253  LATIN SMALL LETTER Y WITH ACUTE
 +-+@
 |�|@
 +-+@@
254  LATIN SMALL LETTER THORN
 +-+@
 |�|@
 +-+@@
255  LATIN SMALL LETTER Y WITH DIAERESIS
 +-+@
 |�|@
 +-+@@
0x0100  LATIN CAPITAL LETTER A WITH MACRON
 +-+@
 |�|@
 +-+@@
0x0101  LATIN SMALL LETTER A WITH MACRON
 +-+@
 |�|@
 +-+@@
0x0102  LATIN CAPITAL LETTER A WITH BREVE
 +-+@
 |�|@
 +-+@@
0x0103  LATIN SMALL LETTER A WITH BREVE
 +-+@
 |�|@
 +-+@@
0x0104  LATIN CAPITAL LETTER A WITH OGONEK
 +-+@
 |�|@
 +-+@@
0x0105  LATIN SMALL LETTER A WITH OGONEK
 +-+@
 |�|@
 +-+@@
0x0106  LATIN CAPITAL LETTER C WITH ACUTE
 +-+@
 |�|@
 +-+@@
0x0107  LATIN SMALL LETTER C WITH ACUTE
 +-+@
 |�|@
 +-+@@
0x0108  LATIN CAPITAL LETTER C WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
0x0109  LATIN SMALL LETTER C WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
0x010A  LATIN CAPITAL LETTER C WITH DOT ABOVE
 +-+@
 |�|@
 +-+@@
0x010B  LATIN SMALL LETTER C WITH DOT ABOVE
 +-+@
 |�|@
 +-+@@
0x010C  LATIN CAPITAL LETTER C WITH CARON
 +-+@
 |�|@
 +-+@@
0x010D  LATIN SMALL LETTER C WITH CARON
 +-+@
 |�|@
 +-+@@
0x010E  LATIN CAPITAL LETTER D WITH CARON
 +-+@
 |�|@
 +-+@@
0x010F  LATIN SMALL LETTER D WITH CARON
 +-+@
 |�|@
 +-+@@
0x0110  LATIN CAPITAL LETTER D WITH STROKE
 +-+@
 |�|@
 +-+@@
0x0111  LATIN SMALL LETTER D WITH STROKE
 +-+@
 |�|@
 +-+@@
0x0112  LATIN CAPITAL LETTER E WITH MACRON
 +-+@
 |�|@
 +-+@@
0x0113  LATIN SMALL LETTER E WITH MACRON
 +-+@
 |�|@
 +-+@@
0x0116  LATIN CAPITAL LETTER E WITH DOT ABOVE
 +-+@
 |�|@
 +-+@@
0x0117  LATIN SMALL LETTER E WITH DOT ABOVE
 +-+@
 |�|@
 +-+@@
0x0118  LATIN CAPITAL LETTER E WITH OGONEK
 +-+@
 |�|@
 +-+@@
0x0119  LATIN SMALL LETTER E WITH OGONEK
 +-+@
 |�|@
 +-+@@
0x011A  LATIN CAPITAL LETTER E WITH CARON
 +-+@
 |�|@
 +-+@@
0x011B  LATIN SMALL LETTER E WITH CARON
 +-+@
 |�|@
 +-+@@
0x011C  LATIN CAPITAL LETTER G WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
0x011D  LATIN SMALL LETTER G WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
0x011E  LATIN CAPITAL LETTER G WITH BREVE
 +-+@
 |�|@
 +-+@@
0x011F  LATIN SMALL LETTER G WITH BREVE
 +-+@
 |�|@
 +-+@@
0x0120  LATIN CAPITAL LETTER G WITH DOT ABOVE
 +-+@
 |�|@
 +-+@@
0x0121  LATIN SMALL LETTER G WITH DOT ABOVE
 +-+@
 |�|@
 +-+@@
0x0122  LATIN CAPITAL LETTER G WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x0123  LATIN SMALL LETTER G WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x0124  LATIN CAPITAL LETTER H WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
0x0125  LATIN SMALL LETTER H WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
0x0126  LATIN CAPITAL LETTER H WITH STROKE
 +-+@
 |�|@
 +-+@@
0x0127  LATIN SMALL LETTER H WITH STROKE
 +-+@
 |�|@
 +-+@@
0x0128  LATIN CAPITAL LETTER I WITH TILDE
 +-+@
 |�|@
 +-+@@
0x0129  LATIN SMALL LETTER I WITH TILDE
 +-+@
 |�|@
 +-+@@
0x012A  LATIN CAPITAL LETTER I WITH MACRON
 +-+@
 |�|@
 +-+@@
0x012B  LATIN SMALL LETTER I WITH MACRON
 +-+@
 |�|@
 +-+@@
0x012E  LATIN CAPITAL LETTER I WITH OGONEK
 +-+@
 |�|@
 +-+@@
0x012F  LATIN SMALL LETTER I WITH OGONEK
 +-+@
 |�|@
 +-+@@
0x0130  LATIN CAPITAL LETTER I WITH DOT ABOVE
 +-+@
 |�|@
 +-+@@
0x0131  LATIN SMALL LETTER DOTLESS I
 +-+@
 |�|@
 +-+@@
0x0134  LATIN CAPITAL LETTER J WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
0x0135  LATIN SMALL LETTER J WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
0x0136  LATIN CAPITAL LETTER K WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x0137  LATIN SMALL LETTER K WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x0138  LATIN SMALL LETTER KRA
 +-+@
 |�|@
 +-+@@
0x0139  LATIN CAPITAL LETTER L WITH ACUTE
 +-+@
 |�|@
 +-+@@
0x013A  LATIN SMALL LETTER L WITH ACUTE
 +-+@
 |�|@
 +-+@@
0x013B  LATIN CAPITAL LETTER L WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x013C  LATIN SMALL LETTER L WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x013D  LATIN CAPITAL LETTER L WITH CARON
 +-+@
 |�|@
 +-+@@
0x013E  LATIN SMALL LETTER L WITH CARON
 +-+@
 |�|@
 +-+@@
0x0141  LATIN CAPITAL LETTER L WITH STROKE
 +-+@
 |�|@
 +-+@@
0x0142  LATIN SMALL LETTER L WITH STROKE
 +-+@
 |�|@
 +-+@@
0x0143  LATIN CAPITAL LETTER N WITH ACUTE
 +-+@
 |�|@
 +-+@@
0x0144  LATIN SMALL LETTER N WITH ACUTE
 +-+@
 |�|@
 +-+@@
0x0145  LATIN CAPITAL LETTER N WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x0146  LATIN SMALL LETTER N WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x0147  LATIN CAPITAL LETTER N WITH CARON
 +-+@
 |�|@
 +-+@@
0x0148  LATIN SMALL LETTER N WITH CARON
 +-+@
 |�|@
 +-+@@
0x014A  LATIN CAPITAL LETTER ENG
 +-+@
 |�|@
 +-+@@
0x014B  LATIN SMALL LETTER ENG
 +-+@
 |�|@
 +-+@@
0x014C  LATIN CAPITAL LETTER O WITH MACRON
 +-+@
 |�|@
 +-+@@
0x014D  LATIN SMALL LETTER O WITH MACRON
 +-+@
 |�|@
 +-+@@
0x0150  LATIN CAPITAL LETTER O WITH DOUBLE ACUTE
 +-+@
 |�|@
 +-+@@
0x0151  LATIN SMALL LETTER O WITH DOUBLE ACUTE
 +-+@
 |�|@
 +-+@@
0x0154  LATIN CAPITAL LETTER R WITH ACUTE
 +-+@
 |�|@
 +-+@@
0x0155  LATIN SMALL LETTER R WITH ACUTE
 +-+@
 |�|@
 +-+@@
0x0156  LATIN CAPITAL LETTER R WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x0157  LATIN SMALL LETTER R WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x0158  LATIN CAPITAL LETTER R WITH CARON
 +-+@
 |�|@
 +-+@@
0x0159  LATIN SMALL LETTER R WITH CARON
 +-+@
 |�|@
 +-+@@
0x015A  LATIN CAPITAL LETTER S WITH ACUTE
 +-+@
 |�|@
 +-+@@
0x015B  LATIN SMALL LETTER S WITH ACUTE
 +-+@
 |�|@
 +-+@@
0x015C  LATIN CAPITAL LETTER S WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
0x015D  LATIN SMALL LETTER S WITH CIRCUMFLEX
 +-+@
 |�|@
 +-+@@
0x015E  LATIN CAPITAL LETTER S WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x015F  LATIN SMALL LETTER S WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x0160  LATIN CAPITAL LETTER S WITH CARON
 +-+@
 |�|@
 +-+@@
0x0161  LATIN SMALL LETTER S WITH CARON
 +-+@
 |�|@
 +-+@@
0x0162  LATIN CAPITAL LETTER T WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x0163  LATIN SMALL LETTER T WITH CEDILLA
 +-+@
 |�|@
 +-+@@
0x0164  LATIN CAPITAL LETTER T WITH CARON
 +-+@
 |�|@
 +-+@@
0x0165  LATIN SMALL LETTER T WITH CARON
 +-+@
 |�|@
 +-+@@
0x0166  LATIN CAPITAL LETTER T WITH STROKE
 +-+@
 |�|@
 +-+@@
0x0167  LATIN SMALL LETTER T WITH STROKE
 +-+@
 |�|@
 +-+@@
0x0168  LATIN CAPITAL LETTER U WITH TILDE
 +-+@
 |�|@
 +-+@@
0x0169  LATIN SMALL LETTER U WITH TILDE
 +-+@
 |�|@
 +-+@@
0x016A  LATIN CAPITAL LETTER U WITH MACRON
 +-+@
 |�|@
 +-+@@
0x016B  LATIN SMALL LETTER U WITH MACRON
 +-+@
 |�|@
 +-+@@
0x016C  LATIN CAPITAL LETTER U WITH BREVE
 +-+@
 |�|@
 +-+@@
0x016D  LATIN SMALL LETTER U WITH BREVE
 +-+@
 |�|@
 +-+@@
0x016E  LATIN CAPITAL LETTER U WITH RING ABOVE
 +-+@
 |�|@
 +-+@@
0x016F  LATIN SMALL LETTER U WITH RING ABOVE
 +-+@
 |�|@
 +-+@@
0x0170  LATIN CAPITAL LETTER U WITH DOUBLE ACUTE
 +-+@
 |�|@
 +-+@@
0x0171  LATIN SMALL LETTER U WITH DOUBLE ACUTE
 +-+@
 |�|@
 +-+@@
0x0172  LATIN CAPITAL LETTER U WITH OGONEK
 +-+@
 |�|@
 +-+@@
0x0173  LATIN SMALL LETTER U WITH OGONEK
 +-+@
 |�|@
 +-+@@
0x0179  LATIN CAPITAL LETTER Z WITH ACUTE
 +-+@
 |�|@
 +-+@@
0x017A  LATIN SMALL LETTER Z WITH ACUTE
 +-+@
 |�|@
 +-+@@
0x017B  LATIN CAPITAL LETTER Z WITH DOT ABOVE
 +-+@
 |�|@
 +-+@@
0x017C  LATIN SMALL LETTER Z WITH DOT ABOVE
 +-+@
 |�|@
 +-+@@
0x017D  LATIN CAPITAL LETTER Z WITH CARON
 +-+@
 |�|@
 +-+@@
0x017E  LATIN SMALL LETTER Z WITH CARON
 +-+@
 |�|@
 +-+@@
0x02C7  CARON
 +-+@
 |�|@
 +-+@@
0x02D8  BREVE
 +-+@
 |�|@
 +-+@@
0x02D9  DOT ABOVE
 +-+@
 |�|@
 +-+@@
0x02DB  OGONEK
 +-+@
 |�|@
 +-+@@
0x02DD  DOUBLE ACUTE ACCENT
 +-+@
 |�|@
 +-+@@
`})),Fo,Io=e((()=>{Fo=`flf2a$ 11 11 18 -1 23
isometric1.flf

Figlet conversion by Kent Nassen (kentn@cyberspace.org), 8-10-94, based
on the fonts posted by Lennert Stock:

From: stock@fwi.uva.nl (Lennert Stock)
Date: 15 Jul 1994 00:04:25 GMT

Here are some fonts. Non-figlet I'm afraid, if you wanna convert them, be
my guest. I posted the isometric fonts before.

------------------------------------------------------------------------------

     .x%%%%%%x.                                             .x%%%%%%x.
    ,%%%%%%%%%%.                                           .%%%%%%%%%%.
   ,%%%'  )'  \\)                                           :(  \`(  \`%%%.
  ,%x%)________) --------- L e n n e r t   S t o c k       ( _   __ (%x%.
  (%%%~^88P~88P|                                           |~=> .=-~ %%%)
  (%%::. .:,\\ .'                                           \`. /,:. .::%%)
  \`;%:\`\\. \`-' |                                             | \`-' ./':%:'
   \`\`x\`. -===.'                   stock@fwi.uva.nl -------- \`.===- .'x''
    / \`:\`.__.;                                               :.__.':' \\
 .d8b.     ..\`.                                             .'..     .d8b.
$       $@
$       $@
$       $@
$       $@
$       $@
$       $@
$       $@
$       $@
$       $@
$       $@
$       $@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /::\\~\\:\\  \\ @
 /:/\\:\\ \\:\\__\\@
 \\/__\\:\\/:/  /@
      \\::/  / @
      /:/  /  @
     /:/  /   @
     \\/__/    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /::\\~\\:\\__\\ @
 /:/\\:\\ \\:|__|@
 \\:\\~\\:\\/:/  /@
  \\:\\ \\::/  / @
   \\:\\/:/  /  @
    \\::/__/   @
     ~~       @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /:/  \\:\\  \\ @
 /:/__/ \\:\\__\\@
 \\:\\  \\  \\/__/@
  \\:\\  \\      @
   \\:\\  \\     @
    \\:\\__\\    @
     \\/__/    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /:/  \\:\\__\\ @
 /:/__/ \\:|__|@
 \\:\\  \\ /:/  /@
  \\:\\  /:/  / @
   \\:\\/:/  /  @
    \\::/__/   @
     ~~       @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /::\\~\\:\\  \\ @
 /:/\\:\\ \\:\\__\\@
 \\:\\~\\:\\ \\/__/@
  \\:\\ \\:\\__\\  @
   \\:\\ \\/__/  @
    \\:\\__\\    @
     \\/__/    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /::\\~\\:\\  \\ @
 /:/\\:\\ \\:\\__\\@
 \\/__\\:\\ \\/__/@
      \\:\\__\\  @
       \\/__/  @
              @
              @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /:/  \\:\\  \\ @
 /:/__/_\\:\\__\\@
 \\:\\  /\\ \\/__/@
  \\:\\ \\:\\__\\  @
   \\:\\/:/  /  @
    \\::/  /   @
     \\/__/    @@
      ___     @
     /\\__\\    @
    /:/  /    @
   /:/__/     @
  /::\\  \\ ___ @
 /:/\\:\\  /\\__\\@
 \\/__\\:\\/:/  /@
      \\::/  / @
      /:/  /  @
     /:/  /   @
     \\/__/    @@
            @
      ___   @
     /\\  \\  @
     \\:\\  \\ @
     /::\\__\\@
  __/:/\\/__/@
 /\\/:/  /   @
 \\::/__/    @
  \\:\\__\\    @
   \\/__/    @
            @@
       ___   @
      /\\  \\  @
      \\:\\  \\ @
  ___ /::\\__\\@
 /\\  /:/\\/__/@
 \\:\\/:/  /   @
  \\::/  /    @
   \\/__/     @
             @
             @
             @@
      ___     @
     /\\__\\    @
    /:/  /    @
   /:/__/     @
  /::\\__\\____ @
 /:/\\:::::\\__\\@
 \\/_|:|~~|~   @
    |:|  |    @
    |:|  |    @
    |:|  |    @
     \\|__|    @@
      ___ @
     /\\__\\@
    /:/  /@
   /:/  / @
  /:/  /  @
 /:/__/   @
 \\:\\  \\   @
  \\:\\  \\  @
   \\:\\  \\ @
    \\:\\__\\@
     \\/__/@@
      ___     @
     /\\__\\    @
    /::|  |   @
   /:|:|  |   @
  /:/|:|__|__ @
 /:/ |::::\\__\\@
 \\/__/~~/:/  /@
       /:/  / @
      /:/  /  @
     /:/  /   @
     \\/__/    @@
      ___     @
     /\\__\\    @
    /::|  |   @
   /:|:|  |   @
  /:/|:|  |__ @
 /:/ |:| /\\__\\@
 \\/__|:|/:/  /@
     |:/:/  / @
     |::/  /  @
     /:/  /   @
     \\/__/    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /:/  \\:\\  \\ @
 /:/__/ \\:\\__\\@
 \\:\\  \\ /:/  /@
  \\:\\  /:/  / @
   \\:\\/:/  /  @
    \\::/  /   @
     \\/__/    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /::\\~\\:\\  \\ @
 /:/\\:\\ \\:\\__\\@
 \\/__\\:\\/:/  /@
      \\::/  / @
       \\/__/  @
              @
              @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
   \\:\\~\\:\\  \\ @
    \\:\\ \\:\\__\\@
     \\:\\/:/  /@
      \\::/  / @
      /:/  /  @
     /:/  /   @
     \\/__/    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /::\\~\\:\\  \\ @
 /:/\\:\\ \\:\\__\\@
 \\/_|::\\/:/  /@
    |:|::/  / @
    |:|\\/__/  @
    |:|  |    @
     \\|__|    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\ \\  \\  @
  _\\:\\~\\ \\  \\ @
 /\\ \\:\\ \\ \\__\\@
 \\:\\ \\:\\ \\/__/@
  \\:\\ \\:\\__\\  @
   \\:\\/:/  /  @
    \\::/  /   @
     \\/__/    @@
      ___     @
     /\\  \\    @
     \\:\\  \\   @
      \\:\\  \\  @
      /::\\  \\ @
     /:/\\:\\__\\@
    /:/  \\/__/@
   /:/  /     @
   \\/__/      @
              @
              @@
      ___     @
     /\\__\\    @
    /:/  /    @
   /:/  /     @
  /:/  /  ___ @
 /:/__/  /\\__\\@
 \\:\\  \\ /:/  /@
  \\:\\  /:/  / @
   \\:\\/:/  /  @
    \\::/  /   @
     \\/__/    @@
      ___     @
     /\\__\\    @
    /:/  /    @
   /:/  /     @
  /:/__/  ___ @
  |:|  | /\\__\\@
  |:|  |/:/  /@
  |:|__/:/  / @
   \\::::/__/  @
    ~~~~      @
              @@
      ___     @
     /\\__\\    @
    /:/ _/_   @
   /:/ /\\__\\  @
  /:/ /:/ _/_ @
 /:/_/:/ /\\__\\@
 \\:\\/:/ /:/  /@
  \\::/_/:/  / @
   \\:\\/:/  /  @
    \\::/  /   @
     \\/__/    @@
      ___     @
     |\\__\\    @
     |:|  |   @
     |:|  |   @
     |:|__|__ @
 ____/::::\\__\\@
 \\::::/~~/~   @
  ~~|:|~~|    @
    |:|  |    @
    |:|  |    @
     \\|__|    @@
      ___     @
     |\\__\\    @
     |:|  |   @
     |:|  |   @
     |:|__|__ @
     /::::\\__\\@
    /:/~~/~   @
   /:/  /     @
   \\/__/      @
              @
              @@
      ___     @
     /\\  \\    @
     \\:\\  \\   @
      \\:\\  \\  @
       \\:\\  \\ @
 _______\\:\\__\\@
 \\::::::::/__/@
  \\:\\~~\\~~    @
   \\:\\  \\     @
    \\:\\__\\    @
     \\/__/    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /::::\\  \\  @
  /::::::\\  \\ @
 /:::LS:::\\__\\@
 \\::1994::/  /@
  \\::::::/  / @
   \\::::/  /  @
    \\::/  /   @
     \\/__/    @@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /::\\~\\:\\  \\ @
 /:/\\:\\ \\:\\__\\@
 \\/__\\:\\/:/  /@
      \\::/  / @
      /:/  /  @
     /:/  /   @
     \\/__/    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /::\\~\\:\\__\\ @
 /:/\\:\\ \\:|__|@
 \\:\\~\\:\\/:/  /@
  \\:\\ \\::/  / @
   \\:\\/:/  /  @
    \\::/__/   @
     ~~       @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /:/  \\:\\  \\ @
 /:/__/ \\:\\__\\@
 \\:\\  \\  \\/__/@
  \\:\\  \\      @
   \\:\\  \\     @
    \\:\\__\\    @
     \\/__/    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /:/  \\:\\__\\ @
 /:/__/ \\:|__|@
 \\:\\  \\ /:/  /@
  \\:\\  /:/  / @
   \\:\\/:/  /  @
    \\::/__/   @
     ~~       @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /::\\~\\:\\  \\ @
 /:/\\:\\ \\:\\__\\@
 \\:\\~\\:\\ \\/__/@
  \\:\\ \\:\\__\\  @
   \\:\\ \\/__/  @
    \\:\\__\\    @
     \\/__/    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /::\\~\\:\\  \\ @
 /:/\\:\\ \\:\\__\\@
 \\/__\\:\\ \\/__/@
      \\:\\__\\  @
       \\/__/  @
              @
              @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /:/  \\:\\  \\ @
 /:/__/_\\:\\__\\@
 \\:\\  /\\ \\/__/@
  \\:\\ \\:\\__\\  @
   \\:\\/:/  /  @
    \\::/  /   @
     \\/__/    @@
      ___     @
     /\\__\\    @
    /:/  /    @
   /:/__/     @
  /::\\  \\ ___ @
 /:/\\:\\  /\\__\\@
 \\/__\\:\\/:/  /@
      \\::/  / @
      /:/  /  @
     /:/  /   @
     \\/__/    @@
            @
      ___   @
     /\\  \\  @
     \\:\\  \\ @
     /::\\__\\@
  __/:/\\/__/@
 /\\/:/  /   @
 \\::/__/    @
  \\:\\__\\    @
   \\/__/    @
            @@
       ___   @
      /\\  \\  @
      \\:\\  \\ @
  ___ /::\\__\\@
 /\\  /:/\\/__/@
 \\:\\/:/  /   @
  \\::/  /    @
   \\/__/     @
             @
             @
             @@
      ___     @
     /\\__\\    @
    /:/  /    @
   /:/__/     @
  /::\\__\\____ @
 /:/\\:::::\\__\\@
 \\/_|:|~~|~   @
    |:|  |    @
    |:|  |    @
    |:|  |    @
     \\|__|    @@
      ___ @
     /\\__\\@
    /:/  /@
   /:/  / @
  /:/  /  @
 /:/__/   @
 \\:\\  \\   @
  \\:\\  \\  @
   \\:\\  \\ @
    \\:\\__\\@
     \\/__/@@
      ___     @
     /\\__\\    @
    /::|  |   @
   /:|:|  |   @
  /:/|:|__|__ @
 /:/ |::::\\__\\@
 \\/__/~~/:/  /@
       /:/  / @
      /:/  /  @
     /:/  /   @
     \\/__/    @@
      ___     @
     /\\__\\    @
    /::|  |   @
   /:|:|  |   @
  /:/|:|  |__ @
 /:/ |:| /\\__\\@
 \\/__|:|/:/  /@
     |:/:/  / @
     |::/  /  @
     /:/  /   @
     \\/__/    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /:/  \\:\\  \\ @
 /:/__/ \\:\\__\\@
 \\:\\  \\ /:/  /@
  \\:\\  /:/  / @
   \\:\\/:/  /  @
    \\::/  /   @
     \\/__/    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /::\\~\\:\\  \\ @
 /:/\\:\\ \\:\\__\\@
 \\/__\\:\\/:/  /@
      \\::/  / @
       \\/__/  @
              @
              @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
   \\:\\~\\:\\  \\ @
    \\:\\ \\:\\__\\@
     \\:\\/:/  /@
      \\::/  / @
      /:/  /  @
     /:/  /   @
     \\/__/    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\:\\  \\  @
  /::\\~\\:\\  \\ @
 /:/\\:\\ \\:\\__\\@
 \\/_|::\\/:/  /@
    |:|::/  / @
    |:|\\/__/  @
    |:|  |    @
     \\|__|    @@
      ___     @
     /\\  \\    @
    /::\\  \\   @
   /:/\\ \\  \\  @
  _\\:\\~\\ \\  \\ @
 /\\ \\:\\ \\ \\__\\@
 \\:\\ \\:\\ \\/__/@
  \\:\\ \\:\\__\\  @
   \\:\\/:/  /  @
    \\::/  /   @
     \\/__/    @@
      ___     @
     /\\  \\    @
     \\:\\  \\   @
      \\:\\  \\  @
      /::\\  \\ @
     /:/\\:\\__\\@
    /:/  \\/__/@
   /:/  /     @
   \\/__/      @
              @
              @@
      ___     @
     /\\__\\    @
    /:/  /    @
   /:/  /     @
  /:/  /  ___ @
 /:/__/  /\\__\\@
 \\:\\  \\ /:/  /@
  \\:\\  /:/  / @
   \\:\\/:/  /  @
    \\::/  /   @
     \\/__/    @@
      ___     @
     /\\__\\    @
    /:/  /    @
   /:/  /     @
  /:/__/  ___ @
  |:|  | /\\__\\@
  |:|  |/:/  /@
  |:|__/:/  / @
   \\::::/__/  @
    ~~~~      @
              @@
      ___     @
     /\\__\\    @
    /:/ _/_   @
   /:/ /\\__\\  @
  /:/ /:/ _/_ @
 /:/_/:/ /\\__\\@
 \\:\\/:/ /:/  /@
  \\::/_/:/  / @
   \\:\\/:/  /  @
    \\::/  /   @
     \\/__/    @@
      ___     @
     |\\__\\    @
     |:|  |   @
     |:|  |   @
     |:|__|__ @
 ____/::::\\__\\@
 \\::::/~~/~   @
  ~~|:|~~|    @
    |:|  |    @
    |:|  |    @
     \\|__|    @@
      ___     @
     |\\__\\    @
     |:|  |   @
     |:|  |   @
     |:|__|__ @
     /::::\\__\\@
    /:/~~/~   @
   /:/  /     @
   \\/__/      @
              @
              @@
      ___     @
     /\\  \\    @
     \\:\\  \\   @
      \\:\\  \\  @
       \\:\\  \\ @
 _______\\:\\__\\@
 \\::::::::/__/@
  \\:\\~~\\~~    @
   \\:\\  \\     @
    \\:\\__\\    @
     \\/__/    @@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
@
@
@
@
@
@
@
@
@
@
@@
`})),Lo,Ro=e((()=>{Lo=`flf2a$ 7 5 16 0 10 0 3904 96
Script by Glenn Chappell 4/93
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

$$@
$$@
$$@
$$@
$$@
$$@
$$@@
  @
 |@
 |@
 |@
 o@
  @
  @@
 oo@
 ||@
 $$@
 $$@
 $$@
   @
   @@
         @
   |  |  @
 --+--+--@
 --+--+--@
   |  |  @
         @
         @@
      @
  |_|_@
 (|_| @
 _|_|)@
  | | @
      @
      @@
     @
 () /@
   / @
  /  @
 / ()@
     @
     @@
      @
  ()  @
  /\\  @
 /  \\/@
 \\__/\\@
      @
      @@
 o@
 /@
 $@
 $@
 $@
  @
  @@
   @
  /@
 | @
 | @
 | @
  \\@
   @@
   @
 \\ @
  |@
  |@
  |@
 / @
   @@
      @
      @
  \\|/ @
 --*--@
  /|\\ @
      @
      @@
      @
      @
   |  @
 --+--@
   |  @
      @
      @@
  @
  @
  @
  @
 o@
 /@
  @@
      @
      @
      @
 -----@
   $  @
      @
      @@
  @
  @
  @
  @
 o@
  @
  @@
     @
    /@
   / @
  /  @
 /   @
     @
     @@
   __  @
  /  \\ @
 |    |@
 |    |@
  \\__/ @
       @
       @@
  ,@
 /|@
  |@
  |@
  |@
   @
   @@
  __ @
 /  )@
  $/ @
  /  @
 /___@
     @
     @@
  ___ @
 /   \\@
  $__/@
  $  \\@
 \\___/@
      @
      @@
      @
 |  | @
 |__|_@
    | @
    | @
      @
      @@
  ____@
 |    @
 |___ @
  $  \\@
 \\___/@
      @
      @@
   __ @
  /$  @
 | __ @
 |/  \\@
  \\__/@
      @
      @@
 _____@
  $  /@
  $ / @
  $/  @
  /   @
      @
      @@
  __ @
 /  \\@
 \\__/@
 /  \\@
 \\__/@
     @
     @@
  __ @
 /  |@
 \\_/|@
    |@
    |@
     @
     @@
  @
 o@
 $@
 $@
 o@
  @
  @@
  @
 o@
 $@
 $@
 o@
 /@
  @@
   @
  /@
 / @
 \\ @
  \\@
   @
   @@
      @
      @
 -----@
 -----@
      @
      @
      @@
   @
 \\ @
  \\@
  /@
 / @
   @
   @@
  __ @
 /  \\@
  $_/@
  |  @
  o  @
     @
     @@
         @
   ____  @
  / __,\\ @
 | /  | |@
 | \\_/|/ @
  \\____/ @
         @@
   ___,  @
  /   |  @
 |    |  @
 |    |  @
  \\__/\\_/@
         @
         @@
  , __ @
 /|/  \\@
  | __/@
  |   \\@
  |(__/@
       @
       @@
   ___$@
  / (_)@
 |   $ @
 |   $ @
  \\___/@
       @
       @@
  $____  @
  (|   \\ @
   |    |@
 $_|    |@
 (/\\___/ @
         @
         @@
  ___$@
 / (_)@
 \\__$ @
 /  $ @
 \\___/@
      @
      @@
 $______@
 (_) |$ @
    _|_$@
   / | |@
  (_/   @
        @
        @@
       @
   () |@
   /\\/|@
  /   |@
 /(__/ @
       @
       @@
  ,     @
 /|   | @
  |___| @
  |   |\\@
  |   |/@
        @
        @@
    _ @
   | |@
   | |@
 _ |/ @
 \\_/\\/@
      @
      @@
      @
  /\\  @
 |  | @
 |  | @
  \\_|/@
   /| @
   \\| @@
  ,     @
 /|   / @
  |__/  @
  | \\$  @
  |  \\_/@
        @
        @@
   $_$  @
 \\_|_)  @
   |$   @
 $_|$   @
 (/\\___/@
        @
        @@
  ,__ __   @
 /|  |  |  @
  |  |  |  @
  |  |  |  @
  |  |  |_/@
           @
           @@
  , _    @
 /|/ \\   @
  |   |  @
  |   |  @
  |   |_/@
         @
         @@
   __  @
  /\\_\\/@
 |    |@
 |    |@
  \\__/ @
       @
       @@
  , __ @
 /|/  \\@
  |___/@
  |   $@
  |   $@
       @
       @@
   __    @
  /  \\   @
 | __ |  @
 |/  \\|  @
  \\__/\\_/@
         @
         @@
  , __  @
 /|/  \\ @
  |___/ @
  | \\$  @
  |  \\_/@
        @
        @@
      @
   () @
   /\\ @
  /  \\@
 /(__/@
      @
      @@
 $______@
 (_) |  @
   $ |  @
  $_ |  @
  (_/   @
        @
        @@
 $_        @
 (_|    |  @
   |    |  @
   |    |  @
    \\__/\\_/@
           @
           @@
 $_       @
 (_|   |_/@
   |   |  @
   |   |  @
    \\_/   @
          @
          @@
 $_           @
 (_|   |   |_/@
   |   |   |  @
   |   |   |  @
    \\_/ \\_/   @
              @
              @@
 $_      @
 (_\\  /  @
   $\\/   @
   $/\\   @
  _/  \\_/@
         @
         @@
 $_      @
 (_|   | @
   |   | @
   |   | @
    \\_/|/@
      /| @
      \\| @@
 $__  @
 (_ \\ @
   $/ @
   /  @
  /__/@
   /| @
   \\| @@
  _@
 | @
 | @
 | @
 | @
 |_@
   @@
     @
 \\   @
  \\  @
   \\ @
    \\@
     @
     @@
 _ @
  |@
  |@
  |@
  |@
 _|@
   @@
 /\\@
  $@
  $@
  $@
  $@
   @
   @@
      @
      @
      @
      @
   $  @
   $  @
 _____@@
 o@
 \\@
 $@
 $@
 $@
  @
  @@
       @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
 $_$  @
 | |  @
 | |  @
 |/ \\_@
  \\_/ @
      @
      @@
      @
      @
  __  @
 /$   @
 \\___/@
      @
      @@
       @
    |  @
  __|  @
 /  |  @
 \\_/|_/@
       @
       @@
     @
     @
  _  @
 |/  @
 |__/@
     @
     @@
 $_$ @
 | | @
 | | @
 |/  @
 |__/@
 |\\  @
 |/  @@
      @
      @
  __, @
 /  | @
 \\_/|/@
   /| @
   \\| @@
 $_$    @
 | |    @
 | |    @
 |/ \\   @
 |   |_/@
        @
        @@
    @
 o  @
    @
 |  @
 |_/@
    @
    @@
    @
  o @
    @
  | @
  |/@
 /| @
 \\| @@
 $_$  @
 | |  @
 | |  @
 |/_) @
 | \\_/@
      @
      @@
 $_$ @
 | | @
 | | @
 |/  @
 |__/@
     @
     @@
            @
            @
  _  _  _   @
 / |/ |/ |  @
 $ |  |  |_/@
            @
            @@
         @
         @
  _  _   @
 / |/ |  @
 $ |  |_/@
         @
         @@
      @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
       @
       @
    _  @
  |/ \\_@
  |__/ @
 /|    @
 \\|    @@
       @
       @
  __,  @
 /  |  @
 \\_/|_/@
    |\\ @
    |/ @@
       @
       @
  ,_   @
 /  |  @
 $  |_/@
       @
       @@
     @
     @
  ,  @
 / \\_@
 $\\/ @
     @
     @@
     @
     @
 _|_ @
  |  @
  |_/@
     @
     @@
        @
        @
        @
 |   |  @
 $\\_/|_/@
        @
        @@
      @
      @
      @
 |  |_@
 $\\/  @
      @
      @@
         @
         @
         @
 |  |  |_@
 $\\/ \\/  @
         @
         @@
      @
      @
      @
 /\\/  @
 $/\\_/@
      @
      @@
       @
       @
       @
 |   | @
 $\\_/|/@
    /| @
    \\| @@
      @
      @
  __  @
 / / _@
 $/_/ @
   /| @
   \\| @@
    @
   /@
  | @
 <  @
  | @
   \\@
    @@
 |@
 |@
 |@
 |@
 |@
 |@
 |@@
    @
 \\  @
  | @
   >@
  | @
 /  @
    @@
 /\\/@
  $ @
  $ @
  $ @
  $ @
    @
    @@
  o   o  @
   ___,  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
  o  o @
   __  @
  /\\_\\/@
 |    |@
  \\__/ @
       @
       @@
    o  o   @
 $_        @
 (_|    |  @
   |    |  @
    \\__/\\_/@
           @
           @@
 o  o  @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
 o  o @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
 o   o  @
        @
        @
 |   |  @
 $\\_/|_/@
        @
        @@
   _ @
  / \\@
 |  /@
 |  \\@
 | _/@
 |   @
     @@
160  NO-BREAK SPACE
 $$@
 $$@
 $$@
 $$@
 $$@
 $$@
 $$@@
161  INVERTED EXCLAMATION MARK
  @
 o@
 |@
 |@
 |@
  @
  @@
162  CENT SIGN
      @
      @
  _|_ @
 / |  @
 \\_|_/@
   |  @
      @@
163  POUND SIGN
     _  @
    / \\ @
 __|__  @
  _| $  @
 (/ \\__/@
        @
        @@
164  CURRENCY SIGN
      @
 \\ _ /@
  / \\ @
  \\_/ @
 /   \\@
      @
      @@
165  YEN SIGN
      @
 \\   /@
 _\\_/_@
 __|__@
   |  @
      @
      @@
166  BROKEN BAR
 |@
 |@
 |@
  @
 |@
 |@
 |@@
167  SECTION SIGN
  _@
 ( @
 /\\@
 \\/@
 _)@
   @
   @@
168  DIAERESIS
 o  o@
 $  $@
 $  $@
 $  $@
 $  $@
     @
     @@
169  COPYRIGHT SIGN
    ____   @
   / __ \\  @
  / / () \\ @
 | |      |@
  \\ \\__/ / @
   \\____/  @
           @@
170  FEMININE ORDINAL INDICATOR
  __, @
 /  | @
 \\_/|_@
 ---- @
   $  @
      @
      @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
    @
  //@
 // @
 \\\\ @
  \\\\@
    @
    @@
172  NOT SIGN
     @
 ___ @
    |@
   $ @
   $ @
     @
     @@
173  SOFT HYPHEN
     @
     @
     @
 ----@
   $ @
     @
     @@
174  REGISTERED SIGN
    ____   @
   /, _ \\  @
  //|/ \\ \\ @
 |  |__/  |@
  \\ | \\_// @
   \\____/  @
           @@
175  MACRON
 _____@
   $  @
   $  @
   $  @
   $  @
      @
      @@
176  DEGREE SIGN
  _ @
 / \\@
 \\_/@
    @
  $ @
    @
    @@
177  PLUS-MINUS SIGN
      @
      @
   |  @
 --+--@
 __|__@
      @
      @@
178  SUPERSCRIPT TWO
 _ @
  )@
 /_@
   @
  $@
   @
   @@
179  SUPERSCRIPT THREE
 ___@
  _/@
 __)@
    @
  $ @
    @
    @@
180  ACUTE ACCENT
 /@
 $@
 $@
 $@
 $@
  @
  @@
181  MICRO SIGN
        @
        @
        @
 |   |  @
 |\\_/|_/@
 |      @
 |      @@
182  PILCROW SIGN
  ____ @
 / |  |@
 \\_|  |@
   |  |@
   |  |@
       @
       @@
183  MIDDLE DOT
    @
    @
 $O$@
  $ @
  $ @
    @
    @@
184  CEDILLA
   @
   @
   @
   @
 $ @
 _)@
   @@
185  SUPERSCRIPT ONE
  ,@
 /|@
  |@
   @
  $@
   @
   @@
186  MASCULINE ORDINAL INDICATOR
  __  @
 /  \\_@
 \\__/ @
 ---- @
   $  @
      @
      @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
    @
 \\\\ @
  \\\\@
  //@
 // @
    @
    @@
188  VULGAR FRACTION ONE QUARTER
  ,    @
 /| /  @
  |/   @
  /|_|_@
 /   | @
       @
       @@
189  VULGAR FRACTION ONE HALF
  ,   @
 /| / @
  |/_ @
  /  )@
 /  /_@
      @
      @@
190  VULGAR FRACTION THREE QUARTERS
 ___    @
  _/ /  @
 __)/   @
   /|_|_@
  /   | @
        @
        @@
191  INVERTED QUESTION MARK
     @
   o @
  _| @
 /$  @
 \\__/@
     @
     @@
192  LATIN CAPITAL LETTER A WITH GRAVE
    \\    @
   ___,  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
193  LATIN CAPITAL LETTER A WITH ACUTE
    /    @
   ___,  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
    /\\   @
   ___,  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
195  LATIN CAPITAL LETTER A WITH TILDE
   /\\/   @
   ___,  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
  o   o  @
   ___,  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
    _    @
   (_),  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
198  LATIN CAPITAL LETTER AE
   ___,___$@
  /   | (_)@
 |    |__  @
 |    |    @
  \\__/\\___/@
           @
           @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
   ___$@
  / (_)@
 |   $ @
 |   $ @
  \\___/@
   _)  @
       @@
200  LATIN CAPITAL LETTER E WITH GRAVE
   \\   @
  ___$ @
 / (_) @
 >--$  @
 \\____/@
       @
       @@
201  LATIN CAPITAL LETTER E WITH ACUTE
   /   @
  ___$ @
 / (_) @
 >--$  @
 \\____/@
       @
       @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
  /\\   @
  ___$ @
 / (_) @
 >--$  @
 \\____/@
       @
       @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
 o   o @
  ___$ @
 / (_) @
 >--$  @
 \\____/@
       @
       @@
204  LATIN CAPITAL LETTER I WITH GRAVE
    \\  @
   $_$ @
   | | @
 _ |/  @
 \\_/\\_/@
       @
       @@
205  LATIN CAPITAL LETTER I WITH ACUTE
    /  @
   $_$ @
   | | @
 _ |/  @
 \\_/\\_/@
       @
       @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
   /\\  @
   $_$ @
   | | @
 _ |/  @
 \\_/\\_/@
       @
       @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
  o  o @
   $_$ @
   | | @
 _ |/  @
 \\_/\\_/@
       @
       @@
208  LATIN CAPITAL LETTER ETH
  $____  @
  (|   \\ @
 __|__  |@
 $_|    |@
 (/\\___/ @
         @
         @@
209  LATIN CAPITAL LETTER N WITH TILDE
   /\\/   @
  , _    @
 /|/ \\   @
  |   |  @
  |   |_/@
         @
         @@
210  LATIN CAPITAL LETTER O WITH GRAVE
   \\   @
   __  @
  /\\_\\/@
 |    |@
  \\__/ @
       @
       @@
211  LATIN CAPITAL LETTER O WITH ACUTE
    /  @
   __  @
  /\\_\\/@
 |    |@
  \\__/ @
       @
       @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   /\\  @
   __  @
  /\\_\\/@
 |    |@
  \\__/ @
       @
       @@
213  LATIN CAPITAL LETTER O WITH TILDE
   /\\/ @
   __  @
  /\\_\\/@
 |    |@
  \\__/ @
       @
       @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
  o  o @
   __  @
  /\\_\\/@
 |    |@
  \\__/ @
       @
       @@
215  MULTIPLICATION SIGN
     @
     @
 $\\/$@
 $/\\$@
 $  $@
     @
     @@
216  LATIN CAPITAL LETTER O WITH STROKE
   __ /@
  /\\_//@
 |  / |@
 | /  |@
  /__/ @
 /     @
       @@
217  LATIN CAPITAL LETTER U WITH GRAVE
     \\     @
 $_        @
 (_|    |  @
   |    |  @
    \\__/\\_/@
           @
           @@
218  LATIN CAPITAL LETTER U WITH ACUTE
      /    @
 $_        @
 (_|    |  @
   |    |  @
    \\__/\\_/@
           @
           @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
     /\\    @
 $_        @
 (_|    |  @
   |    |  @
    \\__/\\_/@
           @
           @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
    o  o   @
 $_        @
 (_|    |  @
   |    |  @
    \\__/\\_/@
           @
           @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
     /   @
 $_      @
 (_|   | @
   |   | @
    \\_/|/@
      /| @
      \\| @@
222  LATIN CAPITAL LETTER THORN
  ,    @
  | __ @
 /|/  \\@
  |___/@
  |   $@
       @
       @@
223  LATIN SMALL LETTER SHARP S
   _ @
  / \\@
 |  /@
 |  \\@
 | _/@
 |   @
     @@
224  LATIN SMALL LETTER A WITH GRAVE
   \\   @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
225  LATIN SMALL LETTER A WITH ACUTE
   /   @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
  /\\   @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
227  LATIN SMALL LETTER A WITH TILDE
  /\\/  @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
228  LATIN SMALL LETTER A WITH DIAERESIS
 o  o  @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
229  LATIN SMALL LETTER A WITH RING ABOVE
       @
  ()   @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
230  LATIN SMALL LETTER AE
        @
        @
  __,_  @
 /  |/  @
 \\_/|__/@
        @
        @@
231  LATIN SMALL LETTER C WITH CEDILLA
      @
      @
  __  @
 /    @
 \\___/@
  _)  @
      @@
232  LATIN SMALL LETTER E WITH GRAVE
  \\  @
     @
  _  @
 |/  @
 |__/@
     @
     @@
233  LATIN SMALL LETTER E WITH ACUTE
  /  @
     @
  _  @
 |/  @
 |__/@
     @
     @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
 /\\  @
     @
  _  @
 |/  @
 |__/@
     @
     @@
235  LATIN SMALL LETTER E WITH DIAERESIS
 o o @
     @
  _  @
 |/  @
 |__/@
     @
     @@
236  LATIN SMALL LETTER I WITH GRAVE
 \\  @
    @
    @
 |  @
 |_/@
    @
    @@
237  LATIN SMALL LETTER I WITH ACUTE
 /  @
    @
    @
 |  @
 |_/@
    @
    @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
 /\\ @
    @
    @
 |  @
 |_/@
    @
    @@
239  LATIN SMALL LETTER I WITH DIAERESIS
 o o @
     @
     @
 |   @
 |__/@
     @
     @@
240  LATIN SMALL LETTER ETH
     @
   \\/@
  _'|@
 /  |@
 \\_/ @
     @
     @@
241  LATIN SMALL LETTER N WITH TILDE
   /\\/   @
         @
  _  _   @
 / |/ |  @
 $ |  |_/@
         @
         @@
242  LATIN SMALL LETTER O WITH GRAVE
  \\   @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
243  LATIN SMALL LETTER O WITH ACUTE
   /  @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
  /\\  @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
245  LATIN SMALL LETTER O WITH TILDE
  /\\/ @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
246  LATIN SMALL LETTER O WITH DIAERESIS
 o  o @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
247  DIVISION SIGN
      @
      @
   O  @
 -----@
   O  @
      @
      @@
248  LATIN SMALL LETTER O WITH STROKE
      @
      @
  __/ @
 / /\\_@
 \\/_/ @
 /    @
      @@
249  LATIN SMALL LETTER U WITH GRAVE
   \\    @
        @
        @
 |   |  @
 $\\_/|_/@
        @
        @@
250  LATIN SMALL LETTER U WITH ACUTE
   /    @
        @
        @
 |   |  @
 $\\_/|_/@
        @
        @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   /\\   @
        @
        @
 |   |  @
 $\\_/|_/@
        @
        @@
252  LATIN SMALL LETTER U WITH DIAERESIS
 o   o  @
        @
        @
 |   |  @
 $\\_/|_/@
        @
        @@
253  LATIN SMALL LETTER Y WITH ACUTE
   /   @
       @
       @
 |   | @
 $\\_/|/@
    /| @
    \\| @@
254  LATIN SMALL LETTER THORN
   _   @
  | |  @
  | |  @
  |/ \\_@
  |__/ @
 /|    @
 \\|    @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
 o   o @
       @
       @
 |   | @
 $\\_/|/@
    /| @
    \\| @@
`})),zo,Bo,Vo,Ho,Uo,Wo,Go,Ko,qo,Jo,Yo=e((()=>{po(),So(),wo(),Eo(),Oo(),Ao(),Mo(),Po(),Io(),Ro(),zo={class:`container`},Bo={class:`controls`},Vo={class:`input-group`},Ho={class:`input-group`},Uo=[`value`],Wo={class:`preview-container`},Go={class:`preview-header`},Ko=[`disabled`],qo={class:`ascii-preview`},Jo=Tn({__name:`App`,setup(e){let t={Standard:Co,Slant:To,Shadow:Do,Block:ko,Bubbles:jo,Digital:No,Isometric1:Fo,Script:Lo},n=st(`ASCII Art`),r=st(`Standard`),i=st(``),a=st(!1),o=()=>{if(!n.value){i.value=``;return}bo.parseFont(r.value,t[r.value]),bo.text(n.value,{font:r.value,horizontalLayout:`default`,verticalLayout:`default`,width:80,whitespaceBreak:!0},(e,t)=>{if(e){console.error(`Something went wrong...`,e);return}i.value=t||``})},s=async()=>{try{await navigator.clipboard.writeText(i.value),a.value=!0,setTimeout(()=>{a.value=!1},2e3)}catch(e){console.error(`Failed to copy: `,e)}};return bn([n,r],()=>{o()}),ui(()=>{o()}),(e,o)=>(Cr(),Dr(`div`,zo,[o[5]||=G(`header`,null,[G(`h1`,null,`ASCII Art Generator`),G(`p`,null,`Convert your text into stylized ASCII banners`)],-1),G(`main`,null,[G(`div`,Bo,[G(`div`,Vo,[o[2]||=G(`label`,{for:`text-input`},`Input Text`,-1),gn(G(`input`,{id:`text-input`,"onUpdate:modelValue":o[0]||=e=>n.value=e,type:`text`,placeholder:`Type something...`,autocomplete:`off`},null,512),[[oo,n.value]])]),G(`div`,Ho,[o[3]||=G(`label`,{for:`font-select`},`Font Style`,-1),gn(G(`select`,{id:`font-select`,"onUpdate:modelValue":o[1]||=e=>r.value=e},[(Cr(),Dr(Z,null,In(t,(e,t)=>G(`option`,{key:t,value:t},be(t),9,Uo)),64))],512),[[so,r.value]])])]),G(`div`,Wo,[G(`div`,Go,[o[4]||=G(`span`,null,`Preview`,-1),G(`button`,{onClick:s,disabled:!i.value},be(a.value?`Copied!`:`Copy to Clipboard`),9,Ko)]),G(`pre`,qo,[G(`code`,null,be(i.value),1)])])]),o[6]||=G(`footer`,null,[G(`p`,null,[Nr(`Part of `),G(`a`,{href:`/`},`online-tools.click`)])],-1)]))}})})),Xo=e((()=>{})),Zo,Qo=e((()=>{Zo=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n}})),$o,es=e((()=>{Yo(),Yo(),Xo(),Qo(),$o=Zo(Jo,[[`__scopeId`,`data-v-65b4e38b`]])}));t((()=>{po(),es(),uo($o).mount(`#app`)}))();