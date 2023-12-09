FROM node:18.16.1-alpine as build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . ./
RUN yarn build
CMD cp -r dist result_build # Дирректория сборки проекта по умолчанию dist, определяется в файле vite.config.ts
