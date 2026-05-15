import { ReactFlow, Background, Controls, MarkerType, Position, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AlertTriangle, Camera, FileSearch, Gavel, Mail, CheckCircle2, ShieldAlert } from "lucide-react";
import { FlowNode } from "./FlowNode";

const nodeTypes = { flow: FlowNode };

const nodes: Node[] = [
  { id: "v1", type: "flow", position: { x: 0, y: 200 }, data: { label: "Violation Detected", description: "Mismatch, low balance or speed breach", icon: AlertTriangle, variant: "destructive", showTarget: false, sourcePosition: Position.Right } },
  { id: "v2", type: "flow", position: { x: 290, y: 200 }, data: { label: "Evidence Capture", description: "ANPR snapshot + lane CCTV clip", icon: Camera, variant: "warning" } },
  { id: "v3", type: "flow", position: { x: 580, y: 200 }, data: { label: "Auto Adjudication", description: "Rules engine + confidence scoring", icon: FileSearch, variant: "info" } },
  { id: "v4", type: "flow", position: { x: 870, y: 80 }, data: { label: "Operator Review", description: "Manual review for low-confidence cases", icon: ShieldAlert, variant: "accent" } },
  { id: "v5", type: "flow", position: { x: 870, y: 320 }, data: { label: "e-Challan Issued", description: "DMV match + notice generated", icon: Gavel, variant: "primary" } },
  { id: "v6", type: "flow", position: { x: 1160, y: 200 }, data: { label: "Driver Notified", description: "SMS · Email · Driver App", icon: Mail, variant: "info" } },
  { id: "v7", type: "flow", position: { x: 1450, y: 200 }, data: { label: "Case Closed", description: "Payment received or escalated", icon: CheckCircle2, variant: "success", showSource: false } },
];

const edge = (id: string, source: string, target: string, label?: string): Edge => ({
  id, source, target, label, animated: true, type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-primary)" },
  labelStyle: { fill: "var(--color-muted-foreground)", fontSize: 11, fontFamily: "JetBrains Mono" },
  labelBgStyle: { fill: "var(--color-background)" },
});

const edges: Edge[] = [
  edge("ev1", "v1", "v2"),
  edge("ev2", "v2", "v3"),
  edge("ev3", "v3", "v4", "manual"),
  edge("ev4", "v3", "v5", "auto"),
  edge("ev5", "v4", "v5", "approved"),
  edge("ev6", "v5", "v6"),
  edge("ev7", "v6", "v7"),
];

export function EnforcementDiagram() {
  return (
    <div className="h-[520px] w-full surface-card rounded-2xl overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.18 }}
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
