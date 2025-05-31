import React, { useContext, useState } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { ModelContext } from "../../contexts/ModelProvider";
import { analyzeModel } from "../../apis/adversarial.api";
import ThreeDotsMenu from "../3DotsMenu/3DotsMenu";
import TitleComponent from "../TitleComponent/TitleComponent";
import SelectComponent from "../../components/FormComponents/SelectComponent/SelectComponent";
import { DetectFormTitleContainer } from "../AdversarialDetectForm/AdversarialDetectForm.style";

const ChangeDetectorForm = ({setShowTrainForm, setShowDetectForm, setChangeDetector}) => {
  const { currentModelData } = useContext(ModelContext);

  const [chosenDetector, setChosenDetector] = useState("");
    const [loading, setLoading] = useState(false);

  const handleChangeDetector = async () => {
  };

const DetectorMenuItems = [
    { label: "Image Detection" }, 
    { label: "Train new Detector" }
  ];

const handleMenuItemClick = (item) => {
    if (item.label === "Train new Detector") {
      setShowTrainForm(true);
      setShowDetectForm(false);
      setChangeDetector(false);
    }
    if (item.label === "Image Detection") {
      setChangeDetector(false);
      setShowTrainForm(false);
      setShowDetectForm(true);
    }
  };

  const detectors = [ "logistic_regression", "decision_tree", "random_forest", "svm", "xgboost" ];

  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        title={"Change Detector"}
        borderRadiusBottom="15"
        showTitle={false}
      >
        <DetectFormTitleContainer>
          <ThreeDotsMenu
            menuItems={DetectorMenuItems}
            onMenuItemClick={handleMenuItemClick}
          />
          <TitleComponent title="Change Detector" />
          {/* <Information text="Upload an image to detect adversarial attacks. The model will analyze the image and return the detection results." /> */}
        </DetectFormTitleContainer>
        <>
          {/* <FormLabelComponent label="Detectors" /> */}
          <SelectComponent
            inputName="detector_name"
            inputLabel="Select Detector"
            handleChange={handleChangeDetector}
            inputItems={detectors}
            value={chosenDetector}
          />
        </>
        <ButtonComponent
          label={loading ? "Changing.." : "Change Detector"}
          onClickHandler={handleChangeDetector}
          disabled={loading}
        />
      </FormContainer>
    </>
  );
};

export default ChangeDetectorForm;
