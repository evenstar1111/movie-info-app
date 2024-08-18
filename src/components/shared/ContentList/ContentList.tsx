import { ContentTypes } from '@/constants';
import { Grid } from '@mui/material';
import { useMemo } from 'react';
import ContentItem from '../ContentItem/ContentItem';
import { routePrefixMap } from './constants';
import { Props } from './ContentList.types';

export default function ContentList({ contents, type = ContentTypes.Movie }: Props) {
   const routePrefix = useMemo(() => {
      if (!type) return '';

      return `${routePrefixMap[type]}`;
   }, [type]);

   if (!contents || !contents.length) {
      return <>No contents found</>;
   }

   return (
      <Grid container spacing={0.5} pb={5} alignItems="stretch">
         {contents.map((content, index) => (
            <Grid key={index} xs={4} md={3} xl={2} item>
               <ContentItem content={{ ...content }} detlUrlPrefix={routePrefix} />
            </Grid>
         ))}
      </Grid>
   );
}
