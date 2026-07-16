// Several components import next/image and next-intl's navigation helpers
// (which pull in next/navigation), both written assuming Next's own webpack
// build defines `process.*` at compile time. Bundled standalone via esbuild
// (browser platform, no such defines beyond NODE_ENV), any bare `process`
// access throws ReferenceError before window.<globalName> is ever assigned.
// Loaded first via cfg.extraEntries so this runs before those modules do.
// next/image reads process.env.__NEXT_IMAGE_OPTS (normally webpack-defined by
// Next's own build) for its ImageConfigContext default. Outside that build
// it's undefined, and next/image's default (non-"unoptimized") behaviour
// routes every <Image> through a `/_next/image` proxy that doesn't exist
// here — so images would 404. unoptimized:true makes it render the raw
// `src` directly, same as `next.config.js`'s `images.unoptimized`.
// A real object, not a JSON string: Next's own build DefinePlugin-substitutes
// this into an object LITERAL at compile time, and image-component.js does
// `configEnv || configContext || imageConfigDefault` then spreads
// `c.deviceSizes` straight off it — a string here breaks that spread.
const NEXT_IMAGE_OPTS = {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [32, 48, 64, 96, 128, 256, 384],
  path: "/_next/image",
  loader: "default",
  loaderFile: "",
  domains: [],
  disableStaticImages: false,
  minimumCacheTTL: 14400,
  formats: ["image/webp"],
  dangerouslyAllowLocalIP: false,
  dangerouslyAllowSVG: false,
  contentDispositionType: "attachment",
  remotePatterns: [],
  qualities: undefined,
  unoptimized: true,
};

if (typeof globalThis.process === "undefined") {
  globalThis.process = {
    env: { __NEXT_IMAGE_OPTS: NEXT_IMAGE_OPTS },
    platform: "browser",
    version: "",
    browser: true,
    nextTick: (cb, ...args) => Promise.resolve().then(() => cb(...args)),
  };
} else if (!globalThis.process.env) {
  globalThis.process.env = { __NEXT_IMAGE_OPTS: NEXT_IMAGE_OPTS };
} else if (!globalThis.process.env.__NEXT_IMAGE_OPTS) {
  globalThis.process.env.__NEXT_IMAGE_OPTS = NEXT_IMAGE_OPTS;
}
