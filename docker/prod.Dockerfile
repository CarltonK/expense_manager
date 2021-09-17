ARG tag=latest

###########################
# STAGE 1: Build artifacts 
###########################

FROM node:12-alpine as build

RUN mkdir -p /app
RUN mkdir -p /app/lib

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./

COPY . /app/

WORKDIR /app

# Lint 
RUN npm i -g eslint
RUN npm i -g typescript
RUN npm i
RUN npm run lint

# Build
RUN npm run build

###########################
# STAGE 2: Take build artifacts 
###########################
FROM node:12-alpine

ARG tag

ENV VERSION_TAG ${tag}

RUN mkdir -p /app
RUN mkdir -p /app/lib/
RUN mkdir -p /app/node_modules/
RUN mkdir -p /app/prisma/

WORKDIR /app

COPY --from=build /app/.env /app/.env
COPY --from=build /app/prisma/ /app/prisma/
COPY --from=build /app/lib /app/lib
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json
COPY --from=build /app/node_modules/ /app/node_modules/

ENV PORT 8080
EXPOSE 8080

CMD [ "npm", "run", "start" ]