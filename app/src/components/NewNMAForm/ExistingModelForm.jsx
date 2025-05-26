import React from "react";
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
import SelectComponent from "../FormComponents/SelectComponent/SelectComponent";
import { FormSeperator } from "./NewNMAForm.style";

const ExistingModelForm = ({
  newModelData,
  handleChange,
  filteredModels,
  handleModelSelect,
  availableGraphTypes,
}) => {

  return (
    <>
      <FormSeperator>
        <FormLabelComponent label="model" />
        <SelectComponent
          inputName="model"
          inputLabel="Select model"
          handleChange={handleModelSelect}
          inputItems={filteredModels.map((m) => ({
            value: m.model_id,
            label: m.file_name,
          }))}
          value={newModelData.model || ""}
        />
      </FormSeperator>
      <FormSeperator>
        <FormLabelComponent label="analysis method" />
        <SelectComponent
          inputName="graphType"
          inputLabel="Select graph type"
          handleChange={handleChange}
          inputItems={
            availableGraphTypes && availableGraphTypes.length > 0
              ? availableGraphTypes.map((gt) => ({
                  value: gt,
                  label: gt,
                }))
              : []
          }
          value={newModelData.graphType || ""}
        />
      </FormSeperator>
    </>
  );
};

export default ExistingModelForm;
