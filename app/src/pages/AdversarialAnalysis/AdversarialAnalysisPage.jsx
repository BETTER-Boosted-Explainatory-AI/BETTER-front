import React, { useContext, useState, useEffect } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import AlertComponent from "../../components/AlertComponent/AlertComponent";

import NewNMAForm from "../../components/NewNMAForm/NewNMAForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import AdversarialAnalysisForm from "../../components/AdversarialAnalysisForm/AdversarialAnalysisForm";
import AdversarialAttackForm from "../../components/AdversarialAttackForm/AdversarialAttackForm";
import ChangeDetectorForm from "../../components/ChangeDetectorForm/ChangeDetectorForm";
import ImageAnalysisResult from "../../components/ImageAnalysisResult/ImageAnalysisResult";

import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";

const AdversarialAnalysisPage = () => {
  const { currentModelData, models, isModelsLoading } =
    useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);
  const [imageAnalysed, setImageAnalysed] = useState(null);
  const [usedAttack, setUsedAttack] = useState("");
  const [showTrainForm, setShowTrainForm] = useState(false);
  const [changeDetector, setChangeDetector] = useState(false);
  const [showDemonstration, setShowDemonstration] = useState(true);
  const [loading, setLoading] = useState(false);

  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "info",
    message: "",
  });

  const onCloseAlert = () => {
    setAlertData((prev) => ({
      ...prev,
      showAlert: false,
      message: "",
    }));
  };

  const handleAlert = (severity, message) => {
    setAlertData({
      showAlert: true,
      severity,
      message,
    });
    console.log("Alert triggered:", alertData);
  };

  useEffect(() => {
    setImageAnalysed(null);
  }, [currentModelData.model_id, currentModelData.graph_type]);

  const renderForms = () => {
    if (currentModelData?.isLoading || isModelsLoading)
      return <LoadingComponent />;
    if (!models.length) return <NewNMAForm />;
    return (
      <>
        <ChangeModelForm />
        {showDemonstration && (
          <AdversarialAnalysisForm
            setImageAnalysed={setImageAnalysed}
            setUsedAttack={setUsedAttack}
            loading={loading}
            setLoading={setLoading}
            setShowTrainForm={setShowTrainForm}
            setChangeDetector={setChangeDetector}
            setShowDemonstration={setShowDemonstration}
            handleAlert={handleAlert}
            onCloseAlert={onCloseAlert}
          />
        )}
        {showTrainForm && (
          <AdversarialAttackForm
            setShowTrainForm={setShowTrainForm}
            setShowDemonstration={setShowDemonstration}
            setChangeDetector={setChangeDetector}
            loading={loading}
            setLoading={setLoading}
            handleAlert={handleAlert}
            onCloseAlert={onCloseAlert}
          />
        )}
        {changeDetector && (
          <ChangeDetectorForm
            setShowTrainForm={setShowTrainForm}
            setShowDemonstration={setShowDemonstration}
            setChangeDetector={setChangeDetector}
            loading={loading}
            setLoading={setLoading}
            handleAlert={handleAlert}
            onCloseAlert={onCloseAlert}
          />
        )}
        {alertData.showAlert && (
          <AlertComponent
            severity={alertData.severity}
            message={alertData.message}
            onClose={onCloseAlert}
          />
        )}{" "}
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
    if (currentModelData.isLoading || dendrogramData.loading)
      return <LoadingComponent />;
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
