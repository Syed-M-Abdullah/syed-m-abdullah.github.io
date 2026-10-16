import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { buttonClass, type ButtonSize, type ButtonVariant } from "@/lib/button-class";

type ButtonLinkProps = LinkComponentProps<"a"> & { variant?: ButtonVariant; size?: ButtonSize };

/** Router link styled as a button. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={buttonClass(variant, size, typeof className === "string" ? className : undefined)}
    />
  );
}

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
