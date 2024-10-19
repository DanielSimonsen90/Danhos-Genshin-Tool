import { PropsWithChildren } from "react";

type Props = PropsWithChildren & { selector: string; };

const TIMEOUT = 2000;
const HIGHLIGHT_CLASS = "highlight";

export default function Highlight({ children, selector }: Props) {
  const highlight = (selector: string) => {
    document.querySelector(selector)?.classList.add(HIGHLIGHT_CLASS);
    setTimeout(() => {
      document.querySelector(selector)?.classList.remove(HIGHLIGHT_CLASS);
    }, TIMEOUT);
  };

  return (
    <span className="clickable" onClick={() => highlight(selector)}>
      {children}
    </span>
  );
}