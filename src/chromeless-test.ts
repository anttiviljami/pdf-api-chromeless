import { Chromeless } from 'chromeless';
import * as logger from 'winston';

async function run() {
  const chromeless = new Chromeless({
    launchChrome: false,
  });

  const screenshot = await chromeless
    .goto('https://www.medium.com/apiops')
    .screenshot();

  logger.info(screenshot); // prints local file path or S3 url

  await chromeless.end();
}

run()
  .catch(console.error.bind(console));
