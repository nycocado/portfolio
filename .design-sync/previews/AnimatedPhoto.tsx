import { AnimatedPhoto } from "portfolio";
import photoUrl from "../../public/photo.webp";

// next/image needs a StaticImageData-shaped src; outside Next's build the
// bare import only yields the data URL, so blurDataURL is filled in by hand
// (real usage — app/[locale]/page.tsx — imports the same asset this way).
const demoPhoto = { src: photoUrl, width: 337, height: 400, blurDataURL: photoUrl };

export const Default = () => (
  <div className="w-56 h-64 rounded-[45%_55%_58%_42%/55%_48%_52%_45%] overflow-hidden border-4 border-gruvbox-yellow shadow-2xl">
    <AnimatedPhoto src={demoPhoto} alt="Profile photo" />
  </div>
);
