import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  CheckCircle2,
  Clock,
  Sigma,
  Target,
  TrendingUp,
  Zap,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SAMPLE_MODELS } from "@/lib/sample-models";
import { solveLP } from "@/lib/solver";
import type { SolveResult } from "@/lib/lp-schema";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — RO Studio" },
      { name: "description", content: "Vue d'ensemble de vos modèles de programmation linéaire." },
    ],
  }),
  component: DashboardPage,
});

const ACTIVITY = [
  { jour: "Lun", resolutions: 4 },
  { jour: "Mar", resolutions: 7 },
  { jour: "Mer", resolutions: 5 },
  { jour: "Jeu", resolutions: 12 },
  { jour: "Ven", resolutions: 9 },
  { jour: "Sam", resolutions: 3 },
  { jour: "Dim", resolutions: 6 },
];

function statusBadge(status: SolveResult["status"]) {
  const map: Record<string, { label: string; className: string }> = {
    optimal: { label: "Optimal", className: "bg-success/15 text-success border-success/30" },
    feasible: { label: "Faisable", className: "bg-primary/15 text-primary border-primary/30" },
    infeasible: { label: "Infaisable", className: "bg-destructive/15 text-destructive border-destructive/30" },
    unbounded: { label: "Non borné", className: "bg-warning/15 text-warning border-warning/30" },
    undefined: { label: "Indéfini", className: "bg-muted text-muted-foreground border-border" },
    error: { label: "Erreur", className: "bg-destructive/15 text-destructive border-destructive/30" },
  };
  const v = map[status] ?? map.undefined;
  return <Badge variant="outline" className={`${v.className} font-medium`}>{v.label}</Badge>;
}

function DashboardPage() {
  const [demo, setDemo] = useState<SolveResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    solveLP(SAMPLE_MODELS[0]).then((r) => {
      if (mounted) { setDemo(r); setLoading(false); }
    });
    return () => { mounted = false; };
  }, []);

  const saturated = demo?.constraints.filter((c) => c.saturated).length ?? 0;
  const totalCstr = demo?.constraints.length ?? 0;
  const activeVars = demo?.variables.filter((v) => Math.abs(v.value) > 1e-9).length ?? 0;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tableau de bord</h1>
          <p className="text-sm text-muted-foreground">
            Aperçu de vos modèles et de leur résolution.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/bibliotheque">Parcourir la bibliothèque</Link>
          </Button>
          <Button asChild>
            <Link to="/editeur">
              Nouveau modèle <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          icon={<CheckCircle2 className="h-4 w-4" />}
          label="Statut"
          value={loading ? "…" : (demo ? statusBadge(demo.status) : "—")}
          hint="Dernière résolution"
        />
        <KpiCard
          icon={<Target className="h-4 w-4" />}
          label="Valeur Z*"
          value={loading ? "…" : demo?.objective.toFixed(2) ?? "—"}
          hint="Objectif optimal"
          mono
        />
        <KpiCard
          icon={<Clock className="h-4 w-4" />}
          label="Temps"
          value={loading ? "…" : `${demo?.durationMs.toFixed(0) ?? 0} ms`}
          hint="Solveur GLPK (WASM)"
          mono
        />
        <KpiCard
          icon={<Zap className="h-4 w-4" />}
          label="Contraintes saturées"
          value={loading ? "…" : `${saturated} / ${totalCstr}`}
          hint="Tension du modèle"
          mono
        />
        <KpiCard
          icon={<Sigma className="h-4 w-4" />}
          label="Variables actives"
          value={loading ? "…" : `${activeVars}`}
          hint="Valeurs non nulles"
          mono
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-primary" />
                Activité de résolution
              </CardTitle>
              <CardDescription>Dernière semaine — exécutions par jour</CardDescription>
            </div>
            <Badge variant="outline" className="gap-1 text-xs">
              <TrendingUp className="h-3 w-3" /> +18%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ACTIVITY} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="jour" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="resolutions"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    fill="url(#g1)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Solveur</CardTitle>
            <CardDescription>État du moteur GLPK côté client</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Row label="Moteur" value="GLPK 4.65 (WebAssembly)" />
            <Row label="Exécution" value="Navigateur — 0 backend" />
            <Row label="Statut" value={loading ? "Initialisation…" : "Prêt"} />
            <Row label="Latence test" value={loading ? "…" : `${demo?.durationMs.toFixed(0)} ms`} mono />
          </CardContent>
        </Card>
      </div>

      {/* Modèles récents */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Modèles disponibles</CardTitle>
            <CardDescription>TPs pré-chargés — cliquez pour ouvrir</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/bibliotheque">
              Tout voir <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {SAMPLE_MODELS.map((m) => (
              <Link
                key={m.id}
                to="/editeur"
                className="group rounded-lg border border-border bg-card p-4 transition-colors hover:bg-surface-elevated hover:border-primary/40"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">{m.name}</span>
                  <Badge variant="outline" className="text-[10px] uppercase">
                    {m.sense}
                  </Badge>
                </div>
                <p className="line-clamp-2 text-xs text-muted-foreground">{m.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.tags?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
  hint,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  hint?: string;
  mono?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="text-primary">{icon}</span>
          {label}
        </div>
        <div className={`mt-2 text-2xl font-semibold ${mono ? "num" : ""}`}>{value}</div>
        {hint && <div className="mt-0.5 text-[11px] text-muted-foreground">{hint}</div>}
      </CardContent>
    </Card>
  );
}

function Row({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={mono ? "num" : "font-medium"}>{value}</span>
    </div>
  );
}
