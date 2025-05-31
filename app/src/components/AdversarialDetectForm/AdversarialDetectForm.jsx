import React, { useContext, useState } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { ModelContext } from "../../contexts/ModelProvider";
import FileUpload from "../../components/FormComponents/FileUpload/FileUpload";
import { imageDetection } from "../../apis/adversarial.api";
import ThreeDotsMenu from "../3DotsMenu/3DotsMenu";
import TitleComponent from "../TitleComponent/TitleComponent";
import { DetectFormTitleContainer } from "./AdversarialDetectForm.style";
import Information from "../Information/Information";

const AdversarialDetectForm = ({ setImageDetected, loading, setLoading }) => {
  const { currentModelData } = useContext(ModelContext);
  const [image, setImage] = useState();

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
      setImageDetected(result);
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
        showTitle={false}
      >
        <DetectFormTitleContainer>
          <ThreeDotsMenu
            menuItems={[{ label: "Delete Detector" }]}
            onMenuItemClick={console.log("deleting detector")}
          />
          <TitleComponent title="Image Detection" />
          <Information text="Upload an image to detect adversarial attacks. The model will analyze the image and return the detection results." />
        </DetectFormTitleContainer>
        <>
          <FormLabelComponent label="Test Image" />
          <FileUpload
            inputName="image"
            fileType={"image/*"}
            allowMultiple={false}
            handleFileChange={handleImageChange}
            files={image}
          />
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
