import{c as h,o as G,b as e,F as v,S as c,h as k,g as l,n as $,t as d,i as w,m as U,e as T,s as q,l as N}from"./web.DgwoslEx.js";import{s as o,f as I}from"./objects.CuEbotcV.js";import{t as a}from"./theme.DKsEEeQi.js";const J=o("div")`
  position: absolute;
  bottom: 0rem;
  left: 100%;
  width: 0rem;
  height: 4px;
  background-color: ${a.primary.color};
  border-radius: calc(${a.border.radius} * 1 / 2);
  transition: all 0.3s ease-in-out;
`,K=o("div")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: ${a.font.family};
  button {
    font-family: ${a.font.family};
  }
`,Q=o("div")`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`,X=o("button")`
  position: relative;
  border: none;
  background-color: transparent;
  color: ${a.fadeText};
  font-size: ${a.font.size.sm};
  padding: 0.5rem 1rem 0.5rem;
  border-radius: ${a.border.radius};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${a.primary.color};
  }

  &.active {
    color: ${a.primary.color};
  }
`,D=r=>{console.log(r);const[n,t]=h({width:"1rem",left:"1rem"});let s;G(()=>{u(r.currentTab())});const u=i=>{r.setCurrentTab(i);const p=s.querySelectorAll("button")[i];if(console.log({tabEl:p}),!p)return;const g=p.getBoundingClientRect();g&&(console.log({tabDimensions:g}),t({width:`${g.width}px`,left:`${g.left-s.getBoundingClientRect().left}px`}))};return e(K,{get children(){return e(Q,{ref(i){var p=s;typeof p=="function"?p(i):s=i},get children(){return[e(J,{get style(){return{...n()}}}),e(v,{get each(){return r.tabs},children:(i,p)=>e(X,{get classList(){return{active:r.currentTab()===p()}},onClick:()=>u(p()),get children(){return i.name}})})]}})}})};var Y=d("<p>Typography"),Z=d("<div>WIP"),A=d("<span>"),ee=d("<span class=type>"),re=d("<span>["),te=d("<span> ] "),oe=d("<span class=subtype>"),ne=d("<iconify-icon icon=ph:palette>",!0,!1),ae=d("<img>"),se=d("<iconify-icon>",!0,!1),x=d("<a href=#>Link"),_=d("<div>"),ce=d("<iconify-icon icon=ph:cursor-click>",!0,!1);const C={txt:"#000",bg:"#fff",surface:"#f0f0f0"},le={txt:"#fff",bg:"#000",surface:"#222"},ie={txt:"#B5C0DB",bg:"#1A1E27",surface:"#303748"},de={txt:"#B5C0DB",bg:"#303748",surface:"#1A1E27"},pe={txt:"#000",bg:"#f0f0f0",surface:"#fff"},ve={txt:"#000",bg:"#fff",surface:"#f0f0f0"},ue={txt:"#000",bg:"#f0f0f0",surface:"#fff",cardShadow:"0px 8px 16px -8px rgba(0,0,0,0.2)"},ge={txt:"#B5C0DB",bg:"#1A1E27",surface:"#303748",cardShadow:"0px 8px 16px -8px rgba(0,0,0,0.2)"},me={txt:"#B5C0DB",bg:"#1A1E27",surface:"#303748",cardShadow:"0px 8px 16px -8px rgba(0,0,0,0.4)"},we={txt:"#1A1E27",bg:"#1A1E27",surface:"rgb(45,255,196)",cardShadow:"0px 16px 32px 4px rgba(45,255,196,0.5)"},he={txt:"#B5C0DB",bg:"#0f111a",surface:"linear-gradient(155deg, #1A1D2C -3.43%, #131621 65.81%)",cardBorder:"linear-gradient(155deg, #2C3046, #0f111a)",cardShadow:"0px 8px 32px -4px rgba(45,255,196,0.05)",primary:{color:"#2DFFC4",over:"#1A1E27"}},fe={txt:"#000",bg:"#f0f0f0",surface:"#fff",cardBorder:"1px solid #ccc"},ye={txt:"#c0caf5",bg:"#35383c",astro:{code:{color:{text:"#92B2CA",background:"#27292c"},token:{function:"#F4CF86",comment:"#A7A8A7",keyword:"#C0A7C7",constant:"#D77C79",punctuation:"#92B2CA","string-expression":"#C2C77B"}}}},xe={txt:"#EC9BC2",bg:"#2C3359",astro:{code:{color:{text:"#EC9BC2",background:"#222640"},token:{constant:"#89DDFF",comment:"#565f89",keyword:"#BB9AF7",function:"#82AAFF",punctuation:"#82AAFF"}}}},be={txt:"#222640",bg:"#efc3de",astro:{code:{color:{text:"#81475f",background:"#FFE4F8"},token:{constant:"#3594BA",comment:"#b495ae",keyword:"#6A45AB",function:"#B53985",punctuation:"#083CAB"}}}},ke={txt:"#222640",bg:"#f0f0f0",surface:"#fff",colors:{primary:"#0d6efd",secondary:"#6c757d",warning:"#ffc107",danger:"#dc3545",success:"#198754",info:"#0dcaf0"}},Ce={txt:"#B5C0DB",bg:"#1A1E27",surface:"#303748",colors:{primary:"#0d6efd",secondary:"#6c757d",warning:"#ffc107",danger:"#dc3545",success:"#198754",info:"#0dcaf0"}},$e={txt:"#919DCF",bg:"#0f111a",surface:"#1e213980",colors:{primary:"#ff5370",secondary:"#6b5eff",heading:"#CCA685",italic:"#CC64AD",fadeText:"#919DCF80",text:"#919DCF"}},Be={txt:"#AEA398",bg:"#252525",surface:"#3C3836",colors:{primary:"#FBA359",secondary:"#B8BB26",heading:"#88B877",italic:"#F47F71",fadeText:"#897969",text:"#AEA398"}},b={lightMode:C,blackModeVars:le,darkModeColorVars:ie,darkModeShadeColorVars:de,lightModeCardVars:pe,lightModeCardFlippedVars:ve,lightModeShadowCardVars:ue,lightModeCardBorderVars:fe,darkModeShadowCardVars:ge,darkModeSharpShadowCardVars:me,darkModeGlowCardVars:we,shinyCardVars:he,codeVars:ye,themeCodeVars:xe,lightThemeCodeVars:be,lightColorsVars:ke,darkColorsVars:Ce,xypColorsVars:$e,gruvColorsVars:Be},V=[{type:"h1",text:"Black & White"},{type:"text",text:"Black and white are the colors of the zen. The white is the light and the black is the darkness, forever entangled in a dance of duality."}],Se=[{type:"card",text:"While it is indeed true that life is hard as evidenced by punching the ground ...."}],y={minimal:{preview:{elements:V,vars:b.lightMode}},converted:{preview:{elements:V,vars:b.blackModeVars}},complex:{preview:{elements:Se,vars:b.darkModeColorVars}}},M=o("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  font-size: ${a.font.size.sm};
`,Te=o("div")`
  width: 100%;
  background-color: var(--preview-bg);
  border-radius: ${a.border.radius};
  color: var(--preview-txt);
  font-family: ${a.font.family};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  width: 100%;

  * {
    transition: all 0.3s ease-in-out;
  }
`,Ae=o("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,_e=o("div")`
  width: 100%;
  border-radius: 0.5rem;
`,f=o("div")`
  width: 100%;
  border-radius: 0.5rem;
  font-size: 2rem;
  margin: 0.5rem 0 0;
`,z=o("div")`
  width: 100%;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  margin: 0.5rem 0 0;
`,P=o("button")`
  max-width: max-content;
  border-radius: 0.5rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  font-family: ${a.font.family};
  color: var(--preview-primary-over);
  background-color: var(--preview-primary-color);
  border: none;
  cursor: pointer;
`,B=o("div")`
  margin: 1rem 0;
  border-radius: 0.5rem;
  background: var(--preview-surface);
  color: var(--txt);
  padding: 1rem;
  box-shadow: var(--preview-cardShadow);
  border: var(--preview-cardBorder, 1px solid transparent);
`,Ve=o("div")`
  border-radius: calc(0.5rem + 2px);
  background: var(--preview-cardBorder);
  padding: 2px;
  height: 100%;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: var(--preview-cardShadow);
`,Fe=o(B)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: none;
  margin: 0;
  ${f.class} {
    color: var(--preview-primary-color);
  }
`,Ee=o("div")`
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(4, 1fr);
  grid-auto-rows: 2rem;
  gap: 2rem;
  width: 100%;
  min-height: 6rem;
  grid-auto-flow: column;
  align-items: center;
  justify-items: center;

  & > div {
    width: max-content;
  }

  iconify-icon {
    width: 2rem;
    height: 2rem;
    font-size: 2rem;
    color: var(--preview-txt);
  }
`,Ie=o("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
`,W=o("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  width: 100%;
  background: var(--section-bg);
  color: var(--section-txt);
`,j=o("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 200px;
  padding: 1rem;
  background: var(--preview-colors-sidebar-bg);
  color: var(--preview-colors-sidebar-txt);
  ${f.class}, a, a:hover, a:active {
    margin: 0;
    color: var(--preview-colors-sidebar-txt);
    text-decoration: none;
  }

  a {
    border: 1px dashed var(--preview-colors-sidebar-txt);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease-in-out;
  }

  a:hover {
    border: 1px solid var(--preview-colors-sidebar-txt);
  }
`,De=o("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background: var(--preview-bg);
  padding: 1rem;
  ${f.class}, ${z.class}, a, a:hover, a:active {
    margin: 0;
    text-decoration: none;
  }
  ${W.class} {
    padding: 1.5rem;
  }
`,Me=o("div")`
  display: flex;
  gap: 0rem;
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  border: 2px dashed var(--preview-colors-border);

  @media (max-width: 600px) {
    font-size: 0.75rem;
    flex-direction: column;
    ${j.class} {
      max-width: 100%;
    }
  }
`,ze=o("pre")`
  width: 100%;
  x-overflow: auto;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--preview-astro-code-color-background);
`,Pe=()=>e(ze,{class:"css-variables",style:"background-color:var(--preview-astro-code-color-background);overflow-x:auto",tabindex:"0",innerHTML:`<span class="line"><span style="color:var(--preview-astro-code-token-comment)">/** A function to end all functions */</span></span>
<span class="line"><span style="color:var(--preview-astro-code-token-keyword)">function</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-function)">showcaseSyntaxHighlighting</span><span style="color:var(--preview-astro-code-color-text)">&lt;</span><span style="color:var(--preview-astro-code-token-function)">T</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-keyword)">extends</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">string</span><span style="color:var(--preview-astro-code-color-text)">&gt;(</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  name</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-function)">T</span><span style="color:var(--preview-astro-code-token-punctuation)">,</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">)</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">void</span><span style="color:var(--preview-astro-code-color-text)"> {</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  </span><span style="color:var(--preview-astro-code-token-comment)">// Use a for loop to log the age multiple times</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  </span><span style="color:var(--preview-astro-code-token-keyword)">for</span><span style="color:var(--preview-astro-code-color-text)"> (</span><span style="color:var(--preview-astro-code-token-keyword)">let</span><span style="color:var(--preview-astro-code-color-text)"> i </span><span style="color:var(--preview-astro-code-token-keyword)">=</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">0</span><span style="color:var(--preview-astro-code-color-text)">; i </span><span style="color:var(--preview-astro-code-token-keyword)">&lt;</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">18</span><span style="color:var(--preview-astro-code-color-text)">; i</span><span style="color:var(--preview-astro-code-token-keyword)">++</span><span style="color:var(--preview-astro-code-color-text)">) { </span><span style="color:var(--preview-astro-code-token-constant)">console</span><span style="color:var(--preview-astro-code-token-function)">.log</span><span style="color:var(--preview-astro-code-color-text)">(</span><span style="color:var(--preview-astro-code-token-string-expression)">\`Age marker: </span><span style="color:var(--preview-astro-code-token-keyword)">\${</span><span style="color:var(--preview-astro-code-color-text)">i</span><span style="color:var(--preview-astro-code-token-keyword)">}</span><span style="color:var(--preview-astro-code-token-string-expression)">\`</span><span style="color:var(--preview-astro-code-color-text)">); }</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  </span><span style="color:var(--preview-astro-code-token-keyword)">interface</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-function)">User</span><span style="color:var(--preview-astro-code-color-text)">&lt;</span><span style="color:var(--preview-astro-code-token-function)">T</span><span style="color:var(--preview-astro-code-color-text)">&gt; {</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">    name</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-function)">T</span><span style="color:var(--preview-astro-code-color-text)">;</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">    age</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">number</span><span style="color:var(--preview-astro-code-color-text)">;</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">    isDeveloper</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">boolean</span><span style="color:var(--preview-astro-code-color-text)">;</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  }</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  </span><span style="color:var(--preview-astro-code-token-keyword)">const</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">user</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-function)">User</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-keyword)">=</span><span style="color:var(--preview-astro-code-color-text)"> { name</span><span style="color:var(--preview-astro-code-token-punctuation)">,</span><span style="color:var(--preview-astro-code-color-text)"> age</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">18</span><span style="color:var(--preview-astro-code-token-punctuation)">,</span><span style="color:var(--preview-astro-code-color-text)"> isDeveloper</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">false</span><span style="color:var(--preview-astro-code-color-text)"> };</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  </span><span style="color:var(--preview-astro-code-token-function)">showcaseSyntaxHighlighting</span><span style="color:var(--preview-astro-code-color-text)">(</span><span style="color:var(--preview-astro-code-token-string-expression)">'Alice'</span><span style="color:var(--preview-astro-code-color-text)">);</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">}</span></span>`}),H=o("div")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: ${a.font.family};
  button {
    font-family: ${a.font.family};
  }
`,We=o("div")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`,F=o("div")`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${a.surface};
  padding: 0.25rem 0.5rem;
  border-radius: ${a.border.radius};
  font-size: ${a.font.size.sm};

  span:nth-child(3):not(.type):not(.subtype) {
    color: ${a.fadeText};
  }

  span.subtype {
    color: ${a.fadeText};
  }
`,je=o("div")`
  width: 1rem;
  height: 1rem;
  border-radius: calc(${a.border.radius} / 2);
  background-color: var(--color);
`,He=o("div")`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: var(--color);
`,E=o("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`,Le=o("div")`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
`,Oe=o(B)`
  padding: 0.5rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  font-size: ${a.font.size.sm};
  border-radius: 0.75rem;
`,Re=o("div")`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14ch, 1fr));
  width: 100%;
  gap: 0.5rem;
`,L=o("div")`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  /* justify-content: center; */
`,O=o(P)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background-color: ${a.surface};
  border-radius: ${a.border.radius};
  color: ${a.fadeText};
  font-size: ${a.font.size.sm};
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${a.primary.color};
  }
`,Ge=o("div")`
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
`,R=r=>{const n=()=>I(r.preview.vars,(t,s)=>[t.join("-"),s]);return e(We,{get children(){return[e(c,{get when(){return r.currentTab()===0},get children(){return e(E,{get children(){return e(v,{get each(){return Object.entries(n())},children:t=>e(F,{get children(){return[e(je,{get style(){return{"--color":t[1]}}}),(()=>{var s=l(A);return w(s,()=>t[1]),s})(),(()=>{var s=l(A);return w(s,()=>t[0]),s})()]}})})}})}}),e(c,{get when(){return r.currentTab()===1},get children(){return e(E,{get children(){return e(v,{get each(){return r.preview.elements},children:t=>e(F,{get children(){return[(()=>{var s=l(ee);return w(s,()=>t.type),s})(),k(()=>k(()=>!!t.elements)()&&[l(re),e(v,{get each(){return t.elements},children:s=>(()=>{var u=l(oe);return w(u,()=>s.type),u})()}),l(te)])]}})})}})}}),e(c,{get when(){return r.currentTab()===2},get children(){return[l(Y),l(Z)]}})]}})},Ue=r=>{const[n,t]=h(!1),[s,u]=h(0);return e(H,{get children(){return[e(L,{get children(){return[e(O,{onClick:()=>t(!n()),get children(){return[(()=>{var i=l(ne);return i._$owner=$(),i})(),"Info"]}}),e(c,{get when(){return n()},get children(){return e(D,{tabs:[{name:"Colors"},{name:"Elements"}],currentTab:s,setCurrentTab:u})}})]}}),e(c,{get when(){return n()},get children(){return e(R,U({currentTab:s},r))}})]}})},m=r=>e(Ae,{get children(){return[e(c,{get when(){return r.element.type==="text"},get children(){return e(_e,{get children(){return r.element.text}})}}),e(c,{get when(){return r.element.type==="button"},get children(){return e(P,{get children(){return r.element.text}})}}),e(c,{get when(){return r.element.type==="h1"},get children(){return e(f,{get children(){return r.element.text}})}}),e(c,{get when(){return r.element.type==="h2"},get children(){return e(z,{get children(){return r.element.text}})}}),e(c,{get when(){return r.element.type==="card"},get children(){return e(B,{get children(){return r.element.text}})}}),e(c,{get when(){return r.element.type==="shinycard"},get children(){return e(Ve,{get children(){return e(Fe,{get children(){return e(v,{get each(){return r.element.elements??y.minimal.preview.elements},children:(n,t)=>e(m,{get vars(){return r.vars},element:n,get i(){return t()}})})}})}})}}),e(c,{get when(){return r.element.type==="illus"},get children(){return e(Ge,{get children(){var n=l(ae);return T(()=>q(n,"src",r.element.text)),n}})}}),e(c,{get when(){return r.element.type==="code"},get children(){return e(Pe,{})}}),e(c,{get when(){return r.element.type==="colors"},get children(){return e(Re,{get children(){return e(v,{get each(){return Object.entries(r.vars.colors??{})},children:n=>e(Oe,{get children(){return[e(He,{get style(){return{"--color":n[1]}}}),e(Le,{get children(){return[(()=>{var t=l(_);return w(t,()=>n[1]),t})(),(()=>{var t=l(_);return w(t,()=>n[0]),t})()]}})]}})})}})}}),e(c,{get when(){return r.element.type==="icons"},get children(){return e(Ee,{get children(){return e(v,{get each(){return r.element.elements??[{type:"icon",text:"ph:heart"}]},children:(n,t)=>e(m,{get vars(){return r.vars},element:n,get i(){return t()}})})}})}}),e(c,{get when(){return r.element.type==="icon"},get children(){var n=l(se);return n._$owner=$(),T(()=>N(n,"icon",r.element.text)),n}}),e(c,{get when(){return r.element.type==="sidebar"},get children(){return e(Me,{get children(){return[e(j,{get children(){return[e(f,{children:"Sidebar"}),l(x),l(x),l(x)]}}),e(De,{get children(){return e(v,{get each(){return r.element.elements??y.minimal.preview.elements},children:(n,t)=>e(m,{get vars(){return r.vars},element:n,get i(){return t()}})})}})]}})}}),e(c,{get when(){return r.element.type==="sections"},get children(){return e(Ie,{get children(){return e(v,{get each(){return r.element.elements??[{type:"section",text:"This is a content section"}]},children:(n,t)=>e(m,{get vars(){return r.vars},element:n,get i(){return t()}})})}})}}),e(c,{get when(){return r.element.type==="section"},get children(){return e(W,{get style(){return{"--section-bg":r.vars.colors?r.vars.colors["section-"+r.i]:r.vars.surface,"--section-txt":r.vars.colors?r.vars.colors["section-"+r.i+"-txt"]:r.vars.txt}},get children(){return e(v,{get each(){return r.element.elements??y.minimal.preview.elements},children:(n,t)=>e(m,{get vars(){return r.vars},element:n,get i(){return t()}})})}})}})]}}),qe=r=>{const n=I(r.preview.vars??C,(t,s)=>[`--preview-${t.join("-")}`,s]);return e(M,{get style(){return{margin:r.isSplit!==!0?"1rem 0":"0"}},get children(){return[e(Te,{get style(){return{...n}},get children(){return e(v,{get each(){return r.preview.elements??y.minimal.preview.elements},children:(t,s)=>e(m,{get vars(){return r.preview.vars??C},get i(){return s()},element:t})})}}),e(c,{get when(){return r.isSplit!==!0},get children(){return e(Ue,r)}}),k(()=>r.children)]}})},Ne=o("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
`,Je=o("div")`
  @media (min-width: 600px) {
    max-width: 50%;
  }
  min-width: min(50%, 300px);
  height: fit-content;
  flex-grow: 1;
  flex-basis: 0;
  outline-offset: 4px;

  &:hover {
    outline: 2px solid ${a.fadeText};
  }

  border-radius: ${a.border.radius};

  &.active {
    outline: 2px solid ${a.primary.color};
  }
`,Ye=r=>{const[n,t]=h(0),[s,u]=h(0),[i,p]=h(!1);return e(M,{style:{margin:"1rem 0"},get children(){return[e(Ne,{get children(){return e(v,{get each(){return r.previews},children:(g,S)=>e(Je,{get classList(){return{active:i()&&s()===S()}},tabIndex:0,role:"button",onClick:()=>{p(!0),u(S())},get children(){return e(qe,{preview:g,isSplit:!0})}})})}}),e(c,{get when(){return r.previews.length>1},get children(){return e(H,{get children(){return[e(L,{get children(){return[e(O,{onClick:()=>p(!i()),get children(){return[(()=>{var g=l(ce);return g._$owner=$(),g})(),"Inspect"]}}),e(c,{get when(){return i()},get children(){return e(D,{tabs:[{name:"Variables"},{name:"Components"}],currentTab:n,setCurrentTab:t})}})]}}),e(c,{get when(){return i()},get children(){return e(R,{currentTab:n,get preview(){return r.previews[s()]}})}})]}})}})]}})};export{qe as ThemePreview,Ye as ThemePreviewSplits};
