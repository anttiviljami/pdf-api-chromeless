import { Chromeless } from 'chromeless';
import * as logger from 'winston';

export async function pdfFromURL(url: string) {
  const chromeless = new Chromeless({
    launchChrome: false,
  });

  logger.info(`Visiting URL ${url}...`);
  await chromeless.goto(url);
  logger.info('Generating pdf...');
  const pdf = chromeless.pdf();

  await chromeless.end();
  return pdf;
}

export async function screenshotFromURL(url: string) {
  const chromeless = new Chromeless({
    launchChrome: false,
  });

  logger.info(`Visiting URL ${url}...`);
  await chromeless.goto(url);
  logger.info('Taking a screenshot...');
  const screenshot = chromeless.screenshot();

  await chromeless.end();
  return screenshot;
}
