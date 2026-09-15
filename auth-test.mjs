import 'dotenv/config';
import InternetArchive from 'internetarchive-sdk-js';

const ia = new InternetArchive(process.env.IA_TOKEN, {
  testmode: true,
  setScanner: true,
});

async function main() {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout after 15s')), 15000)
  );

  try {
    const item = await Promise.race([ia.getItem('goody'), timeout]);
    console.log('Auth client OK. Item title:', item?.metadata?.title);
  } catch (err) {
    console.error('Auth test failed:', err.message);
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exitCode = 1;
});