import fetch from 'isomorphic-fetch';
import { tmdbConfig } from '../../config';
import { movieDetUrl } from '../../externalApiUrls';

export default async function handler(req, res) {
   if (req.method === 'POST') {
      const { m_id } = req.body;
      const response = await fetch(movieDetUrl(m_id, tmdbConfig.apiKey));
      if (!response.ok) {
         return res.status(response.status).json({ error: JSON.stringify(response.url) });
      }
      const data = await response.json();
      res.json(data);
   } else {
      return res.status(403).json({ error: 'invalid request, valid: POST' });
   }
}
