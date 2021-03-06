import { Chromeless, ChromelessOptions } from 'chromeless';
import { DeviceMetrics } from '../types/chromeless';
import * as logger from 'winston';

interface PdfOptions {
  userAgentString: string;
  viewport: DeviceMetrics;
}

function startChromeless(options: PdfOptions): Chromeless<{}> {
  const remote = Boolean(process.env.CHROMELESS_ENDPOINT_URL);

  const chromelessConfig = remote ? {
    remote: {
      endpointUrl: process.env.CHROMELESS_ENDPOINT_URL,
      apiKey: process.env.CHROMELESS_ENDPOINT_API_KEY,
    },
  } : { launchChrome: false };

  const chromeless = new Chromeless(chromelessConfig);

  const { viewport } = options;
  return chromeless.setViewport(viewport);
}

export async function pdfFromURL({ url, options }: { url: string, options: PdfOptions }) {
  const chromeless = startChromeless(options);

  if (options && options.userAgentString) {
    const { userAgentString } = options;
    await chromeless.setUserAgent(userAgentString);
    logger.info('Custom user agent set', userAgentString);
  }

  logger.info(`Visiting URL ${url}...`);
  await chromeless.goto(url);
  logger.info('Generating pdf...');
  const pdf = chromeless.pdf();

  await chromeless.end();
  return pdf;
}

export async function pdfFromHTML({ html, options }: { html: string, options: PdfOptions }) {
  const chromeless = startChromeless(options);

  if (options && options.userAgentString) {
    const { userAgentString } = options;
    await chromeless.setUserAgent(userAgentString);
    logger.info('Custom user agent set', userAgentString);
  }

  logger.info('Loading custom html document...');
  await chromeless.setHtml(html);
  logger.info('Generating pdf...');
  const pdf = chromeless.pdf();

  await chromeless.end();
  return pdf;
}
