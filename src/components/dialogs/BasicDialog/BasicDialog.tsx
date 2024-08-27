import { MuiDialog } from '@/components/mui';
import { Close } from '@mui/icons-material';
import { DialogActions, DialogContent, DialogTitle, IconButton, Theme, useMediaQuery } from '@mui/material';
import { Props } from './BasicDialog.types';

export default function BasicDialog({
   children,
   open,
   title = 'Modal title',
   actions,
   onClose,
   dialogProps = {},
}: Props) {
   const szDownSm = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

   if (!open) {
      return null;
   }

   return (
      <MuiDialog open={open} onClose={onClose} maxWidth="sm" fullScreen={szDownSm} {...dialogProps}>
         <DialogTitle>{title}</DialogTitle>
         <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
               position: 'absolute',
               right: 8,
               top: 8,
               color: (theme) => theme.palette.grey[500],
            }}
         >
            <Close />
         </IconButton>
         <DialogContent>{children ?? 'Add dialog contents here.'}</DialogContent>
         {!!actions && <DialogActions>{actions}</DialogActions>}
      </MuiDialog>
   );
}
