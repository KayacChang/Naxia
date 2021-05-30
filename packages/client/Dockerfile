FROM node:alpine AS build

WORKDIR /app

COPY . .

RUN yarn install && yarn build

FROM steebchen/nginx-spa:stable

COPY --from=build /app/build /app

EXPOSE 80

CMD ["nginx"]