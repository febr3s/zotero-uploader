const baseURL = 'http://localhost:23119/api';

async function main() {
  console.log('Starting...');
  try {
    const response = await fetch(`${baseURL}/users/0/items?limit=5`, {
      headers: { 'Zotero-API-Version': '3' }
    });
    console.log('Status:', response.status);
    const text = await response.text();
    console.log('Raw response length:', text.length);
    console.log('Raw response:', text.slice(0, 500));
  } catch (err) {
    console.error('Fetch error:', err);
  }
  console.log('Done.');
}

main();