import React, { useContext, useState } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import QueryForm from "../../components/QueryForm/QueryForm";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import NewModelForm from "../../components/NewModelForm/NewModelForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import { postQuery } from "../../apis/query.api";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";
import QueryResult from "../../components/QueryResult/QueryResult";

const QueryPage = () => {
  const { currentModelData, models, isModelsLoading } = useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);
  
  const [file, setFile] = useState(null);
  const [queryResult, setQueryResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("Please select at least one label.");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("No file selected.");
      setShowAlert(true);
      return;
    }
    try {
      setIsLoading(true);
      const res = await postQuery(
        file,
        currentModelData.model_id,
        currentModelData.graph_type
      );
      const { query_result, top_predictions, image } = res;
      setQueryResult({
        verbalExplanation: query_result,
        topPredictions: top_predictions,
        imageUrl: image,
      });
      setFile(null);
      console.log("Query result:", res);
    } catch (err) {
      console.error("Query error:", err);
      setMessage("An error occurred while processing your query.");
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForms = () => {
    if (currentModelData?.isLoading || isModelsLoading)
      return <LoadingComponent />;
    if (!models.length) return <NewModelForm />;
    return (
      <>
        <ChangeModelForm />
        <QueryForm
          showAlert={showAlert}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          files={file}
          isLoading={isLoading}
          setShowAlert={setShowAlert}
          message={message}
        />
      </>
    );
  };

  const renderMainContent = () => {
    if (queryResult) {
      return (
        <>
          <QueryResult
            verbalExplanation={queryResult.verbalExplanation}
            topPredictions={queryResult.topPredictions}
            imageUrl={queryResult.imageUrl}
          />
        </>
      );
    }
    if (currentModelData.isLoading || isLoading) return <LoadingComponent />;
    if (dendrogramData.loading) return <LoadingComponent />;
    if (dendrogramData.subDendrogram) return <Dendrogram />;
    return <BetterExplanation />;
  };

  return (
    <>
      <aside id="asideForms">{renderForms()}</aside>
      <main id="mainContent">{renderMainContent()}</main>
    </>
  );
};

export default QueryPage;
