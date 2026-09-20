# Technology Comparison Matrix

All matrices use a 1-5 score (5 is best for FitFlow). Weighted total = sum of (weight x score) / 100. Scores are the authors' assessment for FitFlow's needs at the time of writing; vendor compliance and pricing claims must be re-verified against current vendor documentation before any production decision.

### Frontend / Mobile Framework

_Scores 1-5 (5 = best for FitFlow). For Learning curve, 5 = easiest to learn; for Maintenance cost, 5 = lowest cost._

| Criterion | Weight | Flutter | React Native | Kotlin Multiplatform | Swift / SwiftUI |
|---|---:|---:|---:|---:|---:|
| Development speed | 14% | 5 | 4 | 3 | 2 |
| Code reusability | 14% | 5 | 4 | 4 | 1 |
| Performance | 14% | 4 | 4 | 4 | 5 |
| Ecosystem support | 8% | 4 | 5 | 3 | 4 |
| Learning curve | 6% | 3 | 4 | 2 | 3 |
| Web compatibility | 10% | 3 | 3 | 2 | 1 |
| AI/ML integration | 6% | 4 | 4 | 3 | 5 |
| Real-time features | 8% | 4 | 4 | 4 | 4 |
| Maintenance cost | 10% | 4 | 3 | 3 | 2 |
| Security | 10% | 4 | 3 | 4 | 5 |
| **Weighted total (out of 5)** | 100% | **4.12** | 3.78 | 3.30 | 3.04 |

### Backend Framework

_Scores 1-5 (5 = best for FitFlow)._

| Criterion | Weight | Node.js / NestJS | Python / FastAPI | Go (Gin/Fiber) | Java / Spring Boot |
|---|---:|---:|---:|---:|---:|
| Performance | 12% | 4 | 4 | 5 | 4 |
| Scalability | 12% | 4 | 4 | 5 | 5 |
| Development speed | 14% | 5 | 5 | 3 | 3 |
| Ecosystem & hiring | 10% | 5 | 4 | 3 | 5 |
| AI integration | 10% | 3 | 5 | 2 | 2 |
| Real-time support | 12% | 5 | 3 | 5 | 4 |
| Security | 14% | 4 | 4 | 4 | 5 |
| Maintainability | 16% | 5 | 4 | 4 | 4 |
| **Weighted total (out of 5)** | 100% | **4.42** | 4.12 | 3.92 | 4.02 |

**AI-microservice weighting profile** (AI integration weighted 30%; criteria weights in the same order as above: Performance 10%, Scalability 10%, Development speed 14%, Ecosystem & hiring 10%, AI integration 30%, Real-time support 4%, Security 10%, Maintainability 12%):

| Option | Weighted total |
|---|---:|
| Node.js / NestJS | 4.10 |
| Python / FastAPI | 4.40 |
| Go (Gin/Fiber) | 3.40 |
| Java / Spring Boot | 3.56 |

FastAPI ranks first under this profile, which is why it is chosen for the AI microservice while NestJS is chosen for the core API.

### Database

_Scores 1-5 (5 = best for FitFlow). For Cost, 5 = cheapest at expected scale._

| Criterion | Weight | PostgreSQL | MongoDB | Firebase Firestore | DynamoDB |
|---|---:|---:|---:|---:|---:|
| Scalability | 14% | 4 | 5 | 5 | 5 |
| Query performance | 16% | 5 | 4 | 2 | 2 |
| Health-data handling | 16% | 5 | 3 | 2 | 3 |
| Security & compliance | 16% | 5 | 4 | 3 | 5 |
| Real-time capability | 8% | 3 | 4 | 5 | 4 |
| AI integration | 8% | 4 | 4 | 3 | 2 |
| Cost | 10% | 4 | 3 | 2 | 3 |
| Maintainability | 12% | 4 | 3 | 3 | 2 |
| **Weighted total (out of 5)** | 100% | **4.40** | 3.76 | 3.02 | 3.32 |

### Authentication & Authorization

_Scores 1-5 (5 = best for FitFlow). For Cost at scale, 5 = cheapest per monthly active user._

| Criterion | Weight | AWS Cognito | Firebase Auth | Auth0 | Supabase Auth |
|---|---:|---:|---:|---:|---:|
| Security & compliance | 22% | 5 | 3 | 5 | 3 |
| Cost at scale | 22% | 4 | 4 | 2 | 5 |
| Development speed | 12% | 3 | 5 | 5 | 4 |
| Feature completeness | 12% | 4 | 4 | 5 | 3 |
| Scalability | 8% | 5 | 5 | 5 | 4 |
| Maintainability / lock-in | 12% | 3 | 3 | 4 | 4 |
| Stack integration | 12% | 5 | 4 | 4 | 3 |
| **Weighted total (out of 5)** | 100% | **4.18** | 3.86 | 4.10 | 3.76 |

### Consolidated Stack Comparison

_Scores 1-5 (5 = best for FitFlow). For Cost, 5 = lowest total cost of ownership._

| Criterion | Weight | Stack A | Stack B | Stack C | Stack D |
|---|---:|---:|---:|---:|---:|
| Performance | 12% | 4 | 3 | 5 | 4 |
| Scalability | 12% | 4 | 4 | 5 | 5 |
| Development speed | 14% | 4 | 5 | 2 | 3 |
| Security & compliance | 16% | 5 | 3 | 5 | 4 |
| Cost | 10% | 4 | 2 | 2 | 2 |
| AI/ML support | 12% | 5 | 3 | 3 | 2 |
| Maintainability | 14% | 4 | 3 | 2 | 3 |
| Real-time | 10% | 4 | 5 | 4 | 4 |
| **Weighted total (out of 5)** | 100% | **4.28** | 3.50 | 3.52 | 3.40 |

Stack legend:

- **Stack A**: Flutter + NestJS + FastAPI + PostgreSQL/Redis + Cognito (AWS)
- **Stack B**: React Native + Firebase (Firestore, Auth, Functions)
- **Stack C**: Native Swift + Kotlin + Go + DynamoDB + Cognito
- **Stack D**: Kotlin Multiplatform + Spring Boot + PostgreSQL + Auth0

## Recommended stack

Stack A (Flutter + NestJS + FastAPI + PostgreSQL/Redis + Amazon Cognito on AWS) scores highest overall and wins each individual layer under FitFlow's weights. See [ADR-001](adr/ADR-001-technology-stack.md).
