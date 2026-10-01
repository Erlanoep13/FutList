FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

ENV CYPRESS_INSTALL_BINARY=0
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]