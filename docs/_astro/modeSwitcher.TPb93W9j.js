import{b as t,F as p,g as n,n as l,e as h,l as f,i as g,S as u,t as s}from"./web.BvE3ojRe.js";import{a as w,B as x,G as $}from"./atoms.D9CjkvA7.js";import{c as y}from"./text.G-9XCW-H.js";import{t as i}from"./themeState.DSZfK7qY.js";import{i as o}from"./icons.DPFSZ9OK.js";import{s as m}from"./objects.-XdWwpQU.js";import{t as a}from"./theme.B-1Y4buH.js";import"./store.C4DiOvhL.js";import"./version.BiGcaLu2.js";var S=s("<iconify-icon>",!0,!1),k=s("<span>");const v=m(w)`
  position: relative;
  width: max-content;
  overflow: hidden;
`,z=m(x)`
  z-index: 2;
  padding: 0.5rem 1rem 0.5rem 0.75rem;
  align-items: center;
  color: ${a.fadeText};
  iconify-icon {
    width: 1.25rem;
    height: 1.25rem;
    font-size: 1.25rem;
  }
  span {
    font-size: 1rem;
  }
  &.selected {
    background: ${a.surface};
  }
  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    iconify-icon {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 1.5rem;
    }
    span {
      display: none;
    }
  }
`,_={light:o.light,dark:o.dark,auto:o.auto},N=()=>{const c=["light","dark","auto"];return t(v,{get children(){return t(p,{each:c,children:(r,d)=>[t(z,{get classList(){return{selected:i.themeConfig.get().mode===r}},onClick:()=>i.changeMode(r),get children(){return[(()=>{var e=n(S);return e._$owner=l(),h(()=>f(e,"icon",_[r])),e})(),(()=>{var e=n(k);return g(e,()=>y(r)),e})()]}}),t(u,{get when(){return d()!==2},get children(){return t($,{})}})]})}})};export{N as default};
