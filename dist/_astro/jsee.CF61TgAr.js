import{c as m,h as d,d as H,o as D,g,e as $,b as e,S as u,f as A,i as x,n as M,F as N,t as y,l as v,r as K,w as G,M as T,j as P}from"./web.DgwoslEx.js";import{s as c,r as W}from"./objects.CuEbotcV.js";import{t as o}from"./theme.DKsEEeQi.js";import{b as B,a as J,B as S,T as I,I as Q,c as U,G as b}from"./atoms.DljnSypY.js";import{i as _}from"./icons.Y4puX1ik.js";import{C as X}from"./copyButton.ChgTicKD.js";import{d as Y}from"./index.C2pBoA4W.js";import"./tooltip.B8h5QbIL.js";import"./_commonjsHelpers.Cpj98o6Y.js";var Z=y("<span>Root"),q=y("<iconify-icon>",!0,!1),ee=y("<div>"),re=y("<style id=_goober>"),te=y("<div><!$><!/><!$><!/>"),ne=y("<code>");const oe={app:"JSee",version:"0.1.1",about:"A Json Seer with magical powers",powers:["It can show JSON in a pretty way","Can show type hints","Key Labels are sticky"],sample:{ohMyColorsAreInArray:["red","green","blue"],whatever:{key:"value",key3:124,key4:!0,key5:null,key6:{key4:!0,key5:null,key6:{key4:!0,key5:null},key7:{key4:!0,key5:null}}},defined:{isDefined:!0}},sizeDoesntMatter:"Curabitizzle et go to hizzle daahng dawg nisi the bizzle mollizzle. Stuff gizzle. Morbi odio. Vivamus neque. Crizzle orci. Cras maurizzle i'm in the shizzle, interdizzle fo shizzle, hizzle shizzlin dizzle amizzle, ma nizzle izzle, pede. Pellentesque shizzlin dizzle. Boofron fo shizzle mi, sheezy cool, ma nizzle sizzle, izzle fo shizzle, sizzle. Mofo in its fo rizzle.",noteAboutNext:"Now lets see a sample JSON Response",response:{page:1,per_page:6,total:12,total_pages:2,data:[{id:1,name:"cerulean",year:2e3,color:"#98B2D1",pantone_value:"15-4020"},{id:2,name:"fuchsia rose",year:2001,color:"#C74375",pantone_value:"17-2031"},{id:3,name:"true red",year:2002,color:"#BF1932",pantone_value:"19-1664"},{id:4,name:"aqua sky",year:2003,color:"#7BC4C4",pantone_value:"14-4811"},{id:5,name:"tigerlily",year:2004,color:"#E2583E",pantone_value:"17-1456"},{id:6,name:"blue turquoise",year:2005,color:"#53B0AE",pantone_value:"15-5217"}],support:{url:"https://reqres.in/#support-heading",text:"To keep ReqRes free, contributions towards server costs are appreciated!"}}},[F,ie]=m(2),[O,le]=m(oe),R=d(()=>JSON.stringify(O(),null,F())),[C,se]=m({query:""}),[ae,ce]=m(!0),[j,ue]=m(!0),[k,E]=m(void 0),de=(t,n)=>{const r=n-2>0?n-2:0,a=Math.min(t.split(`
`).length,n+3);return t.split(`
`).slice(r,a)},ge=(t,n)=>t.split(`
`)[n],L=t=>{try{const n=JSON.parse(t);le(n),E(void 0)}catch(n){if(console.error(n),n instanceof SyntaxError){const r=n,a=String(r).match(/line \d+ column \d+/);if(a){const[l,w]=a[0].split(" ").map(Number).filter(s=>!isNaN(s)),h=l-1,p=ge(t,h),z=de(t,h),i={error:r.message,code:z.map((s,f)=>({line:s,highlight:s===p}))};E(i);return}E({error:r.message})}}},he=c("div")`
  ${B}
  flex-shrink: 0;
  font-size: calc(0.75 * ${o.font.size.sm});
  padding: calc(0.1 * ${o.font.size.sm}) calc(0.25 * ${o.font.size.sm});
  background-color: ${o.surface};
  color: ${o.fadeText};
  max-width: 80ch;
  word-break: break-all;
`,fe=t=>e(he,{get children(){return String(t.value)}}),me=c("div")`
  position: relative;
  padding: 0rem 0.5rem;
  display: flex;
  gap: 0.25rem;
  border-left: 1px solid ${o.border.color};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-left: 1px solid ${o.primary.color};
  }
`,ye=c("button")`
  ${B}
  color: ${o.text};
  background: transparent;
  font-size: ${o.font.size.sm};
  position: sticky;
  top: 0;
  padding: 0 calc(0.25 * ${o.font.size.sm});
  display: flex;
  align-items: center;
  gap: 0.25em;
  z-index: 1;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: ${o.border.radius};
  user-select: none;

  iconify-icon {
    font-size: 1em;
    color: ${o.fadeText};
    opacity: 0.5;
  }

  &:hover {
    background-color: ${o.surface};
    color: ${o.primary.color};
    iconify-icon {
      opacity: 1;
    }
  }
`,pe=c("div")`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex-shrink: 0;
`,ze=c("div")`
  font-size: 0.8em;
  color: ${o.fadeText};
`,$e=d(()=>{if(C().query==="")return[];const t=(n,r=[])=>n==null?[]:typeof n=="object"?Object.entries(n).flatMap(([a,l])=>t(l,[...r,a])):Array.isArray(n)?n.flatMap((a,l)=>t(a,[...r,l.toString()])):[r.join(".")];return t(O())}),V=t=>{const n=d(()=>t.json===null?"null":t.json===void 0?"undefined":typeof t.json=="boolean"?"boolean":Array.isArray(t.json)?"array":typeof t.json=="object"?"object":typeof t.json=="number"?"number":"string"),[r,a]=m(!0);let l;const w=()=>{a(i=>!i),l&&r()&&h()},h=()=>{l&&(l.getBoundingClientRect().top<0||l.getBoundingClientRect().bottom>window.innerHeight)&&l.scrollIntoView({behavior:"smooth"})},p=i=>{i.stopPropagation(),l&&r()&&h()},z=d(()=>{if(C().query===""||t.root)return!0;const i=C().query;return!!($e().some(f=>f.includes(i)&&f.startsWith(t.keys.join(".")))||j()&&JSON.stringify(t.json).includes(i))});return e(u,{get when(){return z()},get children(){return e(me,{ref(i){var s=l;typeof s=="function"?s(i):l=i},get children(){return[(()=>{var i=g(ee);return i.$$click=p,x(i,e(ye,{onClick:w,get children(){return[e(u,{get when(){return t.keys.length>0},get children(){return t.keys[t.keys.length-1]}}),e(u,{get when(){return t.keys.length===0},get children(){return g(Z)}}),e(u,{get when(){return ae()},get children(){return e(ze,{get children(){return[":",d(()=>n())]}})}}),e(u,{get when(){return!r()},get children(){var s=g(q);return s._$owner=M(),$(()=>v(s,"icon",_.collapse)),s}})]}})),K(),i})(),e(u,{get when(){return r()},get children(){return e(pe,{get children(){return e(G,{get fallback(){return d(()=>!!j())()?JSON.stringify(t.json):""},get children(){return[e(T,{get when(){return n()==="array"},get children(){return e(N,{get each(){return t.json},children:(i,s)=>e(V,{root:!1,get keys(){return[...t.keys,s().toString()]},json:i})})}}),e(T,{get when(){return n()==="object"},get children(){return e(N,{get each(){return Object.entries(t.json)},children:([i,s])=>e(V,{root:!1,get keys(){return[...t.keys,i]},json:s})})}}),e(T,{get when(){return d(()=>!!j())()&&(n()==="string"||n()==="boolean"||n()==="number"||n()==="null"||n()==="undefined")},get children(){return e(fe,{get keys(){return t.keys},get value(){return t.json}})}})]}})}})}})]}})}})},we=c("div")`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,be=c("textarea")`
  ${B}
  font-size: 0.8em;
  padding: 0.5rem;
  min-height: 10rem;
  background-color: ${o.surface};
  color: ${o.fadeText};
