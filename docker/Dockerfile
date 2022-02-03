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
  && apk add --no-cache --virtual .build-deps \
  git build-base python3 \
  && yarn global add nodemon \
  && yarn \
  && yarn cache clean \
  && apk del .build-deps

# Running the app
ENTRYPOINT [ "./docker/entrypoint.sh" ]
