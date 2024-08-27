FROM node:18.18.0-alpine
WORKDIR /app/services/movie-service
ADD package*.json ./
COPY . ./
ENV PORT=3002
EXPOSE $PORT
CMD ["npm" , "start"]
