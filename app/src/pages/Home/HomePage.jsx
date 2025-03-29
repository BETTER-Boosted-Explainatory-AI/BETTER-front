import React, { useContext } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import SubDendrogramForm from "../../components/SubDendrogramForm/SubDendrogramForm";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";

const HomePage = () => {
  // Use the context, not the provider component
  const {
    subDendrogram,
    selectedLabels,
    dataset,
    loading,
    handleLabelsChange,
    handleSubDendrogramChange,
  } = useContext(DendrogramContext);

  return (
    <>
      <aside>
        <ChangeModelForm />
        <SubDendrogramForm />
      </aside>
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : subDendrogram ? (
          <Dendrogram data={subDendrogram} />
        ) : (
          <div>Please upload a model</div>
        )}
      </main>
    </>
  );
};

export default HomePage;