export type CommonDiscoverQParams<SortBy extends string> = {
   language?: string;
   page?: number;
   sort_by?: SortBy;
   with_genres?: string;
   without_genres?: string;
   with_keywords?: string;
   without_keywords?: string;
   include_adult?: boolean;
};

export type CommonSearchQParams = {
   query: string;
   language?: string;
   page?: number;
   include_adult?: boolean;
};

export type ListsApiResponse<Content = any> = {
   page: number;
   results: Content[];
   total_pages: number;
   total_results: number;
};
