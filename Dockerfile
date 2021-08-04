FROM node AS build

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY ./app/ ./app/
COPY ./tsconfig.json ./
COPY ./webpack.config.ts ./

ENV NODE_ENV=production
ENV WEBPACK_MODE=production
RUN npx webpack --config webpack.config.ts

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=build /usr/src/app/dist ./
