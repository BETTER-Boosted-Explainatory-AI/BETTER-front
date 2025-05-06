import React, { useContext } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import SubDendrogramForm from "../../components/SubDendrogramForm/SubDendrogramForm";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import NewModelForm from "../../components/NewModelForm/NewModelForm";

import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";

const HomePage = () => {
  // Use the context, not the provider component
  const {
    subDendrogram,
    selectedLabels,
    loading,
    handleLabelsChange,
    handleSubDendrogramChange,
  } = useContext(DendrogramContext);

  return (
    <>
      <aside>
        <NewModelForm />
        {/* <ChangeModelForm /> */}
        {/* <SubDendrogramForm  /> */}
      </aside>
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : subDendrogram ? (
          <Dendrogram data={subDendrogram} />
        ) : (
          <BetterExplanation />
        )}
      </main>
    </>
  );
};

export default HomePage;
