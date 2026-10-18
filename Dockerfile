
# Use Java 21 to build the application
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy Maven files and source code
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
COPY src src

# Build the Spring Boot executable JAR
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Use Java 21 to run the application
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
