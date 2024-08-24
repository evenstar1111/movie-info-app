import { BasicDialog } from '@/components/dialogs';
import { ClearOutlined, TuneOutlined } from '@mui/icons-material';
import { Badge, Button, Stack } from '@mui/material';
import { Props } from './FiltersContainer.types';

export default function FiltersContainer({ children, dlgOpen, filtersCount, clearFilters, setDlgOpen }: Props) {
   const openDialog = () => {
      setDlgOpen(true);
   };
   const closeDialog = () => {
      setDlgOpen(false);
   };

   const handleFilterBtnClick = () => {
      openDialog();
   };

   return (
      <>
         <Stack py={1.25} direction="row" columnGap={2}>
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
         <BasicDialog open={dlgOpen} onClose={closeDialog} title="Apply filters">
            {children}
         </BasicDialog>
      </>
   );
}
