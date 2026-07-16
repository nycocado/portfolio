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
