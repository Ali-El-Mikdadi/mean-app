# Stage 1: Build the application
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from the root directory
COPY ../../package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm install --legacy-peer-deps

# Copy the rest of the application code from the apps/backend directory
COPY . .

# Build the application
RUN npm run build:backend

# Stage 2: Run the application
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/dist/apps/backend /app

# Copy node_modules from the builder stage
COPY --from=builder /app/node_modules /app/node_modules

# Expose port 8080
EXPOSE 8080

# Start the application
CMD ["node", "main.js"]