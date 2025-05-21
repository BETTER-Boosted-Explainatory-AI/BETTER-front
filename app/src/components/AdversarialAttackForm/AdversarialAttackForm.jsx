import React, { useContext, useState } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";
import FileUpload from "../../components/FormComponents/FileUpload/FileUpload";
import { detectorGenerator } from "../../apis/adversarial.api";


const AdversarialAttackForm = () => {
  const { currentModelData } = useContext(ModelContext);
  const [cleanFiles, setCleanFiles] = useState([]);
  const [attackedFiles, setAttackedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        borderRadiusBottom="15"
      >
        <>
          <FormLabelComponent label="Clean Images" />
          <FileUpload name="clean_images" fileType={"image/*"} allowMultiple={true} onChange={handleCleanChange}/>
        </>
        <>
          <FormLabelComponent label="attacked Images" />
          <FileUpload name="adversarial_images" fileType={"image/*"} allowMultiple={true} onChange={handleAttackedChange}/>
        </>
        {/* <ButtonComponent label="train model" onClickHandler={handleTrainModel} />
         */}
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
