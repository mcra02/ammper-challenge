FROM node:16 as base

USER $USER

ENV TZ=America/Lima

RUN echo '[DEBUG]   Start create folder and enter...'
WORKDIR /app

RUN echo "[DEBUG]   Copy package.json to app..."
ADD ./client/yarn.lock .
ADD ./client/package.json .

# RUN echo "[DEBUG]   Install dependencies..."
# RUN yarn install

# ADD .env .env

FROM base as dev
RUN echo "[DEBUG]   Build development enviroment..."
RUN echo "[DEBUG]   Copy files and folders from development enviroment..."
ADD ./client .

EXPOSE 80

RUN echo "[DEBUG]   Run project for development..."
CMD [ "yarn", "pwa:dev" ]

FROM base as prod
RUN echo "[DEBUG]   Build production enviroment..."
RUN echo "[DEBUG]   Copy files and folders from production enviroment..."
ADD ./client .

RUN echo "[DEBUG]   Build project for production..."
RUN yarn pwa:build

RUN echo "[DEBUG]   Run project for
