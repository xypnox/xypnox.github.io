import{b as n,c as _,F as I,D as L,m as P,g as d,i as $,S as C,n as w,e as p,t as g,l as b,s as u}from"./web.BvE3ojRe.js";import{s as m}from"./objects.-XdWwpQU.js";import{t as i}from"./theme.B-1Y4buH.js";import{c as A,I as E}from"./imageSlider.CPsjyu1M.js";import{i as v}from"./icons.DPFSZ9OK.js";import{b as T}from"./atoms.D9CjkvA7.js";import{T as W}from"./tooltip.CgVS5s4Z.js";import"./tooltip.iARCRW1Q.js";import"./index.browser.vcSNLBTf.js";var D=g("<img loading=lazy>"),G=g("<p class=img-name>"),O=g("<p class=img-description>"),y=g("<iconify-icon>",!0,!1),F=g("<p>Play"),Z=g("<h2 class=title>"),j=g("<p class=description>");const H=m("div")`
  display: grid;
  grid-template-columns: repeat(var(--count, 5), 1fr);
  gap: 2rem;
  width: 100%;

  font-family: ${i.font.family};

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`,N=m("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  width: 100%;
  min-width: 100px;

  transition: all 0.3s ease-in-out;
  .imgContainer {
    --grid-num: calc(var(--count, 5));
    --grid-width: calc(100vw - 2rem - 1rem * var(--grid-num));
    --img-width: var(--image-width-raw, calc(var(--grid-width) / var(--count, 5)));
    display: flex;
    border-radius: ${i.border.radius};
    overflow: hidden;
    cursor: pointer;
    
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.05) translateY(-2.5%);
    }
    img {
      border-radius: ${i.border.radius};
      width: var(--img-width);
      height: var(--img-width);
    }

    @media (max-width: 768px) {
      --grid-num: 0;
      --grid-width: 100%;
      --img-width: 100%;
    }
  }
`,R=r=>{const a=()=>{if(!r.count)return"(min-width: 1200px) 1200px, 512px";const o=r.count();return o>=5?"(min-width: 1200px) 512px, 256px":o>=3?"(min-width: 1200px) 1200px, 512px":"(min-width: 1200px) 1200px, 1200px"};return(()=>{var o=d(D);return p(e=>{var l=r.img.src,f=r.img.srcSet?.attribute,x=a(),h=r.img.attributes?.width??void 0,t=r.img.attributes?.height??void 0,s=r.count?r.count():"5",c=r.alt;return l!==e.e&&u(o,"src",e.e=l),f!==e.t&&u(o,"srcset",e.t=f),x!==e.a&&u(o,"sizes",e.a=x),h!==e.o&&u(o,"width",e.o=h),t!==e.i&&u(o,"height",e.i=t),s!==e.n&&((e.n=s)!=null?o.style.setProperty("--count",s):o.style.removeProperty("--count")),c!==e.s&&u(o,"alt",e.s=c),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),o})()},Y=r=>{const a=e=>e.link&&e.link.length>0,o=e=>({href:e.link,target:"_blank",rel:"noopener noreferrer"});return n(H,{get children(){return n(I,{get each(){return r.images},children:e=>n(N,{get children(){return[n(L,P({class:"imgContainer",get component(){return a(e)?"a":"div"}},()=>a(e)?o(e):{onclick:r.onImageClick?()=>{r.onImageClick(r.images.indexOf(e))}:void 0,role:"button",title:e.title},{get children(){return n(C,{get when(){return e.image},get children(){return n(R,{get img(){return e.image},get alt(){return e.alt},get count(){return r.count}})}})}})),(()=>{var l=d(G);return $(l,()=>e.title),l})(),n(C,{get when(){return e.description},get children(){var l=d(O);return $(l,()=>e.description),l}})]}})})}})},q=m("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  margin: 2rem auto;

  transition: all 0.3s ease-in-out;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0;
  }
`,B=m("div")`
  position: sticky;
  margin-top: 1rem;
  top: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
`,J=m("div")`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: max-content;
  height: 3rem;
  padding: 0rem 0.5rem;
  background: ${i.background};
  border: 1px solid ${i.border.color};
  border-radius: calc(2 * ${i.border.radius});
  box-shadow: ${i.shadow.card};

  & > svg {
    width: 2rem;
    height: 2rem;
  }
`,k=m("button")`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  border-radius: calc(${i.border.radius} * 2);
  border: none;
  background: transparent;
  color: ${i.fadeText};
  &:hover {
    transform: scale(1.1);
    color: ${i.text};
  }
  &:active {
    transform: scale(0.9);
    transition: all 0.2s ease-out;
  }
  transition: all 0.3s ease-in-out;
  iconify-icon {
    font-size: ${i.font.size.md};
  }
`,K=m("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  h2.title {
    margin: 0;
    font-size: ${i.font.size.lg};
    color: var(--secondary-color);
  }
  p {
    margin: 0;
    font-size: ${i.font.size.base};
  }
