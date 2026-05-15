import { ReactFlow, Background, Controls, MarkerType, Position, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Car, Camera, Radio, Calculator, Wallet, AlertTriangle, Database, MonitorPlay } from "lucide-react";
import { FlowNode } from "./FlowNode";

const nodeTypes = { flow: FlowNode };

const nodes: Node[] = [
  { id: "1", type: "flow", position: { x: 0, y: 160 }, data: { label: "Vehicle Enters Lane", description: "ANPR + RFID gantry detects approach", icon: Car, badge: "T+0ms", variant: "info", showTarget: false } },
  { id: "2", type: "flow", position: { x: 280, y: 40 }, data: { label: "ANPR Capture", description: "Edge OCR via YOLOv8 + DeepStream", icon: Camera, badge: "<60ms", variant: "primary" } },
  { id: "3", type: "flow", position: { x: 280, y: 280 }, data: { label: "RFID Tag Read", description: "Tag ↔ plate cross-validation", icon: Radio, badge: "<40ms", variant: "primary" } },
  { id: "4", type: "flow", position: { x: 580, y: 160 }, data: { label: "Toll Engine", description: "Class, distance & tariff applied", icon: Calculator, badge: "<30ms", variant: "accent" } },
  { id: "5", type: "flow", position: { x: 870, y: 60 }, data: { label: "Wallet Charged", description: "Real-time debit via wallet service", icon: Wallet, badge: "OK", variant: "success" } },
  { id: "6", type: "flow", position: { x: 870, y: 270 }, data: { label: "Violation Triggered", description: "Mismatch or low balance detected", icon: AlertTriangle, badge: "FAIL", variant: "destructive" } },
  { id: "7", type: "flow", position: { x: 1170, y: 270 }, data: { label: "Evidence Stored", description: "Plate image + metadata to evidence store", icon: Database, variant: "warning" } },
  { id: "8", type: "flow", position: { x: 1170, y: 60 }, data: { label: "Dashboard Updated", description: "Live KPIs streamed to control room", icon: MonitorPlay, variant: "info", showSource: false } },
];

const edge = (id: string, source: string, target: string, label?: string, animated = true): Edge => ({
  id, source, target, label, animated, type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-primary)" },
  labelStyle: { fill: "var(--color-muted-foreground)", fontSize: 11, fontFamily: "JetBrains Mono" },
  labelBgStyle: { fill: "var(--color-background)" },
});

const edges: Edge[] = [
  edge("e1-2", "1", "2", "vision"),
  edge("e1-3", "1", "3", "rfid"),
  edge("e2-4", "2", "4"),
  edge("e3-4", "3", "4"),
  edge("e4-5", "4", "5", "valid"),
  edge("e4-6", "4", "6", "invalid"),
  edge("e5-8", "5", "8"),
  edge("e6-7", "6", "7"),
  edge("e7-8", "7", "8", "alert"),
];

export function VehicleJourneyDiagram() {
  return (
    <div className="h-[560px] w-full surface-card rounded-2xl overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        defaultEdgeOptions={{ type: "smoothstep" }}
      >
        <Background gap={24} size={1} color="oklch(0.3 0.03 250 / 0.5)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

// pre-set positions per node already use Position default left/right; ensure handles match horizontally
nodes.forEach((n) => {
  (n.data as any).sourcePosition = Position.Right;
  (n.data as any).targetPosition = Position.Left;
});
