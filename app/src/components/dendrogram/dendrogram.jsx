import React from "react";
import { ResponsiveTree } from "@nivo/tree";
import { DendrogramContainer } from "./Dendrogram.style";
import { useState, useCallback } from "react";
import _ from "lodash"; 

const Dendrogram = ({ data }) => {
  
  const [treeData, setTreeData] = useState(data);

  const handleNodeClick = useCallback((node) => {
    const newName = prompt("Enter new name for the node:", node.data.name);
    if (newName) {
      // Create a deep copy of the tree data
      const updatedTreeData = _.cloneDeep(treeData);
      
      // Recursive function to find and update the node
      const updateNodeName = (currentNode) => {
        if (currentNode.id === node.data.id) {
          currentNode.name = newName;
          return true;
        }
        
        if (currentNode.children) {
          return currentNode.children.some(child => updateNodeName(child));
        }
        
        return false;
      };

      // Find and update the node in the copied data
      updateNodeName(updatedTreeData);
      
      // Update the state with the new data
      setTreeData(updatedTreeData);
    }
  }, [treeData]);

  return (
    <DendrogramContainer>
    <ResponsiveTree
    mode="dendogram"
    data={treeData}
    identity="name"
    activeNodeSize={15}
    inactiveNodeSize={8}
    nodeColor={{ scheme: "paired" }}
    fixNodeColorAtDepth={10}
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
  />
    </DendrogramContainer>
);
}

export default Dendrogram;