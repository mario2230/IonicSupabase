# IonicSupabase

Aplicação híbrida construída com **Ionic Vue**, **Vue 3** e **TypeScript**, com autenticação e armazenamento de dados integrados ao **Supabase**. O projeto usa **Vite** no desenvolvimento web e **Capacitor** para a versão Android.

## Funcionalidades

- Cadastro com e-mail, senha, nome, apelido, data de nascimento e foto de perfil.
- Login e logout com Supabase Auth.
- Consulta e exibição dos dados e da foto do perfil.
- Proteção da rota de perfil para usuários autenticados.
- Aplicativo Android configurado com Capacitor.

> A rota `/tabs/RecPass` existe, mas a tela atual ainda é um conteúdo de exemplo; o fluxo de recuperação de senha não está implementado na interface.

## Tecnologias

- Vue 3 e TypeScript
- Ionic Vue e Ionic Vue Router
- Supabase Auth, Database e Storage
- Vite
- Capacitor para Android
- Vitest e Cypress para testes
- ESLint

## Estrutura do projeto

```text
.
├── android/                 # Projeto nativo Android/Capacitor
├── public/                  # Arquivos públicos
├── src/
│   ├── app/                 # Serviços da aplicação
│   ├── components/          # Componentes reutilizáveis
│   ├── router/              # Rotas e proteção de páginas
│   ├── service/             # Autenticação e operações de perfil
│   ├── theme/               # Estilos e variáveis do tema
│   ├── views/               # Telas de cadastro, login e perfil
│   ├── App.vue              # Componente raiz
│   ├── main.ts              # Inicialização do Ionic e Vue
│   └── supabase.ts          # Cliente Supabase
├── tests/
│   ├── e2e/                 # Testes end-to-end com Cypress
│   └── unit/                # Testes unitários com Vitest
├── capacitor.config.ts      # Configuração do Capacitor
├── cypress.config.ts        # Configuração do Cypress
├── package.json             # Dependências e scripts
└── vite.config.ts           # Configuração do Vite e Vitest
```

## Pré-requisitos

- Node.js e npm
- Um projeto configurado no Supabase
- Para executar no Android: Android Studio e o SDK Android

## Configuração do Supabase

1. Configure a autenticação por e-mail e senha no projeto Supabase.
2. Crie uma tabela `perfil` com os campos usados pela aplicação:
   - `id`, correspondente ao UUID do usuário autenticado;
   - `nome`;
   - `data_nascimento`;
   - `nickname`;
   - `foto_url`.
3. Garanta que exista uma linha em `perfil` para cada usuário cadastrado. O código atual atualiza a linha existente.
4. Crie no Supabase Storage o bucket `fotos-perfil` e configure as políticas de acesso necessárias para upload e leitura das imagens.
5. Copie `.env-example` para `.env` e preencha as variáveis:

```env
VITE_APP_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_APP_SUPABASE_KEY=SUA_CHAVE_PUBLICA_DO_SUPABASE
```

Use uma chave pública apropriada para o cliente; nunca coloque uma chave `service_role` no frontend.

## Instalação e execução

Instale as dependências:

```bash
npm ci
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação.

## Scripts disponíveis

```bash
npm run dev                   # Inicia o servidor de desenvolvimento
npm run build                 # Verifica os tipos e gera a versão de produção
npm run preview               # Pré-visualiza a versão de produção
npm run lint                  # Executa o ESLint
npm run test:unit -- --run    # Executa os testes unitários uma vez
npm run test:e2e              # Executa os testes end-to-end com Cypress
```

Os testes presentes são exemplos iniciais e podem precisar ser ajustados para corresponder às telas e rotas atuais do projeto.

## Android

Após gerar a versão web, sincronize os arquivos com o projeto nativo:

```bash
npm run build
npx cap sync android
npx cap open android
```

O último comando abre o projeto Android no Android Studio.
