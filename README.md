# Projeto Fullstack Laravel + React

## Requisitos

-   Docker Desktop instalado e rodando
-   Git instalado

## Como rodar

1. Clone o repositório

```bash
git clone https://github.com/seuusuario/fullstack-php-laravel-react.git
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

4. Acesse a aplicação

Abra no navegador:

http://localhost:8000
