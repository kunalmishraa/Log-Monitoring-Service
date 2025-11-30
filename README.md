# 🧠 Unified Log Analytics & Monitoring Platform

> **Enterprise-grade Unified Log Analytics & Monitoring Platform** built with **Spring Boot, Elasticsearch, Kibana, MongoDB, Redis, Docker**, and **Perplexity AI–powered GitHub bots** for automated PR reviews and AI-generated code branches.

---

## 📖 1. Project Overview

Modern distributed systems generate **huge volumes of logs** from applications, APIs, databases, and infrastructure.  
Manually searching these logs or storing them as raw files does not scale and makes **troubleshooting, security analysis, and performance monitoring** difficult.

This project provides a **unified platform** to ingest, index, search, visualize, and monitor logs in **near real time**, similar to **ELK-based production setups**.

The backend is built with **Spring Boot** and exposes REST APIs for:

- Log ingestion  
- Searching  
- Dashboard metadata  
- Alert configuration  

Logs are:

- Stored and indexed in **Elasticsearch**  
- Visualized in **Kibana**  
- Enriched with configuration and user data from **MongoDB**  
- Accelerated using **Redis caching**

Additionally, this repository integrates **Perplexity Pro API–powered GitHub Actions** that:

- 🤖 Automatically review pull requests and post AI feedback as comments.  
- 🧠 Automatically create AI-generated branches and open PRs for specific tasks.

This makes the project both an **observability platform** and a **showcase of intelligent DevOps automation**.

---

## ⚙️ 2. Tech Stack

### 🧩 Backend
- Java 21  
- Spring Boot  
  - Web  
  - Security  
  - Data MongoDB  
  - Data Redis  
  - Validation  
  - Actuator  

### 💾 Data Stores
- **Elasticsearch** → Log indexing and search  
- **Kibana** → Visualization and dashboards  
- **MongoDB** → Users, dashboards, alert rules, and RBAC metadata  
- **Redis** → Caching search results and tracking top errors  

### 🐳 Infrastructure
- **Docker & Docker Compose** → Local and cloud-ready deployment  

### 🤖 DevOps & AI
- **GitHub Actions** → CI & AI automation  
- **Perplexity Pro API** →  
  - AI PR Review Bot  
  - AI Auto-Branch Code Generation Bot  

---

## 🌟 3. Core Features

✅ Centralized log ingestion API for microservices and applications  
✅ Full-text search and filtering on logs (level, service, time range, etc.)  
✅ Time-series and dashboard visualizations via Kibana  
✅ Cached search responses and precomputed “top errors”  
✅ User and dashboard management stored in MongoDB  
✅ Single-command deployment with Docker Compose  
✅ AI-driven GitHub workflows for automated PR reviews & code generation  

---

## 🗂 4. Repository Structure

```text
unified-log-analytics-platform/
├── pom.xml
├── docker-compose.yml
├── src/
│   └── main/java/com/logplatform/
│       ├── UnifiedLogPlatformApplication.java
│       ├── config/
│       │   ├── ElasticsearchConfig.java
│       │   └── RedisConfig.java
│       ├── controller/
│       │   └── LogController.java
│       ├── service/
│       │   └── LogService.java
│       ├── repository/
│       │   ├── LogRepository.java
│       │   ├── UserRepository.java
│       │   └── ElasticsearchRepository.java
│       ├── cache/
│       │   └── LogCacheService.java
│       ├── entity/
│       │   ├── LogEntry.java
│       │   ├── User.java
│       │   └── Dashboard.java
│       ├── dto/
│       │   ├── LogRequest.java
│       │   └── SearchRequest.java
│       └── handler/
│           └── GlobalExceptionHandler.java
├── src/main/resources/
│   ├── application.properties
│   ├── application-dev.properties
│   └── application-docker.properties
└── .github/
    ├── workflows/
    │   ├── ai-pr-review.yml
    │   └── ai-auto-branch.yml
    └── ai/
        ├── review_pr.js
        └── generate_changes.js


flowchart TD

    classDef service fill:#2563eb,stroke:#1e3a8a,color:#fff,stroke-width:1px;
    classDef db fill:#0ea5e9,stroke:#0c4a6e,color:#fff,stroke-width:1px;
    classDef cache fill:#f59e0b,stroke:#92400e,color:#fff,stroke-width:1px;
    classDef analytics fill:#22c55e,stroke:#14532d,color:#fff,stroke-width:1px;
    classDef ui fill:#9333ea,stroke:#3b0764,color:#fff,stroke-width:1px;

    A[Client Applications] -->|POST /logs| B[Spring Boot Ingest API]
    B --> C[(MongoDB - Config & Metadata)]
    B --> D[(Redis Stream - Buffer & Cache)]
    D --> E[Background Indexer]
    E --> F[(Elasticsearch - Log Index)]
    F --> G[Kibana Dashboard / API UI]

    class B,E service
    class C,F db
    class D cache
    class G ui


6. REST API Endpoints
📝 Log Ingestion

POST /api/v1/logs/ingest
Accepts JSON body representing a log entry:
    {
  "applicationName": "auth-service",
  "level": "ERROR",
  "message": "User authentication failed",
  "timestamp": "2025-11-30T10:15:30Z"
}


Log Search

POST /api/v1/logs/search
Accepts a SearchRequest with query, pagination, and filters:
{
  "query": "authentication",
  "level": ["ERROR"],
  "application": "auth-service",
  "from": "2025-11-29T00:00:00Z",
  "to": "2025-11-30T23:59:59Z"
}


🧩 7. Data Model (MongoDB & Elasticsearch)
🗃 MongoDB

Collection: log_metadata

{
  "applicationName": "payment-service",
  "environment": "prod",
  "level": "ERROR",
  "message": "Payment gateway timeout",
  "timestamp": "2025-11-30T10:12:45Z"
}


🔍 Elasticsearch
Index Pattern: logs-*
Fields:


applicationName (keyword)


environment (keyword)


level (keyword)


message (text)


timestamp (date)


traceId, spanId (optional, for correlation)



🐳 8. Deployment with Docker Compose
Start the entire stack with one command:
docker-compose up -d

Services included:


springboot-app


elasticsearch


kibana


mongodb


redis


Access Kibana at → http://localhost:5601

🤖 9. AI-Powered GitHub Workflows
WorkflowFileDescription🧠 AI PR Review.github/workflows/ai-pr-review.ymlReviews pull requests with detailed AI feedback⚙️ AI Auto Branch.github/workflows/ai-auto-branch.ymlGenerates new branches & code via Perplexity API
These enable an intelligent CI/CD automation pipeline.

🧑‍💻 Author
Kunal Mishra
🔗 GitHub
🔗 LinkedIn
🌐 Portfolio

🌟 Support
If you find this project helpful:
⭐ Star the repository  
🔱 Fork it  
📦 Contribute  


“Build observability that scales — automate what matters.” ⚡


---

Would you like me to generate a **matching GitHub repository banner image (wide aesthetic header)** to make the README stand out visually?
