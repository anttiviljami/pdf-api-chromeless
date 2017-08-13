import * as Hapi from 'hapi';
import { pdfFromURL, pdfFromHTML } from '../util/chromeless';

export async function pdfHandler(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
  try {
    const { url, html, options } = request.payload;
    const pdf = Boolean(url) ?
      await pdfFromURL({ url, options }) : await pdfFromHTML({ html, options });
    return reply({ pdf });
  } catch (err) {
    return reply({ error: err.message })
      .code(400);
  }
}
