FROM node:20-alpine

# Define a pasta de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependências primeiro (para o Docker fazer cache)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código
COPY . .

# Expõe a porta que nossa API vai usar
EXPOSE 3333

# O comando mágico que vai usar o ts-node-dev que configuramos!
CMD ["npm", "run", "dev"]