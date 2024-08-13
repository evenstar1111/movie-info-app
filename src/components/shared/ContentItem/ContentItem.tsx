import { tmdbConfig } from '@/config';
import { CardActionArea, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { Props } from './ContentItem.types';
import { useStyles } from './styles';

export default function ContentItem({
   content: {
      poster_path,
      id,
      backdrop_path,
      first_air_date,
      genre_ids,
      name,
      original_language,
      original_name,
      original_title,
      overview,
      popularity,
      release_date,
      title,
      vote_average,
      vote_count,
      genres,
      homepage,
      tagline,
      status,
   },
   detlUrlPrefix,
}: Props) {
   const { classes } = useStyles();

   const releaseYear = useMemo(() => {
      let year = '';

      if (release_date) {
         year = release_date.slice(0, 4);
      }

      if (first_air_date) {
         year = first_air_date.slice(0, 4);
      }

      return year;
   }, [release_date, first_air_date]);

   const titleMod = useMemo(() => {
      let titleToUse = title || name || '';
      const maxLen = 15;

      if (titleToUse.length > maxLen) titleToUse = `${titleToUse.slice(0, 15 - 3)}...`;

      return titleToUse;
   }, [title, name]);

   return (
      <Card classes={{ root: classes.cardRoot }} raised={false}>
         <CardActionArea LinkComponent={Link} href={`${detlUrlPrefix}/${id}`}>
            {Math.random() === 10 && (
               <div className={classes.imageContainer}>
                  <Image height={140} width={100} src={`${tmdbConfig.imageBaseUrl}/${poster_path}`} alt="" />
               </div>
            )}
            <div className={classes.imageContainer}>
               <Image height={140} width={100} src="/images/no-image.jpg" alt="" />
            </div>
            <CardContent>
               <Typography variant="body2">
                  <Tooltip title={title || name || ''}>
                     <span>{titleMod}</span>
                  </Tooltip>{' '}
                  ({releaseYear})
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  <b>{vote_average}</b> ({vote_count})
               </Typography>
            </CardContent>
         </CardActionArea>
      </Card>
   );
}
