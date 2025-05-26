import React, { useContext, useState } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

import NewAnalyseForm from "../../components/NewNMAForm/NewNMAForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import AdversarialAnalysisForm from "../../components/AdversarialAnalysisForm/AdversarialAnalysisForm";
import ImageAnalysisResult from "../../components/ImageAnalysisResult/ImageAnalysisResult";

import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";

const AdversarialAnalysisPage = () => {
  const { currentModelData, models, isModelsLoading } =
  useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);
  const [imageAnalysed, setImageAnalysed] = useState(null);
  const [usedAttack, setUsedAttack] = useState("");

  const renderForms = () => {
    if (currentModelData?.isLoading || isModelsLoading)
      return <LoadingComponent />;
    if (!models.length) return <NewAnalyseForm />;
    return (
      <>
        <ChangeModelForm />
        <AdversarialAnalysisForm
          setImageAnalysed={setImageAnalysed}
          setUsedAttack={setUsedAttack}
        />
      </>
    );
  };

  const renderMainContent = () => {
    if (imageAnalysed) {
      return (
        <ImageAnalysisResult
          analyzedImage={imageAnalysed}
          attackName={usedAttack}
        />
      );
    }
    if (currentModelData.isLoading) return <LoadingComponent />;
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

export default AdversarialAnalysisPage;
