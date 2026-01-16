# Guia de Setup - StreamHub MVP

O sistema está montado! Para que tudo funcione com dados reais e autenticação, precisamos configurar as chaves de API.

## 1. Configurar Backend (API)
Arquivo: `apps/api/.env` (Crie este arquivo baseado no `.env.example`)

1.  **TMDB API Key**:
    -   Acesse [themoviedb.org](https://www.themoviedb.org/documentation/api) e crie uma conta.
    -   Vá em Configurações > API e gere uma chave.
    -   Cole em: `TMDB_API_KEY=...`

2.  **Firebase Admin SDK**:
    -   No Console do Firebase > Configurações do Projeto > Contas de Serviço.
    -   Clique em "Gerar nova chave privada" (baixa um JSON).
    -   Abra o JSON e copie os valores para as variáveis `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` e `FIREBASE_PRIVATE_KEY`.
    -   *Dica*: Para a Private Key, copiue tudo entre as aspas, inclusive os `\n`.

## 2. Configurar Frontend (Web)
Arquivo: `apps/web/.env.local` (Crie este arquivo baseado no `.env.local.example`)

1.  **Firebase Client Config**:
    -   No Console do Firebase > Configurações do Projeto > Geral.
    -   Adicione um app "Web" (</>).
    -   Copie o objeto `firebaseConfig` e preencha as variáveis correspondentes.

## 3. Como Rodar
Na raiz do projeto (`streamhub/`):

```bash
# Instalar todas as dependências (caso não tenha feito)
npm install

# Rodar Frontend e Backend simultaneamente
npm run dev
```

-   **Web**: http://localhost:3000
-   **API**: http://localhost:3001 (ou 3002, veja o console)
