import { getPerson, getPersonLink, getTwitterHandle, getAllPeople } from "./people";
import type { Person } from "./people";
import {
  SAMPLE_PERSON_FULL,
  SAMPLE_PERSON_MINIMAL,
  SAMPLE_PERSON_NO_TWITTER,
  SAMPLE_PERSON_LINKEDIN_ONLY,
  SAMPLE_PERSON_SOCIAL_ONLY,
} from "@/test/fixtures";

describe("people", () => {
  describe("getPerson", () => {
    it("should find a person by id", () => {
      const person = getPerson("karpathy");
      expect(person).toBeDefined();
      expect(person?.name).toBe("Andrej Karpathy");
    });

    it("should return undefined for unknown id", () => {
      expect(getPerson("nonexistent")).toBeUndefined();
    });

    it("should return undefined for empty string", () => {
      expect(getPerson("")).toBeUndefined();
    });
  });

  describe("getAllPeople", () => {
    it("should return all entries", () => {
      const people = getAllPeople();
      expect(people.length).toBe(9);
    });

    it("should contain expected ids", () => {
      const ids = getAllPeople().map(p => p["@id"]);
      expect(ids).toContain("karpathy");
      expect(ids).toContain("lutke");
      expect(ids).toContain("willison");
    });
  });

  describe("getPersonLink", () => {
    it("should return Twitter URL first (precedence)", () => {
      const link = getPersonLink(SAMPLE_PERSON_FULL);
      expect(link).toBe("https://x.com/testuser");
    });

    it("should return personal URL when no Twitter", () => {
      const link = getPersonLink(SAMPLE_PERSON_NO_TWITTER);
      expect(link).toBe("https://user.dev");
    });

    it("should skip GitHub as personal URL", () => {
      const link = getPersonLink(SAMPLE_PERSON_NO_TWITTER);
      expect(link).not.toBe("https://github.com/user");
    });

    it("should return LinkedIn when no Twitter or personal", () => {
      const link = getPersonLink(SAMPLE_PERSON_LINKEDIN_ONLY);
      expect(link).toBe("https://www.linkedin.com/in/linkeduser");
    });

    it("should return affiliation URL as last resort", () => {
      const person: Person = {
        "@type": "Person",
        "@id": "test",
        name: "Test",
        sameAs: [],
        affiliation: {
          "@type": "Organization",
          name: "Corp",
          url: "https://corp.com",
        },
      };
      expect(getPersonLink(person)).toBe("https://corp.com");
    });

    it("should return undefined when no links available", () => {
      expect(getPersonLink(SAMPLE_PERSON_MINIMAL)).toBeUndefined();
    });

    it("should not treat GitHub as personal URL", () => {
      const link = getPersonLink(SAMPLE_PERSON_SOCIAL_ONLY);
      // GitHub and Medium are social platforms — should be skipped
      // No Twitter, no personal, no LinkedIn, no affiliation → undefined
      expect(link).toBeUndefined();
    });

    it("should prefer x.com over twitter.com", () => {
      const person: Person = {
        "@type": "Person",
        "@id": "test",
        name: "Test",
        sameAs: [
          "https://twitter.com/old",
          "https://x.com/new",
        ],
      };
      // First Twitter URL found wins
      const link = getPersonLink(person);
      expect(link).toBe("https://twitter.com/old");
    });
  });

  describe("getTwitterHandle", () => {
    it("should extract handle from x.com URL", () => {
      expect(getTwitterHandle(SAMPLE_PERSON_FULL)).toBe("testuser");
    });

    it("should extract handle from twitter.com URL", () => {
      const person: Person = {
        "@type": "Person",
        "@id": "test",
        name: "Test",
        sameAs: ["https://twitter.com/oldhandle"],
      };
      expect(getTwitterHandle(person)).toBe("oldhandle");
    });

    it("should return undefined when no Twitter URL", () => {
      expect(getTwitterHandle(SAMPLE_PERSON_MINIMAL)).toBeUndefined();
    });

    it("should handle trailing slash", () => {
      const person: Person = {
        "@type": "Person",
        "@id": "test",
        name: "Test",
        sameAs: ["https://x.com/handle/"],
      };
      expect(getTwitterHandle(person)).toBe("handle");
    });
  });
});
