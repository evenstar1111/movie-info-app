export const MoviesSortByOptions = {
   OrTitleAsc: 'original_title.asc',
   OrTitleDesc: 'original_title.desc',
   PopularityAsc: 'popularity.asc',
   PopularityDesc: 'popularity.desc',
   RevenueAsc: 'revenue.asc',
   RevenueDesc: 'revenue.desc',
   TitleAsc: 'title.asc',
   TitleDesc: 'title.desc',
   PrReleaseDateAsc: 'primary_release_date.asc',
   PrReleaseDateDesc: 'primary_release_date.desc',
   VoteAvgAsc: 'vote_average.asc',
   VoteAvgDesc: 'vote_average.desc',
   VoteCntAsc: 'vote_count.asc',
   VoteCntDesc: 'vote_count.desc',
} as const;

export type TMoviesSortByOptionKey = keyof typeof MoviesSortByOptions;
export type TMoviesSortByOptionValue = (typeof MoviesSortByOptions)[keyof typeof MoviesSortByOptions];
