import React, { useState, useContext } from "react";
import FormContainer from "../FormContainer/FormContainer";
import FileUpload from "../FormComponents/FileUpload/FileUpload";
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
import RadioComponent from "../FormComponents/RadioComponent/RadioComponent";
import SliderComponent from "../FormComponents/SliderComponent/SliderComponent";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import SelectComponent from "../FormComponents/SelectComponent/SelectComponent";
import { FormSeperator, ExplainableParagraph } from "./NewAnalasyseForm.style";
import { postNma } from "../../apis/nma.api";
import { ModelContext } from "../../contexts/ModelProvider";
import ExistingModelForm from "./ExistingModelForm";
import NewModelForm from "./NewModelForm";

const NewAnalyseForm = () => {
  const { models } = useContext(ModelContext);
  const [mode, setMode] = useState(null);
  const [selectedModel, setSelectedModel] = React.useState(null);

  const [newModelData, setNewModelData] = useState({
    model: null,
    dataset: "imagenet",
    confidance: 80,
    topPredictions: 4,
    graphType: "similarity",
  });

  const graphTypes = ["similarity", "dissimilarity", "count"];

  const availableGraphTypes = selectedModel
    ? graphTypes.filter((gt) => !(selectedModel.graphTypes || []).includes(gt))
    : [];

  const handleModeChange = (event) => {
    setMode(event.target.value);
    setSelectedModel(null);
    setNewModelData({
      model: null,
      dataset: "imagenet",
      confidance: 80,
      topPredictions: 4,
      graphType: "similarity",
    });
  };

  const handleModelSelect = (event) => {
    const modelName = event.target.value;
    const model = models.find((m) => m.name === modelName);
    setSelectedModel(model);
    setNewModelData((prev) => ({
      ...prev,
      model: modelName,
      graphType: model?.graphTypes?.[0] || "similarity",
    }));
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setNewModelData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setNewModelData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", newModelData);
    const formData = new FormData();
    formData.append("model_file", newModelData.model);
    formData.append("dataset", newModelData.dataset);
    formData.append("min_confidence", newModelData.confidance);
    formData.append("top_k", newModelData.topPredictions);
    formData.append("graph_type", newModelData.graphType);
    const response = await postNma(formData);
    console.log("Response from server:", response);
  };

  return (
    <>
      <FormContainer title="Upload or Analyze Model">
        <FormSeperator>
          
        {/* <FormSeperator>
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
        </FormSeperator> */}
        <ButtonComponent label="analyse" onClickHandler={handleSubmit} />
      </FormContainer>
    </>
  );
};

export default NewAnalyseForm;
