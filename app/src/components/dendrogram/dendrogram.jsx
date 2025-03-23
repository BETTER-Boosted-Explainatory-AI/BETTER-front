import React from "react";
import { ResponsiveTree } from "@nivo/tree";
import { DendrogramContainer } from "./Dendrogram.style";

const Dendrogram = ({ data }) => (
    <DendrogramContainer>
    <ResponsiveTree
    mode="dendogram"
    data={data}
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
    // linkCurve="step-after"
  />
    </DendrogramContainer>
);

export default Dendrogram;