FROM node:latest

ARG port
ENV PORT=$port

WORKDIR /server
ADD . .
RUN npm install

EXPOSE $port
CMD ["node", "index.mjs"]
