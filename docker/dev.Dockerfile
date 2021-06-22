FROM node:12-alpine

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./

RUN npm i

COPY . /app

RUN npm run lint

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "build:dev" ]