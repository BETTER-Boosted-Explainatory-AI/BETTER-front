import React, { useContext, useState } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { ModelContext } from "../../contexts/ModelProvider";
import FileUpload from "../../components/FormComponents/FileUpload/FileUpload";
import { detectorGenerator } from "../../apis/adversarial.api";
import Information from "../Information/Information";
import TitleComponent from "../TitleComponent/TitleComponent";
import ThreeDotsMenu from "../3DotsMenu/3DotsMenu";
import { DetectFormTitleContainer } from "../AdversarialDetectForm/AdversarialDetectForm.style";
import { DetectorContext } from "../../contexts/DetectorProvider";


const AdversarialAttackForm = ({ setShowTrainForm, setShowDetectForm, setChangeDetector, loading, setLoading, setShowDemonstration, setError, setShowError }) => {
  const { currentModelData } = useContext(ModelContext);
  const { refreshDetectorsList } = useContext(DetectorContext);
  const [cleanFiles, setCleanFiles] = useState([]);
  const [attackedFiles, setAttackedFiles] = useState([]);

  const handleCleanChange = (e) => setCleanFiles([...e.target.files]);
  const handleAttackedChange = (e) => setAttackedFiles([...e.target.files]);

  const showErrorWithTimeout = (msg) => {
    const details = msg && msg.includes(":") ? msg.split(":").pop().trim() : msg || "An error occurred"
    setError(details);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const handleTrainModel = async () => {
    const formData = new FormData();
    formData.append("current_model_id", currentModelData.model_id);
    formData.append("graph_type", currentModelData.graph_type);

    cleanFiles.forEach(file => formData.append("clean_images", file));
    attackedFiles.forEach(file => formData.append("adversarial_images", file));

    setLoading(true);
    try {
      console.log("Training model with form data:", formData);
      const result = await detectorGenerator(formData);
      console.log("Model training result:", result);
      await refreshDetectorsList();
    } catch (err) {
      console.error("Error during model training:", err);
      const detail = err.response?.data?.detail;
      showErrorWithTimeout(detail);
    } finally {
      setLoading(false);
    }
  };

  const DetectorMenuItems = [
    { label: "Change Detector" }, 
    { label: setShowDemonstration ? "Attack Demonstration" : "Image Detection" }
  ];

  const handleMenuItemClick = (item) => {
  if (item.label === "Image Detection") {
    setShowTrainForm(false);
    if (setShowDetectForm) setShowDetectForm(true);
    setChangeDetector(false);
  }
  if (item.label === "Change Detector") {
    setChangeDetector(true);
    setShowTrainForm(false);
    if (setShowDetectForm) setShowDetectForm(false);
    if (setShowDemonstration) setShowDemonstration(false);
  }
  if (item.label === "Attack Demonstration" && setShowDemonstration) {
    setShowTrainForm(false);
    if (setShowDetectForm) setShowDetectForm(false);
    setChangeDetector(false);
    if (setShowDemonstration) setShowDemonstration(true);
  }
};

  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        title={"Train Detector Model"}
        borderRadiusBottom="15"
        showTitle={false}
      >
        <DetectFormTitleContainer>
        <ThreeDotsMenu
          menuItems={DetectorMenuItems}
          onMenuItemClick={handleMenuItemClick}
          />
        <TitleComponent title="Train Detector Model" />
        <Information text="Upload Authentic and attacked images to train the adversarial attack detector. Recommanded 30+ examples each for good performance." />
        </DetectFormTitleContainer>
        <>
          <FormLabelComponent label="Authentic Images" />
          <FileUpload inputName="clean_images" fileType={".npy"} allowMultiple={true} handleFileChange={handleCleanChange} files={cleanFiles}/>
        </>
        <>
          <FormLabelComponent label="Attacked Images" />
          <FileUpload inputName="adversarial_images" fileType={".npy"} allowMultiple={true} handleFileChange={handleAttackedChange} files={attackedFiles}/>
        </>
         <ButtonComponent
            label={loading ? "Training.." : "Train model"}
            onClickHandler={handleTrainModel}
            disabled={loading}
          />
      </FormContainer>
    </>
  );
};

export default AdversarialAttackForm;
