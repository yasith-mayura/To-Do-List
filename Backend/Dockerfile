# Stage 1: Build the Ballerina application
FROM ballerina/ballerina:2201.10.3 AS build

# Set the working directory inside the container
WORKDIR /ballerina

# Copy your Ballerina code into the container
COPY . .

# Build the Ballerina application
RUN bal build

#--------------------------------------------------------------------------

# Stage 2: Use a lightweight JRE-based image to run the application
FROM openjdk:17-jdk-alpine AS runtime

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /ballerina/target/bin/Todo_service.jar /app/

# Expose the application port
EXPOSE 9090

# Command to run the .jar file
CMD ["java", "-jar", "Todo_service.jar"]
