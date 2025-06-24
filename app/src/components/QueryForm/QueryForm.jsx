import React from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import FileUpload from "../../components/FormComponents/FileUpload/FileUpload";
import AlertComponent from "../../components/AlertComponent/AlertComponent";

const QueryForm = ({handleFileChange, handleSubmit, files, isLoading, showAlert, setShowAlert, message}) => {
  const formInfo = "Upload an image to get the verbal explanation for the model's decision";

  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        borderRadiusBottom="15"
        title="Upload Image for Query"
        formInfo={formInfo}
      >
        <FileUpload inputName={'imageQuery'} fileType={"image/*"} handleFileChange={handleFileChange} files={files} />
        {
          showAlert && (
            <AlertComponent
              severity="error"
              message={message}
              onClose={() => setShowAlert(false)}
            />
          )
        }
        <ButtonComponent label={"Get Query"} onClickHandler={handleSubmit} loading={isLoading} />
      </FormContainer>
    </>
  );
};

export default QueryForm;
