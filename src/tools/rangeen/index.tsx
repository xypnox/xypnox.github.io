import { For, createEffect, createSignal, on } from "solid-js";
import { Button } from "../../components/elements/atoms";
import { getColors, type ColorData, type Rgb, lightHueSort } from "./colors";
import { styled } from "solid-styled-components";
import { RangeInput } from "../../components/elements/range";
import { theme } from "../../theme";
import { Col, Row } from "../../components/elements/atoms/layout";

// var video = document.createElement('video');
// video.setAttribute('playsinline', '');
// video.setAttribute('autoplay', '');
// video.setAttribute('muted', '');
// video.style.width = '200px';
// video.style.height = '200px';

// /* Setting up the constraint */
// var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
// var constraints = {
//   audio: false,
//   video: {
//    facingMode: facingMode
//   }
// };

// /* Stream it to video element */
// navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
//   video.srcObject = stream;
// });


/*
 function readFile(file) {                                                       
    var reader = new FileReader();
    reader.onload = readSuccess;                                            
    function readSuccess(evt) {     
        document.getElementById("your_img_id").src = evt.target.result                   
    };
    reader.readAsDataURL(file);                                              
} 

  document.getElementById('cameraInput').onchange = function(e) {
      readFile(e.srcElement.files[0]);
  };
 */
// We want to return new dimensions resized to max dimensions provided
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

export const Rangeen = () => {
  const [sampleSize, setSampleSize] = createSignal(128);
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

  const [imageUrl, setImageUrl] = createSignal('')

  const [colorCounts, setColorCounts] = createSignal<Record<string, ColorData>>({});

  createEffect(on(sampleSize, async () => {
    await onTakeSnapshot();
  }));


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
      // console.log(data);
      setImageUrl(data);
      // const opts = {
      //   amount: 12,
      //   group: 60,
      //   sample: 30,
      // }
      // const colors1 = await prominent(canvas, opts)
      // const colors2 = await average(canvas, opts)
      // console.log(colors1, colors2);
      // if (colors1 && colors2) {
      //   setPalette([...colors1, colors2] as Rgb[]);
      // }
      const colorCounts = await getColors(canvas);
      setColorCounts(colorCounts);
      // console.log(colorCounts);
    }
  }

  createEffect(() => {
    // console.log('New Image URL', imageUrl());
    if (!imageUrl()) return;
    if (!imageEl) return;
  });

  return <Col>
    <Video ref={camVideo!} autoplay playsinline muted></Video>
    <Row>
      <Button
        onClick={onTakeSnapshot}
      >Take Snapshot</Button>
      <RangeInput
        label="Sample Size"
        value={sampleSize()}
        min={16}
        step={4}
        max={256}
        showValue
        onChange={(e) => setSampleSize(e.currentTarget.valueAsNumber)}
      />
    </Row>
    <div>
      <img ref={imageEl!} src={imageUrl()} alt="Snapshot" />
      <h2>Colors</h2>
      <Colors3>
        <For each={lightHueSort(colorCounts(), { splitCount: 24, saturationCutoff: 0.01 })}>
          {(c) =>
            <Colors2>
              <For each={c}>
                {(c1) => <div style={{ 'background-color': `${c1.color}`, width: `${c1.size}px`, height: `${c1.size}px` }}></div>}
              </For>
            </Colors2>
          }
        </For>
      </Colors3>
      <h2>Palette</h2>
      <p>Total Colors: {Object.keys(colorCounts()).length}</p>
      <p>Total Individual: {Object.values(colorCounts()).reduce((acc, c) => acc + c.count, 0)}</p>
      <h3>Sorted by Count</h3>
      <p>The following colors are sorted by the number of pixels they occupy in the image.</p>
      <Colors2>
        <For each={Object.values(colorCounts()).sort((a, b) => b.count - a.count)}>
          {(c) => <div style={{ 'background-color': `${c.color}`, width: '8px', height: '8px' }}></div>}
        </For>
      </Colors2>
      <h3>Sorted by Hue</h3>
      <p>The following colors are sorted by their hue value.</p>
      <Colors2>
        <For each={Object.values(colorCounts()).sort((a, b) => a.hsl[0] - b.hsl[0])}>
          {(c) => <div style={{ 'background-color': `${c.color}`, width: '8px', height: '8px' }}></div>}
        </For>
      </Colors2>
      <h3>Sorted by Lightness</h3>
      <p>The following colors are sorted by their lightness value.</p>
      <Colors2>
        <For each={Object.values(colorCounts()).sort((a, b) => a.hsl[2] - b.hsl[2])}>
          {(c) => <div style={{ 'background-color': `${c.color}`, width: '8px', height: '8px' }}></div>}
        </For>
      </Colors2>
    </div>
  </Col>;
}

const Colors2 = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0;
`

const Colors3 = styled('div')`
  line-height: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  } 
`
