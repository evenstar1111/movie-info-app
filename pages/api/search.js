import fetch from 'isomorphic-fetch';
import { searchUrl } from '../../externalApiUrls';
import { KEY } from '../../config';

export default async (req, res) => {
   if (req.method === 'POST') {
      const { type, kw } = req.body;
      const response = await fetch(searchUrl(type, kw, KEY));
      if (!response.ok) {
         return res.status(response.status).json({ error: JSON.stringify(response.url) });
      }
      const data = await response.json();
      res.json(JSON.stringify(data));
   } else {
      return res.status(403).json({ error: 'invalid request, valid: POST' });
   }
};
