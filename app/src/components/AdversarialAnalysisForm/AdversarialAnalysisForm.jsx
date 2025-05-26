import React, { useContext, useState } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { ModelContext } from "../../contexts/ModelProvider";
import FileUpload from "../../components/FormComponents/FileUpload/FileUpload";
import { analyzeModel } from "../../apis/adversarial.api";
import SelectComponent from "../../components/FormComponents/SelectComponent/SelectComponent";

const AdversarialAnalysisForm = ({ setImageAnalysed, setUsedAttack }) => {
  const { currentModelData } = useContext(ModelContext);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [attackType, setAttackType] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleAttackChange = (e) => {
    const selectedAttackType = e.target.value;
    setAttackType(selectedAttackType);
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

    setLoading(true);
    try {
      console.log("Analyzing model with form data:", formData);
      const result = await analyzeModel(formData);
      console.log("Model Analying result:", result);
      if (setImageAnalysed) setImageAnalysed(result);
      if (setUsedAttack) setUsedAttack(attackType);
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
        title={"Model Analysis"}
        borderRadiusBottom="15"
      >
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
          label={loading ? "Analyzing.." : "Analyze model"}
          onClickHandler={handleAnalyzeModel}
          disabled={loading}
        />
      </FormContainer>
    </>
  );
};

export default AdversarialAnalysisForm;
