import { classNames } from "@/common/functions/strings";

type Props = {
  point: 'up' | 'down' | 'left' | 'right';
}

export default function Chevron({ point }: Props) {
  return (
    <svg className={classNames('icon', 'chevron', `chevron--${point}`)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
}