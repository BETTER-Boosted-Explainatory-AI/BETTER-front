import React, { useContext } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import WhiteBoxTestingForm from "../../components/WhiteBoxTestingForm/WhiteBoxTestingForm";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import NewModelForm from "../../components/NewModelForm/NewModelForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";

import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";


const WhiteboxTestingPage = () => {
  const [sourceLabels, setSourceLabels] = React.useState([]);
  const [targetLabels, setTargetLabels] = React.useState([]);

  const { currentModelData, models, isModelsLoading } = useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);


  const onChangeSourceLabels = (labels) => {
    setSourceLabels(labels);
  }

  const onChangeTargetLabels = (labels) => {
    setTargetLabels(labels);
  }

  const renderForms = () => {
    if (currentModelData?.isLoading || isModelsLoading ) return <LoadingComponent />;
    if (!models.length) return <NewModelForm />;
    return (
      <>
        <ChangeModelForm />
        <WhiteBoxTestingForm sourceLabels={sourceLabels} targetLabels={targetLabels} onChangeSourceLabels={onChangeSourceLabels} onChangeTargetLabels={onChangeTargetLabels} />
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
      <main id="mainContent">{renderMainContent()}</main>
    </>

  );
}

export default WhiteboxTestingPage;