export function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

type ColorType = 'hex' | 'rgb' | 'hsl';

export function colorConvert(value: string, from: ColorType, to: ColorType): string {
  if (from === to) return value;

  switch (from) {
    case 'hsl': {
      switch (to) {
        case 'hex': return hslToHex(value);
      }
    }
  }
}

function hslToHex(value?: string) {
  if (!value) return "#000000";

  const match = value.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
  if (!match) return value;
  
  let [_, h, s, l] = match.map(Number);
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const format = (value: number) => {
    const k = (value + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${format(0)}${format(8)}${format(4)}`;
}