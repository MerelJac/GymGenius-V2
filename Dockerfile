FROM node:20-alpine

COPY src /usr/app
COPY package*.json /usr/app

RUN cd /usr/app && npm install 

EXPOSE 3000

ENTRYPOINT ["node", "/usr/app/index.js"]
