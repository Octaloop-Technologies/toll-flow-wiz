import { Handle, Position } from "@xyflow/react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "success" | "warning" | "info" | "destructive" | "muted";

const variantStyles: Record<Variant, string> = {
  primary: "border-[color:var(--color-primary)]/40 shadow-[0_0_24px_-8px_var(--color-primary)]",
  accent: "border-[color:var(--color-accent)]/40 shadow-[0_0_24px_-8px_var(--color-accent)]",
  success: "border-[color:var(--color-success)]/40 shadow-[0_0_24px_-8px_var(--color-success)]",
  warning: "border-[color:var(--color-warning)]/40 shadow-[0_0_24px_-8px_var(--color-warning)]",
  info: "border-[color:var(--color-info)]/40 shadow-[0_0_24px_-8px_var(--color-info)]",
  destructive: "border-[color:var(--color-destructive)]/40 shadow-[0_0_24px_-8px_var(--color-destructive)]",
  muted: "border-border",
};

const iconBg: Record<Variant, string> = {
  primary: "bg-[color:var(--color-primary)]/15 text-[color:var(--color-primary)]",
  accent: "bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)]",
  success: "bg-[color:var(--color-success)]/15 text-[color:var(--color-success)]",
  warning: "bg-[color:var(--color-warning)]/15 text-[color:var(--color-warning)]",
  info: "bg-[color:var(--color-info)]/15 text-[color:var(--color-info)]",
  destructive: "bg-[color:var(--color-destructive)]/15 text-[color:var(--color-destructive)]",
  muted: "bg-muted text-muted-foreground",
};

export type FlowNodeData = {
  label: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  variant?: Variant;
  sourcePosition?: Position;
  targetPosition?: Position;
  showSource?: boolean;
  showTarget?: boolean;
};

export function FlowNode({ data }: { data: FlowNodeData }) {
  const variant = data.variant ?? "primary";
  const Icon = data.icon;
  return (
    <div
      className={cn(
        "surface-card rounded-xl px-4 py-3 min-w-[200px] max-w-[260px] border-2 transition-transform hover:-translate-y-0.5",
        variantStyles[variant],
      )}
    >
      {(data.showTarget ?? true) && (
        <Handle type="target" position={data.targetPosition ?? Position.Left} />
      )}
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={cn("rounded-lg p-2 shrink-0", iconBg[variant])}>
            <Icon className="h-4 w-4" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold leading-tight text-foreground">{data.label}</h4>
            {data.badge && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                {data.badge}
              </span>
            )}
          </div>
          {data.description && (
            <p className="mt-1 text-xs leading-snug text-muted-foreground">{data.description}</p>
          )}
        </div>
      </div>
      {(data.showSource ?? true) && (
        <Handle type="source" position={data.sourcePosition ?? Position.Right} />
      )}
    </div>
  );
}

export function LayerNode({ data }: { data: { label: string; tag: string; items: string; tone: Variant } }) {
  const tone = data.tone;
  return (
    <div
      className={cn(
        "surface-card rounded-xl px-5 py-4 w-[640px] border-2",
        variantStyles[tone],
      )}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "rounded-md px-2 py-1 text-[11px] font-mono font-semibold tracking-wider",
            iconBg[tone],
          )}
        >
          {data.tag}
        </span>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-foreground">{data.label}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{data.items}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
