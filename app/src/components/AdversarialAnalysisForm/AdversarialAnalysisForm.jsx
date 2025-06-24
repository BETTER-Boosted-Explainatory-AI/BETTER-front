import React, { useContext, useState } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { ModelContext } from "../../contexts/ModelProvider";
import FileUpload from "../../components/FormComponents/FileUpload/FileUpload";
import { analyzeModel } from "../../apis/adversarial.api";
import SelectComponent from "../../components/FormComponents/SelectComponent/SelectComponent";
import { DetectorContext } from "../../contexts/DetectorProvider";
import Information from "../Information/Information";
import TitleComponent from "../TitleComponent/TitleComponent";
import ThreeDotsMenu from "../3DotsMenu/3DotsMenu";
import { DetectFormTitleContainer } from "../AdversarialDetectForm/AdversarialDetectForm.style";

const AdversarialAnalysisForm = ({ setImageAnalysed, setUsedAttack, loading, setLoading, setShowTrainForm, setChangeDetector, setShowDemonstration, setError, setShowError }) => {
  const { currentModelData } = useContext(ModelContext);
  const [image, setImage] = useState();
  const [attackType, setAttackType] = useState("");
  const { chosenDetector } = useContext(DetectorContext);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleAttackChange = (e) => {
    const selectedAttackType = e.target.value;
    setAttackType(selectedAttackType);
  };

  
  const showErrorWithTimeout = (msg) => {
    const details = msg && msg.includes(":") ? msg.split(":").pop().trim() : msg || "An error occurred"
    setError(details);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const attackTypes = [
    { value: "fgsm", label: "FGSM" },
    { value: "pgd", label: "PGD" },
    { value: "deepfool", label: "DeepFool" },
  ];

  const selectAttacks = attackTypes.map((attack) => ({
    value: attack.value,
    label: attack.label,
  }));

  const handleAnalyzeModel = async () => {
    const formData = new FormData();
    formData.append("current_model_id", currentModelData.model_id);
    formData.append("graph_type", currentModelData.graph_type);
    formData.append("image", image);
    formData.append("attack_type", attackType);
    formData.append("detector_filename", chosenDetector);

    setLoading(true);
    try {
      console.log("Analyzing model with form data:", formData);
      const result = await analyzeModel(formData);
      console.log("Model Analying result:", result);
      if (setImageAnalysed) setImageAnalysed(result);
      if (setUsedAttack) setUsedAttack(attackType);
    } catch (err) {
      const detail = err.response?.data?.detail;
      showErrorWithTimeout(detail);
      console.error("Error during model training:", err);
    } finally {
      setLoading(false);
    }
  };


  const DetectorMenuItems = [
    { label: "Change Detector" }, 
    { label: "Train new Detector" }
  ];

  const handleMenuItemClick = (item) => {
    if (item.label === "Train new Detector") {
      setShowTrainForm(true);
      setShowDemonstration(false);
      setChangeDetector(false);
    }
    if (item.label === "Change Detector") {
      setChangeDetector(true);
      setShowTrainForm(false);
      setShowDemonstration(false);
    }
  }

  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        title={"Attack Demonstration"}
        borderRadiusBottom="15"
        showTitle={false}
      >
      <DetectFormTitleContainer>
        <ThreeDotsMenu
          menuItems={DetectorMenuItems}
          onMenuItemClick={handleMenuItemClick}
          />
        <TitleComponent title="Attack Demonstration" />
        <Information text="Upload an image and pick an attack to see the effect of the attack on the model's decision." />
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
        <>
          <FormLabelComponent label="attack type" />
          <SelectComponent
            inputName="attack_type"
            inputLabel="Select attack type"
            handleChange={handleAttackChange}
            inputItems={selectAttacks}
            value={attackType}
          />
        </>
        <ButtonComponent
          label={"Analyze model"}
          onClickHandler={handleAnalyzeModel}
          loading={loading}
        />
      </FormContainer>
    </>
  );
};

export default AdversarialAnalysisForm;
