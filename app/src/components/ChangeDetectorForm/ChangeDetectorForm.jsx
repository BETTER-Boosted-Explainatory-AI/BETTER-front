import React, { useContext, useState, useEffect } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import { ModelContext } from "../../contexts/ModelProvider";
import ThreeDotsMenu from "../3DotsMenu/3DotsMenu";
import TitleComponent from "../TitleComponent/TitleComponent";
import SelectComponent from "../../components/FormComponents/SelectComponent/SelectComponent";
import { DetectFormTitleContainer } from "../AdversarialDetectForm/AdversarialDetectForm.style";
import { DetectorContext } from "../../contexts/DetectorProvider";

const ChangeDetectorForm = ({setShowTrainForm, setShowDetectForm, setChangeDetector, DetectorsList}) => {
  const { currentModelData } = useContext(ModelContext);
  const { chosenDetector, setChosenDetector } = useContext(DetectorContext);

  // const [DetectorsList, setDetectorsList] = useState([]);
  // const [chosenDetector, setChosenDetector] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchDetectors = async () => {
  //     try {
  //       const detectors = await getDetectorList(currentModelData.model_id, currentModelData.graph_type);
  //       setDetectorsList(detectors);
  //       console.log("Fetched Detectors:", detectors);
  //     } catch (error) {
  //       setDetectorsList([]);
  //     }
  //   };
  //   fetchDetectors();
  // }, [currentModelData.model_id, currentModelData.graph_type]);


  const handleChangeDetector = (event) => {
    setChosenDetector(event.target.value);
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
            inputItems={DetectorsList.map(det => ({ label: det, value: det }))}
            value={chosenDetector}
          />
        </>
        {/* <ButtonComponent
          label={loading ? "Changing.." : "Change"}
          onClickHandler={handleChangeDetector}
          disabled={loading}
        /> */}
      </FormContainer>
    </>
  );
};

export default ChangeDetectorForm;
