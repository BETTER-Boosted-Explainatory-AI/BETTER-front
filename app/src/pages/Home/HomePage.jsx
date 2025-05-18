import React, { useContext, useEffect } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import SubDendrogramForm from "../../components/SubDendrogramForm/SubDendrogramForm";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import NewModelForm from "../../components/NewModelForm/NewModelForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { sendTokenToBackend } from "../../apis/auth.api"; 

const HomePage = () => {
  // Use the context, not the provider component
  const { currentModelData } = useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);

  useEffect(() => {
    sendTokenToBackend();
  }, []);

  const renderForms = () => {
    if (currentModelData?.isLoading) return <LoadingComponent />;
    return currentModelData ? (
      <>
        <ChangeModelForm />
        <SubDendrogramForm />
      </>
    ) : (
      <NewModelForm />
    );
  };

  const renderMainContent = () => {
    if (!currentModelData || currentModelData.isLoading) return <LoadingComponent />;
    if (dendrogramData.loading) return <LoadingComponent />;
    if (dendrogramData.subDendrogram) return <Dendrogram data={dendrogramData.subDendrogram} />;
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
