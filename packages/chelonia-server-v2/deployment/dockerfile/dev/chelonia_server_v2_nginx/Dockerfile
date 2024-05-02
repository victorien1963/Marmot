FROM nginx:1.21.6

RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/templates
COPY deployment/dockerfile/dev/chelonia_server_v2_nginx/nginx.conf.template /etc/nginx/templates
