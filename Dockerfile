# base image
FROM node:12.2.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY dates.txt /app/dates.txt

RUN npm install
COPY . /app

EXPOSE 4000
CMD npm run build:ssr && npm run serve:ssr




