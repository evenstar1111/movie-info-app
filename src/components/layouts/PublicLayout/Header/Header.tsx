import { Adb, Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEventHandler, useState } from 'react';
import {
   logoMobileSx,
   logoSx,
   logoTitleMobileSx,
   logoTitleSx,
   mobileContainerSx,
   mobileMenuSx,
   navBtnsContainerSx,
   navBtnSx,
} from './styles';

// TODO: store routes globally
const pages = [
   { name: 'Movies', path: '/movies' },
   { name: 'Tvs', path: '/tvs' },
   { name: 'Search', path: '/search' },
   { name: 'About', path: '/about' },
];

export default function Header() {
   const router = useRouter();

   const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

   const handleOpenNavMenu: MouseEventHandler<HTMLElement> = (event) => {
      setAnchorElNav(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   return (
      <AppBar position="static">
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <Adb sx={logoSx} />
               <Typography variant="h6" noWrap component={Link} href="/" sx={logoTitleSx}>
                  HOME
               </Typography>

               <Box sx={mobileContainerSx}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={mobileMenuSx}
                  >
                     {pages.map((page) => (
                        <MenuItem key={page.name} onClick={handleCloseNavMenu} href={page.path} LinkComponent={Link}>
                           <Typography textAlign="center">{page.name}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
               <Adb sx={logoMobileSx} />
               <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={logoTitleMobileSx}
               >
                  LOGO
               </Typography>
               <Box sx={navBtnsContainerSx}>
                  {pages.map((page) => (
                     <Button
                        key={page.name}
                        onClick={handleCloseNavMenu}
                        sx={navBtnSx}
                        href={page.path}
                        LinkComponent={Link}
                     >
                        {page.name}
                     </Button>
                  ))}
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
}
