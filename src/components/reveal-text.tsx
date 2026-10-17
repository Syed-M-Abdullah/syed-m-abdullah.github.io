import { Fragment, isValidElement, type ReactElement, type ReactNode } from "react";

/**
 * Wraps each word in a mask (`.rv-w > .rv-i`) so a `data-reveal="mask-lines"` heading rises
 * line by line from below the mask. Words stay real text (screen readers and search engines
 * read the heading normally). Elements inside (e.g. a gradient phrase) move as one unit.
 */
export function MaskLines({ children }: { children: ReactNode }) {
  return <>{split(children, "w")}</>;
}

function word(key: string, content: ReactNode) {
  return (
    <span key={key} className="rv-w">
      <span className="rv-i">{content}</span>
    </span>
  );
}

function split(node: ReactNode, key: string): ReactNode {
  if (typeof node === "string") {
    return node
      .split(/(\s+)/)
      .map((part, i) => (!part ? null : /^\s+$/.test(part) ? part : word(`${key}-${i}`, part)));
  }
  if (Array.isArray(node)) return node.map((n, i) => split(n, `${key}-${i}`));
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (el.type === Fragment) return <Fragment key={key}>{split(el.props.children, key)}</Fragment>;
    return word(key, el);
  }
  return node;
}
