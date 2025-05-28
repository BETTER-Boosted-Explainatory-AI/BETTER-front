import React from "react";
import NewAnalyseForm from "../../components/NewNMAForm/NewNMAForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";


const HomePage = () => {
  
  return (
    <>
      <aside id="asideForms"><NewAnalyseForm /></aside>
      <main id="mainContent"><BetterExplanation height={"80vh"} /></main>
    </>
  );
};

export default HomePage;
