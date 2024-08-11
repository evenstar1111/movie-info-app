import { MoviesSortByOptions, TMoviesSortByOptionKey } from '@/interfaces/api';
import { ContentTypeOption } from './MoviesFiltersForm.types';

export const sortByOptions: ContentTypeOption[] = Object.keys(MoviesSortByOptions).map((item) => {
   const itemTyped = item as TMoviesSortByOptionKey;

   return {
      label: itemTyped,
      value: MoviesSortByOptions[itemTyped],
   };
});
