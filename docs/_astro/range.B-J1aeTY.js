import{s as n}from"./objects.CuEbotcV.js";import{L as s}from"./atoms.DljnSypY.js";import{b as r,h as o}from"./web.DgwoslEx.js";import{t as e}from"./theme.DKsEEeQi.js";const a=n("input")`
  -webkit-appearance: none;  
  appearance: none;
  width: 100%; 
  height: 1em; 
  margin: 0; 
  background: transparent;
  outline: none; 
  z-index: 4;

  &::-moz-range-thumb {
    height: 0.8em; 
    width: 0.8em; 
    background: ${e.text}; 
    border-radius: 50%;
    border: 0.2em solid ${e.background};
    cursor: pointer; 
    transition: all ease-in-out .2s;
    outline: 0.1em solid transparent;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: ${e.text}; 
    height: 0.8em; 
    width: 0.8em; 
    background: ${e.text}; 
    border-radius: 50%;
    border: 0.2em solid ${e.background};
    cursor: pointer; 
    transition: all ease-in-out .2s;
    outline: 0.1em solid transparent;
  }


  &:hover {
    &::-moz-range-thumb {
      background: ${e.primary.color};
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      background: ${e.primary.color};
    }
  }
  &:focus-within {
    &::-moz-range-thumb {
      outline: 0.1em solid ${e.primary.color};
      background: ${e.primary.color};
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      background: ${e.primary.color};
      outline: 0.1em solid ${e.primary.color};
    }
  }
  &:active {
    &::-moz-range-thumb {
      outline: 0.1em solid ${e.primary.color};
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      outline: 0.1em solid ${e.primary.color};
    }
  }
`,m=n("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`,i=n("div")`
  font-weight: bold;
  color: ${e.fadeText};
  transition: color 0.2s ease;
`,u=n("div")`
  position: absolute;
  width: 100%;
  height: 0.6em;
  background: ${e.surface2};
  bottom: 0.2em;
  transition: width 0s ease, background 0.2s ease;
  pointer-events: none;
  border-radius: 0.5em;
  z-index: 1;
`,l=n("div")`
  position: absolute;
  width: calc(var(--width, 0%) - 0.4em);
  height: 0.2em;
  background: ${e.text};
  bottom: 0.4em;
  left: 0.2em;
  transition: width 0s ease, background 0.2s ease;
  pointer-events: none;
  border-radius: 0.25em;
  z-index: 2;
`,d=n("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &:hover {
    ${i.class} {
      color: ${e.primary.color};
    }
  }
  &:has(${a.class}:hover) {
    ${l.class} {
      background: ${e.primary.color};
    }
  }
`,p=t=>r(d,{get children(){return[r(m,{get children(){return[r(s,{get children(){return t.label}}),o(()=>o(()=>!!t.showValue)()&&r(i,{get children(){return t.value}}))]}}),r(u,{}),r(l,{get style(){return{"--width":`${(t.value-t.min)/(t.max-t.min)*100}%`}}}),r(a,{type:"range",get min(){return t.min},get max(){return t.max},get step(){return t.step},get value(){return t.value},get onInput(){return t.onChange}})]}});export{p as R};
