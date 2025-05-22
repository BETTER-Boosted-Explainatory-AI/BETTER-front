import React, { useContext, useState } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import QueryForm from "../../components/QueryForm/QueryForm";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import NewModelForm from "../../components/NewModelForm/NewModelForm";
import BetterExplanation from "../../components/BetterExplanation/BetterExplanation";
import { postQuery} from "../../apis/query.api";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";
import QueryResult from "../../components/QueryResult/QueryResult";

const QueryPage = () => {
  const { currentModelData, models, isModelsLoading } = useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);
  const [file, setFile] = useState(null);
  const [queryResult, setQueryResult] = useState(null); // <-- Add this
  const [isLoading, setIsLoading] = useState(false);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        setIsLoading(true);
        const res = await postQuery(file, currentModelData.model_id, currentModelData.graph_type);
        const { query_result, top_predictions, image } = res;
        // const base64Prefix = image.startsWith("data:image") ? "" : "data:image/png;base64,";
        setQueryResult({
          verbalExplanation: query_result,
          topPredictions: top_predictions,
          imageUrl: `${base64Prefix}${image}`
        });
        console.log("Query result:", res);
      } catch (err) {
        console.error("Query error:", err);
      }
      finally {
        setIsLoading(false);
      }
    }
};


  const renderForms = () => {
    if (currentModelData?.isLoading || isModelsLoading ) return <LoadingComponent />;
    if (!models.length) return <NewModelForm />;
    return (
      <>
        <ChangeModelForm />
        <QueryForm handleFileChange={handleFileChange} handleSubmit={handleSubmit} files={file} />
      </>
    );
  };
  
  const renderMainContent = () => {
    if ( queryResult) {
      return (
        <QueryResult
          verbalExplanation={queryResult.verbalExplanation}
          topPredictions={queryResult.topPredictions}
          imageUrl={queryResult.imageUrl}
        />
      );
    }
    if (currentModelData.isLoading || isLoading) return <LoadingComponent />;
    if (dendrogramData.loading) return <LoadingComponent />;
    if (dendrogramData.subDendrogram) return <Dendrogram />;
    return <BetterExplanation />;
  };


  return (
    <>
      <aside id="asideForms">
        {renderForms()}
      </aside>
      <main id="mainContent">
        {renderMainContent()}
      </main>
    </>

  );
};

export default QueryPage;