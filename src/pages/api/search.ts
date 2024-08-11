import { search, SearchTvOrMovieQParams } from '@/interfaces/api';

export default async function handler(req: any, res: any) {
   if (req.method === 'POST') {
      const body = req.body as SearchTvOrMovieQParams;

      const response = await search({ ...body });

      if (response.status !== 200) {
         return res.status(response.status).json({
            error: { code: response.statusText, status: response.status },
         });
      }

      res.json(response.data);
   } else {
      return res.status(403).json({ error: 'invalid request, valid: POST' });
   }
}
