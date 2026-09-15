const baseURL = 'http://localhost:23119/api';

async function main() {
  const response = await fetch(`${baseURL}/users/0/items?limit=25`, {
    headers: { 'Zotero-API-Version': '3' }
  });

  console.log('Status:', response.status);
  console.log('Total-Results header:', response.headers.get('Total-Results'));

  const items = await response.json();
  console.log(`Parsed ${items.length} item(s) from JSON.\n`);

  items.forEach((item, i) => {
    const d = item.data;
    console.log(`${i + 1}. [${d.itemType}] ${d.title || '(no title)'}`);
    console.log(`   key:      ${item.key}`);
    console.log(`   date:     ${d.date || '(none)'}`);
    console.log(`   creators: ${(d.creators || []).map(c => `${c.firstName || ''} ${c.lastName || ''}`.trim()).join('; ') || '(none)'}`);
    console.log('');
  });
}

main();