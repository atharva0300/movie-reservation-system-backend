FROM node:18.18.0-alpine
WORKDIR /app
ADD package*.json ./
COPY . ./
