export const IMAGE_PROVIDERS = {
  genshinTrack: 'https://cdn.genshintrack.com',
  sunderarmor: 'https://sunderarmor.com/GENSHIN',
  paimonMoe: 'https://paimon.moe/images',
} as const;

export const TRUSTED_IMAGE_HOSTS: ReadonlyArray<string> = Object.values(IMAGE_PROVIDERS).map(url => new URL(url).host);
