export const SITE = {
  website: "https://blog.arusty.dev/",
  author: "aRustyDev",
  profile: "https://github.com/aRustyDev",
  desc: "Technical notes on security, systems, and software engineering",
  title: "aRustyDev's Blog",
  ogImage: "og-image.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: true,
    text: "Edit on GitHub",
    url: "https://github.com/aRustyDev/blog/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "America/New_York",
} as const;
