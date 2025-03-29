import React, { useContext } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import MultipleSelect from "../../components/FormComponents/MultipleSelect/MultipleSelect";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { DendrogramContext } from "../../contexts/DendrogramProvider";

const SubDendrogramForm = () => {
      const {
        dataset,
        selectedLabels,
        handleLabelsChange,
        handleSubDendrogramChange,
      } = useContext(DendrogramContext);
    
  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        borderRadiusBottom="15"
      >
        <FormLabelComponent label="Select labels" />
        <MultipleSelect />
        <ButtonComponent label="Change" />
      </FormContainer>
    </>
  );
};

export default SubDendrogramForm;
