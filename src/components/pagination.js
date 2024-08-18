import { useMemo, useState } from 'react';
import Styles from './Pagination.module.css';

export default function Pagination({ movies, handleClick }) {
   const [inputValue, setInputValue] = useState('');
   const totalPages = movies && movies.total_pages;
   const currentPage = movies && movies.page;

   const isGoBtnDisabled = useMemo(() => {
      return Number(movies.page) >= Number(movies.total_pages) || !inputValue;
   }, [movies.page, movies.total_pages, inputValue]);

   const changePage = (page) => {
      const targetPage = parseInt(page);
      if (targetPage < 1) {
         return;
      }

      handleClick(page);

      if (inputValue.length) {
         setInputValue('');
      }
   };

   const altPagination = movies
      ? movies.total_pages && (
           <div className={Styles.rootContainer}>
              <div className={Styles.elemsWrapper}>
                 <div>
                    {currentPage > 1 && (
                       <button className={Styles.button} onClick={() => changePage(currentPage - 1)}>
                          prev
                       </button>
                    )}
                 </div>
                 <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={`${currentPage}/${totalPages}`}
                    aria-label="Example text with two button addons"
                    aria-describedby="button-addon3"
                 />
                 <button
                    className={Styles.button}
                    type="button"
                    onClick={() => changePage(inputValue)}
                    disabled={isGoBtnDisabled}
                 >
                    go
                 </button>
                 {currentPage < totalPages && (
                    <button className={Styles.button} type="button" onClick={() => changePage(currentPage + 1)}>
                       next
                    </button>
                 )}
              </div>
           </div>
        )
      : '';

   const Pagination = movies
      ? movies.total_pages && (
           <nav aria-label="Page navigation example" className="py-4">
              <ul className="pagination justify-content-center flex-wrap">
                 {Array(movies.total_pages > 20 ? 20 : movies.total_pages)
                    .fill(0)
                    .map((item, index) => (
                       <li className={`page-item ${movies.page === index + 1 && 'active'}`} key={index}>
                          <a className="page-link" onClick={() => handleClick(index + 1)}>
                             {index + 1}
                          </a>
                       </li>
                    ))}
              </ul>
           </nav>
        )
      : '';

   return <>{altPagination}</>;
}
