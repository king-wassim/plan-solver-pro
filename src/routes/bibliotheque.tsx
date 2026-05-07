import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Construction } from "lucide-react";

export const Route = createFileRoute("/bibliotheque")({
  head: () => ({ meta: [{ title: "Bibliothèque — RO Studio" }] }),
  component: () => <Stub title="Bibliothèque de modèles" />,
});

function Stub({ title }: { title: string }) {
  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-primary" /> {title}
          </CardTitle>
          <CardDescription>Phase 2 — bientôt disponible.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Cette section listera tous les modèles (TPs pré-chargés et créations utilisateur)
          avec filtres, tags et actions « Charger / Dupliquer / Comparer ».
        </CardContent>
      </Card>
    </div>
  );
}
