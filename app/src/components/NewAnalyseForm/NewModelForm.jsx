import React from "react";
import FileUpload from "../FormComponents/FileUpload/FileUpload";
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
import RadioComponent from "../FormComponents/RadioComponent/RadioComponent";
import SliderComponent from "../FormComponents/SliderComponent/SliderComponent";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import SelectComponent from "../FormComponents/SelectComponent/SelectComponent";
import { FormSeperator, ExplainableParagraph } from "./NewAnalyseForm.style";

const NewModelForm = ({newModelData, graphTypes, handleChange}) => {

  return (
    <>
        <FormSeperator>
          <FormLabelComponent label="model" />
          <FileUpload
            inputName="model"
            fileType={".keras"}
            handleFileChange={handleChange}
            files={newModelData.model}
          />
        </FormSeperator>
        <FormSeperator>
          <FormLabelComponent label="Dataset" />
          <ExplainableParagraph>
            Which dataset would you like to use?
          </ExplainableParagraph>
          <RadioComponent name="dataset" handleChange={handleChange}>
            <FormControlLabel
              value="imagenet"
              control={<Radio />}
              label="ImageNet"
            />
            <FormControlLabel
              value="cifar100"
              control={<Radio />}
              label="CIFAR-100"
            />
          </RadioComponent>
        </FormSeperator>
        <FormSeperator>
          <FormLabelComponent label="Confidance" />
          <ExplainableParagraph>Include confidance above:</ExplainableParagraph>
          <SliderComponent
            name="confidance"
            minValue={70}
            maxValue={95}
            initValue={80}
            handleChange={handleChange}
          />
        </FormSeperator>
        <FormSeperator>
          <FormLabelComponent label="top confidances" />
          <ExplainableParagraph>
            include to the top confidances:
          </ExplainableParagraph>
          <SliderComponent
            name="topPredictions"
            minValue={2}
            maxValue={5}
            initValue={4}
            handleChange={handleChange}
          />
        </FormSeperator>
        <FormSeperator>
          <FormLabelComponent label="analysis method" />
          <SelectComponent
            inputName="graphType"
            inputLabel="Select graph type"
            handleChange={handleChange}
            inputItems={
              graphTypes.map((gt) => ({
                value: gt,
                label: gt,
              })) || []
            }
            value={newModelData.graphType}
          />
        </FormSeperator>
    </>
  );
};

export default NewModelForm;
