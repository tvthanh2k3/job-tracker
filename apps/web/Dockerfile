# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy lockfile first for layer caching — npm ci only re-runs when package files change
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime stage — serve static files via nginx
FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
