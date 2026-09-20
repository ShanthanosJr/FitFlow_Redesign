# Technology Stack Summary

| Layer | Choice | Why |
|---|---|---|
| Client (iOS, Android, Web) | Flutter (Dart) with thin native modules (Swift/Kotlin) for HealthKit, Health Connect and widgets | One codebase for three platforms, fast iteration, consistent high-frame-rate UI for timers, charts and progress rings |
| Core API | Node.js + NestJS (TypeScript), modular monolith, REST + WebSocket (Socket.IO) | Fast delivery, strong structure for a mid-sized team, first-class WebSocket support, huge talent pool |
| AI microservice | Python + FastAPI | Native access to the Python ML/LLM ecosystem; scales independently of the core API |
| Primary database | PostgreSQL (Amazon RDS / Aurora) with pgvector | Relational integrity for health data, powerful queries, row-level security, vector search for AI |
| Cache / real-time / queues | Redis (ElastiCache) + Amazon SQS/SNS | Low-latency cache, leaderboards, pub/sub for live features, async fan-out |
| Authentication & authorization | Amazon Cognito (User Pools, MFA, JWT/OIDC) + RBAC in NestJS | HIPAA-eligible under the AWS BAA, low cost per MAU at scale, same cloud as the rest of the stack |
| Object storage / CDN | Amazon S3 + CloudFront | Progress photos, workout media, model artifacts, cached share pages |
| Hosting & delivery | AWS ECS Fargate, GitHub Actions CI/CD, CloudWatch + OpenTelemetry + Sentry | Managed containers, low ops overhead, repeatable deployments |

See [ADR-001](adr/ADR-001-technology-stack.md) for the decision and alternatives considered.
