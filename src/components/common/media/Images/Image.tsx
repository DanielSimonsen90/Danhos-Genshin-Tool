import React, { useEffect, useState } from 'react';

type Props = {
  src: string;
  alt: string;

  className?: string;
  fallbackSrcs?: Array<string>;
};

export default React.forwardRef<HTMLImageElement, Props>(({ src, alt, fallbackSrcs, ...props }, ref) => {
  const [preferredSrc, setPreferredSrc] = useState(src);

  return <img src={preferredSrc} alt={alt} title={alt} ref={ref} {...props} onError={() => fallbackSrcs?.length ? setPreferredSrc(fallbackSrcs.shift()!) : undefined} />;
});
