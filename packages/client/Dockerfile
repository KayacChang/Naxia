FROM node:alpine AS build

WORKDIR /app

COPY . .

# for git version taging
COPY ../.git .

RUN apk add git

RUN yarn install && yarn build

FROM steebchen/nginx-spa:stable

COPY --from=build /app/build /app

EXPOSE 80

CMD ["nginx"]