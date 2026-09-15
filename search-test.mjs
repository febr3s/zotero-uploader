import 'dotenv/config';
import InternetArchive from 'internetarchive-sdk-js';

const ia = new InternetArchive(); // no key needed for public reads

async function main() {
  const filters = {
    collection: 'library_of_congress',
    subject: 'basketball',
  };
  const options = { rows: 5, fields: 'identifier,title,mediatype' };

  try {
    const result = await ia.getItems({ filters, options });
    console.log('Found items:', result.response.docs);
  } catch (err) {
    console.error('Search failed:', err.message);
  }
}

main();
