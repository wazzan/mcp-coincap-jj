# Build stage
FROM node:18-alpine as builder

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy source code
COPY src ./src
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

# Create app directory
WORKDIR /app

# First copy the built files
COPY --from=builder /app/dist ./dist
COPY package.json ./

# Install production dependencies without running scripts
RUN npm install --omit=dev --ignore-scripts

# Set environment variables if needed
# ENV COINCAP_API_KEY=<YOUR_API_KEY>

# Command to run the application
ENTRYPOINT ["node", "dist/index.js"]