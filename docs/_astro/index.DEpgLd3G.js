import{c as d,o as I,b as t,F as c,S as C,g as l,i as g,w as A,M as v,e as y,t as w,f as S,h as B}from"./web.DgwoslEx.js";import{b as N,a as R,B as W}from"./atoms.DljnSypY.js";import{s as m}from"./objects.CuEbotcV.js";import{t as h}from"./theme.DKsEEeQi.js";import{R as $}from"./range.B-J1aeTY.js";const j=`I have always loved customization. I was introduced to its true form with Linux.

On linux, instead of a default interface, there are several “flavors” of desktop enviornments, different takes on how apps are launched, files are navigated, app windows handled, etc.

A linux user got choice. They could choose which interface or system worked the best for them, or mould those that came near. And if none did, they had the freedom to create one. No interface was considered “better” just because it was the default one. Which meant that people could explore alternatives. The customizations were usually dependent on the GUI frameworks. And it came at the cost of time and effort.

Here on the web, a lot can be styled and in a lot of ways. Sadly, things are usually styled once. Basic dark mode is offered by those who can add one, otherwise the style of a webpage is rather static. Evolving only with time.

There are sites that offer themes to customize the appearance, including some that allow changing the main color. Some web apps like slack allow changing a bunch of colors, but the core interface still retains the static styles. There are extensions that apply custom CSS styles to websites, and they are cumbersome to use and require expertise in CSS. There are browsers, four extensions wearing a chromium trenchcoat, that offer “prepackaged” styles via “boosts”. Most options for customization on web are offered as a playful tool for the “super-users”.`;var u=w("<div>"),G=w("<span>."),H=w("<div><!$><!/><!$><!/>");const[T,k]=d(j),L=m("textarea")`
  ${N}
  font-size: 0.8em;
  padding: 0.5rem;
  min-height: 10rem;
  background-color: ${h.surface};
  width: 100%;
  color: ${h.fadeText};
`,V=a=>a.split(`
`).map(r=>r.trim()).filter(r=>r.length>0),z=m("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2em 0.25em;
  margin-top: 1rem;
  padding: 0.5rem;
`,[f,q]=d(1),[p,U]=d(.5),[M,D]=d(1),P=(a,r)=>{const o=Math.floor(r/2);return a<o?f()+(p()-f())*(a/o):p()+(M()-p())*((a-o)/o)},J=a=>t(z,{get children(){return t(c,{get each(){return a.text.split(". ")},get fallback(){return l(u)},children:(r,o)=>t(c,{get each(){return r.split(" ").filter(n=>n.length>0)},children:(n,s)=>(()=>{var e=l(H),i=e.firstChild,[x,_]=S(i.nextSibling),E=x.nextSibling,[O,F]=S(E.nextSibling);return g(e,n,x,_),g(e,t(C,{get when(){return B(()=>s()==r.split(" ").length-1)()&&!n.endsWith(".")},get children(){return l(G)}}),O,F),y(b=>(b=P(s(),r.split(" ").length))!=null?e.style.setProperty("opacity",b):e.style.removeProperty("opacity")),e})()})})}}),K=a=>t(z,{get children(){return t(c,{get each(){return a.text.split(" ")},get fallback(){return l(u)},children:(r,o)=>(()=>{var n=l(u);return g(n,r),y(s=>(s=P(o(),a.text.split(" ").length))!=null?n.style.setProperty("opacity",s):n.style.removeProperty("opacity")),n})()})}}),Q=["sentence","paragraph"],X=m("div")`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  justify-content: space-around;
  flex-wrap: wrap;
  background: ${h.surface};
  border: 1px solid ${h.border.color};
  border-radius: ${h.border.radius};
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
`,Y=m("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,ne=a=>{I(()=>{a.defaultText&&k(a.defaultText)});const[r,o]=d("sentence"),[n,s]=d(1);return t(Y,{get children(){return[t(L,{placeholder:"Enter text to highlight",get value(){return T()},onInput:e=>k(e.currentTarget.value)}),t(R,{get children(){return t(c,{each:Q,children:e=>t(W,{get classList(){return{selected:r()===e}},onClick:()=>o(e),children:e})})}}),t(X,{get children(){return[t(C,{get when(){return r()==="sentence"||r()==="paragraph"},get children(){return t(c,{each:[{label:"Start opacity",value:f,onChange:e=>q(parseFloat(e.currentTarget?.value))},{label:"Mid opacity",value:p,onChange:e=>U(parseFloat(e.currentTarget?.value))},{label:"End opacity",value:M,onChange:e=>D(parseFloat(e.currentTarget?.value))}],children:e=>t($,{showValue:!0,min:0,max:1,step:.01,get label(){return e.label},get value(){return e.value()},get onChange(){return e.onChange}})})}}),t($,{label:"Size",get value(){return n()},showValue:!0,min:.5,max:2,step:.01,onChange:e=>s(e.currentTarget.valueAsNumber)})]}}),(()=>{var e=l(u);return g(e,t(c,{get each(){return V(T())},get fallback(){return l(u)},children:i=>t(A,{get children(){return[t(v,{get when(){return r()==="sentence"},get children(){return t(J,{text:i})}}),t(v,{get when(){return r()==="paragraph"},get children(){return t(K,{text:i})}})]}})})),y(i=>(i=`calc(${n()} * ${h.font.size.md})`)!=null?e.style.setProperty("font-size",i):e.style.removeProperty("font-size")),e})()]}})};export{ne as EnHigh};
