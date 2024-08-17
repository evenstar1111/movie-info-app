import { MoviesGenres, TMoviesGenreKey } from '@/constants';
import { MoviesSortByOptions, TMoviesSortByOptionKey } from '@/interfaces/api';
import { SelectOptionAsObject } from '@/types';
import { ContentTypeOption } from './MoviesFiltersForm.types';

export const sortByOptions: ContentTypeOption[] = Object.keys(MoviesSortByOptions).map((item) => {
   const itemTyped = item as TMoviesSortByOptionKey;

   return {
      label: itemTyped,
      value: MoviesSortByOptions[itemTyped],
   };
});

export const genresOptions: SelectOptionAsObject[] = Object.keys(MoviesGenres).map((item) => {
   const genreLabel = item as TMoviesGenreKey;

   return {
      label: genreLabel,
      value: MoviesGenres[genreLabel].id.toString(),
   };
});

export const genreSelectAllValues: string[] = genresOptions.map((option) => option.value);
