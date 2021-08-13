# build environment
FROM node:14-alpine as build

WORKDIR /app

COPY ./src ./src
COPY tsconfig.json .
COPY package*.json .
COPY ./prisma/ ./prisma/

RUN npm install
RUN npm install -g prisma typescript

RUN prisma generate
RUN npm run build

# prod environment
FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

ENV PORT=3001
EXPOSE ${PORT}

CMD node ./dist/server.js
