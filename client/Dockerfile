FROM node:16-alpine

WORKDIR /app

COPY . .

COPY package.json .

RUN npm install --force

EXPOSE 3000

CMD ["npm", "start"]