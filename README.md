# Linux Mirror Hoster Deployment with Docker

This repository contains the necessary Docker configuration files and scripts to deploy a Linux mirror hoster. Our setup uses Docker to deploy individual containers for each Linux distribution we intend to mirror, leverages Nginx as a load balancer to efficiently route traffic, and integrates Certbot for automatic SSL certificate issuance and renewal to secure our mirror hoster. The entire system is managed through a Node.js backend, providing an easy-to-use interface for administration and automation tasks.

## Features

- **Dockerized Linux Distribution Mirrors**: Separate containers for each Linux distribution, allowing for easy management, scalability, and isolation.
- **Nginx Load Balancer**: Efficiently distributes incoming traffic among the different distribution mirrors, ensuring high availability and performance.
- **Certbot SSL/TLS Encryption**: Automatic SSL/TLS certificate management with Certbot, ensuring that all communications are securely encrypted.
- **Node.js Backend**: A flexible and powerful backend written in Node.js to manage the mirrors, handle automation tasks, and provide administrative interfaces.

## Prerequisites

- Docker and Docker Compose installed on your host machine.
- A domain name configured to point to your server's IP address for SSL/TLS certificate issuance.
- Open ports and NAT translation on port 443 and 80 or only 80 to get the SSL cert via certbot.

## Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Muxoid/acadielinux.git
   cd acadiwlinux

2. **Modify Config**

   The main file to change is the docker-compose.yml file so that the cert uses your domain.
   Change the branding in the HTML of not up to you.
   
1. **Run**

   I recommend removing the -d on the first run to see any issues that may arise.
   ```bash
   docker compose up -d --build
   ```
   Run the previous command in the root of the git clone and everything should be up and running in a few moments but will take a while depending
   on your network connection to get the mirrors downloaded.


   In the end your project tree should look like soo ->
```
├── cert-data
│   ├── accounts
│   │   
│   ├── archive
│   │   └── your.domian.com
│   ├── live
│   │   ├── your.domian.com
│   │   └── README
│   ├── renewal
│   │   └── your.domian.com.conf
│   └── renewal-hooks
│       ├── deploy
│       ├── post
│       └── pre
├── docker-compose.yml
├── nginx
│   └── nginx.conf
├── node-app
│   ├── api
│   │   └── nginxStats.ts
│   ├── app.ts
│   ├── Dockerfile
│   ├── mirror
│   │   ├── arch
│   │   ├── debian
│   │   └── ubuntu
│   ├── nodemon.json
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── css
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   ├── img
│   │   └── site.webmanifest
│   └── views
│       ├── index.handlebars
│       ├── layouts
│       └── partials
├── sync
│   ├── debian
│   │   ├── apt-mirror-cron
│   │   ├── Dockerfile
│   │   └── mirror.list
│   └── ubuntu
│       ├── apt-mirror-cron
│       ├── Dockerfile
│       └── mirror.list
└── syncrepo-template.sh

```