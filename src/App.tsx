import React from "react";

import { HomePage } from "./features/HomePage/components/HomePage";
import { HomePageProvider } from "./features/HomePage/components/HomePageProvider";

function App() {
  return (
    <HomePageProvider>
      <HomePage />
    </HomePageProvider>
  );
}

export default App;
