FROM node:18.18.0-alpine
WORKDIR /app/services/theater-service
ADD package*.json ./
COPY . ./
ENV PORT=3008
EXPOSE $PORT
CMD ["npm" , "start"]
