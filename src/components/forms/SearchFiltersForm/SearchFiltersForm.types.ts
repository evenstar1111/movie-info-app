import { SearchTvOrMovieQParams } from '@/interfaces/api';

export type Props = {
   defaultValues: Partial<SearchTvOrMovieQParams>;
   onSubmit: (args: SearchTvOrMovieQParams) => void;
};
