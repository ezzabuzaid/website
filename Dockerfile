FROM node:20-alpine AS base

# Deps
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci


# Build stage
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run deploy

# Server
FROM nginx:alpine
WORKDIR /app

ENV NODE_ENV=production

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S runuser -u 1001
# USER runuser

COPY --from=builder /app/build /usr/share/nginx/html

# ENV PORT=8080
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
