import React, { useContext } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import MultipleSelect from "../../components/FormComponents/MultipleSelect/MultipleSelect";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { DatasetContext } from "../../contexts/DatasetProvider";

const SubDendrogramForm = () => {
  const {
    labels,
  } = useContext(DatasetContext);
  
  const {
    handleLabelsChange,
    selectedLabels,
  } = useContext(DendrogramContext);

  const inputLabel = "Labels";


  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        borderRadiusBottom="15"
      >
        <FormLabelComponent label="Select labels" />
        <MultipleSelect inputLabel={inputLabel} labels={labels} selectedLabels={selectedLabels} setSelectedLabels={handleLabelsChange} />
        <ButtonComponent label="Change" />
      </FormContainer>
    </>
  );
};

export default SubDendrogramForm;
