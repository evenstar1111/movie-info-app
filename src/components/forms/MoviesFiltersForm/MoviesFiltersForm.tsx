import { DiscoverMoviesQParams, TMoviesSortByOptionValue } from '@/interfaces/api';
import {
   Button,
   FormControl,
   FormControlLabel,
   Grid,
   InputLabel,
   MenuItem,
   Select,
   SelectProps,
   Switch,
   TextField,
} from '@mui/material';
import { useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Props } from './MoviesFiltersForm.types';
import { sortByOptions } from './constants';

export default function MoviesFiltersForm({ updateFilters }: Props) {
   const {
      handleSubmit,
      formState: { isSubmitted },
      register,
      control,
      watch,
      setValue,
   } = useForm<DiscoverMoviesQParams>();

   const sortByWatched = watch('sort_by');

   const sortByValue = useMemo(() => sortByWatched, [sortByWatched]);

   const handleSortBySelectChange: SelectProps['onChange'] = (event) => {
      const value = event.target.value as TMoviesSortByOptionValue;
      setValue('sort_by', value, {
         shouldValidate: isSubmitted,
      });
   };

   const handlFormSubmit: SubmitHandler<DiscoverMoviesQParams> = (data) => {
      updateFilters(data);
   };

   return (
      <form onSubmit={handleSubmit(handlFormSubmit)} noValidate>
         <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item xs={12} md={6}>
               <TextField
                  label="Keyword"
                  placeholder="What are looking for?"
                  type="text"
                  size="small"
                  variant="outlined"
                  {...register('with_keywords')}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  label="Exclude keywords"
                  placeholder="Exclude keywords"
                  type="text"
                  size="small"
                  variant="outlined"
                  {...register('without_keywords')}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  label="Cast"
                  placeholder="Cast"
                  type="text"
                  size="small"
                  variant="outlined"
                  {...register('with_cast')}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  label="People"
                  placeholder="People"
                  type="text"
                  size="small"
                  variant="outlined"
                  {...register('with_people')}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <FormControl>
                  <InputLabel id="content-type">Sort by</InputLabel>
                  <Select
                     size="small"
                     labelId="content-type"
                     id="content-type"
                     label="Select search type"
                     value={sortByValue}
                     onChange={handleSortBySelectChange}
                  >
                     {sortByOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                           {option.label}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  label="Year"
                  placeholder="Filter by year"
                  type="number"
                  size="small"
                  variant="outlined"
                  {...register('year')}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <Controller
                  name="include_adult"
                  control={control}
                  // rules={featureConstraints.ledger?.unlimited}
                  render={({ field }) => (
                     <FormControlLabel
                        control={<Switch {...field} checked={watch('include_adult')} />}
                        label="Sensitive"
                     />
                  )}
               />
            </Grid>
         </Grid>

         <Button type="submit">Submit</Button>
      </form>
   );
}
