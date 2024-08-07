# movie-reservation-system-backend

## Directory Structure 
# movie-reservation-system

## services

### user-service
- **src/**
  - `app.js`
  - `routes.js`
- `package.json`
- `Dockerfile`
- `node_modules/` (symlink to `../node_modules`)

### movie-service
- **src/**
  - `app.js`
  - `routes.js`
- `package.json`
- `Dockerfile`
- `node_modules/` (symlink to `../node_modules`)

### search-service
- **src/**
  - `app.js`
  - `routes.js`
- `package.json`
- `Dockerfile`
- `node_modules/` (symlink to `../node_modules`)

### booking-service
- **src/**
  - `app.js`
  - `routes.js`
- `package.json`
- `Dockerfile`
- `node_modules/` (symlink to `../node_modules`)

### showtime-service
- **src/**
  - `app.js`
  - `routes.js`
- `package.json`
- `Dockerfile`
- `node_modules/` (symlink to `../node_modules`)

### notification-service
- **src/**
  - `app.js`
  - `routes.js`
- `package.json`
- `Dockerfile`
- `node_modules/` (symlink to `../node_modules`)

## Root
- `node_modules/`
- `package.json`
- `package-lock.json`
- `docker-compose.yml`
- `README.md`


## Things to be done 
1. Distributed NoSQL database for each microservice -> plan rejected
2. Establish communication between microservices usung event driven architecture -> 
3. Populate SQL database -> done
4. Finish writing all controller logic 
5. Setup Notification serivce -> done
6. Eastablish a custom logger -> done
7. Use Sequelize 