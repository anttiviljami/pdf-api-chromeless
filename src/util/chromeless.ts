import { Chromeless } from 'chromeless';
import * as logger from 'winston';

interface PdfOptions {
  userAgentString: string;
}

export async function pdfFromURL({ url, options }: { url: string, options: PdfOptions }) {
  const chromeless = new Chromeless({
    launchChrome: false,
  });

  if (options && options.userAgentString) {
    const { userAgentString } = options;
    await chromeless.setUserAgent(userAgentString);
    logger.info('Custom user agent set', userAgentString);
  }

  logger.info(`Visiting URL ${url}...`);
  await chromeless.goto(url).wait(500);
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
