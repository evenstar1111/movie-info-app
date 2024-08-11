import { ContentType } from './types';

export class RoutePaths {
   static readonly DISCOVER_MOVIES = 'discover/movie';
   static readonly DISCOVER_TVS = 'discover/tv';

   static getContentDetlUrl(type: ContentType, id: string | number): string {
      return `${type}/${id}`;
   }
}
