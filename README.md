# Antar

A buildless, phone-first personal wellbeing website. No account database, AI calls, analytics, package dependencies, or clinical treatment claims.

Run locally from this directory with `python -m http.server 5173 --directory dist`, then open `http://localhost:5173`.

## Included

- Sixteen everyday feelings with three optional refinements each, informal Hinglish meanings, mixed feelings, custom wording, and intensity.
- Transparent editorial suggestions, a self-paced five-senses grounding exercise, and manual thought sorting.
- Explicitly saved browser-local anchors. Thought drafts and mood selections remain in volatile page memory.
- Three original mythology/philosophy reflections with source attribution, extracted source readers, and original PDFs.
- Full 20-chapter John Richards Ashtavakra Gita; Mahabharata Vana Parva CXXXII–CXXXIV; 36 source pages of Jebb's Oedipus the King.

## Scope and limitations

This is an initial personal prototype. Suggestions do not infer or diagnose a person's mental state. Story-to-feeling associations and Hinglish paraphrases are original editorial content, not validated treatment. Support prompts use the first selected mood; mixed moods are displayed without claiming a composite assessment. No AI-generated interpretation is presented.

No background safety monitoring, notification reminders, cross-device sync, offline service worker, or clinical records. Anchor data is not app-encrypted. Hosting/sign-in services receive ordinary access metadata, and Google Fonts receives font requests. External source links are third-party sites.

On iPhone Safari, use Share > Add to Home Screen. Standalone appearance is declared in the web manifest; actual iOS installation has not been tested in this Windows environment.

## Library provenance

See `dist/library/manifest.json` for editions, source URLs, download URLs, SHA-256 digests, content notes, and rights evidence. Source PDFs are downloaded originals; extracted JSON preserves PDF page locations and may retain OCR artifacts. Reflections are separate from excerpts.

This is a curated three-source library, not a claim to download every available PDF. John Richards dedicates his translation to the public domain. The Jebb and Ganguli underlying translations are public domain; the downloaded electronic editions carry educational/non-commercial wrapper conditions. Keep attribution and revisit those editions before any commercial reuse.

Clinical exercise source: https://www.nhsinform.scot/healthy-living/mental-wellbeing/breathing-and-relaxation-exercises/grounding-exercises

App design evidence context: https://www.nimh.nih.gov/health/topics/technology-and-the-future-of-mental-health-treatment and https://pubmed.ncbi.nlm.nih.gov/34383678/ . No comparative efficacy claim is made.

## Verification

JavaScript syntax check, local HTTP delivery, PDF signature/page-count/SHA-256 validation, extraction chapter count, and in-browser checks of mood refinement, thought splitting/sorting/disposal, the complete five-step reset, explicit anchor save/removal, and source-chapter deep linking. Responsive visual review at iPhone-sized viewport. Actual iPhone/Safari testing remains outstanding.

## Library expansion

Ten additional books: Kafka (Metamorphosis; The Trial), Machiavelli (The Prince; Discourses on Livy), Marcus Aurelius (Meditations), Epictetus (selected Discourses and Encheiridion), Seneca (Minor Dialogues), Plato (Apology), Laozi (Tao Teh King), and Nietzsche (Thus Spake Zarathustra). Additions are downloaded EPUB and original source files, not PDFs. Chapter/section readers are extracted from the full downloaded editions. Kafka/Wyllie translations are copyrighted and redistributed under Project Gutenberg permission and full retained license. Other named historical translations are public domain, with publisher production terms recorded in the manifest. Books are deliberately browsed; no new automatic mood-treatment recommendations were added.

## Mood-linked passages

39 exact excerpts (three per source edition) are indexed in `dist/library/excerpts.json`, with named sources, section indexes, and UTF-16 offsets verified against downloaded chapter text. All16 everyday mood categories have gentler source-linked options. Four requested reading needs (comfort, perspective, self-understanding, action), mixed selected feelings, optional exact nuance, writer preference, intensity, and content opt-in guide deterministic editorial ranking. The algorithm does not interpret free text, diagnose conditions, calculate clinical confidence, or guarantee a useful reading. No unrelated fallback is substituted when filters yield no close match. Some mood/need combinations deliberately have no match.

Challenging passages require explicit opt-in for suggestions and are excluded at intensity4–5; gentler passages are also limited by their curated maximum intensity. A direct link to a challenging passage shows a separate consent screen unless the reader opted in. Quote text, Hinglish paraphrase, editorial rationale, and reflection prompt are clearly separated. Sources can be opened at an exact highlighted excerpt. Skipped suggestions stay only in page memory; users explicitly save reflections as local anchors.

Validation: quote/source identity for all39 entries, complete13-source and16-mood coverage, all UTF-16 offsets, explicit-needs matching, mixed-mood ranking, writer filters, excluded passages, and challenging-content/intensity boundaries.
