export function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

type ColorType = 'hex' | 'rgb' | 'hsl';

export function colorConvert(value: string, from: ColorType, to: ColorType): string {
  if (from === to) return value;

  if (from === 'hsl' && to === 'hex') return hslToHex(value);
  return value;
}

function hslToHex(value?: string) {
  if (!value) return "#000000";

  const match = value.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
  if (!match) return value;
  
  const [, h, s, lightness] = match.map(Number);
  const l = lightness / 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const format = (value: number) => {
    const k = (value + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${format(0)}${format(8)}${format(4)}`;
}