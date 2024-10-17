FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Установка утилит
RUN apt-get update && apt-get install -y iputils-ping curl

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod", "start:dev"]
