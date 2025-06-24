import React, { useContext, useState, useCallback, useEffect } from "react";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";
import FormContainer from "../../components/FormContainer/FormContainer";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import LabelSelectionModal from "../LabelSelectionModal/LabelSelectionModal";

const SubDendrogramForm = ({ loading, setLoading }) => {
  const { currentModelData } = useContext(ModelContext);
  const { labels } = currentModelData;

  const { dendrogramData, setSelectedLabels } = useContext(DendrogramContext);
  const { selectedLabels } = dendrogramData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedLabels, setClickedLabels] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("Please select at least one label.");

  const maxLabels = 35;
  const formInfo = "Select labels to visualize the sub-dendrogram";

  useEffect(() => {
    if (isModalOpen) {
      setClickedLabels(selectedLabels);
    }
  }, [isModalOpen, selectedLabels]);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onCardClick = useCallback((label) => {
    setClickedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (clickedLabels.length === 0) {
      setShowAlert(true);
      setSeverity("error");
      setMessage("Please select at least one label.");
      return;
    }

    if (clickedLabels.length > maxLabels) {
      setShowAlert(true);
      setSeverity("error");
      setMessage(`Please select less than ${maxLabels} labels.`);
      return;
    }

    handleModalClose();
    setLoading(true);
    await setSelectedLabels(clickedLabels);
    setLoading(false);
  };

  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        borderRadiusBottom="15"
        title="Change Labels in Dendrogram"
        formInfo={formInfo}
      >
        <ButtonComponent
          label={"Select"}
          onClickHandler={handleModalOpen}
          loading={loading}
        />
      </FormContainer>
      {isModalOpen && (
        <LabelSelectionModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title="Select labels"
          labels={labels}
          selectedLabels={clickedLabels}
          onLabelToggle={onCardClick}
          maxLabels={maxLabels}
          showAlert={showAlert}
          alertSeverity={severity}
          alertMessage={message}
          onAlertClose={() => setShowAlert(false)}
          onSubmit={handleSubmit}
          submitButtonLabel="Select"
          showBackButton={false}
        />
      )}
    </>
  );
};

export default SubDendrogramForm;
