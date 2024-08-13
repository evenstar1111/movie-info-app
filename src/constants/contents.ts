export const ContentTypes = {
   Movie: 'movie',
   Tv: 'tv',
   Person: 'person',
   Collection: 'collection',
} as const;
export type TContentTypeKey = keyof typeof ContentTypes;
export type TContentTypeVal = (typeof ContentTypes)[keyof typeof ContentTypes];
