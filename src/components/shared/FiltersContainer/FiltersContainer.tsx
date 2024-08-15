import { BasicDialog } from '@/components/dialogs';
import { ClearOutlined, TuneOutlined } from '@mui/icons-material';
import { Badge, Box, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { Props } from './FiltersContainer.types';

export default function FiltersContainer({ children, filtersCount, clearFilters }: Props) {
   const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

   const openDialog = () => {
      setDialogIsOpen(true);
   };
   const closeDialog = () => {
      setDialogIsOpen(false);
   };

   const handleFilterBtnClick = () => {
      openDialog();
   };

   return (
      <Box>
         <Stack py={2.5} direction="row" columnGap={4}>
            <Badge badgeContent={filtersCount} color="info">
               <Button size="small" startIcon={<TuneOutlined />} onClick={handleFilterBtnClick}>
                  Filters
               </Button>
            </Badge>
            {filtersCount > 0 && (
               <Button size="small" startIcon={<ClearOutlined />} onClick={clearFilters}>
                  Clear
               </Button>
            )}
         </Stack>
         <BasicDialog open={dialogIsOpen} onClose={closeDialog} title="Apply filters">
            {children}
         </BasicDialog>
      </Box>
   );
}
