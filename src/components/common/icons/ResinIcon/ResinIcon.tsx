import { ImageService } from "@/services";
import { Image } from "../../Images";

type Props = {
  cost: number;
}

export default function ResinIcon({ cost }: Props) {
  return (
    <div className="icon resin-icon-wrapper">
      <span className="resin-cost">{cost}</span>
      <Image src={ImageService.getResinImage('original')} alt="Original resin" className="resin-icon" />
    </div>
  );
}