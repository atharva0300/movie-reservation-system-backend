FROM node:18.18.0-alpine
WORKDIR /auth-service
ADD package*.json ./
COPY . ./
ENV PORT=3007
EXPOSE $PORT
CMD ["npm" , "start"]
