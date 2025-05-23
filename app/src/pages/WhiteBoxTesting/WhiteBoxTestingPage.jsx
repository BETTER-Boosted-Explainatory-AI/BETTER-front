import React, { useContext, useState, useCallback } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import WhiteBoxTestingForm from "../../components/WhiteBoxTestingForm/WhiteBoxTestingForm";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import NewModelForm from "../../components/NewAnalyseForm/NewModelForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import WhiteBoxTestingResult from "../../components/WhiteBoxTestingResult/WhiteBoxTestingResult";
import { postWhiteBoxTesting } from "../../apis/whiteBoxTesting.api";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";
import { WhiteBoxTestingContext } from "../../contexts/WhiteBoxTestingProvider";

const WhiteboxTestingPage = () => {
  const { currentModelData, models, isModelsLoading } =
    useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);
  const {
    formData,
    updateAlertData,
    resetAlertData,
  } = useContext(WhiteBoxTestingContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wbtResult, setwbtResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const maxLabels = 10;

  const handleModalOpen = useCallback(() => {
    console.log("Modal open triggered");
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
      setwbtResult(res);
      resetAlertData();
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
    if (!models.length) return <NewModelForm />;
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
        />
      </>
    );
  };

  const renderMainContent = () => {
    if (wbtResult && wbtResult.length > 0) {
      return (
        <>
          <WhiteBoxTestingResult wbtResult={wbtResult} />
        </>
      );
    }
    if (currentModelData.isLoading || isLoading) return <LoadingComponent />;
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

export default WhiteboxTestingPage;
