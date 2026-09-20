# ADR-002: Start with a modular monolith plus one separate AI microservice

- **Status:** Accepted
- **Date:** 20 September 2026

## Context

A mid-sized team needs to ship quickly, but AI workloads have very different scaling, dependency and language needs from CRUD and real-time features.

## Decision

- Build the core API as a NestJS modular monolith with strict module boundaries (Users, Workouts, Nutrition, Social, Notifications, Realtime).
- Run the AI functionality as its own FastAPI service, reached through internal REST/gRPC and SQS events.

## Alternatives considered

| Alternative | Why not chosen |
|---|---|
| Full microservices from day one | Adds deployment, observability and distributed-transaction overhead that a mid-sized team does not need yet. |
| Everything in one deployable, including AI | Forces Python ML dependencies and GPU or memory-heavy workloads into the same scaling unit as the API. |

## Consequences

**Positive**

- Simple deployment and local development for the core product.
- Module boundaries make later extraction (for example Social/Realtime) straightforward.

**Negative / risks**

- Discipline is needed to keep modules from coupling through shared database tables.
- The API-to-AI contract must be versioned and tested carefully.
