export type ImageExtension = 'png' | 'webp';

export type FetchImageRequest = {
  /** Path below the images root, e.g. `weapons/skyward_blade.webp`. The extension decides the format the image is stored as. */
  relativePath: string;
  /** Trusted provider URLs, tried in order until one returns a png or webp image - converted to the stored format when it differs. */
  sources: Array<string>;
};

export type FetchImageResult = {
  data: Uint8Array;
  mimeType: string;
} | null;
