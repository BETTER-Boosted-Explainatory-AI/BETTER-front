import React, { useContext, useState } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
// import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";
import FileUpload from "../../components/FormComponents/FileUpload/FileUpload";
import { imageDetection } from "../../apis/adversarial.api";


const AdversarialDetectForm = () => {
  const { currentModelData } = useContext(ModelContext);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
        setImage(e.target.files[0]);
    }
    };

  const handleImageDetection = async () => {
    const formData = new FormData();
    formData.append("current_model_id", currentModelData.model_id);
    formData.append("graph_type", currentModelData.graph_type);
    formData.append("image", image);

    setLoading(true);
    try {
      console.log("Detecting image with data:", formData);
      const result = await imageDetection(formData);
      console.log("Detection result:", result);
    } catch (err) {
      console.error("Error during image detection:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        title={"Image detection"}
        borderRadiusBottom="15"
      >
        <>
          <FormLabelComponent label="Test Image" />
          <FileUpload name="image" fileType={"image/*"} allowMultiple={false} onChange={handleImageChange}/>
        </>
         <ButtonComponent
            label={loading ? "Detecting.." : "Detect"}
            onClickHandler={handleImageDetection}
            disabled={loading}
          />
      </FormContainer>
    </>
  );
};

export default AdversarialDetectForm;
