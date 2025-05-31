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


const AdversarialAttackForm = ({ setShowTrainForm, setShowDetectForm, setChangeDetector,loading, setLoading }) => {
  const { currentModelData } = useContext(ModelContext);
  const [cleanFiles, setCleanFiles] = useState([]);
  const [attackedFiles, setAttackedFiles] = useState([]);

  const handleCleanChange = (e) => setCleanFiles([...e.target.files]);
  const handleAttackedChange = (e) => setAttackedFiles([...e.target.files]);

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
    } catch (err) {
      console.error("Error during model training:", err);
    } finally {
      setLoading(false);
    }
  };

  const DetectorMenuItems = [
    { label: "Change Detector" }, 
    { label: "Image Detection" }
  ];

  const handleMenuItemClick = (item) => {
  if (item.label === "Image Detection") {
    setShowTrainForm(false);
    setShowDetectForm(true);
    setChangeDetector(false);
  }
  if (item.label === "Change Detector") {
    setChangeDetector(true);
    setShowTrainForm(false);
    setShowDetectForm(false);
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
        <Information text="Upload Authentic and attacked images to train the adversarial attack detector. The model will analyze the images and generate a detector." />
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
