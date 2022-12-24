FROM node:12

WORKDIR /SubitoLogin

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]