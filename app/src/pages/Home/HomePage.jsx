import React, { useContext } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import SubDendrogramForm from "../../components/SubDendrogramForm/SubDendrogramForm";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import NewAnalyseForm from "../../components/NewNMAForm/NewNMAForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const HomePage = () => {
  const { currentModelData, models, isModelsLoading } = useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);
  const [loading, setLoading] = React.useState(false);

  const renderForms = () => {
      if (currentModelData?.isLoading || isModelsLoading ) return <LoadingComponent />;
      if (!models.length) return <NewAnalyseForm />;
      return (
        <>
          <ChangeModelForm models={models}/>
          <SubDendrogramForm loading={loading} setLoading={setLoading} />
        </>
      );
    };
    

  const renderMainContent = () => {
    if (currentModelData.isLoading || loading || dendrogramData.loading) return <LoadingComponent />;
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
