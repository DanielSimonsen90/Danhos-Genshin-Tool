export const AREAS = [
  'General Priority', 'Battle pass',
  'Crown Priority', 'DoE Priority',

  'Artifacts', 'Artifacts level',
  'Weapon materials', 'Weapon level',
  'Talent materials', 'Weekly bosses',
  'Character materials', 'Character level',

  'Built', 'Irrelevant', 'Unaquired'
] as const;

export const NO_PRESET = 'Custom title';

export const ABOUT_TO_REPLACE_EXISTING = {
  title: 'Replace existing list',
  message: 'You are about to replace an existing priority list with the same name. This will delete the old list and replace it with the new one.',
  confirmText: 'Replace',
};