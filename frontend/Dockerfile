# Development Dockerfile for Next.js
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["yarn", "dev"]