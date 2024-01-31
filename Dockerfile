FROM node:14

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD [ "node", "server/main.js" ]

EXPOSE 8080
