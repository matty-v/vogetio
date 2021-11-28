# build environment
FROM node:14.8.0-alpine as build

WORKDIR /app

ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install webpack@5.64.4 -g --silent
RUN npm install webpack-cli@4.9.1 -g --silent
RUN npm install webpack-dev-server@4.6.0 -g --silent

RUN npm ci --silent

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "serve"]
