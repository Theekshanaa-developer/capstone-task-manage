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