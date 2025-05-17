import React, { useContext } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import WhiteBoxTestingForm from "../../components/WhiteBoxTestingForm/WhiteBoxTestingForm";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";


const WhiteboxTestingPage = () => {
  const [sourceLabels, setSourceLabels] = React.useState([]);
  const [targetLabels, setTargetLabels] = React.useState([]);

  const {
    subDendrogram,
    loading,
  } = useContext(DendrogramContext);

  const onChangeSourceLabels = (labels) => {
    setSourceLabels(labels);
  }

  const onChangeTargetLabels = (labels) => {
    setTargetLabels(labels);
  }


  return (
    <div id="mainBody">
      <aside id="asideForms">
        <ChangeModelForm />
        <WhiteBoxTestingForm sourceLabels={sourceLabels} targetLabels={targetLabels} onChangeSourceLabels={onChangeSourceLabels} onChangeTargetLabels={onChangeTargetLabels} />
      </aside>
      <main id="mainContent">
        {loading ? (
          <div>Loading...</div>
        ) : subDendrogram ? (
          <Dendrogram data={subDendrogram} />
        ) : (
          <div>Please upload a model</div>
        )}
      </main>
    </div>

  );
}

export default WhiteboxTestingPage;