import { MuiSelect, MuiTextField } from '@/components/mui';
import { countriesSelectOptions, languagesSelectOptions, ParamValsSprtrs } from '@/constants';
import { DiscoverMoviesQParams, TMoviesSortByOptionValue } from '@/interfaces/api';
import { SelectOptionAsObject } from '@/types';
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, SelectProps, Switch } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AutocompleteField, AutocompleteFieldProps, CustomMultiSelectProps } from '..';
import CustomMultiSelect from '../SelectComponents/CustomMultiSelect/CustomMultiSelect';
import { genreSelectAllValues, genresOptions, sortByOptions } from './constants';
import { Props } from './MoviesFiltersForm.types';

export default function MoviesFiltersForm({ defaultFilters, updateFilters, kwAtcProps, prsnAtcProps }: Props) {
   const defaultsApplied = useRef<boolean>(false);
   const [kwDefaultVal, setKWDefaultVal] = useState<SelectOptionAsObject[]>([]);
   const [prsnDefaultVal, setPrsnDefaultVal] = useState<SelectOptionAsObject[]>([]);
   const [langsDefaultVal, setLangsDefaultVal] = useState<SelectOptionAsObject[]>([]);
   const [countriesDefaultVal, setCountriesDefaultVal] = useState<SelectOptionAsObject[]>([]);
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

   const handlFormSubmit: SubmitHandler<DiscoverMoviesQParams> = (data) => {
      updateFilters(data);
   };

   const onKeywordsUpdate: AutocompleteFieldProps['onValueUpdate'] = (kwOpsSelected) => {
      const kwIds = kwOpsSelected.map((kw) => kw.value);
      setValue('with_keywords', kwIds.join(ParamValsSprtrs.Or));
   };

   const onPersonsUpdate: AutocompleteFieldProps['onValueUpdate'] = (prsnOpsSelected) => {
      const prsnIds = prsnOpsSelected.map((prsn) => prsn.value);
      setValue('with_people', prsnIds.join(ParamValsSprtrs.Or));
   };

   const onLanguagesUpdate: AutocompleteFieldProps['onValueUpdate'] = (langsSelected) => {
      const langIds = langsSelected.map((lang) => lang.value);
      setValue('with_original_language', langIds.join(ParamValsSprtrs.Or));
   };

   const onCountriesUpdate: AutocompleteFieldProps['onValueUpdate'] = (countrySelected) => {
      const countryIds = countrySelected.map((country) => country.value);
      setValue('with_origin_country', countryIds.join(ParamValsSprtrs.Or));
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

   const onWotGenreSelectChange: CustomMultiSelectProps['onChange'] = (event) => {
      let value = event.target.value as string[];
      const lastValue = value[value.length - 1];

      if (lastValue === 'select-all') {
         value = genreSelectAllValues.slice();
      }

      if (lastValue === 'select-none') {
         value = [];
      }

      setSelectedWotGenres(() => value);
      setValue('without_genres', value.join(ParamValsSprtrs.Or));
   };

   useEffect(() => {
      if (defaultsApplied.current) return;

      Object.keys(defaultFilters).forEach((filterKey) => {
         const keyTyped = filterKey as keyof DiscoverMoviesQParams;
         setValue(keyTyped, defaultFilters[keyTyped]);
      });

      setKWDefaultVal(() => {
         const kwIds = defaultFilters.with_keywords?.split(ParamValsSprtrs.Or) || [];
         const kwVals = kwIds.reduce<SelectOptionAsObject[]>((acc, kwId) => {
            const found = kwAtcProps.options.find((kwObj) => kwObj.value === kwId);
            if (found) acc.push(found);
            return acc;
         }, []);
         return kwVals;
      });

      setPrsnDefaultVal(() => {
         const prsnIds = defaultFilters.with_people?.split(ParamValsSprtrs.Or) || [];
         const prsnVals = prsnIds.reduce<SelectOptionAsObject[]>((acc, prsnId) => {
            const found = prsnAtcProps.options.find((op) => op.value === prsnId);
            if (found) acc.push(found);
            return acc;
         }, []);
         return prsnVals;
      });

      setLangsDefaultVal(() => {
         const langIds = defaultFilters.with_original_language?.split(ParamValsSprtrs.Or) || [];
         const langVals = langIds.reduce<SelectOptionAsObject[]>((acc, langId) => {
            const found = languagesSelectOptions.find((op) => op.value === langId);
            if (found) acc.push(found);
            return acc;
         }, []);
         return langVals;
      });

      setCountriesDefaultVal(() => {
         const countryIds = defaultFilters.with_origin_country?.split(ParamValsSprtrs.Or) || [];
         const countryVals = countryIds.reduce<SelectOptionAsObject[]>((acc, countryId) => {
            const found = countriesSelectOptions.find((op) => op.value === countryId);
            if (found) acc.push(found);
            return acc;
         }, []);
         return countryVals;
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
      <form onSubmit={handleSubmit(handlFormSubmit)} noValidate>
         <Grid container columnSpacing={1} rowSpacing={2.4} mb={2.5}>
            <Grid item xs={12} md={6}>
               <AutocompleteField
                  defaultValues={kwDefaultVal}
                  onValueUpdate={onKeywordsUpdate}
                  options={kwAtcProps.options}
                  handleInputChange={kwAtcProps.handleInputChange}
                  label="Keywords"
                  placeholder="Enter Keywords"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <AutocompleteField
                  defaultValues={prsnDefaultVal}
                  onValueUpdate={onPersonsUpdate}
                  options={prsnAtcProps.options}
                  handleInputChange={prsnAtcProps.handleInputChange}
                  label="People"
                  placeholder="Enter People Names"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <AutocompleteField
                  defaultValues={langsDefaultVal}
                  onValueUpdate={onLanguagesUpdate}
                  options={languagesSelectOptions}
                  label="Languages"
                  placeholder="Enter Languages"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <AutocompleteField
                  defaultValues={countriesDefaultVal}
                  onValueUpdate={onCountriesUpdate}
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
