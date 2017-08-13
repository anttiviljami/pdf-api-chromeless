import { Chromeless } from 'chromeless';
import * as logger from 'winston';

interface PdfOptions {
  userAgentString: string;
}

export async function pdfFromURL({ url, options }: { url: string, options: PdfOptions }) {
  const remote = Boolean(process.env.CHROMELESS_ENDPOINT_URL);

  const chromelessConfig = remote ? {
    remote: {
      endpointUrl: process.env.CHROMELESS_ENDPOINT_URL,
      apiKey: process.env.CHROMELESS_ENDPOINT_API_KEY,
    },
  } : { launchChrome: false };

  const chromeless = new Chromeless(chromelessConfig);

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
