import { tmdbConfig } from '@/config';
import { CardActionArea, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEventHandler, useMemo } from 'react';
import { Props } from './ContentItem.types';
import { useStyles } from './styles';

const placeholderImgUrl = '/images/no-image.jpg'; //TODO: consider storing it either in config or in constants

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

   const posterUrl = useMemo(() => {
      return poster_path ? `${tmdbConfig.imageBaseUrl}/${poster_path}` : undefined;
   }, [poster_path]);

   const handleContentWrapperClick: MouseEventHandler<HTMLDivElement> = (event) => {
      event.preventDefault();
      if (!title) return;
      navigator.clipboard.writeText(title);
   };

   return (
      <Card className={classes.cardRoot} raised={false}>
         <CardActionArea LinkComponent={Link} href={`${detlUrlPrefix}/${id}`}>
            <div
               className={classes.imageContainer}
               style={{
                  background: posterUrl && `url(${posterUrl}), rgba(0, 0, 0, 0.5)`,
                  backgroundBlendMode: posterUrl && 'overlay',
               }}
            >
               <Image height={140} width={100} src={posterUrl || placeholderImgUrl} alt="" />
            </div>
            <div onClick={handleContentWrapperClick}>
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
            </div>
         </CardActionArea>
      </Card>
   );
}
