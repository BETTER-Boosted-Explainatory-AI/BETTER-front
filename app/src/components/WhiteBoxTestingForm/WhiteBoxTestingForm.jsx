import React, { useContext } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import MultipleSelect from "../../components/FormComponents/MultipleSelect/MultipleSelect";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";
import Box from "@mui/material/Box";

const WhiteBoxTestingForm = ({
  sourceLabels,
  targetLabels,
  onChangeSourceLabels,
  onChangeTargetLabels,
}) => {
  const { currentModelData } = useContext(ModelContext);
  const { labels } = currentModelData;

  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        borderRadiusBottom="15"
        title="White-Box Testing"
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.2em" }}>
          <FormLabelComponent label="Select source sub group" />
          <MultipleSelect
            inputName="sourceGroup"
            inputLabel="Ex: Forest, Maple Tree, ect"
            labels={labels}
            selectedLabels={sourceLabels}
            setSelectedLabels={onChangeSourceLabels}
          />
        </Box>
        <Box>
          <FormLabelComponent label="Select target sub group" />
          <MultipleSelect
            initValue="targetGroup"
            inputLabel="Ex: Man, Woman, ect"
            labels={labels}
            selectedLabels={targetLabels}
            setSelectedLabels={onChangeTargetLabels}
          />
        </Box>
        <ButtonComponent label="Test" />
      </FormContainer>
    </>
  );
};

export default WhiteBoxTestingForm;
