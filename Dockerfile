FROM node:18-alpine AS base

# Install dependencies only when needed
# FROM base AS deps
# RUN apk add --no-cache libc6-compat

# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --no-audit --no-fund --no-warnings --no-deprecation

# Build
FROM base AS builder
WORKDIR /app

# COPY --from=deps /app/node_modules ./node_modules/
COPY ./build/ ./build/

# RUN npm run deploy

FROM nginx:alpine
WORKDIR /app

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
