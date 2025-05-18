import React, { useContext } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import WhiteBoxTestingForm from "../../components/WhiteBoxTestingForm/WhiteBoxTestingForm";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";


const WhiteboxTestingPage = () => {
  const [sourceLabels, setSourceLabels] = React.useState([]);
  const [targetLabels, setTargetLabels] = React.useState([]);

  const { currentModelData } = useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);


  const onChangeSourceLabels = (labels) => {
    setSourceLabels(labels);
  }

  const onChangeTargetLabels = (labels) => {
    setTargetLabels(labels);
  }

  
  const renderMainContent = () => {
    if (!currentModelData || currentModelData.isLoading) return <LoadingComponent />;
    if (dendrogramData.loading) return <LoadingComponent />;
    if (dendrogramData.subDendrogram) return <Dendrogram />;
  };

  return (
    <>
      <aside id="asideForms">
        <ChangeModelForm />
        <WhiteBoxTestingForm sourceLabels={sourceLabels} targetLabels={targetLabels} onChangeSourceLabels={onChangeSourceLabels} onChangeTargetLabels={onChangeTargetLabels} />
      </aside>
      <main id="mainContent">{renderMainContent()}</main>
    </>

  );
}

export default WhiteboxTestingPage;