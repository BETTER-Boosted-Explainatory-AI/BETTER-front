import React, { useContext } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import QueryForm from "../../components/QueryForm/QueryForm";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";

const QueryPage = () => {

  const {
    subDendrogram,
    loading,
  } = useContext(DendrogramContext);

  return (
    <>
      <aside id="asideForms">
        <ChangeModelForm />
        <QueryForm />
      </aside>
      <main id="mainContent">
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

export default QueryPage;