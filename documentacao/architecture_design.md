# Arquitetura do Sistema - StreamHub (MVP Validation)

> [!IMPORTANT]
> Versão simplificada para validação de mercado.

## 1. Visão Geral
Sistema focado em Experiência Web (Responsiva) com infraestrutura serverless/gerenciada para velocidade.

### Tech Stack
-   **Frontend**: Next.js (React).
    -   *Hospedagem*: Vercel.
-   **Backend**: Node.js (NestJS).
    -   *Hospedagem*: Cloud Run ou Railway.
-   **Banco de Dados & Auth**: Firebase.
    -   *Auth*: Google Login + Email/Pass.
    -   *Firestore*: Perfis de usuário, Lista de Interesses, Histórico.

## 2. Fluxo de Dados

```mermaid
graph LR
    Client[Web App (Next.js)] --1. Login--> FirebaseAuth[Firebase Auth]
    FirebaseAuth --2. Token--> Client
    Client --3. API Call (Bearer Token)--> API[NestJS Backend]
    API --4. Validate Token--> FirebaseAdmin[Firebase Admin SDK]
    API --5. Fetch Metadata--> TMDB[TMDB API]
    API --6. Read/Write User Data--> Firestore[(Firestore DB)]
```

## 3. Modelo de Dados (Firestore - NoSQL)

**Collection: `users`**
```json
{
  "uid": "firebase_auth_uid",
  "email": "user@example.com",
  "services": ["netflix", "prime_video"],
  "genres": ["action", "sci-fi"],
  "watchlist": [
    { "tmdb_id": 123, "title": "Inception", "added_at": "timestamp" }
  ]
}
```

## 4. Lógica de Recomendação (Simplificada)
1.  **Filtro Rígido**: Mostrar apenas conteúdos disponíveis nos serviços selecionados (`services`).
2.  **Score Básico**:
    -   +1 ponto se for de um gênero favorito (`genres`).
    -   +2 pontos se for "Trending" nesta semana.
    -   Ordenar por Score Descendente.

## 5. Estratégia de Monetização (Híbrida)

### 1. Freemium (B2C)
- **Free**: 
  - Alertas de lançamentos.
  - Busca unificada simples.
  - Watchlist básica.
- **Premium (R$ 9,90 - R$ 19,90/mês)**:
  - **Recomendações Avançadas**: IA que entende contexto ("Filme triste para ver chovendo").
  - **Comparador de Planos**: "Você gasta R$ 100 com assinaturas, mas só assiste conteúdo da Netflix. Cancele o resto e alugue filmes avulsos."
  - **Alertas Personalizados**: "Saiu um filme do diretor X".
  - **Experiência Ad-free**.

### 2. Afiliados (Performance)
- Ganho de comissão por lead gerado (CPA):
  - Assinaturas de Prime Video, Globoplay, Disney+.
  - Aluguel de filmes (Apple TV, YouTube Movies).

### 3. B2B (Licenciamento de IA)
- API White-label do motor de recomendação para:
  - Operadoras de telefonia (para bundles de app).
  - Fabricantes de Smart TV (integrar no SO da TV).

### 4. Publicidade Inteligente
- Anúncios nativos e não intrusivos baseados no *Taste Profile* do usuário.
- Ex: Usuário ama Sci-Fi -> Anúncio do novo jogo de Star Wars.
