import fetch from 'isomorphic-fetch';
import { tmdbConfig } from '../../../config';
import { discoverTvsUrl } from '../../../externalApiUrls';

export default async function handler(req, res) {
   if (req.method === 'POST') {
      const { pg } = req.body;
      const url = discoverTvsUrl({ pg }, tmdbConfig.apiKey);
      const response = await fetch(url);
      if (!response.ok) {
         return res.status(response.status).json({
            error: { code: response.statusText, status: response.status },
         });
      }
      const data = await response.json();
      res.json(data);
   } else {
      return res.status(400).json({ error: 'bad request, only post requests are accepted' });
   }
}
