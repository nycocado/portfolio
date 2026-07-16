import { BlobMarker } from "portfolio";

// Real usage (ProjectsSection) puts one before each highlight line — shown
// here alongside sample text since the marker alone is a 14px shape.
export const Default = () => (
  <div className="flex gap-2 text-sm text-gruvbox-gray/90">
    <BlobMarker />
    Built the real-time video pipeline from scratch
  </div>
);

export const List = () => (
  <ul className="space-y-2 max-w-xs">
    {["Designed the REST API", "Wrote the deployment pipeline", "Led the mobile rewrite"].map(
      (highlight) => (
        <li key={highlight} className="flex gap-2 text-sm text-gruvbox-gray/90">
          <BlobMarker />
          {highlight}
        </li>
      ),
    )}
  </ul>
);
