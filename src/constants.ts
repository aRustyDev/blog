import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconGitLab from "@/assets/icons/IconGitLab.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconTwitter from "@/assets/icons/IconTwitter.svg";
import IconMastodon from "@/assets/icons/IconMastodon.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";
import IconYoutube from "@/assets/icons/IconYoutube.svg";
import IconTwitch from "@/assets/icons/IconTwitch.svg";
import IconDiscord from "@/assets/icons/IconDiscord.svg";
import IconArxiv from "@/assets/icons/IconArxiv.svg";
import IconOrcid from "@/assets/icons/IconOrcid.svg";
import IconResearchGate from "@/assets/icons/IconResearchGate.svg";
import IconAlphaXiv from "@/assets/icons/IconAlphaXiv.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
  enabled: boolean;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/aRustyDev/",
    linkTitle: `${SITE.title} on GitHub`,
    icon: IconGitHub,
    enabled: true,
  },
  {
    name: "GitLab",
    href: "https://gitlab.com/aRustyDev",
    linkTitle: `${SITE.title} on GitLab`,
    icon: IconGitLab,
    enabled: false,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/smithadamc",
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: IconLinkedin,
    enabled: true,
  },
  {
    name: "X",
    href: "https://x.com/aRustyDev",
    linkTitle: `${SITE.title} on X`,
    icon: IconBrandX,
    enabled: false,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/aRustyDev",
    linkTitle: `${SITE.title} on Twitter`,
    icon: IconTwitter,
    enabled: false,
  },
  {
    name: "Mastodon",
    href: "https://mastodon.social/@arustydev",
    linkTitle: `${SITE.title} on Mastodon`,
    icon: IconMastodon,
    enabled: false,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@arustydev",
    linkTitle: `${SITE.title} on YouTube`,
    icon: IconYoutube,
    enabled: false,
  },
  {
    name: "Twitch",
    href: "https://twitch.tv/arustydev",
    linkTitle: `${SITE.title} on Twitch`,
    icon: IconTwitch,
    enabled: false,
  },
  {
    name: "Discord",
    href: "https://discord.gg/arustydev",
    linkTitle: `${SITE.title} on Discord`,
    icon: IconDiscord,
    enabled: false,
  },
  {
    name: "arXiv",
    href: "https://arxiv.org/a/arustydev",
    linkTitle: `${SITE.title} on arXiv`,
    icon: IconArxiv,
    enabled: false,
  },
  {
    name: "ORCID",
    href: "https://orcid.org/0000-0000-0000-0000",
    linkTitle: `${SITE.title} on ORCID`,
    icon: IconOrcid,
    enabled: false,
  },
  {
    name: "ResearchGate",
    href: "https://www.researchgate.net/profile/arustydev",
    linkTitle: `${SITE.title} on ResearchGate`,
    icon: IconResearchGate,
    enabled: false,
  },
  {
    name: "AlphaXiv",
    href: "https://alphaxiv.org/u/arustydev",
    linkTitle: `${SITE.title} on AlphaXiv`,
    icon: IconAlphaXiv,
    enabled: false,
  },
  {
    name: "Mail",
    href: "mailto:hello@arusty.dev",
    linkTitle: `Send an email to ${SITE.title}`,
    icon: IconMail,
    enabled: false,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Share this post via WhatsApp`,
    icon: IconWhatsapp,
    enabled: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Share this post on Facebook`,
    icon: IconFacebook,
    enabled: true,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
    enabled: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
    enabled: true,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: `Share this post on Pinterest`,
    icon: IconPinterest,
    enabled: true,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
    enabled: true,
  },
  {
    name: "Mastodon",
    href: "https://mastodonshare.com/?url=",
    linkTitle: `Share this post on Mastodon`,
    icon: IconMastodon,
    enabled: false,
  },
] as const;
