import fetch from 'isomorphic-fetch';
import { discoverTvsUrl } from '../../../externalApiUrls';
import { KEY } from '../../../config';

export default async (req, res) => {
   if (req.method === 'POST') {
      const { pg } = req.body;
      const url = discoverTvsUrl({ pg }, KEY);
      const response = await fetch(url);
      if (!response.ok) {
         return res.status(response.status).json({
            error: { code: response.statusText, status: response.status },
         });
      }
      const data = await response.json();
      res.json(JSON.stringify(data));
   } else {
      return res.status(400).json({ error: 'bad request, only post requests are accepted' });
   }
};
