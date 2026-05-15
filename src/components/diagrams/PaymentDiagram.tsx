import { ReactFlow, Background, Controls, MarkerType, Position, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CreditCard, Wallet, Receipt, Building2, RefreshCcw, ShieldCheck } from "lucide-react";
import { FlowNode } from "./FlowNode";

const nodeTypes = { flow: FlowNode };

const nodes: Node[] = [
  { id: "p1", type: "flow", position: { x: 0, y: 180 }, data: { label: "Toll Engine", description: "Calculates fare from class & distance", icon: Receipt, variant: "primary", showTarget: false } },
  { id: "p2", type: "flow", position: { x: 300, y: 60 }, data: { label: "Prepaid Wallet", description: "Real-time debit · low-balance alerts", icon: Wallet, variant: "success" } },
  { id: "p3", type: "flow", position: { x: 300, y: 300 }, data: { label: "Open Payments", description: "Cards · Bank · UPI · contactless", icon: CreditCard, variant: "info" } },
  { id: "p4", type: "flow", position: { x: 620, y: 180 }, data: { label: "PCI-DSS Gateway", description: "Tokenization & 3DS verification", icon: ShieldCheck, variant: "accent" } },
  { id: "p5", type: "flow", position: { x: 940, y: 60 }, data: { label: "Acquirer Bank", description: "Settlement & reconciliation", icon: Building2, variant: "info" } },
  { id: "p6", type: "flow", position: { x: 940, y: 300 }, data: { label: "Auto Recharge", description: "Threshold-based wallet top-up", icon: RefreshCcw, variant: "warning" } },
  { id: "p7", type: "flow", position: { x: 1240, y: 180 }, data: { label: "Receipt Issued", description: "Driver app · email · SMS", icon: Receipt, variant: "primary", showSource: false } },
];

const edge = (id: string, source: string, target: string, label?: string): Edge => ({
  id, source, target, label, animated: true, type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-primary)" },
  labelStyle: { fill: "var(--color-muted-foreground)", fontSize: 11, fontFamily: "JetBrains Mono" },
  labelBgStyle: { fill: "var(--color-background)" },
});

const edges: Edge[] = [
  edge("ep1", "p1", "p2", "tagged"),
  edge("ep2", "p1", "p3", "untagged"),
  edge("ep3", "p2", "p4"),
  edge("ep4", "p3", "p4"),
  edge("ep5", "p4", "p5", "settle"),
  edge("ep6", "p4", "p6", "low bal"),
  edge("ep7", "p5", "p7"),
  edge("ep8", "p6", "p7"),
];

export function PaymentDiagram() {
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
        <Background gap={24} size={1} color="var(--diagram-dot)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
