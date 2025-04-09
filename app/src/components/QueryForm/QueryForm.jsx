import React, { useContext } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { DatasetContext } from "../../contexts/DatasetProvider";
import FileUpload from '../../components/FormComponents/FileUpload/FileUpload';

const QueryForm = () => {
    const {
        labels,
    } = useContext(DatasetContext);

    const {
        setSelectedLabels,
        selectedLabels,
    } = useContext(DendrogramContext);


    return (
        <>
            <FormContainer
                bgColor="#e4eeef"
                borderRadiusTop="0"
                borderRadiusBottom="15"
            >
                <FormLabelComponent label="Query" />
                <FileUpload fileType={"image/*"} />
                <ButtonComponent label="Get Query" />
            </FormContainer>
        </>
    );
}

export default QueryForm;