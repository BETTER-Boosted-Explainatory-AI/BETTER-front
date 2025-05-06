import React from 'react';
import FormContainer from '../../components/FormContainer/FormContainer';
import FormLabelComponent from '../../components/FormComponents/FormLabelComponent/FormLabelComponent';
import SelectComponent from '../../components/FormComponents/SelectComponent/SelectComponent';

const ChangeModelForm = () => {

    return (
        <>
            <FormContainer borderRadiusTop="15" borderRadiusBottom="0">
                <FormLabelComponent label="model" />
                <SelectComponent
                    inputName="model"
                    inputLabel="Select model"
                    handleChange={() => { }}
                    inputItems={[
                        { value: 'model1', label: 'Model 1' },
                        { value: 'model2', label: 'Model 2' },
                        { value: 'model3', label: 'Model 3' },
                    ]}
                />
            </FormContainer>
        </>
    );
};

export default ChangeModelForm;