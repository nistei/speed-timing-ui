FROM node:16.9-alpine as builder

WORKDIR /app

ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci

ENV NODE_ENV=production
COPY . .
RUN npm run build


FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
