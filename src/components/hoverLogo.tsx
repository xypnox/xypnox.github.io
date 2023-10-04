import { useMousePosition } from "@solid-primitives/mouse"
import "./hoverLogo.css"

export const HoverLogo = () => {
  const position = useMousePosition();

  let imageElement: HTMLImageElement;


  // Tilts on hover
  const hoverTransform = () => {
    if (!imageElement) return '';
    const imageCenter = {
      x: imageElement.offsetLeft + imageElement.offsetWidth / 2,
      y: imageElement.offsetTop + imageElement.offsetHeight / 2
    }
    const relative = {
      x: position.x - imageCenter.x,
      y: position.y - imageCenter.y
    }
    const relativeDir = {
      x: relative.x > 0 ? 1 : -1,
      y: relative.y > 0 ? 1 : -1
    }
    const maxTilt = 20;
    const rotate = {
      x: - relativeDir.y * Math.min(Math.abs(relative.y) / 3, maxTilt),
      y: relativeDir.x * Math.min(Math.abs(relative.x) / 3, maxTilt)
    }
    // Tilt in 3D space, with perspective
    return `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`;
  }

  return (
    <div class="hoverLogo">
      <img
        ref={imageElement!}
        style={{ transform: hoverTransform() }} src="/logo.svg" alt="Logo"
      />
    </div>
  );
}
