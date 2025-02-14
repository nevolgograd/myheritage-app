import React from "react";

import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { useHomePageContext } from "./HomePageProvider";
import map from "../assets/map.jpg";
import styles from "./styles.module.css";

function HomePage() {
  const { data } = useHomePageContext();

  return (
    <div className={styles.homepage}>
      <Header />
      <div className={styles.map}>
        <img src={map} alt="map" />
      </div>
      <Sidebar deals={data?.deals ?? []} />
    </div>
  );
}

export { HomePage };
