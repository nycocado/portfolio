import { IconBrandInstagram } from "portfolio";

// Real usage (SocialLinks, via config/portfolio.tsx) renders these at the
// footer's icon size, colored via the surrounding link's text color.
export const Default = () => (
  <IconBrandInstagram className="w-6 h-6 text-gruvbox-gray" />
);

export const Sizes = () => (
  <div className="flex items-center gap-4 text-gruvbox-yellow">
    <IconBrandInstagram className="w-4 h-4" />
    <IconBrandInstagram className="w-6 h-6" />
    <IconBrandInstagram className="w-10 h-10" />
  </div>
);

// SocialLinks itself can't render standalone (async Server Component — see
// NOTES.md "Floor-card components"), so this is the only true render of the
// actual bordered-button treatment it wraps every icon in — ported verbatim
// from components/SocialLinks.tsx's className.
export const Composed = () => (
  <a className="flex items-center justify-center w-14 h-14 border border-gruvbox-gray/50 rounded-lg text-gruvbox-gray shadow-sm">
    <IconBrandInstagram className="w-6 h-6" />
  </a>
);
