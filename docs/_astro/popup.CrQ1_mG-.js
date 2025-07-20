import{H as b,c as h,b as r,S as P,g as f,i as E,n as C,e as z,t as w,l as S}from"./web.BvE3ojRe.js";import{h as x,s as c}from"./objects.-XdWwpQU.js";import{t as i}from"./theme.B-1Y4buH.js";import{i as g}from"./icons.DPFSZ9OK.js";import{a as T}from"./tooltip.CgVS5s4Z.js";import"./tooltip.iARCRW1Q.js";import"./index.browser.vcSNLBTf.js";const L="modulepreload",R=function(o){return"/"+o},v={},y=function(d,a,m){let u=Promise.resolve();if(a&&a.length>0){const t=document.getElementsByTagName("link");u=Promise.all(a.map(e=>{if(e=R(e),e in v)return;v[e]=!0;const s=e.endsWith(".css"),k=s?'[rel="stylesheet"]':"";if(!!m)for(let l=t.length-1;l>=0;l--){const p=t[l];if(p.href===e&&(!s||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${k}`))return;const n=document.createElement("link");if(n.rel=s?"stylesheet":L,s||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),s)return new Promise((l,p)=>{n.addEventListener("load",l),n.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${e}`)))})}))}return u.then(()=>d()).catch(t=>{const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t})};var O=w("<iconify-icon>",!0,!1),B=w("<span>");const M=b(()=>y(()=>import("./index.DLzNDxCi.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]))),W=b(()=>y(()=>import("./modeSwitcher.TPb93W9j.js"),__vite__mapDeps([16,1,11,4,3,10,2,5,6,7]))),Y=()=>{const[o,d]=h(!1),[a,m]=h(!1),u=()=>{m(!0),setTimeout(()=>{d(!1),m(!1)},300)};return r(I,{id:"themeManagerPopup",get children(){return[r(P,{get when(){return o()},get children(){return r(F,{get classList(){return{hiding:a()}},get children(){return[r(H,{get children(){return r(M,{isPopup:!0})}}),r(N,{get children(){return r(W,{})}})]}})}}),r(T,{id:"themescura-tooltip",get icon(){return g.colors},get tooltip(){return(()=>{var t=f(B);return E(t,()=>o()?"Close Themescura":"Customize Theme"),t})()},placement:"top",get children(){return r(U,{class:"navButton",get"aria-label"(){return o()?"Close Theme Manager":"Open Theme Manager"},onClick:()=>{o()?u():d(!0)},get children(){var t=f(O);return t._$owner=C(),z(()=>S(t,"icon",g.customize)),t}})}})]}})},$="transform: scale(1); opacity: 1;",_="transform: scale(0.9); opacity: 0;",A=x`
  0% {
    ${_}
  }
  100% {
    ${$}
  }
`,D=x`
  0% {
    ${$}
  }
  100% {
    ${_}
  }
`,F=c("div")`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 600px;
  max-width: calc(100vw - 1rem);
  height: calc(100vh - 1rem);
  max-height: 800px;
  overflow: hidden;

  color: ${i.text};
  background: ${i.background};
  box-shadow: ${i.shadow.card};
  border-radius: calc(${i.border.radius} * 2);
  border: 2px solid ${i.primary.color};

  display: flex;
  flex-direction: column;

  z-index: 100;

  animation: ${A} 0.2s ease-in forwards;
  transform-origin: bottom right;

  &.hiding {
    animation: ${D} 0.2s ease-out forwards;
  }
`,H=c("div")`
  padding: 2rem 1rem;
  padding-bottom: calc(${i.layout.nav.height} + 2rem);
  background: var(--card-background);
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`,I=c("div")`
  position: relative;
  pointer-events: all;
  display: flex;
  height: 100%;
  
  * {
    pointer-events: all;
  }
`,N=c("div")`
  position: fixed;
  bottom: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: calc(var(--layout-nav-height) + 1rem);
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  border-top: 1px solid var(--border-color);
  background: var(--card-background);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
`,U=c("button")`
  z-index: 120;
`;export{M as LazyManagerComponent,Y as ThemePopup};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["_astro/index.DLzNDxCi.js","_astro/web.BvE3ojRe.js","_astro/themeState.DSZfK7qY.js","_astro/theme.B-1Y4buH.js","_astro/objects.-XdWwpQU.js","_astro/store.C4DiOvhL.js","_astro/version.BiGcaLu2.js","_astro/icons.DPFSZ9OK.js","_astro/index.C2pBoA4W.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/text.G-9XCW-H.js","_astro/atoms.D9CjkvA7.js","_astro/copyButton.ChHVDE0P.js","_astro/tooltip.iARCRW1Q.js","_astro/dropselect.D3OtMaoa.js","_astro/index.browser.vcSNLBTf.js","_astro/modeSwitcher.TPb93W9j.js","_astro/index.By55HJAS.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
