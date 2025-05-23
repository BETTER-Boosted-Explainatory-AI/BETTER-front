import React, { useState, useContext } from "react";
import FormContainer from "../FormContainer/FormContainer";
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import SelectComponent from "../FormComponents/SelectComponent/SelectComponent";
import { FormSeperator } from "./NewAnalasyseForm.style";
import { postNma } from "../../apis/nma.api";

const ExistingModelForm = ({models, newModelData, handleChange}) => {

  const filteredModels = models.filter((m) => (m.graphTypes?.length || 0) < 3);
  const graphTypes = ["similarity", "dissimilarity", "count"];




  return (
    <>
      <FormContainer title="Analyse Existing Model">
        <FormSeperator>
          <FormLabelComponent label="model" />
       <SelectComponent
          inputName="model"
          inputLabel="Select model"
          handleChange={handleModelChange}
          inputItems={filteredModels.map((m) => ({
            value: m.name,
            label: m.name,
          }))}
          value={selectedModelName}
        />
        </FormSeperator>
        <FormSeperator>
          <FormLabelComponent label="analysis method" />
        <SelectComponent
          inputName="graphType"
          inputLabel="Select graph type"
          handleChange={handleChange}
          inputItems={availableGraphTypes.map((gt) => ({
            value: gt,
            label: gt,
          }))}
          value={newModelData.graphType}
        />
        </FormSeperator>
        <ButtonComponent label="analyse" onClickHandler={handleSubmit} />
      </FormContainer>
    </>
  );
};

export default ExistingModelForm;
