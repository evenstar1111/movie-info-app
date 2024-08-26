import { countriesSelectOptions, languagesSelectOptions, ParamValsSprtrs, TMDBDateFormat } from '@/constants';
import { DiscoverMoviesQParams } from '@/interfaces/api';
import { useDateStrToDayJs, useGetAtcDefaultsFromFilters } from '@/utility';
import { Button, FormControlLabel, Grid, Switch } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AutocompleteField, DatePickerFld } from '..';
import { genresOptions, sortByOptions } from './constants';
import {
   DtPickerChangeHandlerFn,
   MoviesFormData,
   OnAtcValueChangeFn,
   Props,
   TFormDataKey,
} from './MoviesFiltersForm.types';

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
   const genresDefaultVal = useGetAtcDefaultsFromFilters<TFormDataKey>({
      defaults: defaultFilters,
      options: genresOptions,
      valueKey: 'with_genres',
   });
   const woutGenresDefaultVal = useGetAtcDefaultsFromFilters<TFormDataKey>({
      defaults: defaultFilters,
      options: genresOptions,
      valueKey: 'without_genres',
   });
   const sortByDefaultVal = useGetAtcDefaultsFromFilters<TFormDataKey>({
      defaults: defaultFilters,
      options: sortByOptions,
      valueKey: 'sort_by',
   });

   const {
      handleSubmit,
      formState: { isSubmitted },
      register,
      control,
      watch,
      setValue,
   } = useForm<MoviesFormData>({
      defaultValues: {
         with_keywords: '',
         without_keywords: '',
         with_cast: '',
         with_people: '',
         include_adult: false,
      },
   });

   const releaseDtGteState = useDateStrToDayJs(watch('primary_release_date_gte'));
   const releaseDtLteState = useDateStrToDayJs(watch('primary_release_date_lte'));
   const releaseYearState = useDateStrToDayJs(watch('primary_release_year'));

   const includeSensitiveWtchd = watch('include_adult');
   const includeSensitiveChecked = useMemo(() => {
      if (typeof includeSensitiveWtchd === 'string') {
         return includeSensitiveWtchd === 'true';
      }
      return includeSensitiveWtchd;
   }, [includeSensitiveWtchd]);

   const dtPickerChangeHandler: DtPickerChangeHandlerFn = (key) => (dateObj) => {
      let dateStr = '';
      if (dateObj) dateStr = dateObj.format(TMDBDateFormat);
      setValue(key, dateStr);
   };

   const handleFormSubmit: SubmitHandler<MoviesFormData> = (data) => {
      const { primary_release_date_gte, primary_release_date_lte, ...restData } = data;
      const hasRlsYr = restData.primary_release_year;

      onFormSubmit({
         ...restData,
         'primary_release_date.gte': hasRlsYr ? '' : primary_release_date_gte,
         'primary_release_date.lte': hasRlsYr ? '' : primary_release_date_lte,
      });
   };

   const onAtcValueChange: OnAtcValueChangeFn = (dataKey) => (selectedObjs) => {
      let valueAsStr = '';

      if (Array.isArray(selectedObjs)) {
         const valueArr = selectedObjs.map((obj) => obj.value);
         valueAsStr = valueArr.join(ParamValsSprtrs.Or);
      } else {
         valueAsStr = selectedObjs.value;
      }

      setValue(dataKey, valueAsStr);
   };

   useEffect(() => {
      if (defaultsApplied.current) return;

      Object.keys(defaultFilters).forEach((filterKey) => {
         let dfKey = filterKey as keyof DiscoverMoviesQParams;
         let keyTyped = filterKey as TFormDataKey;

         if (dfKey === 'primary_release_date.gte') keyTyped = 'primary_release_date_gte';
         if (dfKey === 'primary_release_date.lte') keyTyped = 'primary_release_date_lte';
         setValue(keyTyped, defaultFilters[dfKey]);
      });

      defaultsApplied.current = true;

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [defaultFilters, kwAtcProps, prsnAtcProps]);

   return (
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
         <Grid container columnSpacing={1} rowSpacing={2.4} mb={2.5}>
            <Grid item xs={12} md={6}>
               <AutocompleteField
                  multiple
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
                  multiple
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
                  multiple
                  defaultValues={langsDefaultVal}
                  onValueUpdate={onAtcValueChange('with_original_language')}
                  options={languagesSelectOptions}
                  label="Languages"
                  placeholder="Enter Languages"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <AutocompleteField
                  multiple
                  defaultValues={countriesDefaultVal}
                  onValueUpdate={onAtcValueChange('with_origin_country')}
                  options={countriesSelectOptions}
                  label="Countries"
                  placeholder="Enter Countries"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <AutocompleteField
                  multiple
                  defaultValues={genresDefaultVal}
                  onValueUpdate={onAtcValueChange('with_genres')}
                  options={genresOptions}
                  label="Genres"
                  placeholder="Select Genres"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <AutocompleteField
                  multiple
                  defaultValues={woutGenresDefaultVal}
                  onValueUpdate={onAtcValueChange('without_genres')}
                  options={genresOptions}
                  label="Exclude Genres"
                  placeholder="Exclude Genres"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <AutocompleteField
                  defaultValues={sortByDefaultVal[0] || null}
                  onValueUpdate={onAtcValueChange('sort_by')}
                  options={sortByOptions}
                  label="Sort by"
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <DatePickerFld
                  label="Release Year"
                  date={releaseYearState}
                  views={['year']}
                  onDateChange={dtPickerChangeHandler('primary_release_year')}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <DatePickerFld
                  label="Date Greater Than"
                  date={releaseDtGteState}
                  maxDate={releaseDtLteState || undefined}
                  onDateChange={dtPickerChangeHandler('primary_release_date_gte')}
                  disabled={!!releaseYearState}
               />
            </Grid>
            <Grid item xs={12} md={6}>
               <DatePickerFld
                  label="Date Less Than"
                  date={releaseDtLteState}
                  minDate={releaseDtGteState || undefined}
                  onDateChange={dtPickerChangeHandler('primary_release_date_lte')}
                  disabled={!!releaseYearState}
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
