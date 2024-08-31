export const TvsSortByOptions = {
   FirstAirDateAsc: 'first_air_date.asc',
   FirstAirDateDesc: 'first_air_date.desc',
   NameAsc: 'name.asc',
   NameDesc: 'name.desc',
   OriginalNameAsc: 'original_name.asc',
   OriginalNameDesc: 'original_name.desc',
   PopularityAsc: 'popularity.asc',
   PopularityDesc: 'popularity.desc',
   VoteAverageAsc: 'vote_average.asc',
   VoteAverageDesc: 'vote_average.desc',
   VoteCountAsc: 'vote_count.asc',
   VoteCountDesc: 'vote_count.desc',
} as const;

export type TTvsSortByOptionKey = keyof typeof TvsSortByOptions;
export type TTvsSortByOptionValue = (typeof TvsSortByOptions)[keyof typeof TvsSortByOptions];
