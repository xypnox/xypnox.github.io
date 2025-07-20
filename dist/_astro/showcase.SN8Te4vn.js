import{b as t,g as e,F as g,i as d,e as l,t as s,q as n}from"./web.DgwoslEx.js";import{s as v}from"./objects.CuEbotcV.js";import{s as u,t as c}from"./themeState.pOZySbsd.js";import"./theme.DKsEEeQi.js";import"./store.CEmFEfZ_.js";import"./version.BiGcaLu2.js";var f=s("<div class=swatch style=--color:var(--primary-color)>"),y=s("<div class=swatch style=--color:var(--secondary-color)>"),$=s("<div class=swatch style=--color:var(--surface)>"),b=s("<div class=swatch style=--color:var(--text)>"),x=s("<hr>"),k=s("<h2 id=current-themes>Current Themes"),w=s("<h2>"),m=s("<div class=colors>");const _=v("div")`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  width: 100%;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,S=v("div")`
  width: 100%;
  background: var(--background);
  color: var(--text);
  cursor: pointer;
  padding: 1rem;
  border-radius: calc(2 * var(--border-radius));
  border: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100%;

  h2 {
    font-size: var(--font-size-base);
    margin: 0;
  }

  &:hover {
    border-color: var(--primary-color);
  }


  .swatch {
    flex-grow: 1;
    height: 2rem;
    border-radius: calc(2 * var(--border-radius));
    background: var(--color);
  }

  .colors {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    background: var(--back);
    border-radius: calc(4 * var(--border-radius));
  }
`,p=()=>[e(f),e(y),e($),e(b)],T=o=>{c.themeExists(o.id)||c.addTheme(o),c.changeTheme(o.id)},J=()=>[t(h,{themes:u,clickAct:"import"}),e(x),e(k),t(h,{get themes(){return c.themes()},clickAct:"apply"})],h=o=>t(_,{get children(){return t(g,{get each(){return o.themes},children:r=>t(S,{onClick:()=>{o.clickAct==="import"?T(JSON.parse(JSON.stringify(r))):c.changeTheme(r.id)},get children(){return[(()=>{var a=e(w);return d(a,()=>r.name),a})(),(()=>{var a=e(m);return d(a,t(p,{})),l(i=>n(a,`--back: ${r.vars.light.background}; --text: ${r.vars.light.text}; --primary-color: ${r.vars.light.primary}; --secondary-color: ${r.vars.light.secondary}; --surface: ${r.vars.light.surface};`,i)),a})(),(()=>{var a=e(m);return d(a,t(p,{})),l(i=>n(a,`--back: ${r.vars.dark.background}; --text: ${r.vars.dark.text}; --primary-color: ${r.vars.dark.primary}; --secondary-color: ${r.vars.dark.secondary}; --surface: ${r.vars.dark.surface};`,i)),a})()]}})})}});export{J as ThemeShowcase};
