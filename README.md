# CheapShark API — Local Game Database

Uma API Node.js + Express + MongoDB que consome a API externa **CheapShark** para buscar jogos, salva os resultados localmente no MongoDB e oferece uma interface web para gerenciamento local dos dados.

---

## Funcionalidades

- **Busca Externa**: Integração com API CheapShark para buscar jogos por título
- **Persistência Automática**: Resultados são salvos automaticamente no MongoDB local (upsert)
- **Busca Local**: Pesquisa jogos já salvos por nome (case-insensitive)
- **CRUD Completo**: Criar, ler, atualizar (total e parcial) e deletar jogos localmente
- **Frontend Web**: Interface para buscar e visualizar dados
- **Documentação Swagger**: API documentada em `/api-docs`
- **Docker Compose**: Ambiente completo (API, MongoDB, Mongo Express)

---

##  Requisitos

- **Docker** e **Docker Compose** (recomendado)
- Ou localmente: **Node.js 20+**, **npm**, **MongoDB 6+**

---

##  Como Rodar

### Opção 1: Com Docker Compose (Recomendado)

```bash
cd docker-api-aula
docker compose up -d
```

Serviços ficarão disponíveis em:
- **API**: http://localhost:3000
- **Frontend**: http://localhost:3000/ui
- **Swagger**: http://localhost:3000/api-docs
- **MongoDB Express**: http://localhost:8081 (admin / admin123)

### Opção 2: Localmente (sem Docker)

```bash
# Instalar dependências
npm install

# Configurar arquivo .env (copiar de .env.example se não existir)
# Garantir que MONGO_URL aponta para sua instância MongoDB local

# Rodar servidor
npm start

# Ou em desenvolvimento (com nodemon)
npm run dev
```

---

## Estrutura de Pastas

```
docker-api-aula/
├── src/
│   ├── app.js                    # Configuração principal do Express
│   ├── config/
│   │   ├── database.js           # Conexão MongoDB
│   │   └── swagger.js            # Documentação Swagger/OpenAPI
│   ├── controllers/
│   │   ├── game.controller.js    # Lógica de requisições (Games)
│   │   ├── cheapshark.controller.js  # Requisições externas (CheapShark)
│   │   ├── task.controller.js    # Tarefas (exemplo)
│   │   └── external.controller.js
│   ├── models/
│   │   ├── game.model.js         # Schema do MongoDB (Games)
│   │   └── task.model.js
│   ├── services/
│   │   ├── game.service.js       # Lógica de negócio (Games)
│   │   ├── cheapshark.service.js # Integração CheapShark + Upsert
│   │   ├── task.service.js
│   │   └── external.service.js
│   ├── routes/
│   │   ├── game.routes.js        # Endpoints de Games
│   │   ├── cheapshark.routes.js  # Endpoints CheapShark
│   │   ├── task.routes.js
│   │   └── external.routes.js
│   └── frontend/
│       ├── index.html            # Interface web
│       ├── app.js                # Lógica frontend
│       └── styles.css            # Estilos
├── Dockerfile                    # Imagem Docker Node.js
├── docker-compose.yml            # Orquestração (API + MongoDB)
├── package.json                  # Dependências
├── .env                          # Variáveis de ambiente
├── .env.example                  # Template de .env
└── README.md                     # Este arquivo
```

---

## Endpoints Principais

### Games (CRUD Local)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/games` | Listar todos os jogos salvos |
| `GET` | `/games/:id` | Obter jogo por ID MongoDB |
| `GET` | `/games/search?name=naruto` | Buscar por nome (partial, case-insensitive) |
| `POST` | `/games` | Criar novo jogo |
| `PUT` | `/games/:id` | Atualizar jogo completamente |
| `PATCH` | `/games/:id` | Atualização parcial de jogo |
| `DELETE` | `/games/:id` | Deletar jogo |

### CheapShark (Integração Externa)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/cheapshark/games/:title` | Buscar jogos na API externa **e salvar localmente** |

**Exemplo:**
```bash
curl http://localhost:3000/cheapshark/games/naruto
```

Resultado: Array de jogos salvos no MongoDB.

### Health Check

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/` | Status da API |

---

##  Schema de Dados (Game)

```javascript
{
  gameID: String,           // ID único da CheapShark
  steamAppID: String,       // App ID do Steam (null se N/A)
  cheapest: Number,         // Preço mais barato encontrado
  cheapestDealID: String,   // ID do melhor deal
  external: String,         // Nome do jogo (fonte externa)
  internalName: String,     // Nome processado (sem espacos)
  thumb: String,            // URL da imagem
  createdAt: Date,          // Data de criação (automático)
  updatedAt: Date           // Data última atualização (automático)
}
```

---

##  Frontend (`/ui`)

Acesse **http://localhost:3000/ui** para:

1. **Buscar Jogos na CheapShark**
   - Digite o título (ex: `naruto`, `zelda`, `minecraft`)
   - Clique "Buscar e salvar"
   - Resultados aparecem e são persistidos no MongoDB

2. **Ver Jogos Salvos Localmente**
   - Seção "Jogos salvos na base" carrega automaticamente
   - Clique "Atualizar lista local" para recarregar

---

##  Exemplos de Uso

### Via cURL

**Buscar na CheapShark e salvar localmente:**
```bash
curl http://localhost:3000/cheapshark/games/naruto
```

**Buscar localmente por nome:**
```bash
curl "http://localhost:3000/games/search?name=naruto"
```

**Listar todos os jogos salvos:**
```bash
curl http://localhost:3000/games
```

**Criar um jogo manualmente:**
```bash
curl -X POST http://localhost:3000/games \
  -H "Content-Type: application/json" \
  -d '{
    "gameID": "999",
    "cheapest": 29.99,
    "internalName": "MyGame"
  }'
