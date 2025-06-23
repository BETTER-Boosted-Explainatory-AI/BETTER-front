import React, { useContext, useState, useCallback, useEffect } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import WhiteBoxTestingForm from "../../components/WhiteBoxTestingForm/WhiteBoxTestingForm";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import NewAnalyseForm from "../../components/NewNMAForm/NewNMAForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import WhiteBoxTestingResult from "../../components/WhiteBoxTestingResult/WhiteBoxTestingResult";
import AlertComponent from "../../components/AlertComponent/AlertComponent";

import { postWhiteBoxTesting } from "../../apis/whiteBoxTesting.api";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";
import { WhiteBoxTestingContext } from "../../contexts/WhiteBoxTestingProvider";

const WhiteboxTestingPage = () => {
  const { currentModelData, models, isModelsLoading } =
    useContext(ModelContext);
  const { dendrogramData, dendrogramError } = useContext(DendrogramContext);
  const { formData, updateAlertData, resetAlertData, resetFormData } =
    useContext(WhiteBoxTestingContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wbtResult, setwbtResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [correctedLabels, setCorrectedLabels] = useState({
    sourceLabels: [],
    targetLabels: [],
  });
  const maxLabels = 10;

  useEffect(() => {
    setwbtResult(null);
  }, [currentModelData.model_id, currentModelData.graph_type]);

  const handleModalOpen = useCallback(() => {
    console.log("Modal open triggered");
    resetFormData();
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    console.log("Modal close triggered");
    setIsModalOpen(false);
  }, []);

  const isMissingLabels = () =>
    formData.sourceLabels.length === 0 || formData.targetLabels.length === 0;

  const isOverLimit = () =>
    formData.sourceLabels.length > maxLabels ||
    formData.targetLabels.length > maxLabels;

  const hasOverlap = () =>
    formData.sourceLabels.some((label) =>
      formData.targetLabels.includes(label)
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setwbtResult(null);
    if (isMissingLabels()) {
      updateAlertData(true, "error", "Please select at least one label.");
      return;
    }

    if (isOverLimit()) {
      updateAlertData(
        true,
        "error",
        `You can only select up to ${maxLabels} labels.`
      );
      return;
    }

    if (hasOverlap()) {
      updateAlertData(
        true,
        "error",
        "Source and target labels must not overlap."
      );
      return;
    }

    let formDataToSend = {
      model_id: currentModelData.model_id,
      graph_type: currentModelData.graph_type,
      source_labels: formData.sourceLabels,
      target_labels: formData.targetLabels,
    };
    try {
      setIsLoading(true);
      handleModalClose();
      const res = await postWhiteBoxTesting(formDataToSend);
      setCorrectedLabels(formData);
      setwbtResult(res);
      resetAlertData();
      setIsLoading(false);
    } catch (error) {
      console.error("Error in handleSubmit:", error);

      updateAlertData(
        true,
        "error",
        "An error occurred while preparing the data."
      );
      return;
    } finally {
      setIsLoading(false);
    }
  };
  const renderForms = () => {
    if (currentModelData?.isLoading || isModelsLoading)
      return <LoadingComponent />;
    if (!models.length) return <NewAnalyseForm />;
    return (
      <>
        <ChangeModelForm />
        <WhiteBoxTestingForm
          maxLabels={maxLabels}
          handleCloseAlert={resetAlertData}
          handleSubmit={handleSubmit}
          isModalOpen={isModalOpen}
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
          setwbtResult={setwbtResult}
          loading={isLoading}
        />
      </>
    );
  };

  const renderMainContent = () => {
    if (Array.isArray(wbtResult)) {
      return (
        <>
          <WhiteBoxTestingResult
            wbtResult={wbtResult}
            correctedLabels={correctedLabels}
          />
        </>
      );
    }

    if (currentModelData.isLoading || dendrogramData.loading || isLoading)
      return <LoadingComponent />;
    if (dendrogramData.subDendrogram) return <Dendrogram />;
    if (dendrogramError) {
      return (
        <AlertComponent
          severity="error"
          message={dendrogramError}
          onClose={() => {}} // Optionally add a handler to clear error
        />
      );
    }
    return <BetterExplanation />;
  };

  return (
    <>
      <aside id="asideForms">{renderForms()}</aside>
      <main id="mainContent">{renderMainContent()}</main>
    </>
  );
};

export default WhiteboxTestingPage;
