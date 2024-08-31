import { TTvsGenreKey, TvsGenres } from '@/constants';
import { TTvsSortByOptionKey, TvsSortByOptions } from '@/interfaces/api';
import { SelectOptionAsObject } from '@/types';

export const sortByOptions: SelectOptionAsObject[] = Object.keys(TvsSortByOptions).map((item) => {
   const itemTyped = item as TTvsSortByOptionKey;

   return {
      label: itemTyped,
      value: TvsSortByOptions[itemTyped],
   };
});

export const genresOptions: SelectOptionAsObject[] = Object.keys(TvsGenres).map((item) => {
   const genreLabel = item as TTvsGenreKey;

   return {
      label: genreLabel,
      value: TvsGenres[genreLabel].id.toString(),
   };
});

export const genreSelectAllValues: string[] = genresOptions.map((option) => option.value);
