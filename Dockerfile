FROM ubuntu
ARG env=production

RUN apt update && apt install -y curl nginx

COPY nginx.conf /etc/nginx/sites-enabled
COPY dist /var/www/html

CMD nginx -g "daemon off;"
