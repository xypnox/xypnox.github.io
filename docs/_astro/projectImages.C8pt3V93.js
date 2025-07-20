import{d as z,b as o,F as _,S as k,h as m,g as l,e as I,r as S,i as d,t as g,s as v}from"./web.DgwoslEx.js";import{s as h}from"./objects.CuEbotcV.js";import{c as E,I as A}from"./imageSlider.BwnDdTJ4.js";import{b as C}from"./atoms.DljnSypY.js";import{t as i}from"./theme.DKsEEeQi.js";import"./icons.Y4puX1ik.js";import"./tooltip.qKYqyFt-.js";import"./tooltip.B8h5QbIL.js";import"./index.browser.OxPLOBIU.js";var w=g("<ul>"),$=g("<h3>"),b=g("<li>"),D=g("<div class=imageWrapper><img loading=lazy>",!0,!1);const j=h("div")`
  ${C}
  pointer-events: auto;

  position: absolute;

  width: max-content;
  z-index: 1002;

  text-decoration: none;
  color: ${i.text};

  display: flex;
  flex-shrink: 0;
  align-items: center;
  transition: all 0.3s ease-in-out;
  bottom: 2rem;
  opacity: 0;

  &:hover {
    opacity: 1;
  }

  & > div {
    background: ${i.background};
    box-shadow: ${i.shadow.medium};
    border: 1px solid ${i.border.color};
    h3 {
      font-size: ${i.font.size.md};
    }
    li {
      font-size: ${i.font.size.base};
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`,F=t=>o(j,{class:"altText",get children(){return o(y,{get children(){return[m(()=>m(()=>!!t.image.title)()&&(()=>{var e=l($);return d(e,()=>t.image.title),e})()),(()=>{var e=l(w);return d(e,()=>t.image.description.map(s=>(()=>{var a=l(b);return d(a,s),a})())),e})()]}})}}),K=t=>{const e=t.cover?[...t.images,t.cover]:t.images,s=E(0,e.length);return e.length>0&&o(W,{get children(){return[o(A,{images:e,sliderState:s,Alt:F}),o(_,{each:e,children:(a,f)=>{const u=a.title??a.alt;return o(k,{get when(){return m(()=>!!t.cover)()?f()!==e.length-1:!0},get children(){return o(H,{get children(){return[(()=>{var r=l(D),c=r.firstChild;return r.$$click=()=>{s.setCurrent(f()),s.toggle()},I(n=>{var p=a.image.src,x=u??a.description.join(" ");return p!==n.e&&v(c,"src",n.e=p),x!==n.t&&v(c,"alt",n.t=x),n},{e:void 0,t:void 0}),S(),r})(),o(y,{get children(){return[m(()=>u&&(()=>{var r=l($);return d(r,u),r})()),(()=>{var r=l(w);return d(r,()=>a.description.map(c=>(()=>{var n=l(b);return d(n,c),n})())),r})()]}})]}})}})}})]}})},W=h("div")`
  display: flex;
  flex-direction: column;
  gap: 8rem;
  @media (max-width: 768px) {
    gap: 4rem;
  }

`,H=h("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  height: max-content;
  width: 100%;
  padding: 0 4rem;
  &:nth-child(2n) {
    flex-direction: row-reverse;
  }
  .imageWrapper {
    cursor: zoom-in;
    transition: all 0.3s ease-in-out;
    flex-grow: 0;
    flex-shrink: 1;
    &:hover {
      transform: scale(1.05);
    }
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 0;
    &:nth-child(2n) {
      flex-direction: column;
    }
  }
  img {
    flex-grow: 0;
    flex-shrink: 0;
    width: 100%;
    border-radius: calc(${i.border.radius} * 2);
    -webkit-filter: drop-shadow(${i.shadow.cardDrop});
    filter: drop-shadow(${i.shadow.cardDrop});
  }
`,y=h("div")`
  width: 100%;
  min-width: 20rem;
  padding: 1.5rem;
  background-color: var(--surface);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 70ch;
  border-radius: calc(var(--border-radius) * 2);
  h3 {
    font-size: var(--font-size-md);
    font-weight: 400;
    color: var(--secondary-color);
    margin: 0;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;
    list-style: circle;
    padding: 0;
    padding-left: 1.25rem;
  }
  li {
    font-size: var(--font-size-md);
    margin: 0;
  }
  @media (max-width: 1200px) {
    min-width: 100%;
    max-width: 100%;
  }
`;z(["click"]);export{K as ProjectImages};
