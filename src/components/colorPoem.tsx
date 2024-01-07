import { keyframes, styled } from 'solid-styled-components';
import { flattenObject } from '../lib/objects';
import { For, createMemo } from 'solid-js';

export type Props = {
  poem: string;
  colors: string[];
};

/* CSS Animate text color between the array of colors for 3 seconds between each color */
function colorShiftGradientAnimation(colors: string[]) {
  const colorShiftGradient = colors.map((color, index) => {
    return `${Math.round(index * 100 / colors.length)}% { color: ${color}; }`;
  });
  return `
    ${colorShiftGradient.join("")}
  `;
}

export const ColorPoem = ({ poem, colors }: Props) => {
  const colorVars = flattenObject({ colors }, (keys, value) => [
    `poem-${keys.join("-")}`,
    value,
  ]);

  const cssColorVars = Object.entries(colorVars)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n");

  const cssColorVarsArray = Object.entries(colorVars).map(([key, value]) => `var(--${key})`);

  function splitText(poem: string) {
    const poemLines = poem.split("\n");
    const coloredPoemLines = poemLines.map((line) => {
      const words = line.split(" ");
      return words;
    });
    return coloredPoemLines;
  }

  // console.log({
  //   cp: splitText(poem),
  //   cssColorVars,
  //   colorVars,
  //   colors,
  //   poem,
  //   cssColorVarsArray,
  //   clg: colorShiftGradientAnimation(colors),
  // });

  const colorKeyframes = createMemo(() => (colors: string[]) => keyframes`
    ${colorShiftGradientAnimation(colors)}
  `)

  const Word = createMemo(() => (colors: string[]) => styled('span')`
    animation: ${colorKeyframes()(colors)} 5s linear alternate infinite;
    animation-delay: var(--poem-line-word-delay);
    color: var(--poem-line-word-color);
  `)

  const WordComp = Word()(cssColorVarsArray);

  return <div style={cssColorVars}>
    <For each={splitText(poem)}>{(line) => {
      return (
        <PoemLine>
          <For each={line}>{(word, index) => {
            return <WordComp style={{
              "--poem-line-word-delay": `${(index() / line.length * 5).toFixed(2)}s`,
              "--poem-line-word-color": colors[index() % colors.length],
            }} >{word}</WordComp>;
          }}</For>
        </PoemLine>
      );
    }}</For>
  </div>

}


const PoemLine = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-height: 1.5rem;
`;
