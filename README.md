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

## Personal flow, downtime history, and enjoyment

The default flow uses feeling words, an optional nuance and an optional self-selected need, followed by a tentative Hinglish reflection and source-linked readings. More detail remains optional. Feeling descriptions do not determine a diagnosis or the cause of a feeling.

Downtime check-ins explicitly save low-mood, overwhelmed, or stuck moments. Optional fields include event time, estimated duration, situation, personal note, and an activity/helpfulness rating. Rest is an activity that may have been tried, not a downtime category in the logging UI. Entries persist in `antar-checkins-v1` browser storage, without app encryption, AI transmission, or account/device synchronization. Edit, reversible single removal, delete-all confirmation, and JSON export are available. Corrupt/unreadable history blocks overwriting until explicitly cleared; raw export can preserve it. Clearing the current unsaved session does not delete saved history.

Month observations use only recorded entries. Missing days are never treated as good or bad. Context recurrence requires three separate logged days. Helpfulness summaries require three rated entries on three days and exclude unsure ratings. Time-of-day observations require seven logged days spanning at least fourteen days. A repeated within-calendar-month cluster requires at least three observed months: each has six logged days, logs in each calendar third, at least three difficult-moment days in the leading third, and at least two more than the next third. It is described as a logging cluster, without inference about unobserved days, cause, biological cycles, or future mood.

When enabled, explicit passage helpfulness ratings adjust eligible passage rankings by at most two relevance points. They never bypass mood, requested-need, author, intensity, or challenging-content eligibility. This is transparent deterministic personalization, not an AI model trained on the user. It can be switched off, and deleting history removes its source data.

Three original interactive stories offer eleven reachable endings. They are clearly labelled modern fiction, with no score, streak, personality result, or forced reflection. Enjoying a story never automatically creates a check-in.

Run `node test-matching.cjs` and `node test-month.cjs` from the repository root. Validation covers exact source excerpts, matching boundaries, missing-day semantics, duration accounting, recurrence thresholds, learning eligibility, and every story branch. Browser QA additionally verifies the guided flow, save/reload, entry removal/undo, and story navigation. Actual iPhone/Safari testing remains outstanding.


Latest expansion: 20 source editions and 60 source-verified excerpts. Includes Gibran, Tagore, the Bhagavad Gita (Arnold), Dhammapada (Müller), Montaigne, Schopenhauer, and Confucius alongside the existing collection. Full source notices remain with the downloaded editions.

The calendar now links to all saved history with date, feeling, need, context, helpfulness, and text filters. What helped last time uses only explicit ratings and includes negative ratings in its denominator. A needs map counts explicitly selected needs on separate days; confirmations and corrections belong to an exact snapshot and never rewrite original logs. Run `node test-memory.cjs` in addition to the other checks.

