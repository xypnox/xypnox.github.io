import{c,o as F,b as t,F as i,S as z,g as s,i as g,w as I,M as v,e as w,t as x,f as $,h as A}from"./web.BvE3ojRe.js";import{b as B,a as N,B as R}from"./atoms.D9CjkvA7.js";import{s as f}from"./objects.-XdWwpQU.js";import{t as l}from"./theme.B-1Y4buH.js";import{R as S}from"./range.C17U2iyL.js";const W=`I have always loved customization. I was introduced to its true form with Linux.

On linux, instead of a default interface, there are several “flavors” of desktop enviornments, different takes on how apps are launched, files are navigated, app windows handled, etc.

A linux user got choice. They could choose which interface or system worked the best for them, or mould those that came near. And if none did, they had the freedom to create one. No interface was considered “better” just because it was the default one. Which meant that people could explore alternatives. The customizations were usually dependent on the GUI frameworks. And it came at the cost of time and effort.

Here on the web, a lot can be styled and in a lot of ways. Sadly, things are usually styled once. Basic dark mode is offered by those who can add one, otherwise the style of a webpage is rather static. Evolving only with time.

There are sites that offer themes to customize the appearance, including some that allow changing the main color. Some web apps like slack allow changing a bunch of colors, but the core interface still retains the static styles. There are extensions that apply custom CSS styles to websites, and they are cumbersome to use and require expertise in CSS. There are browsers, four extensions wearing a chromium trenchcoat, that offer “prepackaged” styles via “boosts”. Most options for customization on web are offered as a playful tool for the “super-users”.`;var d=x("<div>"),j=x("<span>."),G=x("<div><!$><!/><!$><!/>");const[T,k]=c(W),H=f("textarea")`
  ${B}
  font-size: 0.8em;
  padding: 0.5rem;
  min-height: 10rem;
  background-color: ${l.surface};
  width: 100%;
  color: ${l.fadeText};
`,L=a=>a.split(`
`).map(r=>r.trim()).filter(r=>r.length>0),C=f("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2em 0.25em;
  margin-top: 1rem;
  padding: 0.5rem;
`,[y,V]=c(1),[p,q]=c(.5),[_,U]=c(1),m=(a,r)=>{const o=Math.floor(r/2);return a<o?y()+(p()-y())*(a/o):p()+(_()-p())*((a-o)/o)},D=a=>t(C,{get children(){return t(i,{get each(){return a.text.split(". ")},get fallback(){return s(d)},children:(r,o)=>t(i,{get each(){return r.split(" ").filter(n=>n.length>0)},children:(n,h)=>(()=>{var e=s(G),u=e.firstChild,[b,M]=$(u.nextSibling),P=b.nextSibling,[E,O]=$(P.nextSibling);return g(e,n,b,M),g(e,t(z,{get when(){return A(()=>h()==r.split(" ").length-1)()&&!n.endsWith(".")},get children(){return s(j)}}),E,O),w(()=>m(h(),r.split(" ").length)!=null?e.style.setProperty("opacity",m(h(),r.split(" ").length)):e.style.removeProperty("opacity")),e})()})})}}),J=a=>t(C,{get children(){return t(i,{get each(){return a.text.split(" ")},get fallback(){return s(d)},children:(r,o)=>(()=>{var n=s(d);return g(n,r),w(()=>m(o(),a.text.split(" ").length)!=null?n.style.setProperty("opacity",m(o(),a.text.split(" ").length)):n.style.removeProperty("opacity")),n})()})}}),K=["sentence","paragraph"],Q=f("div")`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  justify-content: space-around;
  flex-wrap: wrap;
  background: ${l.surface};
  border: 1px solid ${l.border.color};
  border-radius: ${l.border.radius};
  & > * {
    min-width: 8rem;
    max-width: 12rem;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;

    & > * {
      width: 100%;
      min-width: 0;
      max-width: 100%;
    }
  }
`,X=f("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,ae=a=>{F(()=>{a.defaultText&&k(a.defaultText)});const[r,o]=c("sentence"),[n,h]=c(1);return t(X,{get children(){return[t(H,{placeholder:"Enter text to highlight",get value(){return T()},onInput:e=>k(e.currentTarget.value)}),t(N,{get children(){return t(i,{each:K,children:e=>t(R,{get classList(){return{selected:r()===e}},onClick:()=>o(e),children:e})})}}),t(Q,{get children(){return[t(z,{get when(){return r()==="sentence"||r()==="paragraph"},get children(){return t(i,{each:[{label:"Start opacity",value:y,onChange:e=>V(parseFloat(e.currentTarget?.value))},{label:"Mid opacity",value:p,onChange:e=>q(parseFloat(e.currentTarget?.value))},{label:"End opacity",value:_,onChange:e=>U(parseFloat(e.currentTarget?.value))}],children:e=>t(S,{showValue:!0,min:0,max:1,step:.01,get label(){return e.label},get value(){return e.value()},get onChange(){return e.onChange}})})}}),t(S,{label:"Size",get value(){return n()},showValue:!0,min:.5,max:2,step:.01,onChange:e=>h(e.currentTarget.valueAsNumber)})]}}),(()=>{var e=s(d);return g(e,t(i,{get each(){return L(T())},get fallback(){return s(d)},children:u=>t(I,{get children(){return[t(v,{get when(){return r()==="sentence"},get children(){return t(D,{text:u})}}),t(v,{get when(){return r()==="paragraph"},get children(){return t(J,{text:u})}})]}})})),w(()=>`calc(${n()} * ${l.font.size.md})`!=null?e.style.setProperty("font-size",`calc(${n()} * ${l.font.size.md})`):e.style.removeProperty("font-size")),e})()]}})};export{ae as EnHigh};
