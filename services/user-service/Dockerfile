FROM node:18.18.0-alpine
WORKDIR /app/services/user-service
ADD package*.json ./
COPY . ./
ENV PORT=3001
EXPOSE $PORT
CMD ["npm" , "start"]
