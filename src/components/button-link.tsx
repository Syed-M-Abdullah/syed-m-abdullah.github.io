import type { AnchorHTMLAttributes, Ref } from "react";
import { createLink } from "@tanstack/react-router";
import { buttonClass, type ButtonSize, type ButtonVariant } from "@/lib/button-class";

type StyledAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  ref?: Ref<HTMLAnchorElement>;
};

function StyledAnchor({ variant, size, className, ...props }: StyledAnchorProps) {
  return <a {...props} className={buttonClass(variant, size, className)} />;
}

/** Router link styled as a button (typed `to`, `params` and `search`, like <Link>). */
export const ButtonLink = createLink(StyledAnchor);

/** External / mailto link styled as a button. */
export function ButtonAnchor({
  variant,
  size,
  className,
  external,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
}) {
  return (
    <a
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={buttonClass(variant, size, className)}
    />
  );
}
