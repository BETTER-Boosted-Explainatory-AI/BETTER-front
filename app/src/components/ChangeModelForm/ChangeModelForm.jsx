import { useState, useContext, useEffect } from 'react';
import FormContainer from '../../components/FormContainer/FormContainer';
import FormLabelComponent from '../../components/FormComponents/FormLabelComponent/FormLabelComponent';
import SelectComponent from '../../components/FormComponents/SelectComponent/SelectComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { ModelContext } from "../../contexts/ModelProvider";
import { DendrogramContext } from "../../contexts/DendrogramProvider";

const ChangeModelForm = () => {
    const { currentModelData, changeCurrentModel, models } = useContext(ModelContext);
    const { getSubDendrogram } = useContext(DendrogramContext);

    const [selectedModel, setSelectedModel] = useState(currentModelData.model_id ?? '');
    const [graphType, setGraphType] = useState('');


    useEffect(() => {
    if (currentModelData?.model_id) {
        setSelectedModel(currentModelData.model_id);
    }
    }, [currentModelData?.model_id]);


    useEffect(() => {
        if (!models.length || !selectedModel) return;

        const selected = models.find(m => m.model_id === selectedModel);
        if (!selected) return;

        const isCurrentModel = selectedModel === currentModelData.model_id;
        const newGraphType = isCurrentModel && currentModelData.graph_type
            ? currentModelData.graph_type
            : selected.graph_type[0];

        setGraphType(newGraphType);
    }, [selectedModel, models, currentModelData]);

    const handleModelChange = (event) => {
        const selectedModelId = event.target.value;
        setSelectedModel(selectedModelId);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedModel) return;
        const modelChanged = selectedModel !== currentModelData.model_id;
        const graphTypeChanged = graphType !== currentModelData.graph_type;

        if (!modelChanged && !graphTypeChanged) {
            console.log("Model and graph type are already selected");
            return; 
        }
        if (!graphType) {
            console.error("Graph type is not selected");
            return;
        }
        await changeCurrentModel(selectedModel, graphType);
    };

    useEffect(() => {
        if (
            currentModelData.model_id === selectedModel &&
            currentModelData.graph_type === graphType
        ) {
            getSubDendrogram({ selected_labels: [] });
        }
        // eslint-disable-next-line
    }, [currentModelData]);

    const handleGraphTypeChange = (event) => {
        setGraphType(event.target.value);
    };

    const selectItems = models.map((model) => ({
        value: model.model_id,
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
                <FormLabelComponent label="graph type" />
                <SelectComponent
                    inputName="graphType"
                    inputLabel="Select graph type"
                    handleChange={handleGraphTypeChange}
                    inputItems={
                        models.find(m => m.model_id === selectedModel)?.graph_type.map(gt => ({
                            value: gt,
                            label: gt
                        })) || []
                    }
                    value={graphType}
                />
            <ButtonComponent label={"Choose"} onClickHandler={handleSubmit}/>
            </FormContainer>
        </>
    );
};

export default ChangeModelForm;