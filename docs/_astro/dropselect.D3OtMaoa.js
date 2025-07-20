import{c as h,a as C,b as r,S as m,g as p,n as v,e as w,l as x,h as y,t as $,o as k,F as E}from"./web.BvE3ojRe.js";import{s,h as L}from"./objects.-XdWwpQU.js";import{B as d,c as D}from"./atoms.D9CjkvA7.js";import{T as F,E as T}from"./tooltip.iARCRW1Q.js";import{t as a}from"./theme.B-1Y4buH.js";import{i as _}from"./icons.DPFSZ9OK.js";var b=$("<iconify-icon>",!0,!1);const z=s(d)`
  position: relative;
  pointer-events: auto;
`,O=s("div")`
  position: relative;
  pointer-events: auto;
  width: max-content;
  display: flex;
`,S=L`
  0% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`,B=s(F)`
  position: absolute;
  flex-direction: column;
  align-items: flex-start;
  height: max-content;
  gap: 0.5rem;
  top: 100%;
  left: 50%;
  z-index: 10;
  pointer-events: auto;
  padding: 0.75rem;
  max-width: 18ch;
  border-radius: calc(2 * ${a.border.radius});
  font-size: ${a.font.size.sm};
  transform: translateY(0.5rem) translateX(-50%);
  border: 1px solid ${a.primary.color};
  animation: ${S} 0.5s ease-out forwards;

  ${d.class} {
    width: 100%;
    font-size: ${a.font.size.base};
  }
`,q=t=>{const[u,o]=h(!1),[i,c]=h(!1);let l;const g=()=>{t.onConfirm(),c(!0),o(!1),setTimeout(()=>c(!1),2e3)},n=e=>{l&&!l.contains(e.target)&&o(!1)};return C(()=>{u()?document.addEventListener("click",n):document.removeEventListener("click",n)}),r(O,{get children(){return[r(z,{onClick:()=>{t.skipConfirm&&t.onConfirm(),o(e=>!e)},get children(){return[r(m,{get when(){return t.icon},get children(){var e=p(b);return e._$owner=v(),w(()=>x(e,"icon",t.icon)),e}}),y(()=>t.label)]}}),r(m,{get when(){return i()},get children(){return r(T,{get children(){return[(()=>{var e=p(b);return e._$owner=v(),w(()=>x(e,"icon",_.done)),e})(),"Deleted"]}})}}),r(m,{get when(){return u()},get children(){return r(B,{ref(e){var f=l;typeof f=="function"?f(e):l=e},get children(){return[y(()=>t.warn||"Are you sure you wanna delete?"),r(d,{onClick:()=>o(!1),children:"No"}),r(d,{onClick:g,children:"Yes"})]}})}})]}})},I=s("label")`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`,A=s("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`,M=s("div")`
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  background: ${a.surface};
  border: 1px solid ${a.border.color};
  border-radius: ${a.border.radius};
  z-index: 200;
  padding: 0.5rem;
  box-shadow: ${a.shadow.medium};
  backdrop-filter: blur(10px);

  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 0.25rem;
   
  &.hidden {
    display: none;
  }

  a {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`,N=s("div")`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0.25rem;
`,G=t=>{const[u,o]=h(!1);let i;const c=n=>{i&&!i.contains(n.target)&&o(!1)},l=n=>{i&&!i.contains(n.target)&&o(!1)};k(()=>(document.addEventListener("click",c),document.addEventListener("focusin",l),()=>{document.removeEventListener("click",c),document.removeEventListener("focusin",l)}));const g=n=>{if(t.onlyFromOptions){const e=t.options.find(f=>f.value==n);e&&t.onChange(e.value)}else t.onChange(n)};return r(A,{ref(n){var e=i;typeof e=="function"?e(n):i=n},get children(){return[r(I,{get children(){return t.label}}),r(D,{type:"text",get value(){return t.value},onFocus:()=>o(!0),onInput:n=>g(n.currentTarget.value)}),r(M,{get classList(){return{hidden:!u()}},get children(){return[r(N,{get children(){return r(E,{get each(){return t.options},children:n=>r(d,{class:"small",get classList(){return{selected:n.value===t.value}},onClick:()=>{o(!1),t.onChange(n.value)},get children(){return n.label}})})}}),r(m,{get when(){return t.Footer},get children(){return t.Footer()}})]}})]}})};export{q as D,G as a};
