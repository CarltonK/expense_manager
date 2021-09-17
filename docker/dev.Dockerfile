ARG tag=latest

FROM node:12-alpine

ARG tag

# Alpine node image doesn't come with bash
RUN apk --no-cache add \
    bash

RUN mkdir -p /app
RUN mkdir -p /app/lib

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

ENV VERSION_TAG ${tag}

# install and cache app dependencies
COPY package*.json ./

COPY . /app

RUN npm i
RUN npm run lint
RUN npm run build

ENV PORT 3000

EXPOSE 3000

CMD [ "npm", "run", "build:dev" ] 