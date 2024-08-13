import { TContentTypeKey, TContentTypeVal } from '@/constants';
import { SearchTvOrMovieQParams } from '@/interfaces/api';

export type Props = {
   defaultValues: Partial<SearchTvOrMovieQParams>;
   onSubmit: (args: SearchTvOrMovieQParams) => void;
};

export type ContentTypeOption = {
   label: TContentTypeKey;
   value: TContentTypeVal;
};
