import { styled } from "solid-styled-components";


export const Col = styled("div")`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`

export const Row = styled("div")`
  display: flex;
  gap: 1rem;
  flex-direction: row;
  align-items: center;

  &.wrap {
    flex-wrap: wrap;
  }

  &.center {
    justify-content: center;
  }
`

