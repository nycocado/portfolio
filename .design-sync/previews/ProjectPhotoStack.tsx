import { ProjectPhotoStack } from "portfolio";
import p1 from "../../public/projects/speedy/01.webp";
import p2 from "../../public/projects/speedy/02.webp";
import p3 from "../../public/projects/speedy/03.webp";
import p4 from "../../public/projects/speedy/08.webp";

// Real usage (ProjectsSection) passes the selected project's `images` array
// straight from config/projects.ts — same shape reused here with real
// project photos (imported as data URLs so the card needs no server).
const images = [
  { src: p1, width: 1200, height: 721 },
  { src: p2, width: 1200, height: 800 },
  { src: p3, width: 1200, height: 800 },
  { src: p4, width: 800, height: 1200 },
];

export const Multiple = () => <ProjectPhotoStack images={images} alt="Speedy robot" />;

export const Single = () => <ProjectPhotoStack images={[images[0]]} alt="Speedy robot" />;

export const Empty = () => <ProjectPhotoStack images={[]} alt="No photos yet" />;
