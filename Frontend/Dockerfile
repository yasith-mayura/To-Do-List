# Stage 1: Build the React Vite app (Builder stage)
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Build the application for production
RUN npm run build

#-----------------------------------------------------------------------------------


# Stage 2: Serve the built app with a lightweight web server (Final stage)
FROM nginx:alpine

# Copy the build output from the builder stage to Nginx's HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]

