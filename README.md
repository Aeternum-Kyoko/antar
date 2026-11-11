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
