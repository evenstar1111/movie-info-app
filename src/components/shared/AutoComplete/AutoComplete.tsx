import { MuiMenu, MuiMenuItem, MuiTextField } from '@/components/mui';
import { MenuProps } from '@mui/material';
import { FocusEventHandler, SyntheticEvent, useRef, useState } from 'react';

export default function AutoComplete() {
   const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
   const menuAnchor = useRef<HTMLInputElement | null>(null);

   const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      console.log('input', event);
      setMenuIsOpen(true);
   };

   const handleClick = () => {
      setMenuIsOpen(true);
   };

   const closeMenu: MenuProps['onClose'] = (event) => {
      console.log(event);
      const eventTyped = event as SyntheticEvent;
      eventTyped.bubbles = false;
      eventTyped.stopPropagation();
      eventTyped.preventDefault();
      setMenuIsOpen(false);
   };

   return (
      <>
         <MuiTextField
            ref={menuAnchor}
            label="Keyword"
            placeholder="What are looking for?"
            type="text"
            size="small"
            variant="outlined"
            // onFocus={handleFocus}
            onClick={handleClick}
            // onFocusCapture={handleFocus}
         />
         <MuiMenu open={menuIsOpen} anchorEl={menuAnchor.current} onClose={closeMenu}>
            <MuiMenuItem>Hello</MuiMenuItem>
            <MuiMenuItem>Hello 2</MuiMenuItem>
         </MuiMenu>
      </>
   );
}
