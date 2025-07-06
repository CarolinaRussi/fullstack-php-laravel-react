# Projeto Fullstack Laravel + React

Este projeto é uma aplicação fullstack desenvolvida com Laravel (PHP) no backend e React no frontend, com gerenciamento de estado via Redux e estilização com Tailwind CSS. O sistema simula uma plataforma de solicitações acadêmicas, permitindo que usuários estudantes façam pedidos e acompanhem o andamento, enquanto administradores podem visualizar, responder e atualizar o status dessas solicitações.

A API é protegida por autenticação via token (sanctum) e o sistema segue boas práticas como princípios SOLID, estrutura MVC, uso de Docker e integração com banco de dados MySQL.

## Requisitos

- Docker Desktop instalado e rodando
- Git instalado

# Backend (Laravel API)

## Como rodar o backend

1. Clone o repositório e entre na pasta backend

```bash
git clone https://github.com/CarolinaRussi/fullstack-php-laravel-react.git
cd fullstack-php-laravel-react/backend
```

2. Suba os containers Docker (será feito build e start)

```bash
docker-compose up -d --build
```

3. Entre no container Laravel para rodar as migrations (apenas na primeira vez)

```bash
docker exec -it laravel-app sh
php artisan migrate
exit
```

4. Acesse a API no navegador ou via cliente HTTP (Postman, Insomnia, etc):

http://localhost:8000/api

# Frontend (React + Redux + Tailwind)

## Como rodar o frontend

1. Em outro terminal, vá para a pasta `frontend`:

```bash
cd ../frontend
```

2. Instale as dependências do projeto:

```bash
npm install
```

3. Crie um arquivo .env na raiz da pasta frontend com a URL da API:

VITE_API_URL=http://localhost:8000/api

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse o navegador:

http://localhost:5173
