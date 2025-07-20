import{h as a,s as o}from"./objects.CuEbotcV.js";import{t}from"./theme.DKsEEeQi.js";const r=a`
  0% {
    transform: translateY(-100%) translateX(-50%);
    opacity: 0;
  }
  15% {
    transform: translateY(calc(-100% - 0.5rem)) translateX(-50%);
    opacity: 1;
  }
  75% {
    transform: translateY(calc(-100% - 0.5rem)) translateX(-50%);
    opacity: 1;
  }
  100% {
    transform: translateY(-150%) translateX(-50%);
    opacity: 0;
  }
`,e=o.div`
  position: absolute;
  width: max-content;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${t.font.size.sm};
  color: ${t.text};
  background: ${t.tooltip};
  padding: 0.5em;
  border-radius: ${t.border.radius};
  text-align: center;
  z-index: 10;
  && iconify-icon {
    color: ${t.primary.color};
    font-size: 1.2em;
  }
`,i=o(e)`
  top: 0;
  right: 0;
  left: 50%;
  transform: translateY(-100%);
  animation: ${r} 1s ease-out forwards;
`;export{i as E,e as T};
