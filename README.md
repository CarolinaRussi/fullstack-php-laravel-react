# Projeto Fullstack Laravel + React

## Requisitos

-   Docker Desktop instalado e rodando
-   Git instalado

# Backend (Laravel API)

## Como rodar o backend

1. Clone o repositório e entre na pasta backend

```bash
git clone https://github.com/CarolinaRussi/fullstack-php-laravel-react.git
cd fullstack-php-laravel-react
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

Abra no navegador:

http://localhost:8000

# Frontend
(Instruções para rodar o frontend serão adicionadas futuramente.)
