import React from "react";

import styles from "./styles.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  );
}

export { Loader };
