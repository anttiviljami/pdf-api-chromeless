import { Chromeless } from 'chromeless';
import * as logger from 'winston';

export async function screenshotURL(url: string) {
  const chromeless = new Chromeless({
    launchChrome: false,
  });

  logger.info(`Visiting URL ${url}...`);
  const screenshot = await chromeless.goto(url).screenshot();

  await chromeless.end();
  return screenshot;
}
