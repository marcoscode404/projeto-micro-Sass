FROM node:18.16.1-slim as build

WORKDIR /app
ADD package.json .
ADD pnpm-lock.yaml .
ADD .npmrc .
RUN npm install -g pnpm && pnpm install
COPY ./ /app/
RUN pnpm generate

FROM nginx:1.25.2-alpine

COPY --from=build /app/.output/public /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
