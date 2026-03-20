---
id: "f6a7b8c9-6666-4fff-a666-666666666606"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A curated guide to reverse engineering learning resources — books, courses, CTFs, blogs, and communities. Covers foundational books (Practical Reverse Engineering, Reverse Engineering for Beginners, The IDA Pro Book), online courses (OpenSecurityTraining2, Malware Unicorn, begin.re), CTF platforms (picoCTF, pwnable.kr, crackmes.one), community resources (r/ReverseEngineering, RE Discord servers, conferences), practice binaries and malware samples (MalwareBazaar, VirusTotal), and a recommended learning path from beginner to intermediate. Path-first approach: the hardest part of learning RE is knowing what to study in what order — this guide provides opinionated sequencing rather than just a link dump.

## Target Audience

RE beginners, self-taught security researchers, CS students interested in security, career changers. Anyone who has decided they want to learn reverse engineering but is overwhelmed by the breadth of resources available. Bootcamp graduates exploring security specializations. Engineers from adjacent fields (software development, system administration) looking to add RE skills. Mentors and educators who need a curated resource list to share with students.

## Problem/Need

Reverse engineering has a notoriously steep learning curve, and the learning resources are scattered across books, university courses, blog posts, CTF platforms, YouTube channels, and community forums. Most "how to learn RE" guides are either link dumps without curation (hundreds of links with no guidance on what to use when) or single-path recommendations that don't account for different backgrounds and goals. Beginners waste significant time trying resources that are too advanced, too outdated, or focused on the wrong subdomain. There's a need for an opinionated, curated guide that sequences resources into a coherent learning path, explains why each resource is recommended, and helps learners make informed choices about where to invest their study time.

## Unique Angle

- **Opinionated learning path** — provides a sequenced path from complete beginner to intermediate practitioner, with clear "you should know X before starting Y" prerequisites, rather than a flat list of resources
- **Resource categorization by learning style** — organizes resources by how you learn (reading, watching, doing) so learners can pick the format that works for them while staying on the same conceptual path
- **Honest resource reviews** — for each major resource, explains what it covers well, what it doesn't cover, who it's best for, and common complaints — not just a recommendation but an informed assessment
- **CTF as deliberate practice** — covers CTF platforms not as competition but as structured practice, with guidance on which challenges map to which concepts and how to use CTFs for focused skill development
- **Community navigation** — guides readers to specific communities (subreddits, Discord servers, conferences, local meetups) with advice on how to effectively engage and get help as a beginner
- **Tool-agnostic foundation** — establishes that RE fundamentals (assembly, binary formats, OS internals) matter more than any specific tool, preventing the common mistake of optimizing tool proficiency over foundational knowledge

## Scope

**Included**: Foundational books (Practical Reverse Engineering by Dang/Gazet/Bachaalany — why it's the recommended starting book; Reverse Engineering for Beginners by Dennis Yurichev — free, comprehensive, x86 and ARM; The IDA Pro Book by Chris Eagle — still relevant for IDA concepts; Hacking: The Art of Exploitation by Erickson — exploitation context; Practical Malware Analysis by Sikorski/Honig — malware RE specifically; Learning Linux Binary Analysis by Andriesse — ELF-focused), online courses (OpenSecurityTraining2 — Architecture 1001/2001, RE 101/201; Malware Unicorn workshops — beginner-friendly malware RE; begin.re — gentle introduction; Nightmare — CTF-oriented binary exploitation; pwn.college — structured binary analysis curriculum), CTF platforms (picoCTF — absolute beginner, great starting point; crackmes.one — focused crackme challenges; pwnable.kr — exploitation challenges; Microcorruption — embedded-ish RE; Flare-On — annual malware RE challenge for intermediates), video resources (LiveOverflow — excellent YouTube channel; OALabs — malware analysis streams; Gynvael Coldwind — CTF and RE streams), community resources (r/ReverseEngineering — curated subreddit; RE Discord servers; conferences: REcon, ShmooCon RE tracks; local security meetups), practice materials (MalwareBazaar — real malware samples; VirusTotal — sample lookup and behavior; crackmes and keygenmes collections; CTF challenge archives), recommended learning path (phase 1: foundations — assembly, binary formats, OS concepts; phase 2: first tool — Ghidra for cost, IDA Free for industry; phase 3: structured practice — CTFs and crackmes; phase 4: specialization — malware, exploitation, embedded, or game hacking)

**Excluded**: Resource links that will quickly become outdated (URLs to specific blog posts), paid course reviews (Offensive Security, SANS — too expensive to evaluate fairly), tool-specific tutorials (covered in sibling deep-dives), advanced/specialized resources (kernel RE, hardware RE, mobile RE — each a separate domain), academic papers on RE techniques, RE tool development resources

## Research Needs

- Review and assess current state of all recommended books (still in print, still relevant)
- Verify online course availability and current curriculum
- Test CTF platform accessibility and challenge quality
- Survey RE community resources for activity level and beginner-friendliness
- Research recommended learning paths from experienced RE practitioners
- Verify MalwareBazaar and sample repository accessibility and policies
- Review conference landscape for RE-focused events
- Survey Reddit and Discord communities for current activity and quality
- Research career paths and how RE skills are applied professionally

## Estimated Effort

- Research: 4-5 hours (resource verification, community survey, learning path research, practitioner interviews)
- Hands-on review: 2-3 hours (test CTF platforms, verify course availability, check community activity levels)
- Writing: 3-4 hours (2500-3500 word curated guide with learning path diagram, resource comparison tables, honest assessments)
- Diagrams: 1-2 hours (learning path flowchart, resource categorization matrix)
- Review/revision: 1-2 hours
- Total: ~10-14 hours
