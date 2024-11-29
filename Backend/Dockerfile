# Use the official Ballerina image
FROM ballerina/ballerina

# Set the working directory inside the container
WORKDIR /ballerina

# Copy the built Ballerina .bala file into the container
COPY ./todo-service.bala /ballerina/todo-service.bala

# Expose the port that the Ballerina service will run on
EXPOSE 9090

# Run the Ballerina service
CMD ["bal", "run", "/ballerina/todo-service.bala"]
