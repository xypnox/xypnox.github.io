import { For, Show, createEffect, createMemo, createSignal, on } from "solid-js";
import { Button, ButtonGroup, GroupSeparator, Input, Label, Text, UploadLabel } from "../../components/elements/atoms";
import { getColors, type ColorData } from "./colors";
import { styled } from "solid-styled-components";
import { RangeInput } from "../../components/elements/range";
import { theme } from "../../theme";
import { Col, Row } from "../../components/elements/atoms/layout";
import { capitalize } from "../../lib/text";
import { icons } from "../../components/icons";
import { Toggle } from "../../components/elements/atoms/toggle";
import { makePersisted, type AsyncStorage } from "@solid-primitives/storage";
import localforage from "localforage";

const resized = (element: HTMLVideoElement | HTMLImageElement, dimensions: [number, number]): [number, number] => {
  const elType = element.tagName.toLowerCase();
  const currentWidth = elType === 'video' ? (element as HTMLVideoElement).videoWidth : element.width;
  const currentHeight = elType === 'video' ? (element as HTMLVideoElement).videoHeight : element.height;

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
  cursor: copy;
`

const Controls = styled(Row)`
  flex-wrap: wrap;
  gap: 0.5em 1em;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: ${theme.border.radius};
  border: 1px solid ${theme.border.color};
  background: ${theme.background};
  width: 100%;
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

const sortKeys: SortKey[] = ['count', 'hue', 'saturation', 'lightness']

type ImageSource = 'url' | 'file' | 'camera';

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

const groupIndexers = (configValue: number) => ({
  hue: (c: ColorData) => Math.floor(c.hsl[0] / (360 / configValue)),
  saturation: (c: ColorData) => Math.floor(c.hsl[1] / (1 / configValue)),
  lightness: (c: ColorData) => Math.floor(c.hsl[2] / (1 / configValue)),
})

const storage: AsyncStorage = {
  length: localforage.length(),
  key: async (index) => {
    return localforage.key(index);
  },
  keys: async () => {
    return localforage.keys();
  },
  getItem: async (key) => {
    return localforage.getItem(key);
  },
  setItem: async (key, value) => {
    localforage.setItem(key, value);
  },
  removeItem: async (key) => {
    localforage.removeItem(key);
  },
  clear: async () => {
    localforage.clear();
  }




}

export const Rangeen = () => {
  const [sampleSize, setSampleSize] = createSignal(64);

  const [imageSource, setImageSource] = makePersisted(createSignal<ImageSource | undefined>(undefined), { storage });
  const [imageUrl, setImageUrl] = makePersisted(createSignal<{
    data: string;
    name?: string;
  } | null>(null), { storage });

  const [colorCounts, setColorCounts] = createSignal<Record<string, ColorData>>({});

  const [sortKey, setSortKey] = createSignal<SortKey>('lightness');
  const [groupConfig, setGroupConfig] = createSignal<[GroupKey | null, number]>(['hue', 64]);

  const constraints = {
    audio: false,
    video: {
      facingMode: 'environment'
    }
  }


  let camVideo: HTMLVideoElement;
  let imageEl: HTMLImageElement;

  createEffect(() => {
    if (imageSource() === 'camera') {
      if (camVideo) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia(constraints)
            .then(function success(stream) {
              camVideo.srcObject = stream;
            });
        }
      }
    } else {
      if (camVideo) {
        const src = camVideo.srcObject as MediaStream;
        src.getTracks().forEach((t) => t.stop());
      }
    }
  });



  const onTakeSnapshot = async () => {
    if (camVideo) {
      const h = sampleSize();
      const newSize = resized(camVideo, [h, h]);
      // Check if video is available
      if (!camVideo.videoWidth) {
        return;
      }
      // console.log(newSize, camVideH, camVideoW);
      const canvas = document.createElement('canvas');
      canvas.width = newSize[0];
      canvas.height = newSize[1];
      canvas.getContext('2d')?.drawImage(camVideo, 0, 0, canvas.width, canvas.height);
      const data = canvas.toDataURL('image/png');
      console.log(data);
      setImageUrl({
        name: 'Snapshot_' + Date.now() + '.png',
        data
      });
      const colorCounts = await getColors(canvas);
      setColorCounts(colorCounts);
    }
  }

  const drawImageOnCanvas = async () => {
    if (imageEl) {
      const h = sampleSize();
      const newSize = resized(imageEl, [h, h]);
      const canvas = document.createElement('canvas');
      canvas.width = newSize[0];
      canvas.height = newSize[1];
      canvas.getContext('2d')?.drawImage(imageEl, 0, 0, canvas.width, canvas.height);
      console.log({ imageEl });
      const colorCounts = await getColors(canvas);
      console.log({ colorCounts: Object.keys(colorCounts).length, imageUri: imageUrl() });
      setColorCounts(colorCounts);
    }
  }

  createEffect(on([sampleSize, imageSource, imageUrl], async () => {
    console.log('Source Changed', { size: sampleSize(), url: imageUrl(), source: imageSource() });
    setTimeout(async () => {
      await drawImageOnCanvas();
    }, 0);
    console.log('Drawn on canvas');
  }));


  const sortGroupBy = (): ColorData[] | ColorData[][] => {
    if (groupConfig()[0] === null) {
      return [...sortBy(Object.values(colorCounts()), sortKey())];
    }

    const groups = Object.values(colorCounts()).reduce((acc, c) => {
      const func = groupIndexers(groupConfig()[1])[groupConfig()[0]! as GroupKey];
      const group = func(c);
      acc[group].push(c);
      return acc;
    }, [...Array.from({ length: groupConfig()[1] }, () => [])] as ColorData[][]);

    // console.log({ groups });

    return groups.map((g) => sortBy(g, sortKey()));
  }

  const sortResult = createMemo(on([colorCounts, sortKey, groupConfig], () => sortGroupBy()));

  createEffect(() => {
    console.log('SortResult', sortResult());
  })
  return <Col>
    <Controls>
      <Toggle options={['camera', 'file', 'url']} selected={imageSource()} onChange={setImageSource} getValue={capitalize} />

      <Show when={imageSource() === 'camera'}>
        <Button
          onClick={onTakeSnapshot}
        >
          <iconify-icon icon={icons.camera} />
          Take Snapshot</Button>
      </Show>

      <Show when={imageSource() === 'file'}>
        <UploadLabel>
          <input type="file" accept="image/*" onInput={(e) => {
            console.log('File Input', e.currentTarget.files);
            const file = e.currentTarget.files?.[0];
            if (file) {
              const reader = new FileReader();
              // This is a png file whose blob we set in imageurl

              reader.onload = (e) => {
                const data = e.target?.result;
                if (typeof data === 'string') {
                  console.log('Finished reading file', data, file.name);
                  setImageUrl({
                    name: file.name,
                    data
                  });
                }
              }
              reader.readAsDataURL(file);
            }
          }} />
          <div>
            <iconify-icon icon={icons.upload} />
            Upload
          </div>
          <div class="filename">
            {
              imageUrl() ? imageUrl()!.name : 'Upload Image'
            }
          </div>
        </UploadLabel>
      </Show>

      <Show when={imageSource() === 'url'}>
        <Input type="url" placeholder="Image URL" onInput={async (e) => {
          const initUrl = e.currentTarget.value;
          // Convert the url into blob
          const response = await fetch(initUrl);
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          if (url) {
            console.log('Finished reading url', url, initUrl);
            setImageUrl({
              name: initUrl,
              data: url
            });
          }
        }} />
      </Show>


      <RangeInput
        label="Sample Size"
        value={sampleSize()}
        min={16}
        step={16}
        max={256}
        showValue
        onChange={(e) => setSampleSize(e.currentTarget.valueAsNumber)}
      />

    </Controls>

    <Show when={imageSource() === 'camera'}>
      <Video ref={camVideo!}
        onPlay={() => onTakeSnapshot()}
        onClick={onTakeSnapshot}
        autoplay
        playsinline
        muted></Video>
    </Show>

    <Show when={imageUrl() !== null}>
      <PreviewImg ref={imageEl!} src={imageUrl()!.data} />
    </Show>

    <Row>
      <Toggle
        label="Group By:"
        options={['hue', 'saturation', 'lightness']}
        selected={groupConfig()[0] ?? 'hue'}
        onChange={(v) => setGroupConfig(c => [v, c[1]])}
        getValue={capitalize}
      />

      <RangeInput
        label="Group Count"
        value={groupConfig()[1]}
        min={4}
        step={4}
        max={128}
        showValue
        onChange={(e) => setGroupConfig(c => [c[0], e.currentTarget.valueAsNumber])}
      />

      <Toggle
        label="Sort By:"
        options={sortKeys}
        selected={sortKey()}
        onChange={(v) => setSortKey(v)}
        getValue={capitalize}
      />
    </Row>

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
    {/* <ThreeDee colors={colorCounts()} /> */}
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
  gap: 2px;
  height: 100%;
`

const ColorPixel = styled('div')`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.125rem;
`
