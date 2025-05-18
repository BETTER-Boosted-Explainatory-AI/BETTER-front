import React, { useContext } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import QueryForm from "../../components/QueryForm/QueryForm";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";

const QueryPage = () => {
  const { currentModelData } = useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);

    const renderMainContent = () => {
    if (!currentModelData || currentModelData.isLoading) return <LoadingComponent />;
    if (dendrogramData.loading) return <LoadingComponent />;
    if (dendrogramData.subDendrogram) return <Dendrogram />;
  };

  return (
    <>
      <aside id="asideForms">
        <ChangeModelForm />
        <QueryForm />
      </aside>
      <main id="mainContent">
        {renderMainContent()}
      </main>
    </>

  );
};

export default QueryPage;