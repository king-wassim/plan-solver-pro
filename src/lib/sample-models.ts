import type { LPModel } from "./lp-schema";

/**
 * Modèles d'exemple pré-chargés (TPs classiques de RO).
 * Chaque TP est représenté en JSON pur — aucun code spécifique.
 */
export const SAMPLE_MODELS: LPModel[] = [
  {
    id: "tp1-production",
    name: "TP1 — Plan de production",
    description: "Maximiser le profit d'une usine fabriquant 2 produits sous contraintes de ressources.",
    tags: ["production", "2 variables", "max"],
    sense: "max",
    variables: [
      { name: "x1", type: "continuous", lb: 0, description: "Unités produit A" },
      { name: "x2", type: "continuous", lb: 0, description: "Unités produit B" },
    ],
    objective: { coefficients: { x1: 30, x2: 50 } },
    constraints: [
      { name: "Atelier 1", coefficients: { x1: 3, x2: 2 }, operator: "<=", rhs: 18 },
      { name: "Atelier 2", coefficients: { x1: 1, x2: 2 }, operator: "<=", rhs: 8 },
      { name: "Atelier 3", coefficients: { x2: 1 }, operator: "<=", rhs: 6 },
    ],
  },
  {
    id: "tp2-mix",
    name: "TP2 — Mix alimentaire",
    description: "Minimiser le coût d'un régime tout en respectant des apports nutritionnels.",
    tags: ["mix", "min", "nutrition"],
    sense: "min",
    variables: [
      { name: "p1", type: "continuous", lb: 0 },
      { name: "p2", type: "continuous", lb: 0 },
      { name: "p3", type: "continuous", lb: 0 },
    ],
    objective: { coefficients: { p1: 4, p2: 6, p3: 5 } },
    constraints: [
      { name: "Protéines", coefficients: { p1: 3, p2: 2, p3: 4 }, operator: ">=", rhs: 12 },
      { name: "Glucides", coefficients: { p1: 2, p2: 5, p3: 1 }, operator: ">=", rhs: 10 },
      { name: "Lipides", coefficients: { p1: 1, p2: 1, p3: 2 }, operator: ">=", rhs: 6 },
    ],
  },
  {
    id: "tp3-investissement",
    name: "TP3 — Allocation d'investissement",
    description: "Répartir un capital sur 3 actifs pour maximiser le rendement attendu.",
    tags: ["finance", "max"],
    sense: "max",
    variables: [
      { name: "a", type: "continuous", lb: 0 },
      { name: "b", type: "continuous", lb: 0 },
      { name: "c", type: "continuous", lb: 0 },
    ],
    objective: { coefficients: { a: 0.08, b: 0.12, c: 0.06 } },
    constraints: [
      { name: "Capital total", coefficients: { a: 1, b: 1, c: 1 }, operator: "<=", rhs: 100000 },
      { name: "Risque max", coefficients: { a: 0.2, b: 0.6, c: 0.1 }, operator: "<=", rhs: 30000 },
      { name: "Min sécurisé", coefficients: { c: 1 }, operator: ">=", rhs: 20000 },
    ],
  },
];

export const getModelById = (id: string) => SAMPLE_MODELS.find((m) => m.id === id);
