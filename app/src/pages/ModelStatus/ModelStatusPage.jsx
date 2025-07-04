import React, { useEffect } from "react";
import { fetchModels } from "../../apis/models.api";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import TitleComponent from "../../components/TitleComponent/TitleComponent";
import {
  ModelsPageWrapper,
  ModelsStatusContainer,
  ModelStatusCard,
  ParagraphContainer,
  SpanContainer,
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
                  <ParagraphContainer>
                    <SpanContainer>Model: </SpanContainer>
                    {model.file_name}
                  </ParagraphContainer>
                  <ParagraphContainer>
                    <SpanContainer>dataset: </SpanContainer>
                    {(() => {
                      const dataset =
                        model.dataset?.toLowerCase() === "imagenet"
                          ? "mini-imagenet"
                          : model.dataset;
                      return (
                        dataset?.charAt(0).toUpperCase() + dataset?.slice(1)
                      );
                    })()}
                  </ParagraphContainer>
                  <ParagraphContainer>
                    <SpanContainer>First Prediction Confidence: </SpanContainer>
                    {model.min_confidence}
                  </ParagraphContainer>
                  <ParagraphContainer>
                    <SpanContainer>top misses: </SpanContainer>
                    {model.top_k}
                  </ParagraphContainer>
                  <ParagraphContainer>
                    <FormLabelComponent label="Explanation methods Status:" />
                  </ParagraphContainer>
                  <div>
                    <PredictionTable
                      width="100%"
                      headers={["Explanation Method", "Status", "Date"]}
                      data={model.batch_jobs.map((job) => [
                        job.job_graph_type === "count"
                          ? "misses-count-based"
                          : job.job_graph_type,
                        job.job_status,
                        job.timestamp.slice(0, 16).replace("T", " "),
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
