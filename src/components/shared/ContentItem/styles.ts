import { tss } from 'tss-react';

export const useStyles = tss.withName('ContentItem').create({
   cardRoot: {
      borderRadius: 0,
      boxShadow: 'none',
      maxWidth: '100%',

      '.MuiCardContent-root': {
         backgroundColor: '#ae6b0b1a',
      },
   },
   imageContainer: {
      height: 220,
      width: '100%',
      backgroundColor: '#b27e133d',

      img: {
         height: '100%',
         width: '100%',
         objectFit: 'contain',
      },
   },
});
