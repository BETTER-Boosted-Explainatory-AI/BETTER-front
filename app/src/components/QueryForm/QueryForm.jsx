import React, { useContext } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";
import FileUpload from '../../components/FormComponents/FileUpload/FileUpload';

const QueryForm = () => {
    const { modelData } = useContext(ModelContext);
    const { labels } = modelData;

    const { dendrogramData, setSelectedLabels } = useContext(DendrogramContext);
    const { selectedLabels } = dendrogramData;
    const handleLabelsChange = setSelectedLabels;

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