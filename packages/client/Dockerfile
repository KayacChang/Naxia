FROM node:15-alpine

RUN npm install -g http-server

WORKDIR /

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000

CMD [ "http-server", "build" ]
