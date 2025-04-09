import React, { useContext } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import MultipleSelect from "../../components/FormComponents/MultipleSelect/MultipleSelect";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { DatasetContext } from "../../contexts/DatasetProvider";

const WhiteBoxTestingForm = ({sourceLabels, targetLabels, onChangeSourceLabels, onChangeTargetLabels}) => {
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
                <div>
                    <FormLabelComponent label="Select source sub group" />
                    <MultipleSelect inputLabel="Ex: Forest, Maple Tree, ect" labels={labels} selectedLabels={sourceLabels} setSelectedLabels={onChangeSourceLabels} />
                </div>
                <div>
                    <FormLabelComponent label="Select target sub group" />
                    <MultipleSelect inputLabel="Ex: Man, Woman, ect" labels={labels} selectedLabels={targetLabels} setSelectedLabels={onChangeTargetLabels} />
                </div>
                <ButtonComponent label="Test" />
            </FormContainer>
        </>
    );
};

export default WhiteBoxTestingForm;
