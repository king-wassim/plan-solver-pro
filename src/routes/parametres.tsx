import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/parametres")({
  head: () => ({ meta: [{ title: "Paramètres — RO Studio" }] }),
  component: () => (
    <div className="mx-auto w-full max-w-3xl p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-primary" /> Paramètres
          </CardTitle>
          <CardDescription>Préférences utilisateur (à venir).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Thème, solveur préféré, précision, format d'export par défaut.</p>
        </CardContent>
      </Card>
    </div>
  ),
});
