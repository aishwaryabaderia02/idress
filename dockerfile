FROM node:14
WORKDIR /src
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 8080
CMD [ "node","./bin/www" ]