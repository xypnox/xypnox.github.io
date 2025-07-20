import{h as m,g as $,i as g,b as i,e as w,F as d,t as y,q as v}from"./web.DgwoslEx.js";import{s as p,f as j,h as x}from"./objects.CuEbotcV.js";var C=y("<div>");function L(o){return`
    ${o.map((n,s)=>`${Math.round(s*100/o.length)}% { color: ${n}; }`).join("")}
  `}const S=({poem:o,colors:t})=>{const n=j({colors:t},(e,r)=>[`poem-${e.join("-")}`,r]),s=Object.entries(n).map(([e,r])=>`--${e}: ${r};`).join(`
`),l=Object.entries(n).map(([e,r])=>`var(--${e})`);function h(e){return e.split(`
`).map(a=>a.split(" "))}const f=m(()=>e=>x`
    ${L(e)}
  `),u=m(()=>e=>p("span")`
    transition: color 0.5s ease-in-out;
    animation: ${f()(e)} 5s linear alternate infinite;
    animation-delay: var(--poem-line-word-delay);
    /* color: var(--poem-line-word-color); */
  `)()([...l,l[0]]);return(()=>{var e=$(C);return g(e,i(d,{get each(){return h(o)},children:r=>i(b,{get children(){return i(d,{each:r,children:(c,a)=>i(u,{get style(){return{"--poem-line-word-delay":`${(a()/r.length*1).toFixed(2)}s`,"--poem-line-word-color":t[a()%t.length]}},children:c})})}})})),w(r=>v(e,s,r)),e})()},b=p("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-height: 1.5rem;
`;export{S as ColorPoem};
