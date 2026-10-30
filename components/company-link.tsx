import Link from "next/link";
import type { ReactNode } from "react";

type CompanyLinkProps = {
  href: string;
  /** Tailwind classes for hover (text + optional decoration). */
  hoverClassName: string;
  children: ReactNode;
};

const sharedClassName =
  "rounded-sm text-neutral-600 underline decoration-neutral-300 underline-offset-[3px] outline-offset-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950";

export function CompanyLink({ href, hoverClassName, children }: CompanyLinkProps) {
  const className = `${sharedClassName} ${hoverClassName}`;

  if (href.startsWith("/")) {
    return <Link href={href} className={className}>{children}</Link>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(new URL(href).hostname)}&sz=32`}
        alt=""
        width={16}
        height={16}
        loading="lazy"
        decoding="async"
        className="mr-[0.3em] inline-block h-[1em] w-[1em] rounded-[3px] align-[-0.125em]"
      />
      {"\u2060"}
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
