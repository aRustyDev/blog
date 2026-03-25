import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  // In dev mode, show all posts including drafts
  if (import.meta.env.DEV) return true;
  return !data.draft && isPublishTimePassed;
};

export default postFilter;
