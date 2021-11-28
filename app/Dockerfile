# build environment
FROM node:14.8.0-alpine as build

RUN npm install webpack@5.64.4 -g

WORKDIR /tmp
COPY package.json /tmp/
COPY package-lock.json /tmp/

RUN npm ci --silent
WORKDIR /app
COPY . /app/
RUN cp -a /tmp/node_modules /app/
RUN npm run build

# prod environment
FROM node:14.8.0-alpine
WORKDIR /app
COPY server.js /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

EXPOSE 3000

CMD node ./server.js
