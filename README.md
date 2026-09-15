# Zotero Local API Tooling

A small Node.js toolkit for talking to a running Zotero 8 desktop client
over its local HTTP API. No API key, no internet, no cloud.

## Prerequisites

- Zotero 8 running on the same machine as your scripts.
- In Zotero: Settings → Advanced → enable
  "Allow other applications on this computer to communicate with Zotero".
- Node.js 18 or newer (uses the built-in `fetch`).

If the setting is off, requests return 403. If Zotero isn't running,
requests fail with ECONNREFUSED.

## Base URL

    http://localhost:23119/api

All read requests go here. The local user is always `0` in the URL
(Zotero resolves it to your real user ID internally). Every request
should carry the header:

    Zotero-API-Version: 3

## Verified against a live library

- `listItems()` — fetches top-level items from the user library.
- The general item response shape (key, version, library, data).

## Designed but not yet executed

- `listCollections()`
- `getCollectionItems()`
- `listAttachments()`

Treat these as drafts until you run them on your own data.

---

## Functions

### listItems()

Fetches the first page of items from the user's library. This is the
simplest possible call and is useful as a smoke test that the local
API is reachable.

```javascript
const baseURL = 'http://localhost:23119/api';

async function listItems(limit = 5) {
  const response = await fetch(
    `${baseURL}/users/0/items?limit=${limit}`,
    { headers: { 'Zotero-API-Version': '3' } }
  );
  return response.json();
}