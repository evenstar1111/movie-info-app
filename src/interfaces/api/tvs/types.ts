import { CommonDiscoverQParams } from '../shared.types';

export type DiscoverTvsQParams = CommonDiscoverQParams<TvsSortByOption> & {
   year?: number;
   with_cast?: string;
   with_crew?: string;
   with_people?: string;
   include_video?: boolean;
};

export enum TvsSortByOption {
   FirstAirDateAsc = 'first_air_date.asc',
   FirstAirDateDesc = 'first_air_date.desc',
   NameAsc = 'name.asc',
   NameDesc = 'name.desc',
   OriginalNameAsc = 'original_name.asc',
   OriginalNameDesc = 'original_name.desc',
   PopularityAsc = 'popularity.asc',
   PopularityDesc = 'popularity.desc',
   VoteAverageAsc = 'vote_average.asc',
   VoteAverageDesc = 'vote_average.desc',
   VoteCountAsc = 'vote_count.asc',
   VoteCountDesc = 'vote_count.desc',
}

export enum TvsGenres {
   ActionAdventure = 'Action & Adventure',
   Animation = 'Animation',
   Komödie = 'Komödie',
   Krimi = 'Krimi',
   Dokumentarfilm = 'Dokumentarfilm',
   Drama = 'Drama',
   Familie = 'Familie',
   Kids = 'Kids',
   Mystery = 'Mystery',
   News = 'News',
   Reality = 'Reality',
   SciFiFantasy = 'Sci-Fi & Fantasy',
   Soap = 'Soap',
   Talk = 'Talk',
   WarPolitics = 'War & Politics',
   Western = 'Western',
}
