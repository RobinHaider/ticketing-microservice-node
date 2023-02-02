
# Ticketing Microservices Node
### This project can be used as a standard for creating microservices with node

A complete production grade microservice project with node js using industry best practices. async communication, unit testing, etc. Running with docker and kubernetes. Using github workflow for deployment in Digital Ocean.


## Features

- User can Signup, Login (Auth Service)
- User can add tickets for sell (Tickets Service)
- User can order tickets (Orders Service)
- User can pay for their order (Payment Service)
- Order will expire in one minute if user did not pay (Expiration Service)


## Services

- Auth Service
- Tickets Service
- Orders Service
- Payment Service
- Expiration Service
- Common Module


## Tech Stack

**Client:** React, NextJs

**Server:** Node, Express, MongoDB

**Deployment:** Docker, Kubernetes, Github Action

**Kubernetes:** Deployment, ClusterIp Service, Load balancer, Ingress-nginx, 


## Installation

Clone the repository. Install docker and enable kubernetes. Install Skaffold Cli.

Edit your host file (if windows "C:\Windows\System32\drivers\etc\hosts"). Add this

```bash
  127.0.0.1 ticketing.com
```

Then inside blog-micoservices-node/infra/ingress-nginx/ run

```bash
  kubectl apply -f ingress-controller.yaml
```
Then in root folder run

```bash
  skaffold dev
```

Now visit

```bash
  ticketing.com:81
```
    


