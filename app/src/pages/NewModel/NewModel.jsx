import React, { useContext } from "react";
import NewModelForm from "../../components/NewModelForm/NewModelForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";


const HomePage = () => {
  
  return (
    <>
      <aside id="asideForms"><NewModelForm /></aside>
      <main id="mainContent"><BetterExplanation /></main>
    </>
  );
};

export default HomePage;
