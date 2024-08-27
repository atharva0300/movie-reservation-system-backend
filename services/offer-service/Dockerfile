FROM node:18.18.0-alpine
WORKDIR /app/services/offer-service
ADD package*.json ./
COPY . ./
ENV PORT=3009
EXPOSE $PORT
CMD ["npm" , "start"]
