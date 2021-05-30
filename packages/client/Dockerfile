FROM node:alpine AS build

WORKDIR /app

COPY packages/client .

# for git version taging
COPY ../../.git .

RUN apk add git

RUN yarn install && yarn build

FROM steebchen/nginx-spa:stable

WORKDIR /app
COPY ../../.git .
COPY --from=build /app/build .

EXPOSE 80

CMD ["nginx"]