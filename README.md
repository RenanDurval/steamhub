# StreamHub 🎬

**StreamHub** é um agregador de streaming inteligente projetado como um produto SaaS (Software as a Service). Ele centraliza a experiência de descoberta de filmes e séries, permitindo que os usuários encontrem o que assistir, gerenciem sua watchlist e economizem em assinaturas.

![StreamHub UI](./apps/web/public/hero-preview.png)
*(Nota: Adicione um screenshot da UI aqui)*

## 🚀 Funcionalidades Principais

-   **Busca Unificada (TMDB)**: Pesquise filmes e séries em todos os serviços de streaming de uma só vez.
-   **Minha Lista (Watchlist)**: Salve seus favoritos em uma lista única e cross-platform, persistida no Firestore.
-   **Gatekeeping Premium**: Funcionalidades exclusivas (como o "Modo Aleatório") bloqueadas para usuários Free, incentivando o upgrade.
-   **SEO Programático**: Milhares de landing pages dinâmicas (ex: `/collections/melhores-filmes-terror-netflix`) geradas automaticamente para atrair tráfego orgânico.
-   **UI Premium**: Interface moderna com Glassmorphism, animações fluidas e Dark Mode OLED.

## 🛠️ Tech Stack

Este projeto utiliza um monorepo gerenciado por **Turborepo**.

### Frontend (`apps/web`)
-   **Framework**: Next.js 14 (App Router)
-   **Estilização**: TailwindCSS + Framer Motion
-   **Ícones**: Lucide React

### Backend (`apps/api`)
-   **Framework**: NestJS
-   **Banco de Dados**: Firebase Firestore
-   **Auth**: Firebase Authentication (Google/Email)
-   **Integrações**: TMDB API

## 📂 Estrutura do Projeto

```
streamhub/
├── apps/
│   ├── api/          # Backend NestJS
│   └── web/          # Frontend Next.js
├── documentacao/     # Documentação Técnica e de Negócio
│   ├── architecture_design.md
│   ├── tech_roadmap.md
│   ├── saas_growth_strategy.md
│   └── ...
├── packages/         # Pacotes compartilhados (UI, Configs)
└── turbo.json        # Configuração do Pipeline de Build
```

## ⚡ Como Rodar

1.  **Instale as dependências**:
    ```bash
    npm install
    ```

2.  **Configure as Variáveis de Ambiente**:
    -   Crie `.env` em `apps/api` (veja `.env.example`) com suas chaves do TMDB e Firebase Admin.
    -   Crie `.env.local` em `apps/web` com as chaves públicas do Firebase.

3.  **Execute o projeto**:
    ```bash
    npx turbo run dev
    ```
    -   Frontend: `http://localhost:3000`
    -   Backend: `http://localhost:3333`

## 📄 Documentação

Toda a documentação detalhada (Arquitetura, Plano de Implementação, Estratégia SaaS) está disponível na pasta [`/documentacao`](./documentacao).
