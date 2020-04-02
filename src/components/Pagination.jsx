import React, { useRef, useState, useEffect } from "react";
import "./Pagination.css";

const Pagination = ({ paginate, currentPage }) => {
  const totalPage = useRef(27);
  const [pageIndex, setPageIndex] = useState(1);
  const _ = [];
  for (let i = pageIndex * 10 - 9; i <= pageIndex * 10; ++i) {
    if (i > totalPage) break;
    _.push(i);
  }
  const [currentPages, setCurrentPages] = useState(_);

  useEffect(() => {
    const _ = [];
    for (let i = pageIndex * 10 - 9; i <= pageIndex * 10; ++i) {
      if (i > totalPage.current) break;
      _.push(i);
    }
    setCurrentPages(_);
  }, [pageIndex]);

  return (
    <div className="container">
      {currentPages[0] > 1 ? (
        <button onClick={() => setPageIndex(p => p - 1)}>이전</button>
      ) : null}
      <ul className="pagination">
        {currentPages.map((num, idx) => (
          <li
            className={
              num !== currentPage
                ? "pagination__item"
                : "pagination__item current"
            }
            key={idx}
          >
            <button onClick={() => paginate(num)}>{num}</button>
          </li>
        ))}
      </ul>
      {currentPages[currentPages.length - 1] < totalPage.current ? (
        <button onClick={() => setPageIndex(p => p + 1)}>다음</button>
      ) : null}
    </div>
  );
};

export default Pagination;
