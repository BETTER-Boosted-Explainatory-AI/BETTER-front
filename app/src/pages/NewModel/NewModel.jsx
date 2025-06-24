import React from "react";
import NewNMAForm from "../../components/NewNMAForm/NewNMAForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";


const HomePage = () => {
  
  return (
    <>
      <aside id="asideForms"><NewNMAForm /></aside>
      <main id="mainContent"><BetterExplanation height={"80vh"} /></main>
    </>
  );
};

export default HomePage;
