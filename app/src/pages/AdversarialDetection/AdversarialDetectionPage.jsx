import React, { useContext, useState, useEffect } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import AdversarialAttackForm from "../../components/AdversarialAttackForm/AdversarialAttackForm";
import NewAnalyseForm from "../../components/NewNMAForm/NewNMAForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import AdversarialDetectForm from "../../components/AdversarialDetectForm/AdversarialDetectForm";
import DetectionResult from "../../components/DetectionResult/DetectionResult";
import ChangeDetectorForm from "../../components/ChangeDetectorForm/ChangeDetectorForm";

import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";

const AdversarialDetectionPage = () => {
  const { currentModelData, models, isModelsLoading } = useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);
  const [showDetectForm, setShowDetectForm] = useState(true);
  const [showTrainForm, setShowTrainForm ] = useState(false);
  const [changeDetector, setChangeDetector] = useState(false);
  const [imageDetected, setImageDetected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImageDetected(false);
  }, [currentModelData.model_id, currentModelData.graph_type]);

  const renderForms = () => {
    if (currentModelData?.isLoading || isModelsLoading)
      return <LoadingComponent />;
    if (!models.length) return <NewAnalyseForm />;
    return (
      <>
        <ChangeModelForm />
        {showTrainForm && <AdversarialAttackForm setShowTrainForm={setShowTrainForm} setShowDetectForm={setShowDetectForm} setChangeDetector={setChangeDetector} loading={loading} setLoading={setLoading}/>}
        {showDetectForm && <AdversarialDetectForm setImageDetected={setImageDetected} setShowTrainForm={setShowTrainForm} setShowDetectForm={setShowDetectForm} setChangeDetector={setChangeDetector} loading={loading} setLoading={setLoading}/>}
        {changeDetector && <ChangeDetectorForm setShowTrainForm={setShowTrainForm} setShowDetectForm={setShowDetectForm} setChangeDetector={setChangeDetector} loading={loading} setLoading={setLoading}/>}
      </>
    );
  };


  const renderMainContent = () => {
    if (imageDetected) {
      return (
      <DetectionResult
      detectionResult={imageDetected.result}
      imageUrl={imageDetected.image}
      topPredictions={imageDetected.predictions}
      probability={imageDetected.probability} />)
      ;
    }
    if (currentModelData.isLoading || dendrogramData.loading || loading) return <LoadingComponent />;
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

export default AdversarialDetectionPage;
