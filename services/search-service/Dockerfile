FROM node:18.18.0-alpine
WORKDIR /app/services/search-service
ADD package*.json ./
COPY . ./
ENV PORT=3003
EXPOSE $PORT
CMD ["npm" , "start"]
