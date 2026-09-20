# ADR-001: Adopt Flutter, NestJS, FastAPI, PostgreSQL/Redis and Amazon Cognito on AWS

- **Status:** Accepted (for the FitFlow redesign; review after the first release)
- **Date:** 20 September 2026

## Context

FitFlow is being redesigned as a fitness app that must feel seamless on iOS, Android and web, perform well on animation-heavy screens, support personalized AI features, real-time social features and nutrition tracking, and handle health data under GDPR (and HIPAA where applicable).

The team is mid-sized (roughly 8 to 12 engineers) with no requirement for a native-only experience on every platform, and budget for a consumer, freemium product is limited.

## Decision

- Use Flutter for iOS, Android and the authenticated web app, with small native modules where platform APIs require them.
- Use a NestJS (TypeScript) modular monolith as the core API and a separate FastAPI (Python) microservice for AI workloads.
- Use PostgreSQL as the system of record, Redis for caching, leaderboards and pub/sub, and SQS/SNS for asynchronous events.
- Use Amazon Cognito for authentication, with role and ownership checks in the API and PostgreSQL row-level security.
- Host on AWS with ECS Fargate and deliver through GitHub Actions.

## Alternatives considered

| Alternative | Why not chosen |
|---|---|
| React Native + Firebase | Fastest to start, but Firestore's limited querying, per-read cost model, lock-in and weaker compliance story are a poor fit for relational health and nutrition data. |
| Native Swift + Kotlin + Go + DynamoDB | Highest raw performance, but roughly double the client effort and a DynamoDB access-pattern model that makes analytics and evolving features costly. |
| Kotlin Multiplatform + Spring Boot + PostgreSQL + Auth0 | Robust and enterprise-grade, but slower delivery, a smaller Kotlin-Multiplatform talent pool, immature web support and higher Auth0 costs at consumer scale. |

## Consequences

**Positive**

- One client codebase and one language on the core API keeps delivery fast and hiring simple.
- The AI service can evolve, scale and be deployed independently in the language where ML tooling is strongest.
- PostgreSQL gives integrity, flexible queries and vector search in a single store.
- A single cloud provider simplifies compliance (one BAA/DPA), networking and operations.

**Negative / risks**

- Dart is a less common skill; the team needs onboarding time.
- Flutter Web is not ideal for SEO, so public share pages must be server-rendered outside Flutter.
- Two backend languages (TypeScript and Python) increase tooling and skills overhead.
- Cognito has a rougher developer experience than Auth0, and AWS lock-in is real. Mitigation: OIDC-standard tokens and an adapter layer for auth and LLM providers.
