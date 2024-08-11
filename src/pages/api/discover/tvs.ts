import { discoverTvs, DiscoverTvsQParams } from '@/interfaces/api';

export default async function handler(req: any, res: any) {
   if (req.method === 'POST') {
      const body = req.body as DiscoverTvsQParams;

      const response = await discoverTvs({ ...body });

      if (response.status !== 200) {
         return res.status(response.status).json({
            error: { code: response.statusText, status: response.status },
         });
      }

      res.json(response.data);
   } else {
      return res.status(400).json({ error: 'bad request, only post requests are accepted' });
   }
}
