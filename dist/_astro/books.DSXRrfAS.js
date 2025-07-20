import{b as e,F as m,g as o,v as b,m as h,r as $,f,i as n,h as y,t as i}from"./web.DgwoslEx.js";import{h as x,s as _}from"./objects.CuEbotcV.js";import{t as d}from"./theme.DKsEEeQi.js";import{M as v}from"./masonry.C5vvRNuW.js";import"./themeState.pOZySbsd.js";import"./store.CEmFEfZ_.js";import"./version.BiGcaLu2.js";var k=i("<img>",!0,!1),M=i("<div class=caption><!$><!/><p>"),w=i("<p>"),z=i("<span>★");const C=["3.72","-4.10","-7.75","2.59","-5.89","0.12","9.08","0.31","8.02","5.12","-4.43","7.97","3.24","-1.74","2.13","15.78","6.18","11.99","8.53","2.55","5.00","7.63","11.47","1.89","3.87","15.19","9.22","10.75","20.61","14.74","5.59","6.75"],R=x`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,E=_("div")`
  /* overflow: hidden; */
  img {
    width: 100%;
    height: auto;
    z-index: 10;
    transition: all 0.3s ease-in-out;
    border-radius: calc(${d.border.radius} * 2);
    animation: ${R} 1s ease-in;
    animation-fill-mode: both;
  }
    ${C.map((t,r)=>`
      &:nth-child(${r}n) img {
        transform: rotate(${t}deg);
        animation-delay: ${r*.05}s;
      }`).join("")}

  .caption {
    padding: 1rem;
    position: absolute;
    bottom: 0;
    opacity: 0;
    width: 100%;
    z-index: 20;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    color: white;
    transition: all 0.3s ease-in-out;
    transform: translateY(30%);
    border-radius: calc(${d.border.radius} * 2);
    p {
      margin: 0;
    }
  }
  &:hover {
    z-index: 30;
    img {
      box-shadow: 0 4rem 8rem rgba(0, 0, 0, 0.3);
      transform: scale(1.066);
    }
    .caption {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,B=t=>e(v,{minColumns:1,maxColumns:8,colWidth:200,gap:2,get imageDimensions(){return t.images.map(r=>[r.image.attributes.width,r.image.attributes.height])},get children(){return e(m,{get each(){return t.images},children:r=>e(E,{get children(){return[(()=>{var a=o(k);return b(a,h({get src(){return r.image.src}},()=>r.image.attributes,{alt:"placeholder",loading:"lazy"}),!1,!1),$(),a})(),(()=>{var a=o(M),g=a.firstChild,[s,c]=f(g.nextSibling),p=s.nextSibling;return n(a,(()=>{var u=y(()=>!!(r.book["My Rating"]&&r.book["My Rating"]>0));return()=>u()&&(()=>{var l=o(w);return n(l,e(m,{get each(){return[...Array(r.book["My Rating"])]},children:()=>o(z)})),l})()})(),s,c),n(p,()=>r.book.Title),a})()]}})})}});export{B as Books};
