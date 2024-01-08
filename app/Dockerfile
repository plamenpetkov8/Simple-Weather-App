FROM node:latest

ARG vite_server_port

WORKDIR /app
ADD . .
RUN npm install
RUN VITE_SERVER_PORT=${vite_server_port} npm run build 
RUN npm install -g serve

EXPOSE 3006
CMD ["serve", "-p", "3006", "-s", "dist"]
