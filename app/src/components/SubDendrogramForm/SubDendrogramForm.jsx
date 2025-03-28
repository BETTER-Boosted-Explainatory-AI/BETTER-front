import React from 'react';
import FormContainer from '../../components/FormContainer/FormContainer';
import FileUpload from '../../components/FormComponents/FileUpload/FileUpload';
import FormLabelComponent from '../../components/FormComponents/FormLabelComponent/FormLabelComponent';
import MultipleSelect from '../../components/FormComponents/MultipleSelect/MultipleSelect';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const SubDendrogramForm = () => {
    return (
        <>
            <FormContainer borderRadiusTop="15" borderRadiusBottom="0">
                <FormLabelComponent label="model" />
                <FileUpload />
            </FormContainer>
            <FormContainer bgColor="#e4eeef" borderRadiusTop="0" borderRadiusBottom="15">
                <FormLabelComponent label="Select labels" />
                <MultipleSelect />
                <ButtonComponent label="Change" />
            </FormContainer>
        </>
    );
};

export default SubDendrogramForm;