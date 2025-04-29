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
  return (
    <>
      <FormContainer>
        <FormSeperator>
          <FormLabelComponent label="model" />
          <FileUpload fileType={".keras"} />
        </FormSeperator>
        <FormSeperator>
          <FormLabelComponent label="Dataset" />
          <ExplainableParagraph>Which dataset would you like to use?</ExplainableParagraph>
          <RadioComponent>
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
          <FormLabelComponent label="probability" />
          <ExplainableParagraph>percentage probabilities to include:</ExplainableParagraph>
          <SliderComponent minValue={70} maxValue={95} />
        </FormSeperator>
        <FormSeperator>
          <FormLabelComponent label="top probabilities" />
          <ExplainableParagraph>top probabilities in vector:</ExplainableParagraph>
          <SliderComponent minValue={2} maxValue={5} />
        </FormSeperator>
        <FormSeperator>
          <FormLabelComponent label="analysis method" />
          <RadioComponent>
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
