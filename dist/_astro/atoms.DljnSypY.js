import{s as o}from"./objects.CuEbotcV.js";import{t as r}from"./theme.DKsEEeQi.js";const e=`
  box-sizing: border-box;
  font-family: inherit;
  padding: 0.3rem 0.6rem;
  border-radius: ${r.border.radius};
  font-size: ${r.font.size.base};
  border: 1px solid transparent;
  iconify-icon {
    font-size: 1.25rem;
  }
`,t=`
  & {
    background: var(--card-background);
    border: var(--card-border);
    background-size: var(--card-backgroundSize);
    background-position: var(--card-backgroundPosition);
  }

  &:hover {
    background-position: var(--card-backgroundPositionHover);
    border: var(--card-borderHover);
  }
`,d=`
transition: background 0.2s ease, border 0.2s ease, background-size 0.2s ease, background-position 0.2s ease;
`,c=o("label")`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`,l=o("label")`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px dashed ${r.border.color};
  background: ${r.surface};
  color: ${r.text};
  border-radius: ${r.border.radius};
  flex-shrink: 1;

  input {
    display: none;
  }

  div {
    ${e}
    max-width: 100%;
    display: flex;
    gap: 0.5rem;
    padding: 0.25rem;
    align-items: center;
    font-size: ${r.font.size.sm};

    iconify-icon {
      font-size: 1.25rem;
    }


    &.filename {
      font-size: ${r.font.size.sm};
    }
  }

  &:hover {
    border-color: ${r.primary.color};
    color: ${r.primary.color};
  }
`,b=o("input")`
  ${e}
  flex: 1;
  border: 1px solid ${r.border.color};
  background: ${r.surface};
  color: ${r.text};
  transition: all 0.2s ease;
  min-width: 10ch;
`,i=o("button")`
  ${e}
  flex: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  border: 1px solid ${r.border.color};
  background: ${r.surface};
  color: ${r.text};
  white-space: nowrap;

  &.small {
    flex-grow: 1;
    flex-shrink: 0;
    line-height: 1;
    max-width: max-content;
    /* min-height: 2rem; */
    height: 100%;
    padding: 0.3rem 0.5rem;
    font-size: ${r.font.size.sm};
    gap: 0.25rem;

    iconify-icon {
      font-size: ${r.font.size.sm};
    }
  }

  &.selected {
    border: 1px solid ${r.primary.color};
    color: ${r.primary.color};
  }


  &&:focus-visible {
    outline: 2px solid var(--primary-color);
  }

  &&:hover {
    transform: scale(1.1);
    color: var(--primary-contrast);
    background: var(--primary-color);
    border-color: var(--primary-color);
  }
  &&:active {
    transform: scale(0.9);
    transition: all 0.2s ease-out;
  }

  transition: all 0.3s ease-in-out;
`,a=o("div")`
  ${e}
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  border: 1px solid transparent;
  background: ${r.surface};
  color: ${r.fadeText};
  transition: all 0.2s ease;
`,p=o("div")`
  position: relative;
  z-index: 2;
  align-self: stretch;
  display: flex;
  align-items: stretch;
  border-radius: ${r.border.radius};
  border: 1px solid ${r.border.color};
  background: ${r.surface};
  transition: all 0.2s ease;
  & > ${i.class} {
    background: transparent;
    border-radius: 0;
    border: none;
    flex: 1;
    z-index: 3;
  }
  & > ${a.class} {
    background: transparent;
    flex-grow: 0;
    flex-shrink: 0;
  }
  & > ${i.class}:hover {
    transform: scale(1);
  }
  & > ${i.class}:active {
    transform: scale(0.9);
  }
`,u=o("div")`
  position: relative;
  z-index: 1;
  width: 1px;
  min-height: 100%;
  min-width: 1px;
  flex-shrink: 0;
  background: ${r.border.color};
`,f=o("div")`
  ${e}
  padding: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  border-radius: ${r.border.radius};
  border: 1px solid ${r.border.color};
  background: ${r.surface};
  transition: all 0.2s ease;

  iconify-icon {
    font-size: 1.25rem;
    padding-left: 0.5rem;
  }

  &:has(input:focus-visible) {
    outline: 2px solid ${r.primary.color};
  }

  &.active {
    iconify-icon {
      color: ${r.primary.color};
    }
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    color: ${r.text};

    &:focus-visible {
      outline: none;
    }
  }
`;export{i as B,u as G,f as I,c as L,a as T,l as U,p as a,e as b,b as c,t as d,d as e};
