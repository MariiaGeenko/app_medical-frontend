FROM node:18-alpine as builder
WORKDIR /recipe-app
COPY . .
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]
# TODO: change to build mode