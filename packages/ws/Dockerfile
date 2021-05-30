FROM node:15-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install fastify-cli --global
RUN yarn install
COPY . .
RUN yarn run dev
EXPOSE 3002
