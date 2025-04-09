import React from 'react';
import FormContainer from '../../components/FormContainer/FormContainer';
import FileUpload from '../../components/FormComponents/FileUpload/FileUpload';
import FormLabelComponent from '../../components/FormComponents/FormLabelComponent/FormLabelComponent';

const ChangeModelForm = () => {
    return (
        <>
            <FormContainer borderRadiusTop="15" borderRadiusBottom="0">
                <FormLabelComponent label="model" />
                <FileUpload fileType={".keras"}/>
            </FormContainer>
        </>
    );
};

export default ChangeModelForm;