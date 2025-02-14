import React, { useState, useCallback } from "react";

import { Select } from "src/components/Select/Select";
import { Loader } from "src/components/Loader/Loader";

import type { PropertyDeal } from "src/features/Property/components/types";
import { DealCard } from "src/features/Property/components/DealCard/DealCard";
import { FiltersModal } from "src/features/HomePage/components/FiltersModal/FiltersModal";
import { useHomePageContext } from "src/features/HomePage/components/HomePageProvider";
import { Pagination } from "src/features/HomePage/components/Pagination/Pagination";

import {
  setSearchParams,
  resetSearchParamsFilters,
  parseQueryString,
} from "src/utils/url";

import styles from "./styles.module.css";
import filtersModalstyles from "../FiltersModal/styles.module.css";

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
];

type Props = {
  deals: PropertyDeal[];
};

function Sidebar({ deals }: Props) {
  const [sort, setSort] = useState(
    parseQueryString(window.location.search).sort,
  );
  const { searchParams, data, isLoading } = useHomePageContext();

  const activeFiltersCount = Object.keys(searchParams ?? {}).filter(
    (i) => i !== "page",
  ).length;

  const handleSortChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      setSort(value);
      setSearchParams({ sort: value });
    },
    [],
  );

  return (
    <>
      <aside className={styles.deals}>
        <div className="search-header">
          <h1>Homes for sale in Tampa</h1>
          {!isLoading && (
            <p>
              {data?.total ?? 0} listings found — Listed on the MLS. Provided by
              Opendoor Brokerage.
            </p>
          )}

          <div className="seach-actions">
            <Select
              className={styles.sortSelect}
              disabled={isLoading}
              name="sort"
              value={sort}
              options={sortOptions}
              onChange={handleSortChange}
            />

            <button
              className="filters-btn"
              disabled={isLoading}
              data-is-active={!!activeFiltersCount}
              popoverTarget={filtersModalstyles.modalDialog}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                viewBox="0 0 32 32"
              >
                <path d="M30 6.749h-28c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h28c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM24 14.75h-16c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h16c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM19 22.75h-6.053c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h6.053c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0z" />
              </svg>
              {!!activeFiltersCount && (
                <div className="count">{activeFiltersCount}</div>
              )}{" "}
              More filters
            </button>
          </div>

          {!data?.total && !isLoading && (
            <div className="empty-state">
              <h3>No matches in this area at the moment</h3>

              <button onClick={() => resetSearchParamsFilters()}>
                Clear filters
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="loader-wrapper">
            <Loader />
          </div>
        ) : (
          <>
            <div className="property-list">
              {deals.map((deal, index) => (
                <React.Fragment key={deal._id}>
                  <DealCard deal={deal} />
                  {index === 1 && (
                    <div className="banner">
                      <h1>
                        Make your strongest offer when you buy with Opendoor
                      </h1>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {!!data?.total && (
              <Pagination
                currentPage={Number(searchParams?.page ?? 0)}
                totalPages={data.total / (data?.pageSize ?? 1)}
                onPageChange={(page) => setSearchParams({ page })}
              />
            )}
          </>
        )}
      </aside>

      <FiltersModal />
    </>
  );
}

export { Sidebar };
