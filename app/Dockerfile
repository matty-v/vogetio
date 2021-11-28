# build environment
FROM node:14.8.0-alpine as build

WORKDIR /app

ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent
RUN npm install react-scripts@4.0.3 -g --silent

COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

ENV REACT_APP_SERVER_URL https://vogetio-server-g56q77hy2a-uc.a.run.app

CMD ["nginx", "-g", "daemon off;"]
