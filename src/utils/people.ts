import peopleData from "@/data/people.json";

export interface PersonAffiliation {
  "@type": "Organization";
  name: string;
  url?: string;
}

export interface Person {
  "@type": "Person";
  "@id": string;
  name: string;
  jobTitle?: string;
  affiliation?: PersonAffiliation;
  sameAs: string[];
  image?: string;
  tags?: string[];
}

const SOCIAL_DOMAINS = new Set([
  "github.com",
  "linkedin.com",
  "x.com",
  "twitter.com",
  "medium.com",
  "youtube.com",
  "mastodon.social",
]);

function isDomain(url: string, domain: string): boolean {
  try {
    return new URL(url).hostname.endsWith(domain);
  } catch {
    return false;
  }
}

function isTwitter(url: string): boolean {
  return isDomain(url, "x.com") || isDomain(url, "twitter.com");
}

function isLinkedIn(url: string): boolean {
  return isDomain(url, "linkedin.com");
}

function isSocialPlatform(url: string): boolean {
  try {
    const hostname = new URL(url).hostname;
    return Array.from(SOCIAL_DOMAINS).some(d => hostname.endsWith(d));
  } catch {
    return false;
  }
}

const people = peopleData.itemListElement as Person[];

/**
 * Look up a person by their @id key (e.g., "karpathy").
 */
export function getPerson(id: string): Person | undefined {
  return people.find(p => p["@id"] === id);
}

/**
 * Get all people entries.
 */
export function getAllPeople(): Person[] {
  return people;
}

/**
 * Get the best link for a person, following precedence:
 * 1. Twitter/X URL
 * 2. Personal URL (not a known social platform)
 * 3. LinkedIn URL
 * 4. Affiliation URL
 *
 * Returns undefined if no link available.
 */
export function getPersonLink(person: Person): string | undefined {
  const twitter = person.sameAs.find(isTwitter);
  if (twitter) return twitter;

  const personal = person.sameAs.find(url => !isSocialPlatform(url));
  if (personal) return personal;

  const linkedin = person.sameAs.find(isLinkedIn);
  if (linkedin) return linkedin;

  return person.affiliation?.url;
}

/**
 * Get the Twitter/X handle for a person (without @).
 * Returns undefined if no Twitter URL in sameAs.
 */
export function getTwitterHandle(person: Person): string | undefined {
  const url = person.sameAs.find(isTwitter);
  if (!url) return undefined;
  try {
    const pathname = new URL(url).pathname;
    return pathname.replace(/^\//, "").replace(/\/$/, "") || undefined;
  } catch {
    return undefined;
  }
}
