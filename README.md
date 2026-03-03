# Heilpraktiker-Zentrum Bleialf

Site institucional do Heilpraktiker‑Zentrum Bleialf, agora em Next.js fullstack (frontend + API no mesmo projeto).

## Requisitos
- Node.js 18+ (recomendado 20+)
- npm 9+ (ou superior)

## Como rodar localmente
```bash
npm install
npm run dev
```
Abra `http://localhost:3000`.

## Scripts
- `npm run dev`: servidor de desenvolvimento
- `npm run build`: build de produção
- `npm run start`: servidor de produção
- `npm run lint`: lint do projeto

## Estrutura principal
- `src/app/`: rotas (App Router)
- `src/components/`: componentes reutilizáveis
- `src/features/`: seções da Home e páginas
- `src/config/`: conteúdo e navegação
- `src/theme.ts`: tema do Material UI
- `public/hero/`: imagens do hero

## Rotas
- `/` → Home
- `/team` → Página simples (placeholder)
- `/kompetenz` → Página simples (placeholder)
- `/aktuelles` → Página simples (placeholder)
- `/kontakt` → Página simples (placeholder)
- `/disclaimer` → Página simples (placeholder)
- `/impressum` → Página simples (placeholder)
- `/datenschutz` → Página simples (placeholder)
- `/api/health` → API de saúde (JSON)

## Observações
- O conteúdo principal está em `src/features/home/Home.tsx` e `src/config/homeContent.ts`.
- As páginas internas ainda são placeholders e podem ser substituídas por conteúdo real.
