import type { Person } from "@/utils/people";

export const SAMPLE_CODE_TS = `const x = 1;\nconsole.log(x);`;
export const SAMPLE_CODE_JSON = `{ "key": "value" }`;

export const SAMPLE_SHIKI_HTML = `<pre class="shiki"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#FF7B72" data-line="1" data-col="0" data-scope="storage.type.ts">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E6EDF3" data-line="1" data-col="6" data-scope="variable.other.readwrite.ts">x</span></span></code></pre>`;

export const SAMPLE_PERSON_FULL: Person = {
  "@type": "Person",
  "@id": "test-full",
  name: "Test User",
  jobTitle: "Engineer",
  affiliation: {
    "@type": "Organization",
    name: "TestCorp",
    url: "https://testcorp.com",
  },
  sameAs: [
    "https://x.com/testuser",
    "https://testuser.dev",
    "https://www.linkedin.com/in/testuser",
  ],
  image: "/assets/people/test.jpg",
  tags: ["test"],
};

export const SAMPLE_PERSON_MINIMAL: Person = {
  "@type": "Person",
  "@id": "test-minimal",
  name: "Minimal User",
  sameAs: [],
  tags: [],
};

export const SAMPLE_PERSON_NO_TWITTER: Person = {
  "@type": "Person",
  "@id": "test-no-twitter",
  name: "No Twitter User",
  sameAs: [
    "https://github.com/user",
    "https://user.dev",
    "https://www.linkedin.com/in/user",
  ],
  tags: [],
};

export const SAMPLE_PERSON_LINKEDIN_ONLY: Person = {
  "@type": "Person",
  "@id": "test-linkedin",
  name: "LinkedIn Only",
  sameAs: ["https://www.linkedin.com/in/linkeduser"],
  tags: [],
};

export const SAMPLE_PERSON_SOCIAL_ONLY: Person = {
  "@type": "Person",
  "@id": "test-social",
  name: "Social Only",
  sameAs: [
    "https://github.com/socialuser",
    "https://medium.com/@socialuser",
  ],
  tags: [],
};
