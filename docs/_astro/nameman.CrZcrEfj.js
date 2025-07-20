import{Q as O,c as I,h as F,o as P,b as t,S as c,F as j,g,n as f,e as p,f as Q,i as D,t as b,l as w}from"./web.BvE3ojRe.js";import{B as x,a as q,G as A,L as J,c as K}from"./atoms.D9CjkvA7.js";import{s as l}from"./objects.-XdWwpQU.js";import{t as i}from"./theme.B-1Y4buH.js";import{c as U}from"./text.G-9XCW-H.js";import{i as d}from"./icons.DPFSZ9OK.js";import{C as R}from"./copyButton.ChHVDE0P.js";import{R as _}from"./range.C17U2iyL.js";import"./tooltip.iARCRW1Q.js";var X=b("<div class=name-div>"),N=b("<iconify-icon>",!0,!1),Y=b("<iconify-icon width=1.5rem height=1.5rem>",!0,!1),Z=b("<div> <a href=https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt target=_blank rel=noreferrer>List</a>: <!$><!/> words ");const ee="https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt",T="nameman-wordList",y="nameman-favWords",te=async()=>{const n=localStorage.getItem(T);if(n)return n.split(`
`).slice(0,-1);const r=await(await fetch(ee)).text();return localStorage.setItem(T,r),r.split(`
`).slice(0,-1)},re=(n,e,r,L,m)=>{if(!m.length)return["Loading..."];const u=L?m.filter(h=>h.length<=r):m;return[...Array(n).fill(0).map(()=>Array(e).fill(0).map(()=>{const W=U(u[Math.floor(Math.random()*u.length)]);return W.length>r?W.slice(0,r):W}).join(""))]},[s]=O(te),[o,v]=I({count:60,sections:2,maxLengthAllowed:6,restrictLength:!1,seed:0}),S=(n,e)=>{const r=parseInt(e);isNaN(r)||(r<1&&(e="1"),v({...o(),[n]:parseInt(e),seed:o().seed+1}))},[a,$]=I([]),ne=n=>{$([...a(),n]),localStorage.setItem(y,a().join(","))},M=n=>{a().includes(n)?oe(n):ne(n)},oe=n=>{const e=a().filter(r=>r!==n);$(e),e.length===0&&H(!1),localStorage.setItem(y,a().join(","))},ae=()=>{$([]),localStorage.removeItem(y)},[k,H]=I(!1),B=F(()=>s.loading?["Loading..."]:s()?re(o().count,o().sections,o().maxLengthAllowed,o().restrictLength,s()):["Error: No wordlist"]),z=l("div")`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`,E=l("div")`
  display: flex;
  gap: 1rem 2rem;
  padding: 1rem;
  flex-wrap: wrap;
  flex-grow: 1;
  align-items: flex-end;
  width: 100%;
  border-radius: calc(2 * ${i.border.radius});


  & > ${z.class} {
    flex: 1;
    align-items: flex-end;
  }
  & label {
    max-width: 16ch;
  }

  & label:has(input[type="checkbox"]) {
    display: flex;
    flex-direction: row-reverse;
    width: max-content;
    max-width: max-content;
    justify-content: flex-end;
    input {
      width: 1rem;
      min-width: 1rem;
      max-width: 1rem;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    & > ${z.class} {
      flex: 1;
      justify-content: center;
    }
  }
`,V=l("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  max-width: 100%;
`,ie=l("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0rem 0.25rem 0rem 1rem;
  background: ${i.surface};
  border-radius: calc(2 * ${i.border.radius}) 2rem 2rem calc(2 * ${i.border.radius});
  font-size: var(--fontSize, ${i.font.size.base});
  width: calc(var(--maxWordLength) + 6rem);
  max-width: 100%;
  word-break: break-all;
  outline: 2px solid transparent;
  transition: outline 0.25s ease-in-out;

  &.active .name-div {
    color: ${i.primary.color};
  }

  &:hover {
    outline: 2px solid ${i.primary.color};
  }

  .name-div {
    transition: all 0.25s ease-in-out;
    flex: 1;
    padding: 0.25rem 0;
  }

  @media (max-width: 600px) {
    width: 100%;
  }

  button {
    opacity: 0.5;
  }

  button.active {
    opacity: 1;
  }

  &:hover button {
    opacity: 1;
  }
`,se=l(x)`
  padding: 0.5rem;
  min-height: max-content;
  background: transparent;
  border: none;
  color: ${i.fadeText};
  border-radius: 50%;

  &.active {
    color: ${i.primary.color};
  }
  
  iconify-icon {
    font-size: ${i.font.size.base};
  }
`,G=n=>{const{name:e}=n;return t(ie,{onClick:r=>{console.log(r),r.target instanceof HTMLDivElement&&r.target.classList.contains("name-div")&&M(e)},get classList(){return{active:a().includes(e)}},get children(){return[(()=>{var r=g(X);return D(r,e),r})(),t(se,{get title(){return a().includes(e)?"Remove from favorites":"Add to favorites"},get classList(){return{active:a().includes(e)}},onClick:()=>M(e),get children(){var r=g(N);return r._$owner=f(),p(()=>w(r,"icon",n.icon??"ph:star-duotone")),r}})]}})},le=l("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`,ce=l(q)`
  margin: 0 auto;
  width: max-content;
  & button {
    width: max-content;
    max-width: 100%;
  }
`,de=l("div")`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 0.5rem;
`,be=n=>(P(()=>{const e=localStorage.getItem(y);e&&$(e.split(",")),n.defaultConfig&&v(n.defaultConfig)}),t(le,{get children(){return[t(c,{get when(){return a().length>0},get children(){return t(c,{get when(){return k()},get children(){return t(E,{class:"theme-card",get children(){return[t(V,{get style(){return{"--maxWordLength":a().reduce((e,r)=>r.length>e?r.length:e,0)+"ch","--fontSize":o().maxLengthAllowed>8?i.font.size.base:`calc(${i.font.size.base} * 1.5)`}},get children(){return t(j,{get each(){return a()},children:e=>t(G,{get icon(){return d.delete},name:e})})}}),t(ce,{get children(){return[t(R,{get icon(){return d.copy},label:"Copy Favorites",copyText:()=>a().join(`
`)}),t(A,{}),t(R,{get icon(){return d.copy},label:"Copy as - List",copyText:()=>a().map(e=>`- ${e}`).join(`
`)}),t(A,{}),t(x,{onClick:ae,get children(){return[(()=>{var e=g(N);return e._$owner=f(),p(()=>w(e,"icon",d.delete)),e})(),"Clear"]}})]}})]}})}})}}),t(c,{get when(){return s.loading},children:"Loading..."}),t(c,{get when(){return s.error},get children(){return["Error: ",F(()=>s.error.message)]}}),t(E,{class:"theme-card",get children(){return[t(z,{get children(){return[t(x,{onClick:()=>v({...o(),seed:o().seed+1}),get children(){return[(()=>{var e=g(N);return e._$owner=f(),p(()=>w(e,"icon",d.shuffle)),e})(),"Regenerate"]}}),t(c,{get when(){return s()},get children(){return t(de,{get children(){return t(J,{title:"Restrict length of words to take from wordlist",get children(){return["Word Length",t(K,{type:"checkbox",get checked(){return o().restrictLength},onInput:()=>v({...o(),restrictLength:!o().restrictLength,seed:o().seed+1})})]}})}})}}),t(_,{label:"Names",showValue:!0,get value(){return o().count},onChange:e=>S("count",e.currentTarget.value),min:8,max:100,step:1}),t(_,{label:"Words to join",showValue:!0,get value(){return o().sections},onChange:e=>S("sections",e.currentTarget.value),min:1,max:5,step:1}),t(_,{get label(){return o().restrictLength?"Max Length":"Slice Length"},showValue:!0,get value(){return o().maxLengthAllowed},onChange:e=>S("maxLengthAllowed",e.currentTarget.value),min:1,max:12,step:1})]}}),t(c,{get when(){return a().length>0},get children(){return t(x,{get classList(){return{selected:k()}},onClick:()=>H(!k()),get children(){return[(()=>{var e=g(Y);return e._$owner=f(),p(()=>w(e,"icon",d.favAnim)),e})(),F(()=>a().length)," favs"]}})}})]}}),t(V,{get style(){return{"--maxWordLength":B().reduce((e,r)=>r.length>e?r.length:e,0)+"ch","--fontSize":o().maxLengthAllowed>8?i.font.size.base:`calc(${i.font.size.base} * 1.5)`}},get children(){return t(j,{get each(){return B()},children:e=>t(G,{name:e})})}}),(()=>{var e=g(Z),r=e.firstChild,L=r.nextSibling,m=L.nextSibling,u=m.nextSibling,[C,h]=Q(u.nextSibling);return C.nextSibling,D(e,()=>s().length,C,h),e})()]}}));export{be as Nameman};
