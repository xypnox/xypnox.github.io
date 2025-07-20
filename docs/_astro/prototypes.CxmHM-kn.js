import{c as $,a as F,b as r,g as c,i as H,F as v,v as I,m as M,r as W,S as E,t as h}from"./web.BvE3ojRe.js";import{h as P,s as u}from"./objects.-XdWwpQU.js";import{t as g}from"./theme.B-1Y4buH.js";import{M as T}from"./masonry.jZ7iL7PJ.js";import{c as V,I as N}from"./imageSlider.CPsjyu1M.js";import"./themeState.DSZfK7qY.js";import"./store.C4DiOvhL.js";import"./version.BiGcaLu2.js";import"./icons.DPFSZ9OK.js";import"./atoms.D9CjkvA7.js";import"./tooltip.CgVS5s4Z.js";import"./tooltip.iARCRW1Q.js";import"./index.browser.vcSNLBTf.js";var j=h("<h1>Prototypes"),k=h("<p>A few prototypes I made, for a bunch of random projects."),A=h("<p>This also includes other design related assets."),q=h("<div style=z-index:2;position:relative;>"),B=h("<img>");const G=P`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,z=u("div")`
  /* overflow: hidden; */
  img {
    width: 100%;
    height: auto;
    z-index: 10;
    transition: all 0.3s ease-in-out;
    border-radius: calc(${g.border.radius} * 2);
    animation: ${G} 1s ease-in;
    animation-fill-mode: both;
  }

  h1 {
    font-size: ${g.font.size.xl};
    font-weight: 500;
    margin: 0;
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`,J=u("div")`
  padding: 1rem;
  position: relative;
  z-index: 0;

  overflow: hidden;
  border-radius: calc(${g.border.radius} * 4);
  border: var(--border);
`,K=(e,o)=>{if(!o||e.length===0)return null;const t=2*parseFloat(getComputedStyle(document.documentElement).fontSize),l=getComputedStyle(o),s=parseFloat(l.paddingLeft),a=parseFloat(l.paddingTop),n=o.offsetWidth-s*2,i=(n-t*(e.length-1))/e.length;console.log({padLeft:s,padTop:a,width:n,layoutData:e,colWidth:i,gap:t});const f=e.map((b,d)=>d===0?s+i+t/2:s+(d+1)*i+t*(d+.5)),m=e.reduce((b,d,x)=>{const S=d.reduce((p,L,_)=>{const w=L,C={x1:s+x*i+t*(x-.5),y:a+p.totalHeight+w+t*(_+.5)};return p.heights.push(C),p.totalHeight+=w,p},{heights:[],totalHeight:0});return[...b,...S.heights]},[]);return{vertical:f,horizontal:m,linewidth:i+t}},O=u("div")`
  position: absolute;
  left: var(--line-left);
  top: 0;
  width: 1px;
  border-left: var(--border);
  height: 100%;
  z-index: 0;
`,Q=u("div")`
  position: absolute;
  left: 0;
  height: 1px;
  border-top: var(--border);
  z-index: 0;
  top: var(--line-top);
  left: var(--line-left);
  width: var(--line-width);
`,R=e=>[r(v,{get each(){return e.lines.vertical},children:o=>r(O,{style:`--line-left: ${o}px;`})}),r(v,{get each(){return e.lines.horizontal},children:o=>r(Q,{get style(){return`
              --line-top: ${o.y}px;
              --line-left: ${o.x1}px;
              --line-width: ${e.lines.linewidth}px;
            `}})})],le=e=>{const[o,y]=$([]);let t;const[l,s]=$({vertical:[],horizontal:[],linewidth:0});F(()=>{if(!t)return;const n=K(o(),t);n!==null&&s(n)});const a=V(0,e.images.length);return[r(J,{ref(n){var i=t;typeof i=="function"?i(n):t=n},get style(){return{"--border":g.card.border}},get children(){return[(()=>{var n=c(q);return H(n,r(T,{minColumns:1,maxColumns:4,colWidth:300,gap:2,updateLayoutData:y,get children(){return[r(z,{get children(){return[c(j),c(k),c(A)]}}),r(v,{get each(){return e.images},children:(i,f)=>r(z,{onClick:()=>{a.setCurrent(f()),a.toggle()},get children(){var m=c(B);return I(m,M({get src(){return i.image.src}},()=>i.image.attributes,{alt:"placeholder",loading:"lazy"}),!1,!1),W(),m}})})]}})),n})(),r(E,{get when(){return l()!==null},get children(){return r(R,{get lines(){return l()}})}})]}}),r(N,{get images(){return e.images},sliderState:a})]};export{le as Prototypes};
