import React from 'react';

type Props = {
  src: string;
  alt: string;
  
  className?: string;
}

export default React.forwardRef<HTMLImageElement, Props>(({ src, alt, ...props }, ref) => {
  return <img src={src} alt={alt} title={alt} ref={ref} {...props} />;
});
