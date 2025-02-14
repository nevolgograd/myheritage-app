import React from "react";

import styles from "./styles.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  // Determine the start page.
  // We'll try to show two pages before the current page if possible.
  const offset = 2;
  let startPage = currentPage - offset;
  if (startPage < 1) {
    startPage = 1;
  }

  // Determine the end page ensuring that we show 5 buttons, or fewer if totalPages is less
  let endPage = startPage + 4;
  if (endPage > totalPages) {
    endPage = totalPages;
    // Adjust startPage if there are fewer than 5 pages available after shifting
    startPage = Math.max(endPage - 4, 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {String.fromCharCode(9664)} prev
      </button>

      <div className="pages">
        {pages.map((page) => (
          <button
            key={page}
            className={
              page === currentPage || (!currentPage && page === 1)
                ? "active"
                : ""
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        next {String.fromCharCode(9654)}
      </button>
    </div>
  );
}

export { Pagination };
