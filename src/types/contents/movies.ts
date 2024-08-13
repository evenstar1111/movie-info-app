import { CommonContentProps } from './common';

export type Movie = CommonContentProps & {
   original_title: string;
   release_date: string;
   title: string;
   spoken_languages?: SpokenLanguages[];
};

type SpokenLanguages = {
   english_name: string;
   iso_639_1: string;
   name: string;
};
