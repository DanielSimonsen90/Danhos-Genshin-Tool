import { ImageService } from "@/services";
import { Image } from "../../Images";

type Props = {
  cost: number;
  title?: string;
}

export default function ResinIcon({ cost, title }: Props) {
  return (
    <div className="icon resin-icon-wrapper" title={title}>
      <span className="resin-cost">{cost}</span>
      <Image src={ImageService.getResinImage('original')} alt="Original resin" className="resin-icon" />
    </div>
  );
}