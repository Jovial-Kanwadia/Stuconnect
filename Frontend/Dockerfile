# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code except for node_modules
COPY . .

# Set environment variables directly in the Dockerfile
ENV VITE_BACKEND_URL="http://localhost:8000/api/v1"
ENV LIVEKIT_URL="wss://stuconnect-qnglxjxo.livekit.cloud"
ENV VITE_OPENAI_API_KEY="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"

# Build the application for production
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "dist", "-l", "3000"]
