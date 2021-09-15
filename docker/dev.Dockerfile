FROM node:12-alpine

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./

RUN npm i

COPY . /app

RUN apk add sed

# Enables interactive mode
RUN apk add bash

RUN npm run lint
RUN npm run build

ENV PORT 3000

EXPOSE 3000

CMD [ "npm", "run", "build:dev" ] 