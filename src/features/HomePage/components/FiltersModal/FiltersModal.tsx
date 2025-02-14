import React, { useRef, useState, useCallback } from "react";
import { Select } from "src/components/Select/Select";

import { setSearchParams } from "src/utils/url";

import { useHomePageContext } from "../HomePageProvider";
import styles from "./styles.module.css";

import {
  rangeMinOption,
  rangeMaxOption,
  bedroomOptions,
  bathroomOptions,
  poolOptions,
  livingAreaOptions,
  lotAreaOptions,
  priceOptions,
} from "./consts";

type FilterState = {
  homeTypes: string[];
  priceMin: string;
  priceMax: string;
  bedrooms: string;
  bathrooms: string;
  pool: string;
  livingAreaMin: string;
  livingAreaMax: string;
  lotSizeMin: string;
  lotSizeMax: string;
  yearBuiltMin: string;
  yearBuiltMax: string;
  maxHOA: string;
  other: string[];
};

function FiltersModal() {
  const { searchParams, data, isLoading } = useHomePageContext();
  const popoverRef = useRef<HTMLDialogElement | null>(null);

  const [formState, setFormState] = useState<FilterState>({
    homeTypes: ["Homes", "Townhomes", "Apartments"],
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    bathrooms: "",
    pool: "",
    livingAreaMin: "",
    livingAreaMax: "",
    lotSizeMin: "",
    lotSizeMax: "",
    yearBuiltMin: "",
    yearBuiltMax: "",
    maxHOA: "",
    other: [],
  });

  React.useEffect(() => {
    if (!isLoading) {
      setFormState((searchParams ?? {}) as unknown as FilterState);
    }
  }, [isLoading, searchParams]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = event.target;

      if (type !== "checkbox") {
        setFormState((prev) => ({ ...prev, [name]: value }));
        return;
      }
    },
    [],
  );

  // use react-router instead but ok for now
  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // rest page to start from the begining
      setSearchParams({ ...formState, page: "1" });

      popoverRef.current?.hidePopover();
    },
    [formState],
  );

  return (
    <dialog id={styles.modalDialog} popover="" ref={popoverRef}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.formHeader}>
          <div className="filters-result-block">
            <p>Search filters</p>
            <p>{data?.total ?? 0} listings match your search</p>
          </div>

          <div className="buttons-block">
            <button
              type="button"
              className="cancel-btn"
              popoverTarget={styles.modalDialog}
              popoverTargetAction="hide"
            >
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </section>

        <fieldset>
          <legend>Property types</legend>
          {["Homes", "Townhomes", "Apartments", "Opendoor homes only"].map(
            (type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  name="homeTypes"
                  value={type}
                  checked={formState.homeTypes?.includes(type)}
                  onChange={handleChange}
                />
                {type}
              </label>
            ),
          )}
        </fieldset>

        <div className={styles.rangeSelect}>
          <Select
            label="Price range:"
            name="priceMin"
            value={formState.priceMin}
            options={[rangeMinOption, ...priceOptions]}
            onChange={handleChange}
          />

          <Select
            name="priceMax"
            value={formState.priceMax}
            options={[rangeMaxOption, ...priceOptions]}
            onChange={handleChange}
          />
        </div>

        <Select
          label="Bedrooms:"
          name="bedrooms"
          value={formState.bedrooms}
          options={bedroomOptions}
          onChange={handleChange}
        />

        <Select
          label="Bathrooms:"
          name="bathrooms"
          value={formState.bathrooms}
          options={bathroomOptions}
          onChange={handleChange}
        />

        <Select
          label="Pool:"
          name="pool"
          value={formState.pool}
          options={poolOptions}
          onChange={handleChange}
        />

        <div className={styles.rangeSelect}>
          <Select
            label="Building size:"
            name="livingAreaMin"
            value={formState.livingAreaMin}
            options={[rangeMinOption, ...livingAreaOptions]}
            onChange={handleChange}
          />

          <Select
            name="livingAreaMax"
            value={formState.livingAreaMax}
            options={[rangeMaxOption, ...livingAreaOptions]}
            onChange={handleChange}
          />
        </div>

        <div className={styles.rangeSelect}>
          <Select
            label="Lot size:"
            name="lotSizeMin"
            value={formState.lotSizeMin}
            options={[rangeMinOption, ...lotAreaOptions]}
            onChange={handleChange}
          />

          <Select
            name="lotSizeMax"
            value={formState.lotSizeMax}
            options={[rangeMaxOption, ...lotAreaOptions]}
            onChange={handleChange}
          />
        </div>

        <div className={styles.rangeSelect}>
          <Select
            label="Year built:"
            name="yearBuiltMin"
            value={formState.yearBuiltMin}
            options={[{ value: "", name: "No min" }]}
            onChange={handleChange}
          />

          <Select
            name="yearBuiltMax"
            value={formState.yearBuiltMax}
            options={[{ value: "", name: "No max" }]}
            onChange={handleChange}
          />
        </div>

        <Select
          label="Max HOA:"
          name="maxHOA"
          value={formState.maxHOA}
          options={[{ value: "", name: "No max" }]}
          onChange={handleChange}
        />

        <fieldset>
          <legend>Other</legend>
          {["FHA", "Single story only"].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name="other"
                value={option}
                checked={formState.other?.includes(option)}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </fieldset>
      </form>
    </dialog>
  );
}

export { FiltersModal };
