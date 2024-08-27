FROM node:18.18.0-alpine
WORKDIR /app/services/showtime-service
ADD package*.json ./
COPY . ./
ENV PORT=3005
EXPOSE $PORT
CMD ["npm" , "start"]
