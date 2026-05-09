# Consistent Hashing Load Balancer

A backend load balancer system that implements Consistent Hashing for deterministic request routing.

---

# Features

## Core Features

- Consistent Hashing based routing
- Deterministic IP-to-node mapping
- Dynamic node addition and removal
- Request logging
- Traffic simulation API
- In-memory implementation

## Additional Features

- Node health checks
- Failover routing
- Weighted routing
- Metrics dashboard
- Rate limiting
- Binary search optimized lookup

---

# Tech Stack

- Node.js
- Express.js
- Vitest

---

# Project Structure

```txt
src/
├── config/
│   └── nodes.js
│
├── controllers/
│   └── loadBalancerControllers.js
│
├── routes/
│   └── loadBalancerRoutes.js
│
├── services/
│   ├── consistentHashing.js
│   ├── loadBalancer.js
│   ├── logger.js
│   ├── metrics.js
│   └── rateLimiter.js
│
├── tests/
│   ├── consistentHashing.test.js
│   ├── hash.test.js
│   ├── loadBalancer.test.js
│   └── rateLimiter.test.js
│
├── utils/
│   ├── generateRandomIP.js
│   └── hash.js
│
└── server.js
```

---

# How Consistent Hashing Works

- Nodes are placed on a virtual hash ring.
- Incoming IP addresses are hashed onto the same ring.
- Requests are routed clockwise to the nearest node.
- Virtual nodes improve traffic distribution.
- Consistent hashing minimizes remapping when nodes are added or removed.

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Komanabelli-Balaji/load-balancer.git
cd load-balancer
```

## Install Dependencies

```bash
npm install
```

---

# Running The Project

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

Server runs on:

```txt
http://localhost:8000
```

---

# Running Tests

```bash
npm test
```

---

# API Endpoints

---

## API Check

### GET `/`

Checks whether the server is running.

### Response

```json
{
  "success": true,
  "message": "Consistent Hashing Load Balancer API"
}
```

---

## Simulate Traffic

### GET `/api/simulate`

Generates simulated requests with random IPs and routes them using consistent hashing.

### Query Parameters

| Parameter | Type   | Description |
|----------|--------|-------------|
| count | number | Number of requests |

### Example

```txt
GET /api/simulate?count=10
```

### Response

```json
{
  "totalRequests": 10,
  "traffic": [
    {
      "requestNumber": 1,
      "ip": "192.168.1.1",
      "routedNode": "Node-A"
    }
  ]
}
```

---

## Get All Nodes

### GET `/api/nodes`

### Response

```json
{
  "nodes": [
    {
      "name": "Node-A",
      "healthy": true,
      "weight": 3
    }
  ]
}
```

---

## Add Node

### POST `/api/nodes`

### Request Body

```json
{
  "node": "Node-D",
  "weight": 5
}
```

### Response

```json
{
  "success": true,
  "message": "Node-D added successfully"
}
```

---

## Remove Node

### DELETE `/api/nodes/:node`

### Example

```txt
DELETE /api/nodes/Node-D
```

### Response

```json
{
  "success": true,
  "message": "Node-D removed successfully"
}
```

---

## Update Node Health

### PATCH `/api/nodes/:node/health`

### Request Body

```json
{
  "healthy": false
}
```

### Response

```json
{
  "success": true,
  "message": "Node-A health updated"
}
```

---

## Route Specific IP

### GET `/api/route/:ip`

Routes a specific IP using consistent hashing.

### Example

```txt
GET /api/route/192.168.1.1
```

### Response

```json
{
  "ip": "192.168.1.1",
  "routedTo": "Node-B"
}
```

---

## Metrics Dashboard

### GET `/api/metrics`

Returns request distribution across nodes.

### Response

```json
{
  "metrics": {
    "Node-A": 40,
    "Node-B": 20,
    "Node-C": 30
  }
}
```

---

# Logging

Each routed request is logged with:

- timestamp
- incoming IP
- selected node

Example:

```txt
[2026-05-09T10:00:00.000Z]
Incoming IP: 192.168.1.1
Routed To : Node-B
```

---

# Rate Limiting

A simple in-memory sliding window rate limiter is implemented.

- Maximum requests: 20
- Time window: 60 seconds

Exceeding requests returns:

```json
{
  "message": "Rate limit exceeded"
}
```

---

# Postman Demonstration

The following requests can be used to demonstrate the APIs in Postman.

---

## 1. API Check

```txt
GET http://localhost:8000/health
```

---

## 2. Simulate Traffic

```txt
GET http://localhost:8000/api/simulate?count=20
```

---

## 3. Get Nodes

```txt
GET http://localhost:8000/api/nodes
```

---

## 4. Add New Node

```txt
POST http://localhost:8000/api/nodes
```

### Body

```json
{
  "node": "Node-D",
  "weight": 10
}
```

---

## 5. Mark Node Unhealthy

```txt
PATCH http://localhost:8000/api/nodes/Node-A/health
```

### Body

```json
{
  "healthy": false
}
```

---

## 6. Route Specific IP

```txt
GET http://localhost:8000/api/route/192.168.1.1
```

---

## 7. Metrics Dashboard

```txt
GET http://localhost:8000/api/metrics
```

---

# Deployment

The project can be deployed on platforms such as:

- Render
- Railway
- Fly.io

---

# Deployment Link

```txt
https://load-balancer-whrb.onrender.com/
```

---

# GitHub Repository

```txt
https://github.com/Komanabelli-Balaji/load-balancer.git
```
