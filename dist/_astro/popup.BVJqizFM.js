const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.Dz9YTm2j.js","_astro/web.DgwoslEx.js","_astro/themeState.pOZySbsd.js","_astro/theme.DKsEEeQi.js","_astro/objects.CuEbotcV.js","_astro/store.CEmFEfZ_.js","_astro/version.BiGcaLu2.js","_astro/icons.Y4puX1ik.js","_astro/index.C2pBoA4W.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/text.G-9XCW-H.js","_astro/atoms.DljnSypY.js","_astro/copyButton.ChgTicKD.js","_astro/tooltip.B8h5QbIL.js","_astro/dropselect.CnlCd3aB.js","_astro/index.browser.OxPLOBIU.js","_astro/modeSwitcher.VYnim4Eg.js","_astro/index.7Sr4fLAQ.css"])))=>i.map(i=>d[i]);
import{H as b,c as h,b as r,S as C,g as f,i as S,n as z,e as T,t as w,l as L}from"./web.DgwoslEx.js";import{h as x,s as l}from"./objects.CuEbotcV.js";import{t as s}from"./theme.DKsEEeQi.js";import{i as g}from"./icons.Y4puX1ik.js";import{a as M}from"./tooltip.qKYqyFt-.js";import"./tooltip.B8h5QbIL.js";import"./index.browser.OxPLOBIU.js";const O="modulepreload",R=function(i){return"/"+i},v={},y=function(d,c,p){let m=Promise.resolve();if(c&&c.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),t=a?.nonce||a?.getAttribute("nonce");m=Promise.allSettled(c.map(o=>{if(o=R(o),o in v)return;v[o]=!0;const u=o.endsWith(".css"),P=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${P}`))return;const n=document.createElement("link");if(n.rel=u?"stylesheet":O,u||(n.as="script"),n.crossOrigin="",n.href=o,t&&n.setAttribute("nonce",t),document.head.appendChild(n),u)return new Promise((E,k)=>{n.addEventListener("load",E),n.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${o}`)))})}))}function e(a){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=a,window.dispatchEvent(t),!t.defaultPrevented)throw a}return m.then(a=>{for(const t of a||[])t.status==="rejected"&&e(t.reason);return d().catch(e)})};var A=w("<iconify-icon>",!0,!1),N=w("<span>");const B=b(()=>y(()=>import("./index.Dz9YTm2j.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]))),U=b(()=>y(()=>import("./modeSwitcher.VYnim4Eg.js"),__vite__mapDeps([16,1,11,4,3,10,2,5,6,7]))),Z=()=>{const[i,d]=h(!1),[c,p]=h(!1),m=()=>{p(!0),setTimeout(()=>{d(!1),p(!1)},300)};return r(F,{id:"themeManagerPopup",get children(){return[r(C,{get when(){return i()},get children(){return r(q,{get classList(){return{hiding:c()}},get children(){return[r(D,{get children(){return r(B,{isPopup:!0})}}),r(H,{get children(){return r(U,{})}})]}})}}),r(M,{id:"themescura-tooltip",get icon(){return g.colors},get tooltip(){return(()=>{var e=f(N);return S(e,()=>i()?"Close Themescura":"Customize Theme"),e})()},placement:"top",get children(){return r(I,{class:"navButton",get"aria-label"(){return i()?"Close Theme Manager":"Open Theme Manager"},onClick:()=>{i()?m():d(!0)},get children(){var e=f(A);return e._$owner=z(),T(()=>L(e,"icon",g.customize)),e}})}})]}})},$="transform: scale(1); opacity: 1;",_="transform: scale(0.9); opacity: 0;",W=x`
  0% {
    ${_}
  }
  100% {
    ${$}
  }
`,j=x`
  0% {
    ${$}
  }
  100% {
    ${_}
  }
`,q=l("div")`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 600px;
  max-width: calc(100vw - 1rem);
  height: calc(100vh - 1rem);
  max-height: 800px;
  overflow: hidden;

  color: ${s.text};
  background: ${s.background};
  box-shadow: ${s.shadow.card};
  border-radius: calc(${s.border.radius} * 2);
  border: 2px solid ${s.primary.color};

  display: flex;
  flex-direction: column;

  z-index: 100;

  animation: ${W} 0.2s ease-in forwards;
  transform-origin: bottom right;

  &.hiding {
    animation: ${j} 0.2s ease-out forwards;
  }
`,D=l("div")`
  padding: 2rem 1rem;
  padding-bottom: calc(${s.layout.nav.height} + 2rem);
  background: var(--card-background);
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`,F=l("div")`
  position: relative;
  pointer-events: all;
  display: flex;
  height: 100%;
  
  * {
    pointer-events: all;
  }
`,H=l("div")`
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
`,I=l("button")`
  z-index: 120;
`;export{B as LazyManagerComponent,Z as ThemePopup};
