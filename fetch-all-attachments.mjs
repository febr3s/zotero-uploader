const baseURL = 'http://localhost:23119/api';

async function fetchAllItems(library = 'users/0', pageSize = 100) {
  const all = [];
  let start = 0;
  let total = null;

  while (true) {
    const response = await fetch(
      `${baseURL}/${library}/items?limit=${pageSize}&start=${start}`,
      { headers: { 'Zotero-API-Version': '3' } }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} at start=${start}`);
    }

    if (total === null) {
      total = parseInt(response.headers.get('Total-Results') || '0', 10);
    }

    const page = await response.json();
    if (page.length === 0) break;

    all.push(...page);
    start += page.length;

    if (total !== null && all.length >= total) break;
  }

  return all;
}

async function listAllAttachments() {
  const items = await fetchAllItems();

  const byKey = new Map();
  items.forEach(item => byKey.set(item.key, item));

  const attachments = items.filter(i => i.data.itemType === 'attachment');

  console.log(`Scanned ${items.length} item(s).`);
  console.log(`Found ${attachments.length} attachment(s).\n`);

  attachments.forEach((att, i) => {
    const d = att.data;
    const parent = d.parentItem ? byKey.get(d.parentItem) : null;

    const parentLabel = parent
      ? `[${parent.data.itemType}] ${parent.data.title || '(untitled)'}`
      : '(standalone)';

    console.log(`${i + 1}. ${d.title || d.filename || '(untitled)'}`);
    console.log(`   key:          ${att.key}`);
    console.log(`   filename:     ${d.filename || '(none)'}`);
    console.log(`   linkMode:     ${d.linkMode}`);
    console.log(`   contentType:  ${d.contentType || '(unknown)'}`);
    console.log(`   parent:       ${parentLabel}`);
    console.log('');
  });
}

listAllAttachments();