import React, { useContext } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import ThreeDotsMenu from "../3DotsMenu/3DotsMenu";
import TitleComponent from "../TitleComponent/TitleComponent";
import SelectComponent from "../../components/FormComponents/SelectComponent/SelectComponent";
import { DetectFormTitleContainer } from "../AdversarialDetectForm/AdversarialDetectForm.style";
import { DetectorContext } from "../../contexts/DetectorProvider";

const ChangeDetectorForm = ({setShowTrainForm, setShowDetectForm, setChangeDetector, setShowDemonstration}) => {
  const { chosenDetector, setChosenDetector, detectorsList } = useContext(DetectorContext);

  const handleChangeDetector = (event) => {
    setChosenDetector(event.target.value);
  };

const DetectorMenuItems = [
    { label: setShowDemonstration ? "Attack Demonstration" : "Image Detection" },
    { label: "Train new Detector" }
  ];


const handleMenuItemClick = (item) => {
    if (item.label === "Train new Detector") {
      setShowTrainForm(true);
      if(setShowDetectForm) setShowDetectForm(false);
      setChangeDetector(false);
      if (setShowDemonstration) setShowDemonstration(false);
    }
    if (item.label === "Attack Demonstration" && setShowDemonstration) {
      setShowTrainForm(false);
      if (setShowDetectForm) setShowDetectForm(false);
      setChangeDetector(false);
      if (setShowDemonstration) setShowDemonstration(true);
    }
    if (item.label === "Image Detection") {
      setChangeDetector(false);
      setShowTrainForm(false);
      if (setShowDetectForm) setShowDetectForm(true);
    }
  };

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
        </DetectFormTitleContainer>
        <>
          <SelectComponent
            inputName="detector_name"
            inputLabel="Select detector"
            handleChange={handleChangeDetector}
            inputItems={detectorsList.map(det => ({ label: det, value: det }))}
            value={chosenDetector}
          />
        </>
      </FormContainer>
    </>
  );
};

export default ChangeDetectorForm;
