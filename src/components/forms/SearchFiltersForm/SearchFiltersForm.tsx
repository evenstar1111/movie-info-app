import { ContentTypes, TContentTypeVal } from '@/constants';
import { SearchTvOrMovieQParams } from '@/interfaces/api';
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
import { useEffect, useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Props } from './SearchFiltersForm.types';
import { contentTypeOptions } from './constants';

export default function SearchFiltersForm({ defaultValues, onSubmit }: Props) {
   const {
      handleSubmit,
      formState: { errors, isSubmitted },
      register,
      watch,
      setValue,
      control,
   } = useForm<SearchTvOrMovieQParams>({
      defaultValues: {
         type: ContentTypes.Movie,
         query: '',
         include_adult: false,
      },
   });

   const cntntTypeWatched = watch('type');

   const cntntTypeValue = useMemo(() => cntntTypeWatched, [cntntTypeWatched]);

   const handleTypeSelectChange: SelectProps['onChange'] = (event) => {
      const value = event.target.value as TContentTypeVal;
      setValue('type', value, {
         shouldValidate: isSubmitted,
      });
   };

   const handlFormSubmit: SubmitHandler<SearchTvOrMovieQParams> = (data) => {
      if (!data.query) return;
      onSubmit(data);
   };

   useEffect(() => {
      const { type, query, year, include_adult } = defaultValues;
      if (type) setValue('type', type);
      if (query) setValue('query', query);
      if (year) setValue('year', year);
      if (include_adult) setValue('include_adult', include_adult);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [defaultValues]);

   return (
      <form onSubmit={handleSubmit(handlFormSubmit)} noValidate>
         <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item xs={12} md={6}>
               <TextField
                  label="Search"
                  placeholder="What are looking for?"
                  type="text"
                  size="small"
                  variant="outlined"
                  {...register('query')}
                  error={!!errors?.query}
                  helperText={errors?.query?.message}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <FormControl fullWidth>
                  <InputLabel id="content-type">Select search type</InputLabel>
                  <Select
                     size="small"
                     labelId="content-type"
                     id="content-type"
                     label="Select search type"
                     value={cntntTypeValue}
                     onChange={handleTypeSelectChange}
                  >
                     {contentTypeOptions.map((cntntType) => (
                        <MenuItem key={cntntType.value} value={cntntType.value}>
                           {cntntType.label}
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
                  error={!!errors?.year}
                  helperText={errors?.year?.message}
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
