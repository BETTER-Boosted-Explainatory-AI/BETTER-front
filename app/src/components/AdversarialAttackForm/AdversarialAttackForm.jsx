import React from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { DatasetContext } from "../../contexts/DatasetProvider";
import FileUpload from "../../components/FormComponents/FileUpload/FileUpload";

const AdversarialAttackForm = () => {
  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        borderRadiusBottom="15"
      >
        <>
          <FormLabelComponent label="Clean Images" />
          <FileUpload name="images" fileType={"image/*"} allowMultiple={true} />
        </>
        <>
          <FormLabelComponent label="attacked Images" />
          <FileUpload name="images" fileType={"image/*"} allowMultiple={true} />
        </>
        <ButtonComponent label="train model" />
      </FormContainer>
    </>
  );
};

export default AdversarialAttackForm;
