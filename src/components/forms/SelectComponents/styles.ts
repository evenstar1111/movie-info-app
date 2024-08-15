import { makeStyles } from 'tss-react/mui';

export type Params = {
   formControlWidth?: string | number;
};

export const useStyles = makeStyles<Params>()((_theme, params) => ({
   formControlRoot: {
      width: params.formControlWidth ?? 250,

      '& .MuiInputLabel-root': {
         fontSize: 13,
         lineHeight: '1.0375em',

         '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.85)',
         },
      },

      [`&& .MuiSelect-multiple, 
      && .MuiSelect-select`]: {
         width: '100%',
         paddingTop: 8,
         paddingBottom: 8,
         boxSizing: 'border-box',
      },

      [`& .MuiSelect-select,
      & .MuiChip-root > .MuiChip-label`]: {
         fontSize: 14,
      },

      '& .MuiChip-root': {
         '& .MuiChip-label': {
            height: 25,
         },
      },
   },
}));
