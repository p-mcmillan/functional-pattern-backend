FROM node:21

WORKDIR /usr/node 

COPY ./package*.json /usr/node

RUN npm install

COPY . .

CMD ["npm", "start"]