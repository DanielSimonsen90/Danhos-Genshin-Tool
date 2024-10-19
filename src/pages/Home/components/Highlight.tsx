import { PropsWithChildren } from "react";

type Props = PropsWithChildren & { selector: string; };

const TIMEOUT = 2000;
const HIGHLIGHT_CLASS = "highlight";

export default function Highlight({ children, selector }: Props) {
  const highlight = (selector: string) => {
    const element = document.querySelector(selector);
    if (!element) return console.error(`Element not found: ${selector}`);

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    element.classList.add(HIGHLIGHT_CLASS);
    setTimeout(() => {
      element.classList.remove(HIGHLIGHT_CLASS);
    }, TIMEOUT);
  };

  return (
    <span className="clickable" onClick={() => highlight(selector)}>
      {children}
    </span>
  );
}