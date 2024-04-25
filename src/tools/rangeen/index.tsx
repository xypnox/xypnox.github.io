import { For, Show, createEffect, createMemo, createSignal, on } from "solid-js";
import { Button, ButtonGroup, Text } from "../../components/elements/atoms";
import { getColors, type ColorData } from "./colors";
import { styled } from "solid-styled-components";
import { RangeInput } from "../../components/elements/range";
import { theme } from "../../theme";
import { Col, Row } from "../../components/elements/atoms/layout";
import { capitalize } from "../../lib/text";
import { icons } from "../../components/icons";

const resized = (video: HTMLVideoElement, dimensions: [number, number]): [number, number] => {
  const currentWidth = video.videoWidth;
  const currentHeight = video.videoHeight;

  if (currentWidth > currentHeight) {
    if (currentWidth > dimensions[0]) {
      return [dimensions[0], currentHeight * (dimensions[0] / currentWidth)];
    } else {
      return [currentWidth, currentHeight];
    }
  } else {
    if (currentHeight > dimensions[1]) {
      return [currentWidth * (dimensions[1] / currentHeight), dimensions[1]];
    } else {
      return [currentWidth, currentHeight];
    }
  }
}

const Video = styled('video')`
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 80dvh;
  border-radius: ${theme.border.radius};
`

const Controls = styled(Row)`
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  justify-content: center;
  padding: 0.5rem;
  border-radius: ${theme.border.radius};
  border: 1px solid ${theme.border.color};
  width: max-content;
  max-width: 100%;
  margin-inline: auto;
  ${ButtonGroup.class} {
    align-self: center;
    flex-wrap: wrap;
  }
`

// It is inside flexbox but should be sized by its width/height and not 100% of parent
const PreviewImg = styled('img')`
  max-width: 100%;
  max-height: 80dvh;
  border-radius: ${theme.border.radius};
  margin: 0.5rem 0;
  align-self: center;
`

type SortKey = keyof ColorData | 'hue' | 'saturation' | 'lightness';
type GroupKey = 'hue' | 'saturation' | 'lightness';

const sortKeys = ['count', 'hue', 'saturation', 'lightness']

