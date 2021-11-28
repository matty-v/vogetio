# build environment
FROM node:14.8.0-alpine

WORKDIR /app

ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "serve"]
