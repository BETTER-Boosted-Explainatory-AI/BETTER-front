import React, { useContext, useEffect } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import SubDendrogramForm from "../../components/SubDendrogramForm/SubDendrogramForm";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import NewModelForm from "../../components/NewModelForm/NewModelForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { fetchModels } from '../../apis/models.api';

const HomePage = () => {
  // Use the context, not the provider component
  const { currentModelData } = useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);
  const [models, setModels] = React.useState([]);


  const renderForms = () => {
      if (currentModelData?.isLoading) return <LoadingComponent />;
      if (!models.length) return <NewModelForm />;
      return (
        <>
          <ChangeModelForm models={models} />
          <SubDendrogramForm />
        </>
      );
    };
    

  const renderMainContent = () => {
    if (!currentModelData || currentModelData.isLoading) return <LoadingComponent />;
    if (dendrogramData.loading) return <LoadingComponent />;
    if (dendrogramData.subDendrogram) return <Dendrogram />;
    return <BetterExplanation />;
  };
  
  return (
    <>
      <aside id="asideForms">{renderForms()}</aside>
      <main id="mainContent">{renderMainContent()}</main>
    </>
  );
};

export default HomePage;
