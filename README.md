Docker API Aula

API RESTful desenvolvida com Node.js, Express e MongoDB, executada em containers Docker. O projeto demonstra a construção de uma aplicação backend completa utilizando arquitetura baseada em Controllers, Routes, Services e Models, além da integração com APIs públicas externas e documentação via Swagger.

Tecnologias Utilizadas
Node.js 20
Express.js
MongoDB
Mongoose
Docker
Docker Compose
Mongo Express
Swagger (OpenAPI)
Fetch API (Node.js)
Arquitetura do Projeto
docker-api-aula/
│
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   │
│   ├── controllers/
│   │   ├── task.controller.js
│   │   └── external.controller.js
│   │
│   ├── middlewares/
│   │
│   ├── models/
│   │   └── task.model.js
│   │
│   ├── routes/
│   │   ├── task.routes.js
│   │   └── external.routes.js
│   │
│   ├── services/
│   │   └── external.service.js
│   │
│   └── app.js
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
└── .env
Funcionalidades
Gerenciamento de Tasks
Criar tarefas
Listar tarefas
Buscar tarefa por ID
Atualizar tarefa completamente (PUT)
Atualizar parcialmente (PATCH)
Remover tarefa
Integração com APIs Externas
Consulta de CEP utilizando ViaCEP
Consulta de previsão do tempo utilizando Open-Meteo
Consumo de posts utilizando JSONPlaceholder
Ferramentas de Apoio
Mongo Express para visualização do banco de dados
Swagger para documentação da API
Docker Compose para orquestração dos serviços
Estrutura do Banco de Dados

Collection: tasks

Exemplo de documento:

{
  "_id": "64abc1234def5678901234ab",
  "title": "Estudar Docker",
  "description": "Finalizar o módulo de Docker Compose",
  "completed": false,
  "createdAt": "2026-06-20T12:00:00.000Z",
  "updatedAt": "2026-06-20T12:00:00.000Z"
}
Configuração do Ambiente
Arquivo .env
PORT=3000
MONGO_URL=mongodb://mongo:27017/docker_api_aula
Executando o Projeto
Clonar o Repositório
git clone <url-do-repositorio>
cd docker-api-aula
Instalar Dependências
npm install
Executar com Docker Compose
docker compose up --build

Ou em background:

docker compose up -d --build
Serviços Disponíveis
Serviço	Endereço
API	http://localhost:3000
Swagger	http://localhost:3000/api-docs
Mongo Express	http://localhost:8081
MongoDB	localhost:27017
Endpoints da API
Tasks
Método	Endpoint	Descrição
GET	/tasks	Lista todas as tarefas
GET	/tasks/	Busca uma tarefa por ID
POST	/tasks	Cria uma nova tarefa
PUT	/tasks/	Substitui uma tarefa
PATCH	/tasks/	Atualiza parcialmente uma tarefa
DELETE	/tasks/	Remove uma tarefa
APIs Externas
Método	Endpoint	Descrição
GET	/external/cep/	Consulta endereço pelo CEP
GET	/external/tempo?lat=&lon=	Consulta temperatura atual
GET	/external/posts	Lista posts do JSONPlaceholder
Exemplos de Requisição
Criar Task
POST /tasks
Content-Type: application/json
{
  "title": "Estudar Docker",
  "description": "Revisar Docker Compose",
  "completed": false
}
Atualizar Task
PATCH /tasks/{id}
Content-Type: application/json
{
  "completed": true
}
Consultar CEP
GET /external/cep/01001000
Consultar Clima
GET /external/tempo?lat=-23.55&lon=-46.63
Fluxo da Aplicação
Cliente (Postman/Navegador)
            │
            ▼
      Express Routes
            │
            ▼
      Controllers
            │
            ▼
        Services
            │
            ▼
        Mongoose
            │
            ▼
         MongoDB
Documentação Swagger

Após iniciar a aplicação, a documentação pode ser acessada em:

http://localhost:3000/api-docs
Autor

Projeto desenvolvido para fins acadêmicos na disciplina de Sistemas Distribuídos, utilizando Docker, MongoDB e Node.js para estudo de APIs RESTful e integração com serviços externos.
