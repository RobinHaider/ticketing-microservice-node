
# Ticketing Microservices with Node

A complete and production-ready microservice project built with Node.js that implements industry-standard best practices, including asynchronous communication and unit testing. Using github workflow for deployment in Digital Ocean. This project can be used as a reference or starting point for creating your own microservices. 


## Features

- Authentication system with sign-up and login functionality (Auth Service)
- Ability for users to add tickets for sale (Tickets Service)
- Ability for users to purchase tickets (Orders Service)
- Payment processing for ticket purchases (Payment Service)
- Expiration service that automatically cancels orders that have not been paid for after a set period of time (Expiration Service)


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
    


