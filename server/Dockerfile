FROM node:16 as base

USER $USER

ENV TZ=America/Lima

RUN echo '[DEBUG]   Start create folder and enter...'
WORKDIR /app

RUN echo "[DEBUG]   Copy package.json to app..."
ADD ./server/yarn.lock .
ADD ./server/package.json .

FROM base as dev
RUN echo "[DEBUG]   Build development environment..."
RUN echo "[DEBUG]   Copy files and folders from development environment..."
ADD ./server .

EXPOSE 80

RUN echo "[DEBUG]   Run project for development..."
CMD yarn && yarn start:dev

FROM base as stag
RUN echo "[DEBUG]   Build development environment..."
RUN echo "[DEBUG]   Copy files and folders from development environment..."
ADD ./server .

EXPOSE 80

RUN echo "[DEBUG]   Run project for development..."
CMD yarn && yarn start:dev

FROM base as prod

RUN echo "[DEBUG]   Install dependencies..."
RUN yarn install

RUN echo "[DEBUG]   Build production environment..."
RUN echo "[DEBUG]   Copy files and folders from production environment..."
ADD ./server .

RUN echo "[DEBUG]   Build project for production..."
RUN yarn build

RUN echo "[DEBUG]   Run project for production..."
CMD [ "yarn", "start:prod" ]