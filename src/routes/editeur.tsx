import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Construction } from "lucide-react";

export const Route = createFileRoute("/editeur")({
  head: () => ({ meta: [{ title: "Éditeur — RO Studio" }] }),
  component: () => (
    <div className="mx-auto w-full max-w-7xl p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-primary" /> Éditeur de modèle
          </CardTitle>
          <CardDescription>Phase 3 — formulaire, mode texte LP et JSON.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Définition des variables, contraintes et fonction objectif avec validation
          temps réel et aperçu LaTeX.
        </CardContent>
      </Card>
    </div>
  ),
});
