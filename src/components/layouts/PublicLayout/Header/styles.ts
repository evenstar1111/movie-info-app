import { SxProps, Theme } from '@mui/material';

export const logoSx: SxProps<Theme> = {
   display: {
      xs: 'none',
      md: 'flex',
   },
   mr: 1,
};
export const logoMobileSx: SxProps<Theme> = {
   display: { xs: 'flex', md: 'none' },
   mr: 1,
};
export const logoTitleSx: SxProps<Theme> = {
   mr: 2,
   display: { xs: 'none', md: 'flex' },
   fontFamily: 'monospace',
   fontWeight: 700,
   letterSpacing: '.3rem',
   color: 'inherit',
   textDecoration: 'none',
};
export const logoTitleMobileSx: SxProps<Theme> = {
   mr: 2,
   display: { xs: 'flex', md: 'none' },
   flexGrow: 1,
   fontFamily: 'monospace',
   fontWeight: 700,
   letterSpacing: '.3rem',
   color: 'inherit',
   textDecoration: 'none',
};
export const mobileContainerSx: SxProps<Theme> = {
   flexGrow: 1,
   display: {
      xs: 'flex',
      md: 'none',
   },
};
export const mobileMenuSx: SxProps<Theme> = {
   display: {
      xs: 'block',
      md: 'none',
   },
};
export const navBtnsContainerSx: SxProps<Theme> = {
   flexGrow: 1,
   display: { xs: 'none', md: 'flex' },
};
export const navBtnSx: SxProps<Theme> = {
   my: 2,
   color: 'white',
   display: 'block',
   textAlign: 'center',
};
