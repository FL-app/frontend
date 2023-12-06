FROM node:16.15.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . ./
RUN yarn run build
CMD cp -r build result_build
