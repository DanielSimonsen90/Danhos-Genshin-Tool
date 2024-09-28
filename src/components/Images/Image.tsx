type Props = {
  src: string;
  alt: string;
}

export default function Image({ src, alt }: Props) {
  return <img src={src} alt={alt} />;
}