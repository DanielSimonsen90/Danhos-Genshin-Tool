import React, { useEffect, useState } from 'react';

type Props = {
  src: string;
  alt: string;

  className?: string;
  fallbackSrc?: string;
};

export default React.forwardRef<HTMLImageElement, Props>(({ src, alt, fallbackSrc, ...props }, ref) => {
  const [preferredSrc, setPreferredSrc] = useState(src);

  return <img src={preferredSrc} alt={alt} title={alt} ref={ref} {...props} onError={() => fallbackSrc ? setPreferredSrc(fallbackSrc) : undefined} />;
});
