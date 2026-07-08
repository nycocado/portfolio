"use client";

import { useLayoutEffect, useState } from "react";

const randomBlobRadius = () => {
  const r = () => Math.round(38 + Math.random() * 24);
  return `${r()}% ${r()}% ${r()}% ${r()}% / ${r()}% ${r()}% ${r()}% ${r()}%`;
};

export function BlobMarker() {
  const [radius, setRadius] = useState("50%");

  useLayoutEffect(() => {
    setRadius(randomBlobRadius());
  }, []);

  return (
    <span
      className="mt-1 w-3.5 h-3.5 shrink-0 border-2 border-gruvbox-yellow"
      style={{ borderRadius: radius }}
    />
  );
}
