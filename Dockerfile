FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update && apt-get install -y nginx supervisor
RUN apt-get upgrade -y
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY package*.json ./
COPY server/package*.json ./server/

RUN npm install
RUN cd server && npm install

COPY . .

RUN npm run build

COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 8080

CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
