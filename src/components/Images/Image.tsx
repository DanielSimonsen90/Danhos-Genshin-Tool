type Props = {
  src: string;
  alt: string;
  
  className?: string;
}

export default function Image({ src, alt, ...props }: Props) {
  return <img src={src} alt={alt} {...props} />;
}