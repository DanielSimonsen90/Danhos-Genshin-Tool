type Props = {
  /**
   * @default true
   */
  show?: boolean;
}

export default function Separator({ show = true }: Props) {
  return show ? <div className="separator">•</div> : null;
}