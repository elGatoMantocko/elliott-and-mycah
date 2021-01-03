FROM fholzer/nginx-brotli

COPY nginx.conf /etc/nginx/conf.d
COPY dist /usr/share/nginx/html
