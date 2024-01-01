import { For, createSignal, type Accessor, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { theme } from "../theme";

interface TabsProps {
  currentTab: Accessor<number>;
  setCurrentTab: (index: number) => void;
  tabs: {
    name: string;
  }[]
}

const TabIndicator = styled("div")`
  position: absolute;
  bottom: 0rem;
  left: 100%;
  width: 0rem;
  height: 4px;
  background-color: ${theme.primary.color};
  border-radius: 0.25rem;
  transition: all 0.3s ease-in-out;
`

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: ${theme.font.family};
  button {
    font-family: ${theme.font.family};
  }
`

const TabsSwitch = styled("div")`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`

const Tab = styled("button")`
  position: relative;
  border: none;
  background-color: transparent;
  color: ${theme.fadeText};
  font-size: ${theme.font.size.sm};
  padding: 0.5rem 1rem 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${theme.primary.color};
  }

  &.active {
    color: var(--primary);
  }
`
export const Tabs = (props: TabsProps) => {
  console.log(props);
  const [indicatorStyle, setIndicatorStyle] = createSignal({
    width: "1rem",
    left: "1rem"
  });

  let refTabsSwitch: HTMLDivElement;
  onMount(() => {
    onClick(props.currentTab());
  });
  const onClick = (index: number) => {
    props.setCurrentTab(index);
    const tabEl = refTabsSwitch.querySelectorAll("button")[index];
    console.log({ tabEl });
    if (!tabEl) return;
    const tabDimensions = tabEl.getBoundingClientRect();
    if (!tabDimensions) return;
    console.log({ tabDimensions });
    // Here 
    setIndicatorStyle({
      width: `${tabDimensions.width}px`,
      // Consider the offset of the parent while calculating the left position
      left: `${tabDimensions.left - refTabsSwitch.getBoundingClientRect().left}px`
    });
  }


  return (
    <Wrapper>
      <TabsSwitch
        ref={refTabsSwitch!}
      >
        <TabIndicator
          style={{
            ...indicatorStyle()
          }} />
        <For each={props.tabs}>
          {(tab, index) => (
            <Tab
              classList={{ active: props.currentTab() === index() }}
              onClick={() => onClick(index())}
            >
              {tab.name}
            </Tab>
          )}
        </For>
      </TabsSwitch>
    </Wrapper>
  )
}