`,M=m("a")`
  ${T}
  pointer-events: auto;

  position: absolute;

  width: max-content;
  z-index: 1002;

  text-decoration: none;
  color: ${i.text};

  display: flex;
  flex-shrink: 0;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 1rem; 
  background: ${i.background};
  border-radius: ${i.border.radius};
  border: 1px solid ${i.border.color};
  transition: all 0.3s ease-in-out;
  opacity: 0;
  bottom: 2rem;

  p {
    margin: 0;
  }
  iconify-icon {
    font-size: 1.25em;
  }

  &:hover {
    opacity: 1;
    background: ${i.primary.color};
    color: ${i.primary.contrast};
    border-color: ${i.primary.color};
    transform: scale(1.1);
    iconify-icon {
      color: ${i.primary.contrast};
    }
  }

  &:active {
    transform: scale(0.9);
    transition: all 0.2s ease-out;
  }


  @media (max-width: 600px) {
    opacity: 1;
    bottom: 0;
  }
`,Q=r=>r.image.spotifyLink?n(M,{class:"altText",get href(){return r.image.spotifyLink},target:"_blank",rel:"noopener noreferrer",get children(){return[(()=>{var a=d(y);return a._$owner=w(),p(()=>b(a,"icon",v.spotify)),a})(),d(F)]}}):[],ae=r=>{const[a,o]=_(!0),[e,l]=_(5),f=()=>r.collages.map(s=>s.images.length),x=()=>r.collages.reduce((t,s)=>t.concat(s.images),[]),h=A(0,f().reduce((t,s)=>t+s,0));return[n(E,{sliderState:h,get images(){return x()},get Alt(){return r.Alt??Q}}),n(B,{get children(){return n(J,{get children(){return[n(W,{element:k,props:{onClick:()=>o(t=>!t)},get tooltip(){return a()?"Hide Controls":"Show Controls"},placement:"bottom",get children(){var t=d(y);return t._$owner=w(),p(()=>b(t,"icon",a()?v.controls:v.controlsCollapsed)),t}}),n(C,{get when(){return a()},get children(){return[n(k,{title:"Zoom in",get classList(){return{disabled:e()===1}},onClick:()=>{e()>1&&l(e()-1)},get children(){var t=d(y);return t._$owner=w(),p(()=>b(t,"icon",v.zoomIn)),t}}),n(k,{title:"Zoom out",get classList(){return{disabled:e()>=4}},onClick:()=>{l(e()+1)},get children(){var t=d(y);return t._$owner=w(),p(()=>b(t,"icon",v.zoomOut)),t}})]}})]}})}}),n(q,{get children(){return n(I,{get each(){return r.collages},children:(t,s)=>n(K,{get style(){return{"--count":e()}},get children(){return[(()=>{var c=d(Z);return $(c,()=>t.title),p(()=>u(c,"id",t.id)),c})(),n(C,{get when(){return t.description},get children(){var c=d(j);return $(c,()=>t.description),c}}),n(Y,{count:e,get images(){return t.images},onImageClick:c=>{h.setCurrent(c+f().slice(0,s()).reduce((z,S)=>z+S,0)),h.toggle()}})]}})})}})]};export{ae as ImageCollage,Y as ImageGrid};
