import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Construction } from "lucide-react";

export const Route = createFileRoute("/comparateur")({
  head: () => ({ meta: [{ title: "Comparateur — RO Studio" }] }),
  component: () => (
    <div className="mx-auto w-full max-w-7xl p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-primary" /> Comparateur de scénarios
          </CardTitle>
          <CardDescription>Phase 4 — what-if côte à côte.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Lancer plusieurs variantes d'un même modèle et comparer les solutions.
        </CardContent>
      </Card>
    </div>
  ),
});
