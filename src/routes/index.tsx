import { createFileRoute } from "@tanstack/react-router";
import octaloopLogo from "@/assets/octaloop-logo.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowRight,
  Cpu,
  Gauge,
  Layers,
  Network,
  Radio,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import { VehicleJourneyDiagram } from "@/components/diagrams/VehicleJourneyDiagram";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { EnforcementDiagram } from "@/components/diagrams/EnforcementDiagram";
import { PaymentDiagram } from "@/components/diagrams/PaymentDiagram";
import { ClientOnly } from "@/components/ClientOnly";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ETTM Tolling System — Flow Diagrams & Architecture" },
      {
        name: "description",
        content:
          "Professional flow diagrams for the Electronic Toll & Traffic Management (ETTM) platform — vehicle journey, system architecture, payments and enforcement workflows.",
      },
    ],
  }),
});

const metrics = [
  { value: "<200ms", label: "ANPR decision latency", icon: Zap },
  { value: "99.9%", label: "Platform uptime SLA", icon: Activity },
  { value: "8%+", label: "Revenue recovered", icon: Gauge },
  { value: "60%", label: "Faster lane throughput", icon: Workflow },
];

const diagrams = [
  {
    id: "journey",
    label: "Vehicle Journey",
    icon: Radio,
    title: "Vehicle Journey Flow",
    description:
      "End-to-end transaction — from lane entry to dashboard update — typically completed in under 200 ms.",
    component: <ClientOnly fallback={<DiagramFallback h={560} />}><VehicleJourneyDiagram /></ClientOnly>,
  },
  {
    id: "architecture",
    label: "Architecture",
    icon: Layers,
    title: "Five-Layer Platform Architecture",
    description:
      "From field sensors to operator command centre — interoperable, horizontally scalable, secure by design.",
    component: <ClientOnly fallback={<DiagramFallback h={700} />}><ArchitectureDiagram /></ClientOnly>,
  },
  {
    id: "payment",
    label: "Charging & Payments",
    icon: Cpu,
    title: "Charging & Payment Flow",
    description:
      "Tariff engine routes transactions through prepaid wallets or open payments, settled via PCI-DSS gateway.",
    component: <ClientOnly fallback={<DiagramFallback h={520} />}><PaymentDiagram /></ClientOnly>,
  },
  {
    id: "enforcement",
    label: "Enforcement",
    icon: ShieldCheck,
    title: "Violation & Enforcement Workflow",
    description:
      "Detection through evidence capture, adjudication and e-challan issuance — with operator review for low-confidence cases.",
    component: <ClientOnly fallback={<DiagramFallback h={520} />}><EnforcementDiagram /></ClientOnly>,
  },
];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-20">
          <div className="flex items-center justify-between mb-12">
            <img src={octaloopLogo} alt="Octaloop" className="h-10 w-auto brightness-0 invert opacity-90" />
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--color-success)] animate-pulse" />
              <Badge variant="outline" className="font-mono uppercase tracking-wider text-xs">
                ETTM Platform · v2.0
              </Badge>
            </div>
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl md:text-6xl font-semibold leading-[1.05]">
            Flow diagrams for the{" "}
            <span className="text-gradient">Electronic Toll &amp; Traffic Management</span> system.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Detect · Charge · Monitor · Enforce · Command. A unified motorway tolling platform
            visualised end-to-end — from the gantry to the command centre.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] text-primary-foreground border-0 hover:opacity-90">
              Explore diagrams <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#diagrams">Jump to flows</a>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="surface-card rounded-xl p-5">
                <m.icon className="h-5 w-5 text-[color:var(--color-primary)]" />
                <div className="mt-3 font-display text-3xl font-semibold text-foreground">
                  {m.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagrams */}
      <section id="diagrams" className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <Badge variant="outline" className="font-mono uppercase tracking-wider text-xs mb-3">
              <Network className="h-3 w-3 mr-1.5" /> System Diagrams
            </Badge>
            <h2 className="text-4xl md:text-5xl font-semibold max-w-3xl">
              Visualising the flow.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Four operational views of the platform — switch between them to inspect the live
              transaction path, layered architecture, payment routing and enforcement lifecycle.
            </p>
          </div>
        </div>

        <Tabs defaultValue="journey" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1.5 bg-card border border-border rounded-xl">
            {diagrams.map((d) => (
              <TabsTrigger
                key={d.id}
                value={d.id}
                className="flex items-center gap-2 py-3 data-[state=active]:bg-[color:var(--color-primary)]/10 data-[state=active]:text-[color:var(--color-primary)] data-[state=active]:shadow-none rounded-lg"
              >
                <d.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{d.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {diagrams.map((d) => (
            <TabsContent key={d.id} value={d.id} className="mt-8 space-y-5">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-semibold">{d.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d.description}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)] animate-pulse" />
                  LIVE TOPOLOGY
                </div>
              </div>
              {d.component}
              <Legend />
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Modules grid */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Badge variant="outline" className="font-mono uppercase tracking-wider text-xs mb-3">
            Platform Overview
          </Badge>
          <h2 className="text-4xl font-semibold">10 modules. One platform.</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Each module is independently deployable — and designed to interoperate across the full
            tolling lifecycle.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[
              ["Vehicle Detection", "ANPR · RFID · axle count"],
              ["Toll Charging", "Tariff · wallets · payments"],
              ["Account Management", "KYC · recharge · support"],
              ["Traffic Management", "Flow · incidents · routing"],
              ["Violation Enforcement", "Evidence · adjudication"],
              ["Reports & Analytics", "KPIs · revenue · forecasts"],
              ["Command & Control", "Lanes · devices · teams"],
              ["Mobile Apps", "Driver wallet & history"],
              ["Incident Response", "Dispatch · tow · SLA"],
              ["Device & IoT Mgmt", "OTA · health · diagnostics"],
            ].map(([title, sub], i) => (
              <div key={title} className="surface-card rounded-xl p-5 group transition-all hover:border-[color:var(--color-primary)]/50">
                <div className="text-[10px] font-mono text-muted-foreground tracking-wider">
                  MODULE {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-base font-semibold">{title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img src={octaloopLogo} alt="Octaloop" className="h-7 w-auto brightness-0 invert opacity-80" />
            <div className="text-sm text-muted-foreground hidden md:block">
              ETTM Platform · Smarter highways · Seamless tolling
            </div>
          </div>
          <div className="text-xs font-mono text-muted-foreground">© Octaloop · Dubai, UAE</div>
        </div>
      </footer>
    </main>
  );
}

function DiagramFallback({ h }: { h: number }) {
  return (
    <div
      className="surface-card rounded-2xl flex items-center justify-center text-xs font-mono text-muted-foreground"
      style={{ height: h }}
    >
      Loading topology…
    </div>
  );
}

function Legend() {
  const items = [
    { label: "Primary path", color: "var(--color-primary)" },
    { label: "Success / Settled", color: "var(--color-success)" },
    { label: "Decision / Compute", color: "var(--color-accent)" },
    { label: "Alert / Violation", color: "var(--color-destructive)" },
    { label: "Evidence / Storage", color: "var(--color-warning)" },
  ];
  return (
    <div className="surface-card rounded-xl px-5 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
      <span className="font-mono uppercase tracking-wider">Legend</span>
      {items.map((i) => (
        <span key={i.label} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: i.color }} />
          {i.label}
        </span>
      ))}
    </div>
  );
}
