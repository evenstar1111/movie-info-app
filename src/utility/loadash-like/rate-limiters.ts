export function switchAll<T extends (..._args: any[]) => void>(
   func: T,
   wait: number
): (..._args: Parameters<T>) => void {
   let timeoutId: ReturnType<typeof setTimeout>;

   return function (...switchAllArgs: Parameters<T>) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
         func(...switchAllArgs);
      }, wait);
   };
}
