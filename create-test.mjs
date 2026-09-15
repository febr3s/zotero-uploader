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
        creator: 'Albert Frisch', /* esto tiene que enderezarse*/
        mediatype: 'image',
        rights: 'public domain',
        source: 'Albumen silver print',
        size: '18.4 x 23.3 cm',
        date: '[1867]',
        coverage: 'Leticia, Colombia',
        description: 'View of military outpost with a fenced field and three buildings with thatched roofs. Visible in the background is a forested area with tall trees. Also visible are a number of men in light-colored garments.',
      },
    });

    console.log('Created item:', identifier);
    console.log('Server response:', result);
  } catch (err) {
    console.error('Create failed:', err.message);
  }
}

main();