`,ke=c("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding-bottom: 1rem;
`,xe=c("div")`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  ${J.class} {
    flex-grow: 1;
    max-width: max-content;
  }

  ${S.class}, ${I.class} {
    max-width: max-content;
    flex-grow: 1;
    font-size: ${o.font.size.sm};
    iconify-icon {
      font-size: 1.25em;
    }
  }
`,ve=c(I)`
  width: 100%;
  min-width: max-content;
  color: ${o.primary.color};
  border: 1px solid ${o.primary.color};
  font-size: ${o.font.size.sm};
  border-radius: ${o.border.radius};
  iconify-icon {
    color: ${o.primary.color};
  }
`,Se=c("pre")`
  font-size: ${o.font.size.sm};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: ${o.surface};
  code.highlight {
    color: ${o.primary.color};
    border: 1px dashed ${o.primary.color};
  }
`,Ve=t=>{D(()=>{t.defaultValue&&L(t.defaultValue)});const n=r=>{r.target!==null&&se(a=>({...a,query:r.target.value}))};return[(()=>{var r=g(re);return $(()=>v(r,"innerHTML",W())),r})(),e(we,{get children(){return[e(be,{onInput:r=>{L(r.currentTarget.value)},get children(){return R()}}),e(u,{get when(){return k()},get children(){var r=g(te),a=r.firstChild,[l,w]=A(a.nextSibling),h=l.nextSibling,[p,z]=A(h.nextSibling);return x(r,e(ve,{get children(){return[(()=>{var i=g(q);return i._$owner=M(),$(()=>v(i,"icon",_.error)),i})(),d(()=>k().error)]}}),l,w),x(r,e(u,{get when(){return k().code},get children(){return e(Se,{get children(){return k().code.map((i,s)=>(()=>{var f=g(ne);return x(f,()=>i.line),$(()=>P(f,i.highlight?"highlight":"")),f})())}})}}),p,z),r}}),e(xe,{get children(){return[e(Q,{get classList(){return{active:C().query!==""}},get children(){return[(()=>{var r=g(q);return r._$owner=M(),$(()=>v(r,"icon",_.filter)),r})(),e(U,{placeholder:"Filter",get onInput(){return Y(n,500)}})]}}),e(J,{get children(){return[e(S,{onClick:()=>ce(r=>!r),children:"Toggle Types"}),e(b,{}),e(S,{onClick:()=>ue(r=>!r),children:"Toggle Values"}),e(b,{}),e(X,{copyText:R,get icon(){return _.copy}})]}}),e(J,{get children(){return[e(I,{children:"Indent"}),e(b,{}),e(N,{each:[2,4,8,void 0],children:(r,a)=>[e(S,{get classList(){return{selected:F()===r}},onClick:()=>ie(r),children:r??"None"}),e(u,{get when(){return a()<3},get children(){return e(b,{})}})]})]}})]}}),e(ke,{get children(){return e(V,{keys:[],get json(){return O()},root:!0})}})]}})]};H(["click"]);export{Ve as JSee};
