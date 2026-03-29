# Task Manager Application (Spring Boot + React + Docker + CI/CD)

A full-stack task management system built using Spring Boot, React, and MySQL. The application includes spring security, role-based access control, and a fully containerized setup with Docker and CI/CD using GitHub Actions.
## 📑 Table of Contents

1. [Project Overview](#project-overview)  
2. [Tech Stack](#tech-stack)  
   - [Backend](#backend)  
   - [Frontend](#frontend)  
   - [DevOps](#devops)  
3. [Features](#features)  
   - [Authentication](#authentication)  
   - [Role-Based Access](#role-based-access)  
     - [Admin](#admin)  
     - [User](#user)  
   - [Task Management](#task-management)  
4. [ERD](#erd)  
5. [Project Structure](#project-structure)  
6. [Setup Instructions](#setup-instructions)  
   - [Clone the Repository](#clone-the-repository)  
   - [Run Locally](#run-locally)  
     - [Backend](#backend-1)  
     - [Frontend](#frontend-1)  
   - [Run with Docker](#run-with-docker)  
7. [Docker Configuration](#docker-configuration)  
   - [Backend Dockerfile](#backend-dockerfile)  
   - [Frontend Dockerfile](#frontend-dockerfile)  
   - [docker-compose.yml](#docker-composeyml)  
8. [API Endpoints](#api-endpoints)  
   - [Authentication](#authentication-1)  
   - [Tasks](#tasks)  
   - [Users](#users)  
9. [CI/CD Pipeline](#cicd-pipeline)  
10. [Security](#security)  
11. [Sample Users](#sample-users)  
12. [Demo Video](#demo-video)  
13. [Screenshots](#screenshots)  
14. [Notes](#notes)  
15. [Author](#author)  
16. [Summary](#summary)
## Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Security 
* Spring Data JPA (Hibernate)
* MySQL 8
* Maven

### Frontend

* React (Create React App)
* Axios
* React Router DOM

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* Docker Hub

## Features

### Authentication

* User registration and login
* Spring Security authentication
* Password encryption using BCrypt

### Role-Based Access

#### Admin

* View all users
* Create users
* Create, update, and delete tasks
* Assign tasks to users

#### User

* View assigned tasks
* Update task status (TODO, IN_PROGRESS, DONE)

### Task Management

* Create, update, and delete tasks
* Assign tasks to users
* Filter tasks by status and assigned user
* Track `createdBy` and `assignedTo` fields
### ERD 
<img width="407" height="192" alt="task erd " src="https://github.com/user-attachments/assets/c1c65ea7-6de9-49b1-84ca-94046b0a34a7" />

## Project Structure
```
TASK-MANAGEMENT/
├─ taskmanage/
│ └─ my-app/
│ ├─ public/
│ └─ src/
│ ├─ api/
│ ├─ components/
│ ├─ images/
│ ├─ pages/
│ ├─ styles/
│ ├─ App.css
│ ├─ App.js
│ ├─ App.test.js
│ ├─ index.js
│ ├─ main.jsx
│ ├─ reportWebVitals.js
│ └─ setupTests.js
│ ├─ .dockerignore
│ ├─ .dockerignore.txt
│ ├─ .gitignore
│ ├─ Dockerfile
│ ├─ package-lock.json
│ ├─ package.json
│ └─ README.md
├─ teamflow-backend/
│ ├─ .idea/
│ └─ teamflow-backend/
│ ├─ .mvn/
│ ├─ src/
│ │ ├─ main/
│ │ └─ test/
│ ├─ target/
│ ├─ .gitattributes
│ ├─ .gitignore
│ ├─ Dockerfile
│ ├─ HELP.md
│ ├─ mvnw
│ ├─ mvnw.cmd
│ └─ pom.xml
└─ docker-compose.yml
```
## Setup Instructions

### Clone the Repository

```
git clone https://github.com/Theekshanaa-developer/capstone-task-manage
cd capstone-task-manage
```

### Run Locally

#### Backend

```
cd teamflow-backend/teamflow-backend
mvn clean install
mvn spring-boot:run
```

> 

#### Frontend

```
cd my-app
npm install
npm start
```

Access the frontend at [http://localhost:3000](http://localhost:3000)

### Run with Docker

```
docker-compose up --build
```

Access the application:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:8080](http://localhost:8080)

## Docker Configuration

### Backend Dockerfile

```
# Stage 1: Build Spring Boot JAR
FROM maven:3.9.2-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml from nested folder and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the Spring Boot application (skip tests to speed up build)
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy the built JAR from the build stage and rename it to app.jar
COPY --from=build /app/target/*.jar app.jar

# Expose Spring Boot port
EXPOSE 8080

# Wait for MySQL to be ready, then start Spring Boot
CMD ["sh", "-c", "\
echo 'Waiting for MySQL to be ready...' && \
until nc -z db 3306; do sleep 2; done && \
echo 'MySQL is up. Starting Spring Boot...' && \
java -jar app.jar \
"]
```

### Frontend Dockerfile

```
# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
```

### docker-compose.yml

```
version: "3.9"

services:
  db:
    image: mysql:8
    container_name: mysql-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: Cloud@123$
      MYSQL_DATABASE: taskdb
    ports:
      - "3307:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./taskdb.sql:/docker-entrypoint-initdb.d/taskdb.sql

  backend:
    build: ./teamflow-backend/teamflow-backend
    container_name: spring-backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/taskdb
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: Cloud@123$
    depends_on:
      - db
    # optional: remove command if using Dockerfile CMD
    # command: >

  frontend:
    build: ./taskmanage/my-app
    container_name: react-frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mysql_data:
```

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

### Tasks

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /api/tasks      |
| POST   | /api/tasks      |
| PUT    | /api/tasks/{id} |
| DELETE | /api/tasks/{id} |

### Users

| Method | Endpoint   |
| ------ | ---------- |
| GET    | /api/users |

## CI/CD Pipeline

GitHub Actions is configured to:

* Build the backend JAR using Maven
* Build Docker images for backend and frontend
* Push Docker images to Docker Hub

Workflow file location: `.github/workflows/docker.yml`

## Security

* Spring security-based authentication
* Role-based authorization
* Password hashing using BCrypt
## Sample Users

You can use the following sample users to test the application:

| Role  | Username        | Password |
|-------|----------------|----------|
| Admin | admin@gmail.com | admin123 |
| User  | theeksha@gmail.com | theeksha123  |


---
## Demo Video
https://drive.google.com/file/d/1841u-43k-1hgviqMC_Fa3oFHGigTtNMB/view?usp=sharing
## Screenshots
![WhatsApp Image 2026-03-29 at 12 22 34 PM(1)](https://github.com/user-attachments/assets/8d892792-0143-450b-910e-c02374601105)
![WhatsApp Image 2026-03-29 at 12 22 41 PM](https://github.com/user-attachments/assets/45408ec9-5b75-449a-91fd-df7bcd87186a)
![WhatsApp Image 2026-03-29 at 12 22 36 PM](https://github.com/user-attachments/assets/59f5363d-30d0-45fa-a813-d83d38cb8687)

![WhatsApp Image 2026-03-29 at 12 22 23 PM](https://github.com/user-attachments/assets/5ac90b4a-4626-4d52-89ce-88f8524647a8)
![WhatsApp Image 2026-03-29 at 12 22 34 PM](https://github.com/user-attachments/assets/40b60a79-34bf-4077-a3a7-facbf73f4612)

## Notes

* MySQL runs inside a Docker container
* Data persists using Docker volumes
* Backend connects to MySQL using:

```
jdbc:mysql://mysql:3306/taskdb
```

## Author

Theekshanaa S K

## Summary

* Full-stack application with Spring Boot and React
* Containerized using Docker
* Automated CI/CD pipeline using GitHub Actions
* Suitable for demonstration, learning, and deployment