Design research: [Daylio](https://daylio.net/) for quick entries and calendar history; [Bearable](https://bearable.app/support/tips/visualise-your-health-data-in-many-forms) for filtered timelines; [How We Feel](https://howwefeel.org/resources) for emotion vocabulary; [Finch](https://help.finchcare.com/hc/en-us/articles/37935669335309-Our-Approach-to-Self-Care) for gentle attainable activities. Original interface and story content; no copied app assets.

Vercel: buildless static deployment with `dist` as output. `.vercelignore` restricts uploads to deployable assets and configuration. Authenticate before linking/deploying; verify Vercel Authentication protects all deployments before publishing this personal app. Browser history stays on its original browser origin and is not uploaded or moved with deployment.


Mobile/PWA update: five-column thumb navigation, iPhone safe-area spacing, 16px form controls, 320px calendar/filter/needs layouts, reduced motion, local DM Sans/Lora fonts with OFL licenses, PNG install icons, standalone manifest, and a dedicated install/offline page. Safari installation is manual through Share → Add to Home Screen. Actual physical iPhone installation and keyboard behavior still need device verification.

Offline mode is explicitly enabled by the user. The service worker precaches only the static app, fonts, source manifest, and 60-excerpt catalog. Visited chapter JSON is cached separately (at most 20 source files). PDFs/EPUBs, API responses, exports, and personal logs are never cached by the worker. Existing logs remain browser-local. Offline access persists on that device after hosting sign-out, explained before enabling. Removal unregisters the worker and removes only Antar app caches, retaining logs/anchors. The worker serves a consistent cached shell until the user accepts a waiting update; no forced reload.

Run `node test-pwa.cjs` for manifest/icon validity, full precache completeness, offline app/excerpt responses, visited/unvisited chapter handling, update activation, old-cache cleanup, and request exclusions. Browser QA checks 320/390/430px phone widths, a short landscape viewport, navigation fit, form sizes, install instructions, and actual service worker download/removal.

PWA references: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable and https://web.dev/learn/pwa/update


Personal-space update: after naming feelings, choose understanding, calm, or a small step; the first content changes to fit. Second mind (`#mind`) stores deliberately saved free-form thoughts with optional title, bucket, pin, search, edit, reversible removal, and personal export. Drafts remain in page memory until explicitly saved. Comfort shelf (`#comfort`) stores words, HTTPS links, contact details, JPEG/PNG/WebP photos (5 MB each), and selected audio files (10 MB each); a 30 MB total media limit prevents unbounded local attachments. No microphone permission or remote upload occurs. Exports include full base64 media alongside item metadata; check-in history remains a separate export.

Saved personal items use IndexedDB `antar-personal-v1`, store `items`. Existing records are compared inside a single read/write transaction before edits/removals to avoid silently overwriting another tab. A BroadcastChannel refreshes other open tabs. Blob media URLs are browser-local. Link validation rejects non-HTTPS URLs and embedded credentials. Text is escaped before rendering. The service worker caches static code only, not IndexedDB content or personal backups. These are browser-local records without app encryption or account/device sync.

Gentle follow-ups are optional and saved only on an explicit response tap. They snapshot selected feelings/need/intensity when an action is started; no automatic after-intensity is invented. Lighter maps to a self-reported helpful rating, same remains unsure, heavier maps to not-helpful; all copy distinguishes this from causal evidence. A story check-in with only “okay” or “unsure” uses kind `followup`, rather than fabricating downtime. Optional felt-change labels survive normal check-in edits. A failed save preserves the pending response; a successful save clears it to prevent duplicate taps.

Four new original branching journeys cover uncertainty, comparison, rejection, and boundaries. Source motifs (Ariadne’s thread in Apollodorus, Epitome 1.8–9; the Ashtavakra doorway episode) are named separately from invented scenes and practical reflections. Seven stories now have 19 reachable endings. Source for Ariadne: https://www.theoi.com/Text/ApollodorusE.html . No character choice produces a diagnosis/personality result.

Run `node test-personal.cjs` with the other four suites. Browser QA verified Second mind save/reload/search/edit/pin/remove/undo, actual photo/audio file persistence and display, complete media backup, help intent switching, reset completion, same-response history, skip without saving, a full new journey, and 320px layout. Synthetic QA records were removed from the localhost test origin. Physical iPhone media-picker and install checks remain outstanding.


Living-space update: Home now uses a restrained pond/thread illustration, consistent SVG icons, clearer primary paths, and a dedicated My mind tab. Second mind, Connections, and Experiments share tabs. Mobile/desktop typography, forms, reading spacing, focus states, and safe-area navigation retain the established teal identity with muted violet accents.

Connections are undirected, explicitly drawn by the user, with optional labels. A focus map shows up to six neighbors; a complete textual list and links to full thoughts remain accessible. A canonical pair identity prevents duplicate/reversed links. Removing a thought removes its connection records in the same IndexedDB transaction; Undo restores the complete group atomically. Existing thoughts/media are not migrated or rewritten. Experiments are a new kind in the same items store: an optional plan, state (open/paused/reflected), optional observation and explicit helpfulness. They never automatically become downtime or change logged-action statistics. Reflection edits use the original version snapshot to reject cross-tab overwrites. Backups include connections and experiments with other personal records.

Opening-screen preference (`antar-start-screen-v1`) permits home, feelings, Second mind, reset, or comfort shelf. It applies to a root launch without a hash; explicit browser deep links remain authoritative. The PWA manifest starts at `/`. A standalone app launched with the legacy `#home` start URL also applies the opening preference; other deep links are preserved. No shortcut removal or data migration is required.

Gentle resurfacing is off by default (`antar-revisit-v1`). Users select individual saved thoughts or comforting words, then enable offers in My space preferences. Only eligible selected items can appear; photos, audio, contacts, links, drafts, and unselected thoughts are excluded. The in-app offer appears on Home, Second mind, or Comfort shelf, at most once per rolling seven days, rotating selected items by their last revisit. Not today dismisses the current offer; the weekly limit persists after reload. Turning off retains saved content and item selections. No background notification, push subscription, scheduler or automatic psychological interpretation is used. Clock rollback suppresses extra offers.

Run `node test-living.cjs` with the other five suites. Browser checks verified map creation/reload/disconnect/undo, atomic thought-and-connection removal/restore, experiment reflection save/reload, a two-tab stale-edit rejection that retained the unsaved draft, preferred root launch and explicit deep links, opt-in-only resurfacing and dismissal after reload, and complete personal export. QA used disposable localhost records and reset its opening/offer controls; production browser records were not accessed or moved. Physical iPhone testing remains outstanding.
