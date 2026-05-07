import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Construction } from "lucide-react";

export const Route = createFileRoute("/resultats")({
  head: () => ({ meta: [{ title: "Résultats — RO Studio" }] }),
  component: () => (
    <div className="mx-auto w-full max-w-7xl p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-primary" /> Résultats & analyse
          </CardTitle>
          <CardDescription>Phase 3 — solution, sensibilité, visualisations.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Onglets Solution / Sensibilité / Contraintes / Visualisations adaptatives.
        </CardContent>
      </Card>
    </div>
  ),
});
