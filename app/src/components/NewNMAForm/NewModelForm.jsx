import React from "react";
import FileUpload from "../FormComponents/FileUpload/FileUpload";
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
import RadioComponent from "../FormComponents/RadioComponent/RadioComponent";
import SliderComponent from "../FormComponents/SliderComponent/SliderComponent";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import SelectComponent from "../FormComponents/SelectComponent/SelectComponent";
import { FormSeperator, ExplainableParagraph } from "./NewNMAForm.style";

const NewModelForm = ({ newModelData, graphTypes, handleChange }) => {
  return (
    <>
      <FormSeperator>
        <FormLabelComponent label="Dataset" />
        <ExplainableParagraph>
          Which dataset was used to train the model?
        </ExplainableParagraph>
        <RadioComponent
          inputName="dataset"
          value={newModelData.dataset}
          handleChange={handleChange}
        >
          <FormControlLabel
            value="imagenet"
            control={<Radio />}
            label="Mini-ImageNet"
          />
          <FormControlLabel
            value="cifar100"
            control={<Radio />}
            label="CIFAR-100"
          />
        </RadioComponent>
      </FormSeperator>
      <FormSeperator>
        <FormLabelComponent label="First Prediction Confidence" />
        <ExplainableParagraph>
          Include predictions with confidence above:
        </ExplainableParagraph>
        <SliderComponent
          inputName="confidence"
          minValue={70}
          maxValue={95}
          initValue={80}
          handleChange={handleChange}
        />
      </FormSeperator>
      <FormSeperator>
        <FormLabelComponent label="top misses" />
        <ExplainableParagraph>
          Choose how many top misses to include in the analysis.
        </ExplainableParagraph>
        <SliderComponent
          inputName="topPredictions"
          minValue={2}
          maxValue={5}
          initValue={4}
          handleChange={handleChange}
        />
      </FormSeperator>
      <FormSeperator>
        <FormLabelComponent label="Explaination method" />
        <div style={{ marginTop: "10px" }}>
          <SelectComponent
            inputName="graphType"
            inputLabel="Select Explaination Method"
            handleChange={handleChange}
            inputItems={
              graphTypes.map((gt) => ({
                value: gt,
                label: gt === "count" ? "misses-count-based" : gt,
              })) || []
            }
            value={newModelData.graphType}
          />
        </div>
      </FormSeperator>
    </>
  );
};

export default NewModelForm;
