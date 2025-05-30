import { useState, useCallback, useContext } from "react";
import { ResponsiveTree } from "@nivo/tree";
import ModalComponent from "../ModalComponent/ModalComponent";
import FormControl from "@mui/material/FormControl";
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
import TextFieldComponent from "../FormComponents/TextFieldComponent/TextFieldComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CloseIconComponent from "../CloseIconComponent/CloseIconComponent";
import ButtonsStack from "./ButtonsStack";
import { ModalHeaderStyled } from "./Dendrogram.style";
import { ModelContext } from "../../contexts/ModelProvider";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { changeClusterName } from "../../apis/dendrograms.api";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Dendrogram = () => {
  const { currentModelData } = useContext(ModelContext);
  const { dendrogramData, updateSubDendrogram } = useContext(DendrogramContext);

  const [isLocked, setIsLocked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClusterData, setSelectedClusterData] = useState({
    selectedNode: null,
    newName: "",
  });

  const handleNodeClick = useCallback(
    (node) => {
      if (!isLocked) return;

      if (!node.data.children || node.data.children.length === 0) {
        return;
      }

      setSelectedClusterData({
        selectedNode: node,
        newName: node.data.name,
      });
      setIsModalOpen(true);
    },
    [isLocked]
  );

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
        <TransformWrapper
          disabled={isLocked}
          doubleClick={{ disabled: true }}
          pinch={{ disabled: isLocked }}
          pan={{ disabled: isLocked }}
          wheel={{ disabled: isLocked }}
          minScale={0.2}
          
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <ButtonsStack
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                resetTransform={resetTransform}
                isLocked={isLocked}
                setIsLocked={setIsLocked}
              />
              <TransformComponent>
                <div
                  style={{
                    width: "70vw",
                    height: 900,
                    cursor: isLocked ? "default" : "grab",
                  }}
                >
                  <ResponsiveTree
                    style={{ cursor: "grab" }}
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
                    margin={{ top: 20, right: 90, bottom: 20, left: 200 }}
                    motionConfig="stiff"
                    meshDetectionRadius={80}
                    layout="right-to-left"
                    onNodeClick={handleNodeClick}
                    theme={{
                      labels: {
                        text: {
                          fontSize: 12,
                          fill: "#222831",
                        },
                      },
                    }}
                  />
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </section>
      <ModalComponent
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        modalWidth={"30vw"}
        modalHeight={"25vh"}
      >
        {selectedClusterData.selectedNode && (
          <FormControl sx={{ width: "80%", gap: "25px" }}>
            <CloseIconComponent onCloseHandler={handleModalClose} />
            <ModalHeaderStyled>
              <FormLabelComponent
                align="center"
                label={`Edit Cluster <${selectedClusterData.selectedNode.data.name}> Name`}
              />
            </ModalHeaderStyled>
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
