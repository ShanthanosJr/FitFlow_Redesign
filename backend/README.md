# FitFlow Backend — NestJS Core API

Modular monolith REST + WebSocket API for FitFlow.

## Stack

| Technology | Purpose |
|---|---|
| NestJS (TypeScript) | Web framework, modular structure |
| TypeORM + PostgreSQL | ORM and primary database |
| Redis (ioredis) | Cache, leaderboards, pub/sub |
| Passport JWT | Cognito token verification via JWKS |
| Socket.IO | Real-time WebSocket gateway |
| Swagger / OpenAPI 3 | Auto-generated API docs at `/api/docs` |

## Modules

| Module | Endpoints |
|---|---|
| `auth` | POST /v1/auth/register, /login, /refresh, /logout |
| `users` | GET/PATCH /v1/users/me, GET /v1/users/:id |
| `workouts` | CRUD /v1/workouts/plans, POST /v1/workouts/plans/generate |
| `nutrition` | /v1/nutrition/logs, /v1/nutrition/food/search, /v1/nutrition/summary |
| `social` | /v1/social/feed, /v1/social/posts, /v1/social/challenges |
| `notifications` | WebSocket namespace `/realtime` |

## Local Development

```bash
# Prerequisites: Docker running
docker compose up -d postgres redis

# Install dependencies
npm ci

# Copy env file
cp .env.example .env.local   # then fill in your values

# Start in watch mode
npm run start:dev
```

API docs: http://localhost:3000/api/docs

## Tests

```bash
npm test           # unit tests
npm run test:cov   # coverage
npm run test:e2e   # end-to-end
```
