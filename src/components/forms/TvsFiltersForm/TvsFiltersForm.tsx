import { countriesSelectOptions, languagesSelectOptions, ParamValsSprtrs, TMDBDateFormat } from '@/constants';
import { DiscoverTvsQParams } from '@/interfaces/api';
import { useDateStrToDayJs, useGetAtcDefaultsFromFilters } from '@/utility';
import { Button, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AutocompleteField, DatePickerFld } from '..';
import { genresOptions, sortByOptions } from './constants';
import { DtPickerChangeHandlerFn, OnAtcValueChangeFn, Props, TFormDataKey, TvsFormData } from './TvsFiltersForm.types';

export default function TvsFiltersForm({ defaultFilters, onFormSubmit, kwAtcProps }: Props) {
   const defaultsApplied = useRef<boolean>(false);
   const kwDefaultVal = useGetAtcDefaultsFromFilters<TFormDataKey>({
      defaults: defaultFilters,
      options: kwAtcProps.options,
      valueKey: 'with_keywords',
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

   const { handleSubmit, register, control, watch, setValue } = useForm<TvsFormData>();

   const airDtGteState = useDateStrToDayJs(watch('first_air_date_gte'));
   const airDtLteState = useDateStrToDayJs(watch('first_air_date_lte'));
   const airYearState = useDateStrToDayJs(watch('first_air_date_year'));

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

   const handleFormSubmit: SubmitHandler<TvsFormData> = (data) => {
      const { vote_count_gte, first_air_date_gte, first_air_date_lte, ...restData } = data;
      const hasAirYear = restData.first_air_date_year;

      onFormSubmit({
         ...restData,
         'vote_count.gte': vote_count_gte,
         'first_air_date.gte': hasAirYear ? '' : first_air_date_gte,
         'first_air_date.lte': hasAirYear ? '' : first_air_date_lte,
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
         let dfKey = filterKey as keyof DiscoverTvsQParams;
         let keyTyped = filterKey as TFormDataKey;

         if (dfKey === 'first_air_date.gte') keyTyped = 'first_air_date_gte';
         if (dfKey === 'first_air_date.lte') keyTyped = 'first_air_date_lte';
         if (dfKey === 'vote_count.gte') keyTyped = 'vote_count_gte';
         setValue(keyTyped, defaultFilters[dfKey]);
      });

      defaultsApplied.current = true;

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [defaultFilters]);

   return (
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
         <Grid container columnSpacing={1.3} rowSpacing={2.4} mb={2.5}>
            <Grid item xs={6} sm={6}>
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
            <Grid item xs={6} sm={6}>
               <AutocompleteField
                  multiple
                  defaultValues={langsDefaultVal}
                  onValueUpdate={onAtcValueChange('with_original_language')}
                  options={languagesSelectOptions}
                  label="Languages"
                  placeholder="Enter Languages"
               />
            </Grid>
            <Grid item xs={6} sm={6}>
               <AutocompleteField
                  multiple
                  defaultValues={countriesDefaultVal}
                  onValueUpdate={onAtcValueChange('with_origin_country')}
                  options={countriesSelectOptions}
                  label="Countries"
                  placeholder="Enter Countries"
               />
            </Grid>
            <Grid item xs={6} sm={6}>
               <AutocompleteField
                  multiple
                  defaultValues={genresDefaultVal}
                  onValueUpdate={onAtcValueChange('with_genres')}
                  options={genresOptions}
                  label="Genres"
                  placeholder="Select Genres"
               />
            </Grid>
            <Grid item xs={6} sm={6}>
               <AutocompleteField
                  multiple
                  defaultValues={woutGenresDefaultVal}
                  onValueUpdate={onAtcValueChange('without_genres')}
                  options={genresOptions}
                  label="Exclude Genres"
                  placeholder="Exclude Genres"
               />
            </Grid>
            <Grid item xs={6} sm={6}>
               <AutocompleteField
                  defaultValues={sortByDefaultVal[0] || null}
                  onValueUpdate={onAtcValueChange('sort_by')}
                  options={sortByOptions}
                  label="Sort by"
               />
            </Grid>
            <Grid item xs={6} sm={6}>
               <DatePickerFld
                  label="Release Year"
                  date={airYearState}
                  views={['year']}
                  onDateChange={dtPickerChangeHandler('first_air_date_year')}
               />
            </Grid>
            <Grid item xs={6} sm={6}>
               <DatePickerFld
                  label="Date Greater Than"
                  date={airDtGteState}
                  maxDate={airDtLteState || undefined}
                  onDateChange={dtPickerChangeHandler('first_air_date_gte')}
                  disabled={!!airYearState}
               />
            </Grid>
            <Grid item xs={6} sm={6}>
               <DatePickerFld
                  label="Date Less Than"
                  date={airDtLteState}
                  minDate={airDtGteState || undefined}
                  onDateChange={dtPickerChangeHandler('first_air_date_lte')}
                  disabled={!!airYearState}
               />
            </Grid>
            <Grid item xs={6} sm={6}>
               <TextField
                  label="Votes Greater Than"
                  placeholder="Votes Greater Than"
                  size="small"
                  type="number"
                  fullWidth
                  {...register('vote_count_gte')}
               />
            </Grid>
            <Grid item xs={6} sm={6}>
               <Controller
                  name="include_adult"
                  control={control}
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
