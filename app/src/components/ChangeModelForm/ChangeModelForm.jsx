import { useState, useContext, useEffect, use } from 'react';
import FormContainer from '../../components/FormContainer/FormContainer';
import FormLabelComponent from '../../components/FormComponents/FormLabelComponent/FormLabelComponent';
import SelectComponent from '../../components/FormComponents/SelectComponent/SelectComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { ModelContext } from "../../contexts/ModelProvider";
import { fetchModels } from '../../apis/models.api';


const ChangeModelForm = () => {
    const { currentModelData } = useContext(ModelContext);
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(currentModelData.model_id ?? '');


    useEffect(() => {
       if (currentModelData && currentModelData.model_id) {
            setSelectedModel(currentModelData.model_id);
        }
    }, [currentModelData]);

    useEffect(() => {
        const fetchAvailableModels = async () => {
            try {
                const modelsData = await fetchModels();
                setModels(modelsData);
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };
        fetchAvailableModels();
        console.log("Models fetched:", selectedModel);
    }, []);

    const handleModelChange = (event) => {
        const selectedModelId = event.target.value;
        setSelectedModel(selectedModelId);
    }
    const handleSubmit = () => {
        console.log("Selected model ID:", selectedModel);
    };

    const selectItems = models.map((model, idx) => ({
        value: idx,
        label: model.file_name
    }));
            
    return (
        <>
            <FormContainer borderRadiusTop="15" borderRadiusBottom="0">
                <FormLabelComponent label="model" />
                <SelectComponent
                inputName="model"
                inputLabel="Select model"
                handleChange={handleModelChange}
                inputItems={selectItems}
                value={selectedModel}
                />
            <ButtonComponent label={"Choose"}/>
            </FormContainer>
        </>
    );
};

export default ChangeModelForm;