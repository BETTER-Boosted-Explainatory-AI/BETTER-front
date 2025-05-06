import React from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FileUpload from "../../components/FormComponents/FileUpload/FileUpload";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import RadioComponent from "../../components/FormComponents/RadioComponent/RadioComponent";
import SliderComponent from "../../components/FormComponents/SliderComponent/SliderComponent";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { FormSeperator, ExplainableParagraph } from "./NewModelForm.style";


const NewModelForm = () => {
  const [newModelData, setNewModelData] = React.useState({
    model: null,
    dataset: "imagenet",
    confidance: 80,
    topPredictions: 4,
    graphType: "similarity",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewModelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  } 

  return (
    <>
      <FormContainer>
        <FormSeperator>
          <FormLabelComponent label="model" />
          <FileUpload name="model" fileType={".keras"} />
        </FormSeperator>
        <FormSeperator>
          <FormLabelComponent label="Dataset" />
          <ExplainableParagraph>Which dataset would you like to use?</ExplainableParagraph>
          <RadioComponent name="dataset">
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
          <SliderComponent name="confidance" minValue={70} maxValue={95} initValue={80} />
        </FormSeperator>
        <FormSeperator>
          <FormLabelComponent label="top confidances" />
          <ExplainableParagraph>include to the top confidances:</ExplainableParagraph>
          <SliderComponent name="topPredictions" minValue={2} maxValue={5} initValue={4}/>
        </FormSeperator>
        <FormSeperator>
          <FormLabelComponent label="analysis method" />
          <RadioComponent name="graphType">
            <FormControlLabel
              value="similarity"
              control={<Radio />}
              label="Similarity"
            />
            <FormControlLabel
              value="dissimilarity"
              control={<Radio />}
              label="Dissimilarity"
            />
            <FormControlLabel value="count" control={<Radio />} label="Count" />
          </RadioComponent>
        </FormSeperator>
        <ButtonComponent label="analyse" />
      </FormContainer>
    </>
  );
};

export default NewModelForm;