```

**Deletar um jogo:**
```bash
curl -X DELETE http://localhost:3000/games/{id}
```

### Via PowerShell

```powershell
# Buscar
$result = Invoke-RestMethod -Uri 'http://localhost:3000/cheapshark/games/naruto'
$result | ConvertTo-Json -Depth 6

# Ver todos
Invoke-RestMethod -Uri 'http://localhost:3000/games' | ConvertTo-Json -Depth 6

# Buscar local
Invoke-RestMethod -Uri 'http://localhost:3000/games/search?name=naruto'
```

---

##  Variáveis de Ambiente (.env)

```env
PORT=3000                                    # Porta da API
MONGO_URL=mongodb://mongo:27017/docker_api_aula  # URL MongoDB
```

**Notas:**
- Em Docker Compose, use `mongodb://mongo:27017/...` (serviço `mongo`)
- Localmente, use `mongodb://localhost:27017/...` ou string de conexão remota

---

##  Documentação Swagger

Acesse http://localhost:3000/api-docs para explorar interativamente todos os endpoints documentados.

---

##  Fluxo de Dados

```
Usuário busca "naruto" no /ui
    ↓
Frontend chama GET /cheapshark/games/naruto
    ↓
cheapshark.controller → cheapshark.service
    ↓
cheapshark.service chama API externa (https://www.cheapshark.com/api/1.0/games?title=naruto)
    ↓
Resultados mapeados e fazem UPSERT no MongoDB (findOneAndUpdate com upsert: true)
    ↓
game.model.js persiste documentos na coleção `games`
    ↓
Resposta JSON retorna aos dados salvos
    ↓
Frontend renderiza lista de jogos
```

---

##  Troubleshooting

### Erro: "Impossível conectar ao MongoDB"

```bash
docker compose logs mongo
docker compose down -v
docker compose up -d
```

### Erro: "Route.get() requires a callback"

Significa que uma função de controlador não foi exportada corretamente. Verifique `module.exports` em:
- `src/controllers/game.controller.js`
- `src/services/game.service.js`

### API não retorna dados após busca

1. Verifique conexão com MongoDB (ver logs: `docker compose logs api`)
2. Confirme que a API externa (CheapShark) está acessível
3. Teste manualmente em http://localhost:3000/games para ver se há dados

### Limpar base de dados completa

```bash
docker compose down -v              # Remove volumes do Mongo
docker compose up -d                # Recria tudo limpo
```

---

##  Dependências Principais

- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **axios**: Cliente HTTP (chamadas à API externa)
- **swagger-jsdoc** + **swagger-ui-express**: Documentação Swagger
- **dotenv**: Gerenciamento de variáveis de ambiente

---

##  Serviços Docker

| Serviço | Imagem | Porta | Função |
|---------|--------|-------|--------|
| `api` | `node:20-alpine` | 3000 | API Node.js |
| `mongo` | `mongo:latest` | 27017 | Banco de dados |
| `mongo-express` | `mongo-express:latest` | 8081 | Interface web MongoDB |

---

##  Notas de Desenvolvimento

- **Frontend estático**: Servido em `/ui` a partir de `src/frontend/`
- **Busca local case-insensitive**: Usa RegExp com flag `i`
- **Upsert automático**: Ao chamar CheapShark, duplicatas são atualizadas (não criadas)
- **Logs**: Todos os eventos importantes são logados no console do container

---

##  Como Estender o Projeto

### Adicionar nova rota

1. Criar arquivo em `src/routes/novo.routes.js`
2. Implementar controlador em `src/controllers/novo.controller.js`
3. Implementar serviço em `src/services/novo.service.js`
4. Registrar em `src/app.js`: `app.use('/novo', require('./routes/novo.routes.js'))`

### Adicionar novo modelo

1. Criar arquivo em `src/models/novo.model.js` com Mongoose Schema
2. Exportar: `module.exports = mongoose.model('Novo', NovoSchema)`
3. Usar em serviços/controllers

---

##  Licença

Projeto de aula — Livre para uso educacional.

---

##  Autor

Desenvolvido como exemplo de integração entre APIs externas, MongoDB e Node.js.

---

##  Suporte

Para dúvidas ou problemas:
1. Verifique logs: `docker compose logs`
2. Teste endpoints em Swagger: http://localhost:3000/api-docs
3. Inspecione dados em Mongo Express: http://localhost:8081

---

**Última atualização:** 2026-06-20

