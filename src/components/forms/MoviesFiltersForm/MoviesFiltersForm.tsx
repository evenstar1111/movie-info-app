import { MuiSelect, MuiTextField } from '@/components/mui';
import { countriesSelectOptions, languagesSelectOptions, ParamValsSprtrs } from '@/constants';
import { DiscoverMoviesQParams, TMoviesSortByOptionValue } from '@/interfaces/api';
import { useGetAtcDefaultsFromFilters } from '@/utility';
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, SelectProps, Switch } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AutocompleteField, CustomMultiSelectProps } from '..';
import CustomMultiSelect from '../SelectComponents/CustomMultiSelect/CustomMultiSelect';
import { genreSelectAllValues, genresOptions, sortByOptions } from './constants';
import { OnAtcValueChangeFn, Props, TFormDataKey } from './MoviesFiltersForm.types';

export default function MoviesFiltersForm({ defaultFilters, onFormSubmit, kwAtcProps, prsnAtcProps }: Props) {
   const defaultsApplied = useRef<boolean>(false);
   const kwDefaultVal = useGetAtcDefaultsFromFilters<TFormDataKey>({
      defaults: defaultFilters,
      options: kwAtcProps.options,
      valueKey: 'with_keywords',
   });
   const prsnDefaultVal = useGetAtcDefaultsFromFilters<TFormDataKey>({
      defaults: defaultFilters,
      options: prsnAtcProps.options,
      valueKey: 'with_people',
   });
   const langsDefaultVal = useGetAtcDefaultsFromFilters<TFormDataKey>({
      defaults: defaultFilters,
      options: languagesSelectOptions,
      valueKey: 'with_original_language',
   });
   const countriesDefaultVal = useGetAtcDefaultsFromFilters<TFormDataKey>({
      defaults: defaultFilters,
      options: countriesSelectOptions,
      valueKey: 'with_origin_country',
   });
   const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
   const [selectedWotGenres, setSelectedWotGenres] = useState<string[]>([]);

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

   const includeSensitiveWtchd = watch('include_adult');
   const includeSensitiveChecked = useMemo(() => {
      if (typeof includeSensitiveWtchd === 'string') {
         return includeSensitiveWtchd === 'true';
      }
      return includeSensitiveWtchd;
   }, [includeSensitiveWtchd]);

   const handleFormSubmit: SubmitHandler<DiscoverMoviesQParams> = (data) => {
      onFormSubmit(data);
   };

   const onAtcValueChange: OnAtcValueChangeFn = (dataKey) => (selectedObjs) => {
      const valueArr = selectedObjs.map((obj) => obj.value);
      setValue(dataKey, valueArr.join(ParamValsSprtrs.Or));
   };

   const onGenreSelectChange: CustomMultiSelectProps['onChange'] = (event) => {
      const value = getMultiSelectValue(event.target.value, genreSelectAllValues);
      setSelectedGenres(() => value);
      setValue('with_genres', value.join(ParamValsSprtrs.Or));
   };

   const onWotGenreSelectChange: CustomMultiSelectProps['onChange'] = (event) => {
      const value = getMultiSelectValue(event.target.value, genreSelectAllValues);
      setSelectedWotGenres(() => value);
      setValue('without_genres', value.join(ParamValsSprtrs.Or));
   };

   const getMultiSelectValue = (selctdValues: any, allValues: string[]): string[] => {
      let valuesToReturn = selctdValues as string[];
      const lastValue = selctdValues[selctdValues.length - 1];

      if (lastValue === 'select-all') {
         valuesToReturn = allValues.slice();
      }

      if (lastValue === 'select-none') {
         valuesToReturn = [];
      }

      return valuesToReturn;
   };

   useEffect(() => {
      if (defaultsApplied.current) return;

      Object.keys(defaultFilters).forEach((filterKey) => {
         const keyTyped = filterKey as keyof DiscoverMoviesQParams;
         setValue(keyTyped, defaultFilters[keyTyped]);
      });

      setSelectedGenres(() => {
         const genreIds = defaultFilters.with_genres?.split(ParamValsSprtrs.Or) || [];
         return genreIds;
      });

      setSelectedWotGenres(() => {
         const genreIds = defaultFilters.without_genres?.split(ParamValsSprtrs.Or) || [];
         return genreIds;
      });

      defaultsApplied.current = true;

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [defaultFilters, kwAtcProps, prsnAtcProps]);

   return (
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
         <Grid container columnSpacing={1} rowSpacing={2.4} mb={2.5}>
            <Grid item xs={12} md={6}>
               <AutocompleteField
                  defaultValues={kwDefaultVal}
                  onValueUpdate={onAtcValueChange('with_keywords')}
                  options={kwAtcProps.options}
                  handleInputChange={kwAtcProps.handleInputChange}
                  label="Keywords"
                  placeholder="Enter Keywords"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <AutocompleteField
                  defaultValues={prsnDefaultVal}
                  onValueUpdate={onAtcValueChange('with_people')}
                  options={prsnAtcProps.options}
                  handleInputChange={prsnAtcProps.handleInputChange}
                  label="People"
                  placeholder="Enter People Names"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <AutocompleteField
                  defaultValues={langsDefaultVal}
                  onValueUpdate={onAtcValueChange('with_original_language')}
                  options={languagesSelectOptions}
                  label="Languages"
                  placeholder="Enter Languages"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <AutocompleteField
                  defaultValues={countriesDefaultVal}
                  onValueUpdate={onAtcValueChange('with_origin_country')}
                  options={countriesSelectOptions}
                  label="Countries"
                  placeholder="Enter Countries"
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
               <CustomMultiSelect
                  size="small"
                  formControlWidth="100%"
                  label="Exclude Genres"
                  placeholder="Exclude Genres"
                  options={genresOptions}
                  value={selectedWotGenres}
                  onChange={onWotGenreSelectChange}
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
                  label="Release Year"
                  placeholder="Release Year"
                  type="number"
                  size="small"
                  variant="outlined"
                  inputProps={{
                     min: 2000,
                     max: 2099,
                  }}
                  {...register('primary_release_year')}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <Controller
                  name="include_adult"
                  control={control}
                  // rules={featureConstraints.ledger?.unlimited}
                  render={({ field }) => (
                     <FormControlLabel
                        control={<Switch {...field} checked={includeSensitiveChecked} />}
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
