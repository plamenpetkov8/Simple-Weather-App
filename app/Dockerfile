FROM node:latest

ARG hosted_on_port
ARG vite_weather_api_key
ARG vite_server_port

ENV VITE_WEATHER_API_KEY=$vite_weather_api_key
ENV VITE_SERVER_PORT=$vite_server_port

WORKDIR /app
ADD . .
RUN npm install
RUN VITE_SERVER_PORT=${vite_server_port} npm run build 
RUN npm install -g serve

EXPOSE $hosted_on_port
ENTRYPOINT ["serve", "-s", "dist"]
