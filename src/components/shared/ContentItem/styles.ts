import { tss } from 'tss-react/mui';

export const useStyles = tss.withName('ContentItem').create(({ theme }) => {
   return {
      cardRoot: {
         borderRadius: 0,
         boxShadow: 'none',
         maxWidth: '100%',

         '.MuiCardContent-root': {
            backgroundColor: '#c9c9c93d',
            paddingTop: theme.spacing(0.5),
            paddingBottom: theme.spacing(0.5),
         },
      },
      imageContainer: {
         height: 220,
         width: '100%',
         backgroundColor: '#a2a2a23d',

         img: {
            height: '100%',
            width: '100%',
            objectFit: 'contain',
         },
      },
   };
});