export const Rangeen = () => {
  const [sampleSize, setSampleSize] = createSignal(64);

  const [imageUrl, setImageUrl] = createSignal('')

  const [colorCounts, setColorCounts] = createSignal<Record<string, ColorData>>({});

  const [sortKey, setSortKey] = createSignal<SortKey>('lightness');
  const [groupConfig, setGroupConfig] = createSignal<[GroupKey | null, number]>(['hue', 12]);


  const constraints = {
    audio: false,
    video: {
      facingMode: 'environment'
    }
  }


  let camVideo: HTMLVideoElement;
  let imageEl: HTMLImageElement;

  createEffect(() => {
    // console.log('cameras', camVideo);
    if (camVideo) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
          .then(function success(stream) {
            camVideo.srcObject = stream;
          });
      }
    }
  });



  const onTakeSnapshot = async () => {
    if (camVideo) {
      const h = sampleSize();
      const newSize = resized(camVideo, [h, h]);
      // console.log(newSize, camVideH, camVideoW);
      const canvas = document.createElement('canvas');
      canvas.width = newSize[0];
      canvas.height = newSize[1];
      canvas.getContext('2d')?.drawImage(camVideo, 0, 0, canvas.width, canvas.height);
      const data = canvas.toDataURL('image/png');
      setImageUrl(data);
      const colorCounts = await getColors(canvas);
      setColorCounts(colorCounts);
    }
  }

  createEffect(on(sampleSize, async () => {
    await onTakeSnapshot();
  }));


  const sortBy = (arr: ColorData[], sortKey: keyof ColorData | 'hue' | 'saturation' | 'lightness'): ColorData[] => {
    if (sortKey === 'hue' || sortKey === 'saturation' || sortKey === 'lightness') {
      const index = sortKey === 'hue' ? 0 : sortKey === 'saturation' ? 1 : 2;
      const sorted = arr.sort((a, b) => a.hsl[index] - b.hsl[index]);
      if (sortKey === 'lightness') {
        return sorted.reverse();
      }
      return sorted;
    }
    if (sortKey === 'count') {
      return arr.sort((a, b) => b[sortKey] - a[sortKey]);
    }
    return arr
  }

  const groupIndexers = {
    hue: (c: ColorData) => Math.floor(c.hsl[0] / (360 / groupConfig()[1])),
    saturation: (c: ColorData) => Math.floor(c.hsl[1] / (1 / groupConfig()[1])),
    lightness: (c: ColorData) => Math.floor(c.hsl[2] / (1 / groupConfig()[1])),
  }

  const sortGroupBy = (): ColorData[] | ColorData[][] => {
    if (groupConfig()[0] === null) {
      return [...sortBy(Object.values(colorCounts()), sortKey())];
    }

    const groups = Object.values(colorCounts()).reduce((acc, c) => {
      const group = groupIndexers[groupConfig()[0]!](c);
      acc[group].push(c);
      return acc;
    }, [...Array.from({ length: groupConfig()[1] }, () => [])] as ColorData[][]);

    // console.log({ groups });

    return groups.map((g) => sortBy(g, sortKey()));
  }

  const sortResult = createMemo(() => sortGroupBy());


  return <Col>
    <Video ref={camVideo!}
      onPlay={() => onTakeSnapshot()}
      onClick={onTakeSnapshot}
      autoplay
      playsinline
      muted></Video>
    <Controls>
      <Button
        onClick={onTakeSnapshot}
      >
        <iconify-icon icon={icons.camera} />
        Take Snapshot</Button>
      <RangeInput
        label="Sample Size"
        value={sampleSize()}
        min={16}
        step={4}
        max={256}
        showValue
        onChange={(e) => setSampleSize(e.currentTarget.valueAsNumber)}
      />

      <ButtonGroup>
        <Text>Group By:</Text>
        <For each={['hue', 'saturation', 'lightness']}>
          {(k) => <Button
            onClick={() => setGroupConfig(c => [k as GroupKey, c[1]])}
            classList={{ selected: groupConfig()[0] === k }}
          >{capitalize(k)}</Button>}
        </For>
      </ButtonGroup>
      <RangeInput
        label="Group Count"
        value={groupConfig()[1]}
        min={2}
        step={1}
        max={24}
        showValue
        onChange={(e) => setGroupConfig([groupConfig()[0], e.currentTarget.valueAsNumber])}
      />

      <ButtonGroup>
        <Text>Sort By:</Text>
        <For each={sortKeys}>
          {(k) => <Button
            onClick={() => setSortKey(k as SortKey)}
            classList={{ selected: sortKey() === k }}
          >{capitalize(k)}</Button>}
        </For>
      </ButtonGroup>
    </Controls>
    <PreviewImg ref={imageEl!} src={imageUrl()} alt="Snapshot" />


    <Show when={Array.isArray(sortResult())}>
      <ColorColumns>
        <For each={sortResult() as ColorData[][]}>
          {(c, i1) => (
            <Show when={c.length > 0}>
              <Colors>
                <For each={c}>
                  {(c1, i2) => <ColorPixel style={{ 'background-color': `${c1.color}` }} />}
                </For>
              </Colors>
            </Show>
          )}
        </For>
      </ColorColumns>
    </Show>

    <Show when={!Array.isArray(sortResult())}>
      <ColorColumns>
        <Colors>
          <For each={sortResult() as ColorData[]}>
            {(c) => (<ColorPixel style={{ 'background-color': `${c.color}` }} />)}
          </For>
        </Colors>
      </ColorColumns>
    </Show>
    <Col>
      <p>Total Colors: {Object.keys(colorCounts()).length}</p>
      <p>Total Individual: {Object.values(colorCounts()).reduce((acc, c) => acc + c.count, 0)}</p>
    </Col>
    <ThreeDee colors={colorCounts()} />
  </Col >;
}

const ThreeDee = (props: { colors: Record<string, ColorData> }) => {
  return <ThreeDeeWrapper>
    <For each={Object.values(props.colors)}>
      {(c) => <ThreeDeePixel
        style={{
          'background-color': `${c.color}`,
          '--x': `${c.rgb[0] / 255 * 100}`,
          '--y': `${c.rgb[1] / 255 * 100}`,
          '--z': `${c.rgb[2] / 255 * 100}`,
        }}
      />}
    </For>
  </ThreeDeeWrapper>
}

/**
 * Transform the pixel into a 3D plane
 * Rotate to face the camera
 */
const ThreeDeePixel = styled('div')`
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  transform: translate3d(calc(var(--x, 0) * var(--pixelWidth)), calc(var(--y, 0) * var(--pixelWidth)), calc(var(--z, 0) * var(--pixelWidth)));
  transition: transform 2s ease;
`

// <!-- Change perspective on hover -->
const ThreeDeeWrapper = styled('div')`
  position: relative;
  overflow: hidden;
  background: ${theme.surface};
  --pixelWidth: calc((min(80vw, 80vh) - 2rem) / 100);
  width: calc(100 * var(--pixelWidth));
  height: calc(100 * var(--pixelWidth));
  &:hover {
    ${ThreeDeePixel.class} {
      transform: translate3d(calc(var(--y, 0) * var(--pixelWidth)), calc(var(--z, 0) * var(--pixelWidth)), calc(var(--x, 0) * var(--pixelWidth)));
    }
  }
`


const ColorColumns = styled('div')`
  display: flex;
  gap: 0.5rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Colors = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0;
  height: 100%;
`

const ColorPixel = styled('div')`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.1rem;
  margin: 1px;
`
