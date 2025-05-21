import React from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import FileUpload from "../../components/FormComponents/FileUpload/FileUpload";

const QueryForm = ({handleFileChange, handleSubmit, files, isLoading}) => {

  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        borderRadiusBottom="15"
        title="Upload Image for Query"
      >
        <FileUpload inputName={'imageQuery'} fileType={"image/*"} handleFileChange={handleFileChange} files={files} />
        <ButtonComponent label={isLoading ? "Loading..." : "Get Query"} onClickHandler={handleSubmit} />
      </FormContainer>
    </>
  );
};

export default QueryForm;
