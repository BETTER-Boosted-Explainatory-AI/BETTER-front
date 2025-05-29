import React, { useEffect } from "react";
import { fetchModels } from "../../apis/models.api";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import TitleComponent from "../../components/TitleComponent/TitleComponent";
import {
  ModelsPageWrapper,
  ModelsStatusContainer,
  ModelStatusCard,
} from "./ModelStatusPage.style.js";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent.jsx";
import PredictionTable from "../../components/PredictionTable/PredictionTable.jsx";

const ModelStatusPage = () => {
  const [allModels, setAllModels] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchAllModels = async () => {
      setIsLoading(true);
      try {
        const models = await fetchModels();
        setAllModels(models);
        console.log("allModels:", models);
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllModels();
  }, []);

  return (
    <ModelsPageWrapper>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div>
          <TitleComponent title="Models Status" />
          {allModels.length === 0 ? (
            <p>No models were found.</p>
          ) : (
            <ModelsStatusContainer>
              {allModels.map((model) => (
                <ModelStatusCard key={model.model_id}>
                  <div>
                    <FormLabelComponent label="Model" />
                    <p>{model.file_name}</p>
                  </div>
                  <div>
                    <FormLabelComponent label="Status" />
                    <PredictionTable
                      headers={["Explanation Method", "Status"]}
                      data={model.batch_jobs.map((job) => [
                        job.job_graph_type === "count"
                          ? "misses-count-based"
                          : job.job_graph_type,
                        job.job_status,
                      ])}
                    />
                  </div>
                </ModelStatusCard>
              ))}
            </ModelsStatusContainer>
          )}
        </div>
      )}
    </ModelsPageWrapper>
  );
};

export default ModelStatusPage;
