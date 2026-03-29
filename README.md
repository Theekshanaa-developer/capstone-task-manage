# Task Manager Application (Spring Boot + React + Docker + CI/CD)

A full-stack task management system built using Spring Boot, React, and MySQL. The application includes spring security, role-based access control, and a fully containerized setup with Docker and CI/CD using GitHub Actions.

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
* JWT-based authentication
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

> **Note:** Make sure MySQL is running locally or update `application.properties` with correct DB credentials.

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
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Frontend Dockerfile

```
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### docker-compose.yml

```
version: "3.8"
services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: taskdb
    ports:
      - "3307:3306"
    volumes:
      - mysql-data:/var/lib/mysql

  backend:
    build: ./teamflow-backend/teamflow-backend
    ports:
      - "8080:8080"
    depends_on:
      - mysql

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mysql-data:
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

* JWT-based authentication
* Role-based authorization
* Password hashing using BCrypt

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
