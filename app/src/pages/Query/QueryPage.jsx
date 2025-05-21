import React, { useContext } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import QueryForm from "../../components/QueryForm/QueryForm";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import NewModelForm from "../../components/NewModelForm/NewModelForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";

import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";

const QueryPage = () => {
  const { currentModelData, models, isModelsLoading } = useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);

  const renderForms = () => {
    if (currentModelData?.isLoading || isModelsLoading ) return <LoadingComponent />;
    if (!models.length) return <NewModelForm />;
    return (
      <>
        <ChangeModelForm />
        <QueryForm />
      </>
    );
  };
  
  const renderMainContent = () => {
    if (currentModelData.isLoading) return <LoadingComponent />;
    if (dendrogramData.loading) return <LoadingComponent />;
    if (dendrogramData.subDendrogram) return <Dendrogram />;
    return <BetterExplanation />;
  };
  return (
    <>
      <aside id="asideForms">
        {renderForms()}
      </aside>
      <main id="mainContent">
        {renderMainContent()}
      </main>
    </>

  );
};

export default QueryPage;