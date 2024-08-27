FROM node:18.18.0-alpine
WORKDIR /app/services/comment-service
ADD package*.json ./
COPY . ./
ENV PORT=3010
EXPOSE $PORT
CMD ["npm" , "start"]
