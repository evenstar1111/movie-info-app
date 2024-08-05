import fetch from 'isomorphic-fetch';

export const fetchPostReq = async (url, objData) => {
   const response = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(objData),
   });

   if (!response.ok) {
      return {
         error: response.statusText,
      };
   }

   const data = await response.json();
   return data;
};
