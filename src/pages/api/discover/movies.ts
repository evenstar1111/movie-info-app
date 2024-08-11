import { discoverMovies, DiscoverMoviesQParams } from '@/interfaces/api';

export default async function handler(req: any, res: any) {
   if (req.method === 'POST') {
      const body = req.body as DiscoverMoviesQParams;

      const response = await discoverMovies({ ...body });

      if (response.status !== 200) {
         return res.status(response.status).json({
            error: { code: response.statusText, status: response.status },
         });
      }

      res.json(response.data);
   } else {
      return res.status(403).json({ error: 'only POST req accepted' });
   }
}
