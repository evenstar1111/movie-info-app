import fetch from 'isomorphic-fetch';
import { discoverUrl } from '../../../externalApiUrls';
import { KEY } from '../../../config';

export default async (req, res) => {
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
    console.log(data);
    res.json(JSON.stringify(data));
  } else {
    return res.status(403).json({ error: 'only POST req accepted' });
  }
};
