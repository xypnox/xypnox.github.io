import{c as ae,a as X,G as it,h as Le,o as Re,p as ze,b as o,g as A,n as N,e as H,l as D,t as I,f as fe,i as me,S as F,F as Se,s as Oe}from"./web.BvE3ojRe.js";import{t as g}from"./themeState.DSZfK7qY.js";import{s as T,h as st}from"./objects.-XdWwpQU.js";import{t as p,C as ct}from"./theme.B-1Y4buH.js";import{i as L}from"./icons.DPFSZ9OK.js";import{d as dt}from"./index.C2pBoA4W.js";import{a as Ee,p as ut,c as We}from"./text.G-9XCW-H.js";import{L as Ge,b as Ae,B as Ve,c as Te,a as we,G as ke}from"./atoms.D9CjkvA7.js";import{C as ce}from"./copyButton.ChHVDE0P.js";import{D as ht,a as Fe}from"./dropselect.D3OtMaoa.js";import{n as ft}from"./index.browser.vcSNLBTf.js";import mt from"./modeSwitcher.TPb93W9j.js";import"./store.C4DiOvhL.js";import"./version.BiGcaLu2.js";import"./_commonjsHelpers.Cpj98o6Y.js";import"./tooltip.iARCRW1Q.js";const He={Elements:["Earth","Fire","Water","Air","Metal","Molten","Quicksilver","Crystalline","Plasma","Turbulence","Meadow","Blaze","Torrent","Breeze","Alloy","Petrified","Inferno","Cascade","Zephyr","Forged","Granite","Ignite","Ripple","Gale","Silver"],Geography:["Oasis","Horizon","Summit","Tundra","Archipelago","Canyon","Tropics","Mesa","Glacier","Peninsula","Savanna","Plateau","Fjord","Steppe","Atoll","Badlands","Cape","Abyss","Lagoon","Highland","Delta","Dunes","Crag","Vale","Isthmus"],Time:["Epoch","Era","Moment","Legacy","Flashback","Chronicle","Centennial","Synchrony","Pulse","Eon","Yesterday","Tomorrow","Dawn","Twilight","Infinity","Ageless","Crescendo","Decades","Nostalgia","Tempo","Cycles","Occasion","Aeon","Transcend","Ancestry"],Emotions:["Joy","Tranquil","Melancholy","Zeal","Serenity","Radiance","Tender","Whimsy","Zeppelin","Euphoria","Nectar","Vivid","Enigma","Harmony","Crimson","Luminescent","Soothing","Ecstasy","Ineffable","Ambrosia","Elation","Utopia","Ponder","Resonance","Lullaby"],Travel:["Odyssey","Expedition","Safari","Voyage","Trek","Pilgrimage","Journey","Quest","Roaming","Nomad","Wanderlust","Sojourn","Escapade","Venture","Traverse","Peregrination","Excursion","Discovery","Promenade","Peregrine","Globetrot","Ramble","Jaunt","Wayfarer","Pioneer"],Style:["Radiant","Harmonious","Vibrant","Serene","Chic","Ethereal","Dynamic","Sleek","Elemental","Zen","Whimsical","Timeless","Urban","Organic","Eclectic","Minimalist","Coastal","Futuristic","Retro","Bohemian"],Nature:["Petal","Blossom","Bloom","Spring","Summer","Autumn","Winter","Rose","Lily","Citrus","Mint","Spice","Lavender","Pomegranate","Vanilla","Cocoa","Peach","Orchid","Peony","Cinnamon"]},pt=(d=2)=>{let a="";for(let h=0;h<d;h++){const f=Object.keys(He),y=f[Math.floor(Math.random()*f.length)],b=He[y];a+=" "+b[Math.floor(Math.random()*b.length)]}return a.trim()},P=(()=>{/*!
* Copyright (c) 2021-2023 Momo Bassit.
* Licensed under the MIT License (MIT)
* https://github.com/mdbassit/Coloris
* Version: 0.21.1
* NPM: https://github.com/melloware/coloris-npm
*/return((d,a,h,f)=>{const y=a.createElement("canvas").getContext("2d"),b={r:0,g:0,b:0,h:0,s:0,v:0,a:1};let c,u,v,i,x,$,R,z,W,O,K,G,S,Z,V,pe,M={};const n={el:"[data-coloris]",parent:"body",theme:"default",themeMode:"light",rtl:!1,wrap:!0,margin:2,format:"hex",formatToggle:!1,swatches:[],swatchesOnly:!1,alpha:!0,forceAlpha:!1,focusInput:!0,selectInput:!1,inline:!1,defaultColor:"#000000",clearButton:!1,clearLabel:"Clear",closeButton:!1,closeLabel:"Close",onChange:()=>f,a11y:{open:"Open color picker",close:"Close color picker",clear:"Clear the selected color",marker:"Saturation: {s}. Brightness: {v}.",hueSlider:"Hue slider",alphaSlider:"Opacity slider",input:"Color value field",format:"Color format",swatch:"Color swatch",instruction:"Saturation and brightness selector. Use up, down, left and right arrow keys to select."}},Q={};let ge="",ee={},te=!1;function le(e){if(typeof e=="object")for(const t in e)switch(t){case"el":be(e.el),e.wrap!==!1&&oe(e.el);break;case"parent":c=a.querySelector(e.parent),c&&(c.appendChild(u),n.parent=e.parent,c===a.body&&(c=f));break;case"themeMode":n.themeMode=e.themeMode,e.themeMode==="auto"&&d.matchMedia&&d.matchMedia("(prefers-color-scheme: dark)").matches&&(n.themeMode="dark");case"theme":e.theme&&(n.theme=e.theme),u.className=`clr-picker clr-${n.theme} clr-${n.themeMode}`,n.inline&&re();break;case"rtl":n.rtl=!!e.rtl,a.querySelectorAll(".clr-field").forEach(s=>s.classList.toggle("clr-rtl",n.rtl));break;case"margin":e.margin*=1,n.margin=isNaN(e.margin)?n.margin:e.margin;break;case"wrap":e.el&&e.wrap&&oe(e.el);break;case"formatToggle":n.formatToggle=!!e.formatToggle,C("clr-format").style.display=n.formatToggle?"block":"none",n.formatToggle&&(n.format="auto");break;case"swatches":if(Array.isArray(e.swatches)){const s=[];e.swatches.forEach((m,k)=>{s.push(`<button type="button" id="clr-swatch-${k}" aria-labelledby="clr-swatch-label clr-swatch-${k}" style="color: ${m};">${m}</button>`)}),C("clr-swatches").innerHTML=s.length?`<div>${s.join("")}</div>`:"",n.swatches=e.swatches.slice()}break;case"swatchesOnly":n.swatchesOnly=!!e.swatchesOnly,u.setAttribute("data-minimal",n.swatchesOnly);break;case"alpha":n.alpha=!!e.alpha,u.setAttribute("data-alpha",n.alpha);break;case"inline":if(n.inline=!!e.inline,u.setAttribute("data-inline",n.inline),n.inline){const s=e.defaultColor||n.defaultColor;Z=ve(s),re(),ne(s)}break;case"clearButton":typeof e.clearButton=="object"&&(e.clearButton.label&&(n.clearLabel=e.clearButton.label,R.innerHTML=n.clearLabel),e.clearButton=e.clearButton.show),n.clearButton=!!e.clearButton,R.style.display=n.clearButton?"block":"none";break;case"clearLabel":n.clearLabel=e.clearLabel,R.innerHTML=n.clearLabel;break;case"closeButton":n.closeButton=!!e.closeButton,n.closeButton?u.insertBefore(z,x):x.appendChild(z);break;case"closeLabel":n.closeLabel=e.closeLabel,z.innerHTML=n.closeLabel;break;case"a11y":const r=e.a11y;let l=!1;if(typeof r=="object")for(const s in r)r[s]&&n.a11y[s]&&(n.a11y[s]=r[s],l=!0);if(l){const s=C("clr-open-label"),m=C("clr-swatch-label");s.innerHTML=n.a11y.open,m.innerHTML=n.a11y.swatch,z.setAttribute("aria-label",n.a11y.close),R.setAttribute("aria-label",n.a11y.clear),W.setAttribute("aria-label",n.a11y.hueSlider),K.setAttribute("aria-label",n.a11y.alphaSlider),$.setAttribute("aria-label",n.a11y.input),v.setAttribute("aria-label",n.a11y.instruction)}break;default:n[t]=e[t]}}function Je(e,t){typeof e=="string"&&typeof t=="object"&&(Q[e]=t,te=!0)}function Ye(e){delete Q[e],Object.keys(Q).length===0&&(te=!1,e===ge&&ye())}function Be(e){if(te){const t=["el","wrap","rtl","inline","defaultColor","a11y"];for(let r in Q){const l=Q[r];if(e.matches(r)){ge=r,ee={},t.forEach(s=>delete l[s]);for(let s in l)ee[s]=Array.isArray(n[s])?n[s].slice():n[s];le(l);break}}}}function ye(){Object.keys(ee).length>0&&(le(ee),ge="",ee={})}function be(e){w(a,"click",e,t=>{n.inline||(Be(t.target),S=t.target,V=S.value,Z=ve(V),u.classList.add("clr-open"),re(),ne(V),(n.focusInput||n.selectInput)&&($.focus({preventScroll:!0}),$.setSelectionRange(S.selectionStart,S.selectionEnd)),n.selectInput&&$.select(),(pe||n.swatchesOnly)&&Ie().shift().focus(),S.dispatchEvent(new Event("open",{bubbles:!0})))}),w(a,"input",e,t=>{const r=t.target.parentNode;r.classList.contains("clr-field")&&(r.style.color=t.target.value)})}function re(){if(!u||!S&&!n.inline)return;const e=c,t=d.scrollY,r=u.offsetWidth,l=u.offsetHeight,s={left:!1,top:!1};let m,k,_,E={x:0,y:0};if(e&&(m=d.getComputedStyle(e),k=parseFloat(m.marginTop),_=parseFloat(m.borderTopWidth),E=e.getBoundingClientRect(),E.y+=_+t),!n.inline){const B=S.getBoundingClientRect();let J=B.x,q=t+B.y+B.height+n.margin;e?(J-=E.x,q-=E.y,J+r>e.clientWidth&&(J+=B.width-r,s.left=!0),q+l>e.clientHeight-k&&l+n.margin<=B.top-(E.y-t)&&(q-=B.height+l+n.margin*2,s.top=!0),q+=e.scrollTop):(J+r>a.documentElement.clientWidth&&(J+=B.width-r,s.left=!0),q+l-t>a.documentElement.clientHeight&&l+n.margin<=B.top&&(q=t+B.y-l-n.margin,s.top=!0)),u.classList.toggle("clr-left",s.left),u.classList.toggle("clr-top",s.top),u.style.left=`${J}px`,u.style.top=`${q}px`,E.x+=u.offsetLeft,E.y+=u.offsetTop}M={width:v.offsetWidth,height:v.offsetHeight,x:v.offsetLeft+E.x,y:v.offsetTop+E.y}}function oe(e){a.querySelectorAll(e).forEach(t=>{const r=t.parentNode;if(!r.classList.contains("clr-field")){const l=a.createElement("div");let s="clr-field";(n.rtl||t.classList.contains("clr-rtl"))&&(s+=" clr-rtl"),l.innerHTML='<button type="button" aria-labelledby="clr-open-label"></button>',r.insertBefore(l,t),l.setAttribute("class",s),l.style.color=t.value,l.appendChild(t)}})}function U(e){if(S&&!n.inline){const t=S;e&&(S=f,V!==t.value&&(t.value=V,t.dispatchEvent(new Event("input",{bubbles:!0})))),setTimeout(()=>{V!==t.value&&t.dispatchEvent(new Event("change",{bubbles:!0}))}),u.classList.remove("clr-open"),te&&ye(),t.dispatchEvent(new Event("close",{bubbles:!0})),n.focusInput&&t.focus({preventScroll:!0}),S=f}}function ne(e){const t=tt(e),r=et(t);_e(r.s,r.v),ie(t,r),W.value=r.h,u.style.color=`hsl(${r.h}, 100%, 50%)`,O.style.left=`${r.h/360*100}%`,i.style.left=`${M.width*r.s/100}px`,i.style.top=`${M.height-M.height*r.v/100}px`,K.value=r.a*100,G.style.left=`${r.a*100}%`}function ve(e){const t=e.substring(0,3).toLowerCase();return t==="rgb"||t==="hsl"?t:"hex"}function j(e){e=e!==f?e:$.value,S&&(S.value=e,S.dispatchEvent(new Event("input",{bubbles:!0}))),n.onChange&&n.onChange.call(d,e,S),a.dispatchEvent(new CustomEvent("coloris:pick",{detail:{color:e,currentEl:S}}))}function Me(e,t){const r={h:W.value*1,s:e/M.width*100,v:100-t/M.height*100,a:K.value/100},l=Ze(r);_e(r.s,r.v),ie(l,r),j()}function _e(e,t){let r=n.a11y.marker;e=e.toFixed(1)*1,t=t.toFixed(1)*1,r=r.replace("{s}",e),r=r.replace("{v}",t),i.setAttribute("aria-label",r)}function qe(e){return{pageX:e.changedTouches?e.changedTouches[0].pageX:e.pageX,pageY:e.changedTouches?e.changedTouches[0].pageY:e.pageY}}function Y(e){const t=qe(e);let r=t.pageX-M.x,l=t.pageY-M.y;c&&(l+=c.scrollTop),Pe(r,l),e.preventDefault(),e.stopPropagation()}function Ke(e,t){let r=i.style.left.replace("px","")*1+e,l=i.style.top.replace("px","")*1+t;Pe(r,l)}function Pe(e,t){e=e<0?0:e>M.width?M.width:e,t=t<0?0:t>M.height?M.height:t,i.style.left=`${e}px`,i.style.top=`${t}px`,Me(e,t),i.focus()}function ie(e,t){e===void 0&&(e={}),t===void 0&&(t={});let r=n.format;for(const m in e)b[m]=e[m];for(const m in t)b[m]=t[m];const l=rt(b),s=l.substring(0,7);switch(i.style.color=s,G.parentNode.style.color=s,G.style.color=l,x.style.color=l,v.style.display="none",v.offsetHeight,v.style.display="",G.nextElementSibling.style.display="none",G.nextElementSibling.offsetHeight,G.nextElementSibling.style.display="",r==="mixed"?r=b.a===1?"hex":"rgb":r==="auto"&&(r=Z),r){case"hex":$.value=l;break;case"rgb":$.value=nt(b);break;case"hsl":$.value=at(Qe(b));break}a.querySelector(`.clr-format [value="${r}"]`).checked=!0}function Ue(){const e=W.value*1,t=i.style.left.replace("px","")*1,r=i.style.top.replace("px","")*1;u.style.color=`hsl(${e}, 100%, 50%)`,O.style.left=`${e/360*100}%`,Me(t,r)}function Xe(){const e=K.value/100;G.style.left=`${e*100}%`,ie({a:e}),j()}function Ze(e){const t=e.s/100,r=e.v/100;let l=t*r,s=e.h/60,m=l*(1-h.abs(s%2-1)),k=r-l;l=l+k,m=m+k;const _=h.floor(s)%6,E=[l,m,k,k,m,l][_],B=[m,l,l,m,k,k][_],J=[k,k,m,l,l,m][_];return{r:h.round(E*255),g:h.round(B*255),b:h.round(J*255),a:e.a}}function Qe(e){const t=e.v/100,r=t*(1-e.s/100/2);let l;return r>0&&r<1&&(l=h.round((t-r)/h.min(r,1-r)*100)),{h:e.h,s:l||0,l:h.round(r*100),a:e.a}}function et(e){const t=e.r/255,r=e.g/255,l=e.b/255,s=h.max(t,r,l),m=h.min(t,r,l),k=s-m,_=s;let E=0,B=0;return k&&(s===t&&(E=(r-l)/k),s===r&&(E=2+(l-t)/k),s===l&&(E=4+(t-r)/k),s&&(B=k/s)),E=h.floor(E*60),{h:E<0?E+360:E,s:h.round(B*100),v:h.round(_*100),a:e.a}}function tt(e){const t=/^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i;let r,l;return y.fillStyle="#000",y.fillStyle=e,r=t.exec(y.fillStyle),r?(l={r:r[3]*1,g:r[4]*1,b:r[5]*1,a:r[6]*1},l.a=+l.a.toFixed(2)):(r=y.fillStyle.replace("#","").match(/.{2}/g).map(s=>parseInt(s,16)),l={r:r[0],g:r[1],b:r[2],a:1}),l}function rt(e){let t=e.r.toString(16),r=e.g.toString(16),l=e.b.toString(16),s="";if(e.r<16&&(t="0"+t),e.g<16&&(r="0"+r),e.b<16&&(l="0"+l),n.alpha&&(e.a<1||n.forceAlpha)){const m=e.a*255|0;s=m.toString(16),m<16&&(s="0"+s)}return"#"+t+r+l+s}function nt(e){return!n.alpha||e.a===1&&!n.forceAlpha?`rgb(${e.r}, ${e.g}, ${e.b})`:`rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`}function at(e){return!n.alpha||e.a===1&&!n.forceAlpha?`hsl(${e.h}, ${e.s}%, ${e.l}%)`:`hsla(${e.h}, ${e.s}%, ${e.l}%, ${e.a})`}function lt(){a.getElementById("clr-picker")||(c=f,u=a.createElement("div"),u.setAttribute("id","clr-picker"),u.className="clr-picker",u.innerHTML=`<input id="clr-color-value" name="clr-color-value" class="clr-color" type="text" value="" spellcheck="false" aria-label="${n.a11y.input}"><div id="clr-color-area" class="clr-gradient" role="application" aria-label="${n.a11y.instruction}"><div id="clr-color-marker" class="clr-marker" tabindex="0"></div></div><div class="clr-hue"><input id="clr-hue-slider" name="clr-hue-slider" type="range" min="0" max="360" step="1" aria-label="${n.a11y.hueSlider}"><div id="clr-hue-marker"></div></div><div class="clr-alpha"><input id="clr-alpha-slider" name="clr-alpha-slider" type="range" min="0" max="100" step="1" aria-label="${n.a11y.alphaSlider}"><div id="clr-alpha-marker"></div><span></span></div><div id="clr-format" class="clr-format"><fieldset class="clr-segmented"><legend>${n.a11y.format}</legend><input id="clr-f1" type="radio" name="clr-format" value="hex"><label for="clr-f1">Hex</label><input id="clr-f2" type="radio" name="clr-format" value="rgb"><label for="clr-f2">RGB</label><input id="clr-f3" type="radio" name="clr-format" value="hsl"><label for="clr-f3">HSL</label><span></span></fieldset></div><div id="clr-swatches" class="clr-swatches"></div><button type="button" id="clr-clear" class="clr-clear" aria-label="${n.a11y.clear}">${n.clearLabel}</button><div id="clr-color-preview" class="clr-preview"><button type="button" id="clr-close" class="clr-close" aria-label="${n.a11y.close}">${n.closeLabel}</button></div><span id="clr-open-label" hidden>${n.a11y.open}</span><span id="clr-swatch-label" hidden>${n.a11y.swatch}</span>`,a.body.appendChild(u),v=C("clr-color-area"),i=C("clr-color-marker"),R=C("clr-clear"),z=C("clr-close"),x=C("clr-color-preview"),$=C("clr-color-value"),W=C("clr-hue-slider"),O=C("clr-hue-marker"),K=C("clr-alpha-slider"),G=C("clr-alpha-marker"),be(n.el),oe(n.el),w(u,"mousedown",e=>{u.classList.remove("clr-keyboard-nav"),e.stopPropagation()}),w(v,"mousedown",e=>{w(a,"mousemove",Y)}),w(v,"touchstart",e=>{a.addEventListener("touchmove",Y,{passive:!1})}),w(i,"mousedown",e=>{w(a,"mousemove",Y)}),w(i,"touchstart",e=>{a.addEventListener("touchmove",Y,{passive:!1})}),w($,"change",e=>{const t=$.value;if(S||n.inline){const r=t===""?t:ne(t);j(r)}}),w(R,"click",e=>{j(""),U()}),w(z,"click",e=>{j(),U()}),w(C("clr-format"),"click",".clr-format input",e=>{Z=e.target.value,ie(),j()}),w(u,"click",".clr-swatches button",e=>{ne(e.target.textContent),j(),n.swatchesOnly&&U()}),w(a,"mouseup",e=>{a.removeEventListener("mousemove",Y)}),w(a,"touchend",e=>{a.removeEventListener("touchmove",Y)}),w(a,"mousedown",e=>{pe=!1,u.classList.remove("clr-keyboard-nav"),U()}),w(a,"keydown",e=>{const t=e.key,r=e.target,l=e.shiftKey;if(t==="Escape"?U(!0):["Tab","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(t)&&(pe=!0,u.classList.add("clr-keyboard-nav")),t==="Tab"&&r.matches(".clr-picker *")){const m=Ie(),k=m.shift(),_=m.pop();l&&r===k?(_.focus(),e.preventDefault()):!l&&r===_&&(k.focus(),e.preventDefault())}}),w(a,"click",".clr-field button",e=>{te&&ye(),e.target.nextElementSibling.dispatchEvent(new Event("click",{bubbles:!0}))}),w(i,"keydown",e=>{const t={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};Object.keys(t).includes(e.key)&&(Ke(...t[e.key]),e.preventDefault())}),w(v,"click",Y),w(W,"input",Ue),w(K,"input",Xe))}function Ie(){return Array.from(u.querySelectorAll("input, button")).filter(r=>!!r.offsetWidth)}function C(e){return a.getElementById(e)}function w(e,t,r,l){const s=Element.prototype.matches||Element.prototype.msMatchesSelector;typeof r=="string"?e.addEventListener(t,m=>{s.call(m.target,r)&&l.call(m.target,m)}):(l=r,e.addEventListener(t,l))}function se(e,t){t=t!==f?t:[],a.readyState!=="loading"?e(...t):a.addEventListener("DOMContentLoaded",()=>{e(...t)})}NodeList!==f&&NodeList.prototype&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach);function ot(e,t){S=t,V=S.value,Be(t),Z=ve(e),re(),ne(e),j(),V!==e&&S.dispatchEvent(new Event("change",{bubbles:!0}))}const $e=(()=>{const e={init:lt,set:le,wrap:oe,close:U,setInstance:Je,setColor:ot,removeInstance:Ye,updatePosition:re,ready:se};function t(r){se(()=>{r&&(typeof r=="string"?be(r):le(r))})}for(const r in e)t[r]=function(){for(var l=arguments.length,s=new Array(l),m=0;m<l;m++)s[m]=arguments[m];se(e[r],s)};return se(()=>{d.addEventListener("resize",r=>{t.updatePosition()}),d.addEventListener("scroll",r=>{t.updatePosition()})}),t})();return $e.coloris=$e,$e})(window,document,Math)})();P.coloris;P.init;P.set;P.wrap;P.close;P.setInstance;P.removeInstance;P.updatePosition;var Ce=I("<iconify-icon>",!0,!1),gt=I("<h3><!$><!/><!$><!/>"),yt=I("<div class=edit-icon><iconify-icon>",!0,!1),bt=I("<a href=https://fonts.google.com/ target=_blank>Browse All<iconify-icon>",!0,!1);const vt=T(Ge)`
  position: relative;
  max-width: max-content;
  gap: 0.5rem;
  align-items: center;
  flex-direction: row;

  ${Ae}

  background: ${p.surface};
  color: ${p.text};
  border-color: ${p.border.color};
  border-radius: ${p.border.radius};

  input[data-coloris] {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
  }

  &:focus-within {
    outline: 2px solid var(--primary-color);
  }
`,$t=T("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`,wt=T("div")`
  width: 100%;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  font-size: ${p.font.size.sm};
  gap: 2rem;

  .edit-icon {
    ${Ae}
    border: 1px solid ${p.border.color};
    border-radius: ${p.border.radius};
    color: ${p.fadeText};
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;
  }
`,kt=T("div")`
  display: flex;
  flex-direction: column;
  border: 1px solid ${p.border.color};
  border-radius: ${p.border.radius};
`,xt=T("div")`
  user-select: none;
  display: flex;
  align-items: center;
  padding-right: 0.25rem;
  h3 {
    padding: 0.5rem 0.5rem;
    margin: 0;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: ${p.font.size.base};
    font-weight: 500;
    color: ${p.heading};
  }

  h3 > iconify-icon {
    color: ${p.fadeText};
    font-size: 1.25rem;
    &.open {
      color: ${p.primary.color};
    }
  }

  &.small {
    h3 {
      font-size: ${p.font.size.sm};
    }
  }

  button {
    background: transparent;
  }
  &:hover button {
    color: ${p.primary.color};
  }
`,St=T("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
  border-top: 1px solid ${p.border.color};
  h4 {
    margin: 0;
  }
`,Ne=T("div")`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
`,Et=T(Ve)`
  ${Ae}
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p.fadeText};
  background: transparent;
`,de=d=>o(kt,{get children(){return[o(xt,{get classList(){return{small:d.small}},onClick:()=>d.toggleSection&&d.toggleSection(),get children(){return[(()=>{var a=A(gt),h=a.firstChild,[f,y]=fe(h.nextSibling),b=f.nextSibling,[c,u]=fe(b.nextSibling);return me(a,()=>d.title,f,y),me(a,o(F,{get when(){return d.icon},get children(){var v=A(Ce);return v._$owner=N(),H(i=>{var x=!!d.open,$=d.icon;return x!==i.e&&v.classList.toggle("open",i.e=x),$!==i.t&&D(v,"icon",i.t=$),i},{e:void 0,t:void 0}),v}}),c,u),a})(),o(F,{get when(){return d.toggleSection!==void 0},get children(){return o(Et,{get children(){var a=A(Ce);return a._$owner=N(),H(()=>D(a,"icon",d.open?L.expand:L.collapse)),a}})}})]}}),o(F,{get when(){return d.open},get children(){return o(St,{get children(){return d.children}})}})]}}),Tt=["Isoso Web","Inter","Jost","Outfit","Poppins","Roboto","Nunito","Acme","Barlow","Merriweather","Fraunces","Space Grotesk","Kalam","Patrick Hand","Crimson Text","VT323","Vollkorn"],Ct=T("div")`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--border-radius);
  background: ${d=>d.color};
`,Lt=T(Te)`
  flex: 0;
  padding: 0.25rem 0.5rem;
  min-width: 10ch;
  font-size: ${p.font.size.base};
`,At=d=>{const a=(h,f)=>{const y=d.themePalette();d.setThemePalette({...y,vars:{...y.vars,[g.themeMode()]:{...y.vars[g.themeMode()],[h]:f}}})};return P.init(),Object.entries(d.colors).forEach(([h,f])=>{P.setInstance(`#coloris-picker-${h}`,{onChange:y=>{a(h,y)},themeMode:g.themeMode()})}),X(()=>{P.setInstance(".coloris",{themeMode:g.themeMode()})}),o($t,{get children(){return o(Se,{get each(){return Object.entries(d.colors)},children:h=>o(vt,{onKeyPress:f=>{(f.key==="Enter"||f.key===" ")&&f.currentTarget.click()},get children(){return[o(Ct,{get color(){return h[1]}}),o(Lt,{"data-coloris":!0,get id(){return`coloris-picker-${h[0]}`},type:"text",get value(){return h[1]}}),Le(()=>We(h[0]))]}})})}})},Bt=d=>{const[a,h]=ae(g.themePalette()),[f,y]=ae({colors:!0,typography:!0,layout:!0,export:!0}),b=i=>{if(f()[i]===void 0)return;const x=i;y({...f(),[x]:!f()[x]})};X(it(a,()=>{const i=g.theme().id;g.modifyTheme(i,a())}));const c=dt(i=>{if(!i)return;const x=Ee(i," "),$=ut(x,'"');console.log("Update Font Link",{style:i,stripped:x,padded:$}),$!==a().base.font.family&&h({...a(),base:{...a().base,font:{...a().base.font,family:$}}})},200),u=Le(()=>a().vars[g.themeMode()]),v=i=>{g.themeConfig.get().mode==="auto"&&(i.matches?g.setThemeMode("dark"):g.setThemeMode("light"))};return Re(()=>window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",v)),ze(()=>window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change",v)),o(wt,{get children(){return[o(Ne,{get children(){return[(()=>{var i=A(yt),x=i.firstChild;return x._$owner=N(),H(()=>D(x,"icon",L.edit)),i})(),o(Te,{type:"text",get value(){return a().name},onInput:i=>h({...a(),name:i.currentTarget.value})}),o(we,{get children(){return[o(ht,{get icon(){return L.delete},get skipConfirm(){return g.isThemeDefault()},onConfirm:()=>{g.deleteTheme(g.theme().id),d.closeEditor()}}),o(ke,{}),o(ce,{get icon(){return L.copy},copyText:()=>JSON.stringify(a(),null,2)})]}}),o(we,{get children(){return o(Ve,{onClick:()=>d.closeEditor(),get children(){var i=A(Ce);return i._$owner=N(),H(()=>D(i,"icon",L.close)),i}})}})]}}),o(de,{title:"Colors",get icon(){return L.colors},get open(){return f().colors},toggleSection:()=>b("colors"),get children(){return o(At,{get colors(){return u()},themePalette:a,setThemePalette:h})}}),o(de,{title:"Typography",get icon(){return L.typography},get open(){return f().typography},toggleSection:()=>b("typography"),get children(){return o(Fe,{label:"Font Family",get value(){return Ee(a().base.font.family,'"')},get options(){return Tt.map(i=>({label:i,value:i}))},onChange:i=>{i&&c(i)},Footer:()=>o(Ne,{get children(){var i=A(bt),x=i.firstChild,$=x.nextSibling;return $._$owner=N(),H(()=>D($,"icon",L.external)),i}})})}}),o(de,{title:"Layout",get icon(){return L.layout},get open(){return f().layout},toggleSection:()=>b("layout"),get children(){return[o(Ge,{get children(){return["Border Radius",o(Te,{type:"text",get value(){return a().base.border.radius},onInput:i=>h({...a(),base:{...a().base,border:{...a().base.border,radius:i.currentTarget.value}}})})]}}),o(Fe,{label:"Card Type",get value(){return a().card},onlyFromOptions:!0,get options(){return ct.map(i=>({label:We(i),value:i}))},onChange:i=>{h({...a(),card:i})}})]}}),o(de,{title:"Export",get icon(){return L.copy},get open(){return f().export},toggleSection:()=>b("export"),get children(){return o(we,{get children(){return[o(ce,{label:"Palette",copyText:()=>JSON.stringify(a(),null,2)}),o(ke,{}),o(ce,{label:"CSS",copyText:()=>g.cssTheme()}),o(ke,{}),o(ce,{label:"Vars",copyText:()=>JSON.stringify(p,null,2)})]}})}})]}})};var Mt=I("<h3>Import Theme"),_t=I('<svg width=32 height=32 viewBox="0 0 32 32"fill=none xmlns=http://www.w3.org/2000/svg><circle cx=16 cy=16 r=16></circle><circle cx=16 cy=16 r=8>'),Pt=I("<h2>Customize"),It=I("<a class=guide-link href=/customize><iconify-icon></iconify-icon>Guide",!0,!1),xe=I("<iconify-icon>",!0,!1),Ot=I("<h4>Available Themes"),Ft=I("<div><h3>Theme</h3><h4>Local Themes</h4><!$><!/><!$><!/>");const Ht=d=>{const a=document.getElementsByClassName("_fontFamily");if(Array.from(a).some(y=>{const c=y.href.split("=")[1].split(":")[0];return decodeURIComponent(c)==d}))return;const f=document.createElement("link");f.href=`https://fonts.googleapis.com/css2?family=${d}:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600`,f.rel="stylesheet",f.classList.add("_fontFamily"),document.head.appendChild(f)},Nt=d=>{const a=document.documentElement;d==="auto"?(a.classList.remove("dark-mode"),a.classList.remove("light-mode")):d==="light"?(a.classList.remove("dark-mode"),a.classList.add("light-mode")):d==="dark"&&(a.classList.remove("light-mode"),a.classList.add("dark-mode"))},Dt=d=>{let a=document.getElementById("_themeVars");if(a)a.innerHTML=d;else return},Rt=T("div")`
  width: 100%;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h3 {
    margin: 0;
    font-size: ${p.font.size.base};
    margin-bottom: 0.5rem;
  }

  h2 {
    margin: 0;
    font-size: ${p.font.size.md};
  }

  .guide-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 0.5rem;
    color: ${p.fadeText};
    padding: 0.5rem 0.75rem;
    font-size: ${p.font.size.sm};
    border-radius: ${p.border.radius};
    background: ${p.surface};
    iconify-icon {
      font-size: ${p.font.size.base};
    }
    &:hover {
      color: ${p.text};
    }
  }

`,he=T("button")`
  padding: 0.5rem 1rem;
  border-radius: ${p.border.radius};
  border: 1px solid transparent;
  background: ${p.surface};
  color: ${p.text};
  transition: all 0.2s ease;
  font-family: inherit;

  display: flex;
  align-items: center;
  gap: 0.25rem;

  &.active {
    color: var(--primary-color);
    border-color: var(--primary-color);
  }

  &:hover {
    color: var(--primary-contrast);
    background: var(--primary-color);
  }
`,zt=T(he)`
  gap: 0.5em;
  svg {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }
`,ue=T("div")`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`,je=st`
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0);
  }
`,Wt=T("div")`
  color: ${p.secondary.color};
  background: ${p.surface};
  padding: 1rem;
  border: 1px solid ${p.border.color};
  border-radius: ${p.border.radius};
  animation: ${je} 0.1s ease-out forwards;
`,Gt=T("div")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: ${p.surface};
  border: 1px solid ${p.border.color};
  padding: 1rem;
  border-radius: ${p.border.radius};
  animation: ${je} 0.1s ease-out forwards;
  h3 {
    margin: 0;
  }
`,Vt=d=>{const[a,h]=ae(""),f=b=>{const c=b.clipboardData?.getData("text");c&&y(c)};Re(()=>{window.addEventListener("paste",f)}),ze(()=>{window.removeEventListener("paste",f)});const y=b=>{try{const c=JSON.parse(b);try{g.addTheme(c)}catch(u){h(u),console.error("Error adding theme",u);return}g.changeTheme(c.id),d.close()}catch(c){c instanceof SyntaxError?h("What's that JSON SON?"):(console.error("Error importing theme",c),h("Error importing theme"))}};return o(Gt,{get children(){return[A(Mt),"Paste the theme palette's object to import theme.",o(F,{get when(){return a()},get children(){return o(Wt,{get children(){return a()}})}})]}})},De=d=>o(zt,{onClick:()=>{if(d.available){g.addTheme(d.theme),g.changeTheme(d.theme.id);return}g.changeTheme(d.theme.id)},get classList(){return{active:g.themeConfig.get().theme===d.theme.id}},get children(){return[(()=>{var a=A(_t),h=a.firstChild,f=h.nextSibling;return H(y=>{var b=d.theme.vars[g.themeMode()].background,c=d.theme.vars[g.themeMode()].primary;return b!==y.e&&Oe(h,"fill",y.e=b),c!==y.t&&Oe(f,"fill",y.t=c),y},{e:void 0,t:void 0}),a})(),Le(()=>d.theme.name)]}}),ir=d=>{const[a,h]=ae(!1),[f,y]=ae(!1);X(()=>{const c=g.cssTheme,u=g.themePalette().base.font.family;Ht(Ee(u,'"')),Dt(c())}),X(()=>{const c=g.themeConfig.get().mode;Nt(c)}),X(()=>{g.isThemeDefault()&&h(!1)}),X(()=>{a()&&f()&&y(!1)});const b=()=>{const c=pt(),u=ft(),v=JSON.parse(JSON.stringify(g.themePalette()));g.addTheme({...v,id:u,name:c}),g.changeTheme(u),h(!0)};return o(Rt,{get children(){return[o(F,{get when(){return d.isPopup},get children(){return o(ue,{get children(){return[A(Pt),(()=>{var c=A(It),u=c.firstChild;return u._$owner=N(),H(()=>D(u,"icon",L.guide)),c})()]}})}}),o(F,{get when(){return f()},get children(){return o(Vt,{close:()=>y(!1)})}}),o(F,{get when(){return!a()},get children(){return[o(ue,{get children(){return[o(he,{onClick:()=>b(),get children(){return[(()=>{var c=A(xe);return c._$owner=N(),H(()=>D(c,"icon",L.new)),c})(),"New Theme"]}}),o(he,{onClick:()=>h(!a()),get children(){return[(()=>{var c=A(xe);return c._$owner=N(),H(()=>D(c,"icon",L.edit)),c})(),"Edit"]}}),o(he,{onClick:()=>y(c=>!c),get children(){return[(()=>{var c=A(xe);return c._$owner=N(),H(()=>D(c,"icon",L.import)),c})(),"Import"]}})]}}),(()=>{var c=A(Ft),u=c.firstChild,v=u.nextSibling,i=v.nextSibling,[x,$]=fe(i.nextSibling),R=x.nextSibling,[z,W]=fe(R.nextSibling);return me(c,o(ue,{get children(){return o(Se,{get each(){return g.themes()},children:O=>o(De,{theme:O})})}}),x,$),me(c,o(F,{get when(){return g.availableThemes().length>0},get children(){return[(()=>{var O=A(Ot);return O.style.setProperty("width","100%"),O})(),o(ue,{get children(){return o(Se,{get each(){return g.availableThemes()},children:O=>o(De,{available:!0,theme:O})})}})]}}),z,W),c})()]}}),o(F,{get when(){return a()},get children(){return o(Bt,{closeEditor:()=>h(!1)})}}),o(F,{get when(){return!d.isPopup},get children(){return o(mt,{})}})]}})};export{ir as default};
