# Heilpraktiker-Zentrum Bleialf (Frontend)

Site institucional do Heilpraktiker‑Zentrum Bleialf. Frontend em React + TypeScript, com Vite, Material UI e React Router.

## Requisitos
- Node.js 18+ (recomendado 20+)
- npm 9+ (ou superior)

## Como rodar localmente
```bash
cd /Users/williansantosfonseca/Desktop/heilpraktiker-bleialf/frontend
npm install
npm run dev
```
Abra `http://localhost:5173`.

## Scripts
- `npm run dev`: servidor de desenvolvimento
- `npm run build`: build de produção
- `npm run preview`: preview do build
- `npm run lint`: lint do projeto

## Estrutura principal
- `src/main.tsx`: entrypoint do app
- `src/App.tsx`: rotas
- `src/layout/`: layout (header/footer)
- `src/features/home/`: home e componentes
- `src/components/`: componentes reutilizáveis
- `src/config/`: conteúdo e navegação
- `src/theme.ts`: tema MUI
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
- `*` → NotFound

## Observações
- O conteúdo principal está em `src/features/home/Home.tsx` e `src/config/homeContent.ts`.
- As páginas internas ainda são placeholders e podem ser substituídas por conteúdo real.
