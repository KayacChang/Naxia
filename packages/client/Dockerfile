FROM node:14-alpine

RUN npm install -g http-server

WORKDIR /

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 8080

CMD [ "http-server", "build" ]
