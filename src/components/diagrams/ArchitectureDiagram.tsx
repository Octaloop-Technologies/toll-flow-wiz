import { ReactFlow, Background, Controls, MarkerType, Position, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { LayerNode } from "./FlowNode";

const nodeTypes = { layer: LayerNode };

const layers = [
  { id: "L5", tag: "L5", label: "Experience Layer", items: "Operator C2 · Driver App · Authority Portal · Open APIs", tone: "accent" as const },
  { id: "L4", tag: "L4", label: "Data & Insights", items: "Streaming · Lakehouse · BI · Forecasting", tone: "info" as const },
  { id: "L3", tag: "L3", label: "Core Services", items: "Tolling · Payments · Accounts · Violations · Devices", tone: "primary" as const },
  { id: "L2", tag: "L2", label: "Edge Layer", items: "Edge AI · Local Cache · Offline-first Agents", tone: "success" as const },
  { id: "L1", tag: "L1", label: "Field Layer", items: "ANPR / CCTV · RFID · Loops · WIM · Barriers", tone: "warning" as const },
];

const nodes: Node[] = layers.map((l, i) => ({
  id: l.id,
  type: "layer",
  position: { x: 0, y: i * 130 },
  data: l,
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
}));

const edges: Edge[] = layers.slice(0, -1).map((l, i) => ({
  id: `${l.id}-${layers[i + 1].id}`,
  source: l.id,
  target: layers[i + 1].id,
  type: "smoothstep",
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-primary)" },
}));

export function ArchitectureDiagram() {
  return (
    <div className="h-[700px] w-full surface-card rounded-2xl overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} size={1} color="oklch(0.3 0.03 250 / 0.5)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
