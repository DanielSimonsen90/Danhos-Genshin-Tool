import React, { useEffect, useState } from 'react';
import ImageService from '@/services/ImageService';

type Props = {
  src: string;
  alt: string;

  className?: string;
};

export default React.forwardRef<HTMLImageElement, Props>(({ src, alt, ...props }, ref) => {
  const [resolvedSrc, setResolvedSrc] = useState(src);

  useEffect(() => setResolvedSrc(src), [src]);

  const recover = async () => {
    const recovered = await ImageService.recover(src);
    if (recovered) setResolvedSrc(recovered);
  };

  return <img src={resolvedSrc} alt={alt} title={alt} ref={ref} {...props} onError={recover} />;
});
