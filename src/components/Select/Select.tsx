import React from "react";

import styles from "./styles.module.css";
// import "./styles.css";

type Option = { name: string; value?: string };
type Props = React.InputHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  label?: string;
  options: Option[];
};

function Select({ className, label, options, ...props }: Props) {
  const select = (
    <select {...props} className={`${className} ${styles.customSelect}`}>
      {/* For now, the proposed content model only allows for <div>, <span>, <option>, <optgroup>, <img>, <svg>, and <hr> elements. */}
      <div>
        {options.map((o) => (
          <option key={o.value ?? o.name} value={o.value}>
            {o.name}
          </option>
        ))}
      </div>
    </select>
  );

  return (
    <>
      {label ? (
        <label className={styles.label}>
          {label}
          {select}
        </label>
      ) : (
        select
      )}
    </>
  );
}

export { Select };
