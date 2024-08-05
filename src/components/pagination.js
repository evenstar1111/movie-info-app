import { useState } from 'react';

export default function Pagination({ movies, handleClick }) {
   const [inputValue, setInputValue] = useState('');
   const totalPages = movies && movies.total_pages;
   const currentPage = movies && movies.page;

   const goClickHandler = (page) => {
      if (parseInt(page) < 1 && parseInt(page) > parseInt(page) && parseInt(page) === parseInt(currentPage)) {
         return;
      } else {
         handleClick(page);
      }
   };

   const altPagination = movies
      ? movies.total_pages && (
           <div className="d-flex justify-content-center mt-2">
              <div className="input-group mb-3" style={{ maxWidth: 300 }}>
                 <div className="input-group-prepend">
                    {currentPage > 1 && (
                       <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => goClickHandler(currentPage - 1)}
                       >
                          prev
                       </button>
                    )}
                 </div>
                 <input
                    type="text"
                    className="form-control"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={`${currentPage}/${totalPages}`}
                    aria-label="Example text with two button addons"
                    aria-describedby="button-addon3"
                 />
                 <div className="input-group-append" id="button-addon3">
                    <button
                       className="btn btn-outline-secondary btn-sm"
                       type="button"
                       onClick={() => goClickHandler(inputValue)}
                    >
                       go
                    </button>
                    {currentPage < totalPages && (
                       <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => goClickHandler(currentPage + 1)}
                       >
                          next
                       </button>
                    )}
                 </div>
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
