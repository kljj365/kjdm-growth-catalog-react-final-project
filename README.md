# KJDM Growth Catalog — React Take-Home

KJDM Growth Catalog is an original React service-discovery and planning interface prepared as a Frontend Simplified React take-home project. It demonstrates reusable components, prop-driven content, event handlers, state, routing, data-derived search/filter/sort, a planning-only cart, loading/recovery states, and responsive layout.

## Reviewer links

| Item | Link |
|---|---|
| Live deployment | Published through GitHub Pages after the `gh-pages` branch is enabled. |
| Source repository | Published to the dedicated repository after reviewer packaging. |

## Run locally

```bash
pnpm install
pnpm run dev
```

For a production check, run `pnpm run check` followed by `pnpm run build`.

## What to test

The reviewer can use the search field, category controls, and sort select; open a service’s **View scope** detail route; add and adjust an item in the planning cart; use the visible recovery control; and visit an intentionally invalid hash route such as `#/not-a-real-service`.

## Important project boundaries

All displayed services and values are original sample planning data. The cart is a non-payment planning interface; the project does not claim real checkout, customer reviews, user accounts, database persistence, client results, or a production service catalog.

## Evidence

The original portfolio workspace maintains the complete Module 6 evidence plan, testing record, and course-preparation notes. This repository intentionally contains only the standalone submission app and reviewer documentation.
