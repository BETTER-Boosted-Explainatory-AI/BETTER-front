import React, { useContext } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { DatasetContext } from "../../contexts/DatasetProvider";
import FileUpload from '../../components/FormComponents/FileUpload/FileUpload';

const AdversarialAttackForm = () => {
    return (
        <>
            <FormContainer
                bgColor="#e4eeef"
                borderRadiusTop="0"
                borderRadiusBottom="15"
            >
                <>
                <FormLabelComponent label="Upload Images" />
                <FileUpload fileType={"image/*"} allowMultiple={true} />
                </>
                <ButtonComponent label="Get scores" />
            </FormContainer>
        </>
    );
}

export default AdversarialAttackForm;