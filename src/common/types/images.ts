export type ImageExtension = 'png' | 'webp';

export type FetchImageRequest = {
  /** Path below the images root, e.g. `weapons/skyward_blade.png`. The extension decides which image format is accepted. */
  relativePath: string;
  /** Trusted provider URLs, tried in order until one returns an image matching the extension. */
  sources: Array<string>;
};

export type FetchImageResult = {
  data: Uint8Array;
  mimeType: string;
} | null;
