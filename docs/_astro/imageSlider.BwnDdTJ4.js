import{p as N,N as Z,n as p,a as W,G as J,c as h,h as B,b as o,S as k,g as E,e as T,l as I,F as Y,P as ee,t as te}from"./web.DgwoslEx.js";import{s as u,h as ne}from"./objects.CuEbotcV.js";import{t as R}from"./theme.DKsEEeQi.js";import{i as L}from"./icons.Y4puX1ik.js";import{B as re}from"./atoms.DljnSypY.js";import{T as D}from"./tooltip.qKYqyFt-.js";const ie={37:1,38:1,39:1,40:1};function f(e){e.preventDefault()}function H(e){if(ie[e.keyCode])return f(e),!1}let U=!1;try{window.addEventListener("test",{},Object.defineProperty({},"passive",{get:function(){U=!0}}))}catch{}const S=U?{passive:!1}:!1,G=()=>"onwheel"in document.createElement("div")?"wheel":"mousewheel";function ae(){window.addEventListener("DOMMouseScroll",f,!1),window.addEventListener(G(),f,S),window.addEventListener("touchmove",f,S),window.addEventListener("keydown",H,!1)}function oe(){window.removeEventListener("DOMMouseScroll",f,!1),window.removeEventListener(G(),f,S),window.removeEventListener("touchmove",f,S),window.removeEventListener("keydown",H,!1)}var y=(e,t)=>e===t||e.length===t.length&&e.every((i,a)=>i===t[a]),se=N;function w(e,t,i,a){return e.addEventListener(t,i,a),se(e.removeEventListener.bind(e,t,i,a))}function A(e,t=p()){let i=0,a,r;return()=>(i++,N(()=>{i--,queueMicrotask(()=>{!i&&r&&(r(),r=a=void 0)})}),r||Z(s=>a=e(r=s),t),a)}function j(e,t){for(let i=e.length-1;i>=0;i--){const a=t.slice(0,i+1);if(!y(e[i],a))return!1}return!0}var Q=A(()=>{const[e,t]=h(null);return w(window,"keydown",i=>{t(i),setTimeout(()=>t(null))}),e}),le=A(()=>{const[e,t]=h([]),i=()=>t([]),a=Q();return w(window,"keydown",r=>{if(r.repeat||typeof r.key!="string")return;const s=r.key.toUpperCase(),n=e();if(n.includes(s))return;const l=[...n,s];n.length===0&&s!=="ALT"&&s!=="CONTROL"&&s!=="META"&&s!=="SHIFT"&&(r.shiftKey&&l.unshift("SHIFT"),r.altKey&&l.unshift("ALT"),r.ctrlKey&&l.unshift("CONTROL"),r.metaKey&&l.unshift("META")),t(l)}),w(window,"keyup",r=>{if(typeof r.key!="string")return;const s=r.key.toUpperCase();t(n=>n.filter(l=>l!==s))}),w(window,"blur",i),w(window,"contextmenu",r=>{r.defaultPrevented||i()}),e[0]=e,e[1]={event:a},e[Symbol.iterator]=function*(){yield e[0],yield e[1]},e}),ce=A(()=>{const e=le();return B(t=>e().length===0?[]:[...t,e()],[])});function K(e,t,i={}){if(!e.length)return;e=e.map(d=>d.toUpperCase());const{preventDefault:a=!0}=i,r=Q(),s=ce();let n=!1;const l=d=>{if(!d.length)return n=!1;if(n)return;const c=r();d.length<e.length?j(d,e.slice(0,d.length))?a&&c&&c.preventDefault():n=!0:(n=!0,j(d,e)&&(a&&c&&c.preventDefault(),t(c)))},x=d=>{const c=d.at(-1);if(!c)return;const m=r();if(a&&c.length<e.length){y(c,e.slice(0,e.length-1))&&m&&m.preventDefault();return}if(y(c,e)){const v=d.at(-2);(!v||y(v,e.slice(0,e.length-1)))&&(a&&m&&m.preventDefault(),t(m))}};W(J(s,i.requireReset?l:x))}var $=te("<iconify-icon>",!0,!1);const ke=(e,t,i=.3)=>{const a=h(e),[r,s]=h(!1),[n,l]=h(!1),[x,d]=h(0),c=a[1],[m,v]=h(!1),[M,V]=h(null),[X,b]=h(e),P=()=>(a[0]()+1)%t,_=()=>(a[0]()-1+t)%t,C=g=>{if(Date.now()-x()<i*1e3){M()&&clearTimeout(M()),l(!1),v(!0),b(g),c(g);return}l(!0),b(g),d(Date.now()),V(setTimeout(()=>{c(g),l(!1),v(!1)},i*1e3))};return{current:a,setCurrent:g=>{c(g),b(g)},visible:r,toggle:()=>s(g=>!g),newIm:X,changing:n,changeCurrent:C,nextImage:P,prevImage:_,quickChange:m,next:()=>{C(P())},prev:()=>{C(_())}}},de=u("div")`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    background: ${R.background};
  }
`,ue=u("div")`
  width: 100%;
  max-width: 100%;
  pointer-events: none;
`,ge=u("div")`
  position: relative;
  width: 100%;
  height: calc(100vh - 7rem);
  max-width: 100%;
  z-index: 2001;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1rem;
  pointer-events: none;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
`,he=u("div")`
  width: 100%;
  max-width: 100%;
  pointer-events: all;
  overflow: hidden;
`,me=u("div")`
  position: relative;
  display: flex;
  align-items: center;
  height: 6rem;
  width: 100%;
  transform: translateX(var(--left));
  transition: transform 0.5s ease;
  & > * {
    pointer-events: all;
  }
`,fe=u("img")`
  display: block;
  width: 4rem;
  height: 4rem;
  transition: width 0.25s ease-in-out, height 0.25s ease-in-out, opacity 0.25s ease-in-out;
  opacity: 0.5;
  object-fit: cover;

  &:hover {
    opacity: 1;
    width: 6rem;
    height: 6rem;
  }

  &.active {
    opacity: 1;
    width: 6rem;
    height: 6rem;
  }
`,ve=u("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
  width: 100%;
  height: calc(100vh - 7rem);
  padding: 1rem;
  .altText {
    opacity: 0;
    z-index: 1002;
    pointer-events: all;
  }
  &:has(img:hover) {
    .altText {
      opacity: 1;
    }
  }
`,q=u("div")`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 1rem;

  z-index: 1001;
  max-width: 100%;
  max-height: 100%;

  &.newWrapper {
    padding: 0.9rem;
    position: absolute;
    display: flex;
    z-index: 1002;
  }
`,we=ne`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`,z=u("img")`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  pointer-events: all;
  animation: ${we} 0.3s ease-out;
`,F=u("img")`
  display: none;
  width: 0;
  height: 0;
  opacity: 0;
`,O=u(re)`
  && {
    pointer-events: all;
    padding: 1rem;
    border-radius: 50%;
    position: relative;
    background: ${R.background};
    box-shadow: ${R.shadow.medium};
  }

  &.top-right {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border-radius: 50%;
  }
`,Ee=e=>{const t=e.sliderState.current[0],i=e.Alt,a=n=>{n.target===n.currentTarget&&e.sliderState.toggle()};W(()=>{e.sliderState.visible()?(ae(),K(["Escape"],()=>{e.sliderState.toggle()}),K(["ArrowLeft"],()=>{e.sliderState.prev()}),K(["ArrowRight"],()=>{e.sliderState.next()})):oe()});const r=()=>e.images[e.sliderState.newIm()].image,s=()=>e.images[t()].image;return o(ee,{get children(){return o(k,{get when(){return e.sliderState.visible()},get children(){return o(de,{onClick:a,get children(){return o(ue,{get children(){return[o(ge,{get children(){return[o(D,{element:O,props:{onClick:()=>e.sliderState.toggle(),class:"top-right"},tooltip:"Close",placement:"bottom",get children(){var n=E($);return n._$owner=p(),T(()=>I(n,"icon",L.close)),n}}),o(D,{element:O,props:{onClick:()=>e.sliderState.prev()},tooltip:"Previous",placement:"bottom",get children(){var n=E($);return n._$owner=p(),T(()=>I(n,"icon",L.prev)),n}}),o(ve,{get children(){return[o(k,{get when(){return B(()=>!!e.sliderState.changing())()&&!e.sliderState.quickChange()},get children(){return o(q,{class:"newWrapper",get children(){return o(z,{class:"newImage",get src(){return r().src},get width(){return r().attributes?.width??void 0},get style(){return{"max-width":r().attributes?.width,"max-height":r().attributes?.height}},get alt(){return e.images[e.sliderState.newIm()].alt}})}})}}),o(q,{get children(){return[o(F,{get src(){return e.images[e.sliderState.nextImage()].image.src}}),o(F,{get src(){return e.images[e.sliderState.prevImage()].image.src}}),o(z,{get src(){return s().src},get width(){return s().attributes?.width??void 0},get alt(){return e.images[t()].alt}}),o(k,{when:i,get children(){return o(i,{get image(){return e.images[t()]}})}})]}})]}}),o(D,{element:O,props:{onClick:()=>e.sliderState.next()},tooltip:"Next",placement:"bottom",get children(){var n=E($);return n._$owner=p(),T(()=>I(n,"icon",L.next)),n}})]}}),o(he,{get style(){return{"--duration":e.sliderState.quickChange()?"0s":"0.5s","--left":`calc(50% - ${t()*4+3}rem)`}},get children(){return o(me,{get children(){return o(Y,{get each(){return e.images},children:(n,l)=>o(fe,{get classList(){return{active:l()===e.sliderState.newIm()}},get src(){return n.image.src},get srcSet(){return n.image.srcSet.attribute},sizes:"256px",get alt(){return n.alt},onClick:()=>e.sliderState.changeCurrent(l())})})}})}})]}})}})}})}})};export{Ee as I,ke as c};
