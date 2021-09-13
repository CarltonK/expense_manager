FROM node:12-alpine

WORKDIR /app

ARG DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME
ENV DB_USER=root
ENV DB_PASS=root
ENV DB_HOST=172.18.0.1
ENV DB_PORT=3306
ENV DB_NAME=expy-db
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./

RUN npm i

COPY . /app

RUN npm run lint

RUN apk add sed

# Enables interactive mode
RUN apk add bash

# TODO: Find a better solution
# Inline Replacement
RUN sed -i "s/#{DB_USER}#/${DB_USER}/g" .env
RUN sed -i "s/#{DB_PASS}#/${DB_PASS}/g" .env
RUN sed -i "s/#{DB_HOST}#/${DB_HOST}/g" .env
RUN sed -i "s/#{DB_PORT}#/${DB_PORT}/g" .env
RUN sed -i "s/#{DB_NAME}#/${DB_NAME}/g" .env

RUN npm run build

ENV PORT 3000

EXPOSE 3000

CMD [ "npm", "run", "build:dev" ]