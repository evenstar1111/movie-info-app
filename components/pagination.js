export default function Pagination({ movies, handleClick }) {
  const Pagination = movies
    ? movies.total_pages && (
        <nav aria-label="Page navigation example" className="py-4">
          <ul className="pagination justify-content-center flex-wrap">
            {Array(20)
              .fill(0)
              .map((item, index) => (
                <li
                  className={`page-item ${
                    movies.page === index + 1 && 'active'
                  }`}
                  key={index}
                >
                  <a
                    className="page-link"
                    onClick={() => handleClick(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      )
    : '';

  return <>{Pagination}</>;
}
