import fetch from 'isomorphic-fetch';
import { KEY } from '../../../config';
import { discoverUrl } from '../../../externalApiUrls';

export default async function handler(req, res) {
   if (req.method === 'POST') {
      const { type, srt, wgnr, pg } = req.body;
      const url = discoverUrl({ type, srt, wgnr, pg }, KEY);
      const response = await fetch(url);
      if (!response.ok) {
         return res.status(response.status).json({
            error: { code: response.statusText, status: response.status },
         });
      }
      const data = await response.json();
      res.json(data);
   } else {
      return res.status(403).json({ error: 'only POST req accepted' });
   }
}
