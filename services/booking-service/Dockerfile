FROM node:18.18.0-alpine
WORKDIR /app/services/booking-service
ADD package*.json ./
COPY . ./
ENV PORT=3004
EXPOSE $PORT
CMD ["npm" , "start"]
