FROM nginx:1.21.6-alpine

WORKDIR /workspace

# Nginx files
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/502.html /var/www/html/502.html

# Project files
COPY . .
# Installing dependencies
RUN apk update && apk add --no-cache openssl nodejs npm yarn \
  && yarn \
  && yarn cache clean

# Adding SSL
RUN ["./docker/create-certificate.sh"]
# Running the app
ENTRYPOINT [ "./docker/entrypoint.sh" ]
