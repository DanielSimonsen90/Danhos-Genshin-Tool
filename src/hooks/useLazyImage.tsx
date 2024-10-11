import { useEffect, useState } from 'react';

export function useLazyImage(dir: string, name?: string, ext: string = 'png') {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = `${dir}/${name}.${ext}`;
    img.onload = () => setSrc(img.src);
  }, [dir, name, ext]);

  if (!name) {
    const newDir = dir.split('/');
    [name, ext] = newDir.pop().split('.');
    dir = newDir.join('/');
  }

  return src;
}