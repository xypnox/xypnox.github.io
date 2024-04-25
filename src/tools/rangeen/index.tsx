import { For, createEffect, createSignal } from "solid-js";
import { Button } from "../../components/elements/atoms";
import { getColors, type Rgb } from "./colors";
import { styled } from "solid-styled-components";

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

export const Rangeen = () => {
  const constraints = {
    audio: false,
    video: {
      facingMode: 'user'
    }
  }


  let camVideo: HTMLVideoElement;
  let imageEl: HTMLImageElement;

  createEffect(() => {
    console.log('cameras', camVideo);
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

  const [palette, setPalette] = createSignal<Rgb[]>([]);
  const [colorCounts, setColorCounts] = createSignal<{ color: string, count: number }[]>([]);

  const onTakeSnapshot = async () => {
    if (camVideo) {
      const h = 200;
      const camVideH = camVideo.videoHeight;
      const camVideoW = camVideo.videoWidth;
      const newSize = resized(camVideo, [h, h]);
      console.log(newSize, camVideH, camVideoW);
      const canvas = document.createElement('canvas');
      canvas.width = newSize[0];
      canvas.height = newSize[1];
      canvas.getContext('2d')?.drawImage(camVideo, 0, 0, canvas.width, canvas.height);
      const data = canvas.toDataURL('image/png');
      console.log(data);
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
      const colors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]).map(([color, count]) => ({ color, count }));
      setColorCounts(colors);
      console.log(colorCounts);
    }
  }

  createEffect(() => {
    console.log('New Image URL', imageUrl());
    if (!imageUrl()) return;
    if (!imageEl) return;
  });

  return <div>
    <div>
      <video ref={camVideo!} autoplay playsinline muted style={{ width: '200px', height: '200px' }}></video>
    </div>
    <Button
      onClick={onTakeSnapshot}
    >Take Snapshot</Button>
    <div>
      <img ref={imageEl!} src={imageUrl()} alt="Snapshot" />
      <h2>Colors</h2>
      <Colors>
        <For each={palette()}>
          {color => <div style={{ 'background-color': `rgb(${color[0]}, ${color[1]}, ${color[2]})`, width: '50px', height: '50px' }}></div>}
        </For>
      </Colors>
      <p>Total Colors: {colorCounts().length}</p>
      <p>Total Individual: {colorCounts().reduce((acc, c) => acc + c.count, 0)}</p>
      <Colors2>
        <For each={colorCounts()}>
          {(c) => <div style={{ 'background-color': `${c.color}`, width: '8px', height: '8px' }}></div>}
        </For>
      </Colors2>
    </div>
  </div>;
}

const Colors = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`

const Colors2 = styled('div')`
  display: flex;
  flex-wrap: wrap;
`
