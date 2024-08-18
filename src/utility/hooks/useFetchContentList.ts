import { ContentListMetrices, ContentListResponse, ListsFiltersState } from '@/types';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UrlObject } from 'url';
import { switchAll } from '../loadash-like';

type Args<F extends DefaultFiltersType, C extends DefaultContentType> = {
   filtersState: ListsFiltersState<F>;
   fetchContentFn: (data: F) => Promise<AxiosResponse<ContentListResponse<C>>>;
};
type DefaultFiltersType = Partial<Record<string, string | boolean>>;
type DefaultContentType = Partial<Record<string, unknown>>;

export default function useFetchContentList<F extends DefaultFiltersType, C extends DefaultContentType>({
   fetchContentFn,
   filtersState,
}: Args<F, C>) {
   const router = useRouter();
   const [contents, setContents] = useState<C[]>([]);
   const [metrices, setMetrices] = useState<ContentListMetrices>();
   const [loading, setLoading] = useState<boolean>(false);
   const [loadingOnScrl, setLoadingOnScrl] = useState<boolean>(false);

   const { filters, isReady: isFilterReady } = filtersState;

   const fetchContents = async function (filterArgs: typeof filtersState.filters = filters, pageChangeEvt?: boolean) {
      setLoading(true);

      const res = await fetchContentFn({
         ...filterArgs,
      });

      if (res.status === 200) {
         const data = res.data;
         setContents((prevContents) => {
            if (pageChangeEvt) return data.results || [];
            return [...prevContents, ...(data.results || [])];
         });
         setMetrices({
            page: data.page,
            total_pages: data.total_pages,
            total_results: data.total_results,
         });
      }

      setLoading(false);
   };

   /**
    * Load contents on scroll.
    */
   useEffect(() => {
      if (!window || !document || !metrices) return;

      const { page, total_pages } = metrices;

      const handleScroll = switchAll(async () => {
         const advance = 150;
         const wIH = window.innerHeight;
         const htmlST = document.documentElement.scrollTop;
         const htmlOHgt = document.documentElement.offsetHeight;

         const currentHgt = wIH + htmlST + advance;

         if (currentHgt < htmlOHgt) return;

         if (page < total_pages) {
            setLoadingOnScrl(true);

            await fetchContents({
               ...filters,
               page: `${page + 1}`,
            });

            setLoadingOnScrl(false);
         }
      }, 500);

      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [metrices?.page, metrices?.total_pages, filters]);

   /**
    * Load contents on filters value change.
    */
   useEffect(() => {
      if (!router.isReady || !isFilterReady) return;
      updateUrlQParams();
      fetchContents({ ...filters }, true);

      function updateUrlQParams() {
         const urlData: UrlObject = {
            href: router.pathname,
            query: {
               ...filters,
            },
         };
         router.push(urlData, undefined, {
            shallow: true,
         });
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [filters, isFilterReady]);

   return {
      contents,
      metrices,
      loading,
      loadingOnScrl,
   };
}
