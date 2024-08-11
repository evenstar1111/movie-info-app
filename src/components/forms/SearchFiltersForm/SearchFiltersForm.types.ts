import { SearchContentType, SearchTvOrMovieQParams } from '@/interfaces/api';

export type Props = {
   defaultValues: Partial<SearchTvOrMovieQParams>;
   onSubmit: (args: SearchTvOrMovieQParams) => void;
};

export type ContentTypeOption = {
   label: keyof typeof SearchContentType;
   value: SearchContentType;
};
