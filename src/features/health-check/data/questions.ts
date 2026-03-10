import type { HealthQuestion } from "../types";

export const questions: HealthQuestion[] = [
  {
    id: "energy-level",
    question: "Wie würden Sie Ihr aktuelles Energielevel beschreiben?",
    category: "energy",
    options: [
      { label: "Sehr gut", value: 0 },
      { label: "Gut", value: 1 },
      { label: "Oft niedrig", value: 2 },
      { label: "Sehr niedrig", value: 3 },
    ],
  },
  {
    id: "sleep-quality",
    question: "Wie ist Ihre Schlafqualität in letzter Zeit?",
    category: "sleep",
    options: [
      { label: "Sehr gut", value: 0 },
      { label: "Meistens gut", value: 1 },
      { label: "Unruhig", value: 2 },
      { label: "Sehr schlecht", value: 3 },
    ],
  },
  {
    id: "stress-level",
    question: "Wie stark fühlen Sie sich im Alltag gestresst?",
    category: "stress",
    options: [
      { label: "Kaum", value: 0 },
      { label: "Manchmal", value: 1 },
      { label: "Oft", value: 2 },
      { label: "Sehr stark", value: 3 },
    ],
  },
  {
    id: "headaches",
    question: "Haben Sie häufig Kopfschmerzen oder Druck im Kopf?",
    category: "pain",
    options: [
      { label: "Nie", value: 0 },
      { label: "Selten", value: 1 },
      { label: "Manchmal", value: 2 },
      { label: "Sehr oft", value: 3 },
    ],
  },
  {
    id: "digestion",
    question: "Wie würden Sie Ihre Verdauung beschreiben?",
    category: "digestion",
    options: [
      { label: "Sehr gut", value: 0 },
      { label: "Meistens gut", value: 1 },
      { label: "Manchmal empfindlich", value: 2 },
      { label: "Oft problematisch", value: 3 },
    ],
  },
  {
    id: "concentration",
    question: "Wie oft fühlen Sie sich unkonzentriert oder mental erschöpft?",
    category: "stress",
    options: [
      { label: "Nie", value: 0 },
      { label: "Selten", value: 1 },
      { label: "Oft", value: 2 },
      { label: "Sehr oft", value: 3 },
    ],
  },
  {
    id: "body-tension",
    question: "Leiden Sie unter Verspannungen im Rücken, Nacken oder Schultern?",
    category: "pain",
    options: [
      { label: "Nein", value: 0 },
      { label: "Selten", value: 1 },
      { label: "Regelmäßig", value: 2 },
      { label: "Sehr häufig", value: 3 },
    ],
  },
  {
    id: "immune-stability",
    question: "Wie stabil fühlen Sie sich gesundheitlich insgesamt?",
    category: "immune",
    options: [
      { label: "Sehr stabil", value: 0 },
      { label: "Eher stabil", value: 1 },
      { label: "Etwas anfällig", value: 2 },
      { label: "Sehr anfällig", value: 3 },
    ],
  },
];