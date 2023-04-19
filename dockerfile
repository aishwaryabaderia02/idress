FROM node:14
WORKDIR /src
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD [ "node","./bin/www" ]