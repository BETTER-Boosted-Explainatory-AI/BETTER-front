import React from "react";
import { ResponsiveTree } from "@nivo/tree";
import data from "../../../data/dendrogramMock.json";
import _ from "lodash";

const DemoDendrogram = () => {
  return (
    <section className="dendrogramDemo">
      <ResponsiveTree
        mode="dendogram"
        data={data}
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
        margin={{ top: 20, right: 100, bottom: 20, left: 100 }}
        motionConfig="stiff"
        meshDetectionRadius={80}
        layout="right-to-left"
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
  );
};

export default DemoDendrogram;
