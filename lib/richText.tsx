import type { ReactNode } from "react";

export const richText = {
  b: (chunks: ReactNode) => (
    <strong className="font-bold text-gruvbox-yellow-aa">{chunks}</strong>
  ),
};
