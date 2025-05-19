import { useState, useCallback, useContext } from "react";
import { ResponsiveTree } from "@nivo/tree";
import ModalComponent from "../ModalComponent/ModalComponent";
import FormControl from "@mui/material/FormControl";
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
import TextFieldComponent from "../FormComponents/TextFieldComponent/TextFieldComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { ModelContext } from "../../contexts/ModelProvider";
import { DendrogramContext } from "../../contexts/DendrogramProvider";

import { changeClusterName } from "../../apis/dendrograms.api";
// import _ from "lodash";

const Dendrogram = () => {
  const { currentModelData } = useContext(ModelContext);
  const { dendrogramData, updateSubDendrogram } = useContext(DendrogramContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClusterData, setSelectedClusterData] = useState({
    selectedNode: null,
    newName: "",
  });


  const handleNodeClick = useCallback((node) => {
    if (!node.data.children || node.data.children.length === 0) {
      return;
    }

    setSelectedClusterData({
      selectedNode: node,
      newName: node.data.name,
    });
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    console.log("Modal close triggered");

    setIsModalOpen(false);
    setSelectedClusterData({
      selectedNode: null,
      newName: "",
    });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClusterData) return;

    let formData = {
      model_id: currentModelData.model_id,
      graph_type: currentModelData.graph_type,
      selected_labels: dendrogramData.selectedLabels,
      cluster_id: selectedClusterData.selectedNode.data.id,
      new_name: selectedClusterData.newName,
    };

    try {
      const res = await changeClusterName(formData);
      updateSubDendrogram(res);
      handleModalClose();
    } catch (error) {
      console.error("Error changing cluster name:", error);
    }
  };

  return (
    <>
      <section className="dendrogram">
        <ResponsiveTree
          mode="dendogram"
          data={dendrogramData.subDendrogram}
          identity="name"
          activeNodeSize={12}
          inactiveNodeSize={6}
          nodeColor={{ scheme: "dark2" }}
          fixNodeColorAtDepth={4}
          linkThickness={2}
          activeLinkThickness={8}
          inactiveLinkThickness={2}
          linkColor={{
            from: "target.color",
            modifiers: [["opacity", 0.4]],
          }}
          margin={{ top: 90, right: 90, bottom: 90, left: 90 }}
          motionConfig="stiff"
          meshDetectionRadius={80}
          layout="right-to-left"
          onNodeClick={(node) => {
            handleNodeClick(node);
          }}
          theme={{
            labels: {
              text: {
                fontSize: 12,
                fill: "#222831",
              },
            },
          }}
        />
      </section>
      <ModalComponent isOpen={isModalOpen} handleClose={handleModalClose} modalWidth={'30vw'} modalHeight={'25vh'}>
        {selectedClusterData.selectedNode && (
          <FormControl sx={{ width: "80%", gap: "25px" }}>
            <FormLabelComponent
            align="center"
              label={`Edit Cluster <${selectedClusterData.selectedNode.data.name}> Name`}
            />
            <TextFieldComponent
              inputName="clusterName"
              inputValue={selectedClusterData.newName}
              handleChange={(e) =>
                setSelectedClusterData({
                  ...selectedClusterData,
                  newName: e.target.value,
                })
              }
              inputLabel="New Cluster Name"
            />
            <ButtonComponent label="Change" onClickHandler={handleFormSubmit} />
          </FormControl>
        )}

      </ModalComponent>
    </>
  );
};

export default Dendrogram;
