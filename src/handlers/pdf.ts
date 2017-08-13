import * as Hapi from 'hapi';
import { pdfFromURL } from '../util/chromeless';

export async function pdfHandler(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
  try {
    const { url, options } = request.payload;
    const pdf = await pdfFromURL({ url, options });
    return reply({ pdf });
  } catch (err) {
    return reply({ error: err.message })
      .code(400);
  }
}
