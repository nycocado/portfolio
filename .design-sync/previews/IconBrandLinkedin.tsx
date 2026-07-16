import { IconBrandLinkedin } from "portfolio";

// Real usage (SocialLinks, via config/portfolio.tsx) renders these at the
// footer's icon size, colored via the surrounding link's text color.
export const Default = () => (
  <IconBrandLinkedin className="w-6 h-6 text-gruvbox-gray" />
);

export const Sizes = () => (
  <div className="flex items-center gap-4 text-gruvbox-yellow">
    <IconBrandLinkedin className="w-4 h-4" />
    <IconBrandLinkedin className="w-6 h-6" />
    <IconBrandLinkedin className="w-10 h-10" />
  </div>
);
