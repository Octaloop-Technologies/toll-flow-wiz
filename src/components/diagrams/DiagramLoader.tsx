import { lazy, Suspense, type ComponentType, type ReactNode } from "react";

const loaders = {
  journey: () =>
    import("./VehicleJourneyDiagram").then((m) => ({ default: m.VehicleJourneyDiagram })),
  architecture: () =>
    import("./ArchitectureDiagram").then((m) => ({ default: m.ArchitectureDiagram })),
  payment: () => import("./PaymentDiagram").then((m) => ({ default: m.PaymentDiagram })),
  enforcement: () =>
    import("./EnforcementDiagram").then((m) => ({ default: m.EnforcementDiagram })),
} as const;

const lazyDiagrams: Record<keyof typeof loaders, ReturnType<typeof lazy>> = {
  journey: lazy(loaders.journey),
  architecture: lazy(loaders.architecture),
  payment: lazy(loaders.payment),
  enforcement: lazy(loaders.enforcement),
};

export type DiagramId = keyof typeof loaders;

export function DiagramLoader({
  id,
  fallback,
}: {
  id: DiagramId;
  fallback: ReactNode;
}) {
  const Diagram = lazyDiagrams[id] as ComponentType;

  return (
    <Suspense fallback={fallback}>
      <Diagram />
    </Suspense>
  );
}
