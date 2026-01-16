# Implementação do MVP (Pivot: Web + Firebase)

> [!NOTE]
> Ajuste de rota para focar na validação rápida via Web App Responsivo.

## Stack Definida
- **Frontend**: Next.js (React) - dentro de `apps/web`.
- **Backend API**: NestJS - `apps/api` (Já existente, será adaptado).
- **Banco de Dados/Auth**: Firebase (Firestore + Auth).

## Plano de Ação

### 1. Setup do Frontend Web (Next.js)
Criar o app Next.js dentro do monorepo.
- `apps/web`
- UI Minimalista (TailwindCSS).

### 2. Configuração do Firebase no Backend
- Instalar `firebase-admin` no NestJS.
- Criar `FirebaseModule` para conectar no Firestore.
- Criar `AuthGuard` para validar tokens JWT do Firebase Auth.

### 3. Integração Frontend <-> Backend
- Frontend faz login direto no Firebase Auth (Client SDK).
- Frontend envia o ID Token para o Backend NestJS.
- Backend valida o token e retorna/salva dados do usuário no Firestore.

### 4. Funcionalidades de Negócio (MVP - Concluído)
- **Seleção de Serviços**: O usuário marca [x] Netflix [x] Prime. Salvo no Firestore.
- **Feed**: Backend busca "Trending" no TMDB e filtra pelo que o usuário tem. (**Lógica Simples de Recomendação**).
- **Busca**: Proxy para o TMDB Search.
- **Watchlist**: Salvar favoritos.

## Fase 2: SaaS Evolution (Em Andamento)

### 1. UI/UX Premium
- **Design System**: Glassmorphism, Dark Mode profundo, tipografia refinada.
- **Animações**: Framer Motion para transições fluidas.
- **Ícones**: Lucide React.

### 2. Monetização & Retenção
- **Gatekeeping**: Bloquear funcionalidades (ex: Shuffle) para cobrar assinatura.
- **Pagamentos**: Integração futura.

### 3. Growth & SEO (Foco Atual)
- **Programmatic SEO**: Gerar milhares de páginas de longo-cauda (Long Tail Keywords).
    -   Ex: `domain.com/collections/best-horror-on-netflix`
    -   Ex: `domain.com/collections/top-rated-series-2024`
-   **Tecnologia**: Next.js ISR (Incremental Static Regeneration) para criar páginas rápidas que o Google adora.
-   **Metadados**: Títulos otimizados, OpenGraph Images dinâmicas.
