import { ProjectPhotoLightbox } from "portfolio";
import p1 from "../../public/projects/speedy/01.webp";
import p2 from "../../public/projects/speedy/02.webp";
import p3 from "../../public/projects/speedy/03.webp";

// Real usage (ProjectPhotoStack) opens this in a portal to document.body
// when the active photo is clicked. Overlay component — cardMode:"single"
// in cfg.overrides keeps the open state inside the card.
const images = [
  { src: p1, width: 1200, height: 721 },
  { src: p2, width: 1200, height: 800 },
  { src: p3, width: 1200, height: 800 },
];

export const Default = () => (
  <ProjectPhotoLightbox
    images={images}
    alt="Speedy robot"
    index={0}
    onIndexChange={() => {}}
    onClose={() => {}}
  />
);
