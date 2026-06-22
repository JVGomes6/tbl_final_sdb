# CheapShark API — Local Game Database
.
Este repositório contém uma API Node.js (Express) que integra a API externa CheapShark, persiste resultados no MongoDB e oferece uma interface web simples para pesquisa e gerenciamento dos dados.

## Objetivo

Fornecer um serviço que busca ofertas de jogos (via CheapShark), salva/atualiza os registros localmente (upsert) e expõe endpoints para consumo e um frontend estático em `/ui`.

## Requisitos

- Docker e Docker Compose (recomendado)
- Alternativa local: Node.js 20+, npm e uma instância MongoDB (local ou remota)

## Quick start — Docker (recomendado)

1. No diretório do projeto (raiz), suba os containers:

```bash
cd docker-api-aula
docker compose up -d
```

2. Verifique se os serviços subiram corretamente:

```bash
docker compose ps
docker compose logs api --tail=50
```

3. Endpoints úteis após subir o ambiente:

- API: http://localhost:3000
- Frontend: http://localhost:3000/ui
- Swagger (documentação): http://localhost:3000/api-docs
- Mongo Express: http://localhost:8081 (usuário: `admin`, senha: `admin123`)

Observação: o `docker-compose.yml` define um volume persistente para o MongoDB (`mongo_data`).

## Execução local (sem Docker)

1. Acesse a pasta do projeto:

```bash
cd docker-api-aula
```

2. Instale dependências:

```bash
npm install
```

3. Crie um arquivo `.env` a partir de `.env.example` e ajuste `MONGO_URL` se necessário.

Exemplo mínimo de `.env`:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/docker_api_aula
```

4. Execute a API:

```bash
npm start        # produção
npm run dev      # desenvolvimento (requer nodemon)
```

5. Acesse a API e o frontend como indicado na seção Docker.

## Variáveis de ambiente (essenciais)

- `PORT`: porta da aplicação (padrão 3000)
- `MONGO_URL`: string de conexão do MongoDB. Em Docker Compose use `mongodb://mongo:27017/docker_api_aula`.

## Endpoints principais

- `GET /` — Health check
- `GET /games` — Listar todos os jogos salvos
- `GET /games/:id` — Obter jogo por ID
- `GET /games/search?name=...` — Buscar por nome (parcial, case-insensitive)
- `POST /games` — Criar novo jogo
- `PUT /games/:id` — Substituir jogo
- `PATCH /games/:id` — Atualizar parcialmente
- `DELETE /games/:id` — Apagar jogo
- `GET /cheapshark/games/:title` — Buscar na CheapShark e salvar/atualizar localmente

Exemplo rápido via curl:

```bash
curl http://localhost:3000/cheapshark/games/naruto
curl "http://localhost:3000/games/search?name=naruto"
```

## Estrutura relevante

- `src/app.js` — configuração do Express e rotas
- `src/config/database.js` — conexão com MongoDB
- `src/controllers/` — controladores HTTP
- `src/services/` — regras de negócio e integração com CheapShark
- `src/models/` — schemas Mongoose
- `src/frontend/` — frontend estático servido em `/ui`

## Observações importantes

- O `docker-compose.yml` monta o diretório do projeto dentro do container (`.:/app`). Ao desenvolver localmente dentro do container, alterações em código refletem sem rebuild.
- O serviço `mongo-express` está protegido com autenticação básica conforme definido em `docker-compose.yml` (usuário `admin`, senha `admin123`).
- Caso existam problemas de permissão ou diretórios que falhem ao serem excluídos/atualizados, verifique processos locais que possam travar arquivos (Windows Defender, editores, etc.).

## Troubleshooting rápido

- Conexão com MongoDB falha:

```bash
docker compose logs mongo
docker compose down -v
docker compose up -d
```

- Verificar logs da API:

```bash
docker compose logs api --follow
```

## Desenvolvimento e extensões

- Para adicionar rota: criar arquivo em `src/routes/`, implementar controlador e registrar em `src/app.js`.
- Para adicionar modelo: criar `src/models/novo.model.js` com schema Mongoose e utilizar nos serviços.

## Dependências principais

- `express`, `mongoose`, `axios`, `swagger-jsdoc`, `swagger-ui-express`, `dotenv`

## Licença e uso

Projeto de aula. Uso livre para fins educacionais.

---

**Última atualização:** 2026-06-20

