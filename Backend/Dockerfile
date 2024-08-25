# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Install production dependencies
FROM node:18-alpine AS dependencies

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Stage 3: Run the application
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the build artifacts from the builder stage
COPY --from=builder /app/dist ./dist

# Copy the production node_modules from the dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy the package.json file
COPY --from=dependencies /app/package.json ./

# Set environment variables
ENV PORT=8000 \
    MONGODB_URI="mongodb+srv://jovialkanwadia:STpkkbXvs6enswf0@cluster0.eetfiei.mongodb.net/" \
    DB_NAME="stuconnect" \
    CORS_ORIGIN="http://localhost:5173" \
    ACCESS_TOKEN_SECRET="13VnAJASy89xPLa7CCAOAh4lDx54JXss" \
    ACCESS_TOKEN_EXPIRY="1d" \
    REFRESH_TOKEN_SECRET="xPxsTlzfiXdhCQArucCGeE7j8sTWkkEO" \
    REFRESH_TOKEN_EXPIRY="10d" \
    CLOUDINARY_CLOUD_NAME="dndtcrqmf" \
    CLOUDINARY_API_KEY="178886428461539" \
    CLOUDINARY_API_SECRET="k4McFfI2W717ott4o1LzNBTN9tA" \
    LIVEKIT_URL="wss://stuconnect-qnglxjxo.livekit.cloud" \
    LIVEKIT_API_KEY="APINFKDAUeHrhPK" \
    LIVEKIT_API_SECRET="2nmtFQuGqzh0Uj4xUYKmJeD9wlTOeT03dqMjrK7qbEu" \
    PINECONE_API_KEY="c626590f-efb4-4cf1-997d-52128d0ed8f8" \
    HUGGINGFACEHUB_API_KEY="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" \
    PINECONE_INDEX="test"

# Expose the port the app runs on
EXPOSE 8000

# Run the application using npm start
CMD ["npm", "start"]
