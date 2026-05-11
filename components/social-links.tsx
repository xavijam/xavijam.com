import { socialUrls } from "@/lib/social";

const defaultIconClass = "h-5 w-5";
const xIconClass = "h-4 w-4";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5 0-.25 0-.85 0-1.67-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68a3.5 3.5 0 0 1 .1-2.64s.84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.8c.85.01 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.16.59.67.49A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45Z"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

type Item = {
  href: string;
  label: string;
  Icon: typeof GitHubIcon;
  iconClass?: string;
  /** Tailwind hover text color class */
  hoverTextClass?: string;
};

const items: Item[] = [
  {
    href: socialUrls.x,
    label: "X profile",
    Icon: XIcon,
    iconClass: xIconClass,
    hoverTextClass: "hover:text-black",
  },
  {
    href: socialUrls.linkedin,
    label: "LinkedIn profile",
    Icon: LinkedInIcon,
    hoverTextClass: "hover:text-[#0A66C2]",
  },
  { href: socialUrls.github, label: "GitHub profile", Icon: GitHubIcon },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Social profiles"
      className={`flex flex-nowrap items-center justify-start gap-5 text-neutral-600 max-md:w-max max-md:max-w-full max-md:self-start md:w-full md:max-w-md md:justify-center md:gap-7 md:self-center ${className ?? ""}`}
    >
      {items.map(({ href, label, Icon, iconClass, hoverTextClass }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex min-h-11 min-w-11 items-center justify-center rounded-md outline-offset-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950 ${hoverTextClass ?? "hover:text-neutral-950"}`}
          aria-label={`${label} (opens in new tab)`}
        >
          <Icon className={iconClass ?? defaultIconClass} />
        </a>
      ))}
    </nav>
  );
}
