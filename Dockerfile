FROM node:18-alpine AS build

WORKDIR /Blackjack

# Copy dependency files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Build Vite app
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:stable-alpine

# Copy Vite build output to Nginx
COPY --from=build /Blackjack/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

