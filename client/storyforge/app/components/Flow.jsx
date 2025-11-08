"use client";
import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useRouter } from "next/navigation";
import { BookOpen, Plus } from "lucide-react";

const StartNode = ({ data }) => {
  return (
    <div className="bg-custom-gray-300 border-2 border-blue-500 rounded-lg p-4 shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:border-blue-400 active:scale-95 active:border-blue-600 touch-none select-none min-w-[200px] sm:min-w-[180px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-blue-500"
      />

      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 sm:w-8 sm:h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
          <BookOpen className="w-5 h-5 sm:w-4 sm:h-4 text-blue-400" />
        </div>

        <div className="text-center">
          <h3 className="text-white font-bold text-lg sm:text-base mb-1">
            {data.label}
          </h3>
          <p className="text-slate-400 text-sm">Tap to begin your story</p>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-blue-500"
      />
    </div>
  );
};

const nodeTypes = {
  startNode: StartNode,
};

const Flow = ({ storyId }) => {
  const router = useRouter();

  const [nodes, setNodes] = useState([
    {
      id: "n1",
      position: { x: 250, y: 200 },
      data: {
        label: "Start Writing.",
        description: "Begin crafting your story here",
      },
      type: "startNode",
    },
  ]);

  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((edg) => applyEdgeChanges(changes, edg));
  }, []);

  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          animated: true,
          style: {
            stroke: "#3b82f6",
            strokeWidth: 2,
          },
        },
        eds
      )
    );
  }, []);

  const onNodeClick = useCallback(
    (event, node) => {
      console.log("Node clicked: ", node.id);
      router.push(`/stories/${storyId}/node/${node.id}`);
    },
    [router, storyId]
  );

  const addNewNode = () => {
    const newNodeId = `node-${Date.now()}`;
    const lastNode = nodes[nodes.length - 1];

    const positionX = lastNode.position.x;
    const positionY = lastNode.position.y + 180;

    const newNode = {
      id: newNodeId,
      position: { x: positionX, y: positionY },
      data: {
        label: `Chapter ${nodes.length + 1}`,
        description: "Write your story here...",
      },
      type: "startNode",
    };

    setNodes((nds) => [...nds, newNode]);

    const newEdge = {
      id: `e-${lastNode.id}-${newNodeId}`,
      source: lastNode.id,
      target: newNodeId,
      animated: true,
      style: {
        stroke: "#3b82f6",
        strokeWidth: 2,
      },
    };

    setEdges((eds) => [...eds, newEdge]);
  };

  return (
    <>
      <div className="h-screen w-full">
        <div className="fixed bottom-4 right-4 z-10 flex gap-2">
          <button
            onClick={addNewNode}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Add Node</span>
          </button>
        </div>

        <div className="fixed bottom-4 left-4 z-10 bg-custom-gray-300 border border-slate-700 rounded-lg px-4 py-2 shadow-lg">
          <p className="text-slate-400 text-sm">
            <span className="text-white font-bold">{nodes.length}</span>{" "}
            {nodes.length > 1 ? "Nodes" : "Node"}
            {" • "}
            <span className="text-white font-bold">{edges.length}</span>{" "}
            Connections
          </p>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background gap={16} color="#334155" />
          <Controls className="bg-custom-gray-300 border border-slate-700" />
        </ReactFlow>
      </div>
    </>
  );
};

export default Flow;
