import { MuiSelect, MuiTextField } from '@/components/mui';
import { ParamValsSprtrs } from '@/constants';
import { DiscoverMoviesQParams, TMoviesSortByOptionValue } from '@/interfaces/api';
import { ContentMetaWName } from '@/types/contents/common';
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, SelectProps, Switch } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CustomMultiSelectProps } from '..';
import CustomMultiSelect from '../SelectComponents/CustomMultiSelect/CustomMultiSelect';
import { genreSelectAllValues, genresOptions, sortByOptions } from './constants';
import FieldAutocomplete from './FieldAutocomplete/FieldAutocomplete';
import { Props as FieldAutocompleteProps } from './FieldAutocomplete/FieldAutocomplete.types';
import { Props } from './MoviesFiltersForm.types';

export default function MoviesFiltersForm({ defaultFilters, updateFilters, kwAtcProps, prsnAtcProps }: Props) {
   const defaultsApplied = useRef<boolean>(false);
   const [kwDefaultVal, setKWDefaultVal] = useState<ContentMetaWName[]>([]);
   const [prsnDefaultVal, setPrsnDefaultVal] = useState<ContentMetaWName[]>([]);
   const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

   const {
      handleSubmit,
      formState: { isSubmitted },
      register,
      control,
      watch,
      setValue,
   } = useForm<DiscoverMoviesQParams>({
      defaultValues: {
         with_keywords: '',
         without_keywords: '',
         with_cast: '',
         with_people: '',
         sort_by: 'popularity.desc',
         include_adult: false,
      },
   });

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

   const onKeywordsUpdate: FieldAutocompleteProps['onValueUpdate'] = (kwOpsSelected) => {
      const kwIds = kwOpsSelected.map((kw) => kw.id);
      setValue('with_keywords', kwIds.join(ParamValsSprtrs.Or));
   };

   const onPersonsUpdate: FieldAutocompleteProps['onValueUpdate'] = (prsnOpsSelected) => {
      const prsnIds = prsnOpsSelected.map((prsn) => prsn.id);
      setValue('with_people', prsnIds.join(ParamValsSprtrs.Or));
   };

   const onGenreSelectChange: CustomMultiSelectProps['onChange'] = (event) => {
      let value = event.target.value as string[];
      const lastValue = value[value.length - 1];

      if (lastValue === 'select-all') {
         value = genreSelectAllValues.slice();
      }

      if (lastValue === 'select-none') {
         value = [];
      }

      setSelectedGenres(() => value);
      setValue('with_genres', value.join(ParamValsSprtrs.Or));
   };

   useEffect(() => {
      if (defaultsApplied.current) return;

      Object.keys(defaultFilters).forEach((filterKey) => {
         const keyTyped = filterKey as keyof DiscoverMoviesQParams;
         setValue(keyTyped, defaultFilters[keyTyped]);
      });

      setKWDefaultVal(() => {
         const kwIds = defaultFilters.with_keywords?.split(ParamValsSprtrs.Or) || [];
         const kwVals = kwIds.reduce<ContentMetaWName[]>((acc, kwId) => {
            const found = kwAtcProps.options.find((kwObj) => kwObj.id === Number(kwId));
            if (found) acc.push(found);
            return acc;
         }, []);
         return kwVals;
      });

      setPrsnDefaultVal(() => {
         const prsnIds = defaultFilters.with_people?.split(ParamValsSprtrs.Or) || [];
         const prsnVals = prsnIds.reduce<ContentMetaWName[]>((acc, prsnId) => {
            const found = prsnAtcProps.options.find((op) => op.id === Number(prsnId));
            if (found) acc.push(found);
            return acc;
         }, []);
         return prsnVals;
      });

      setSelectedGenres(() => {
         const genreIds = defaultFilters.with_genres?.split(ParamValsSprtrs.Or) || [];
         return genreIds;
      });

      defaultsApplied.current = true;

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [defaultFilters, kwAtcProps, prsnAtcProps]);

   return (
      <form onSubmit={handleSubmit(handlFormSubmit)} noValidate>
         <Grid container columnSpacing={1} rowSpacing={2.4} mb={2.5}>
            <Grid item xs={12} md={6}>
               <FieldAutocomplete
                  label="Keywords"
                  placeholder="Enter Keywords"
                  defaultValues={kwDefaultVal}
                  onValueUpdate={onKeywordsUpdate}
                  handleInputChange={kwAtcProps.handleInputChange}
                  options={kwAtcProps.options}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <FieldAutocomplete
                  label="People"
                  placeholder="Enter People Names"
                  defaultValues={prsnDefaultVal}
                  onValueUpdate={onPersonsUpdate}
                  handleInputChange={prsnAtcProps.handleInputChange}
                  options={prsnAtcProps.options}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <CustomMultiSelect
                  size="small"
                  formControlWidth="100%"
                  label="Genres"
                  placeholder="Select Genres"
                  options={genresOptions}
                  value={selectedGenres}
                  onChange={onGenreSelectChange}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <FormControl fullWidth>
                  <InputLabel id="content-type">Sort by</InputLabel>
                  <MuiSelect
                     size="small"
                     labelId="content-type"
                     id="content-type"
                     label="Sort by"
                     value={sortByValue}
                     onChange={handleSortBySelectChange}
                  >
                     {sortByOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                           {option.label}
                        </MenuItem>
                     ))}
                  </MuiSelect>
               </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
               <MuiTextField
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

         <Button type="submit" fullWidth>
            Apply
         </Button>
      </form>
   );
}
