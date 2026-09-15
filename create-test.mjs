import 'dotenv/config';
import InternetArchive from 'internetarchive-sdk-js';

const ia = new InternetArchive(process.env.IA_TOKEN, {
  setScanner: true,
});

async function main() {
  const identifier = `test-item-${Date.now()}`;

  try {
    const result = await ia.createItem({
      identifier: `transients-newmexico-${Date.now()}`,
      collection: 'opensource',
      mediatype: 'texts',
      upload: {
        filename: 'transients-mexico-1935.jpg',
        path: './test.jpg',
      },
      metadata: {
        title: 'Transients, New Mexico',
        creator: 'Dorothea Lange',
        subject: 'New Mexico',
      },
    });

    console.log('Created item:', identifier);
    console.log('Server response:', result);
  } catch (err) {
    console.error('Create failed:', err.message);
  }
}

main();
