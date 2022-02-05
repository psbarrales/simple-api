FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /workspace

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile --ignore-scripts && yarn cache clean

FROM nginx:1.21.6-alpine

WORKDIR /workspace

# Nginx files
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/502.html /var/www/html/502.html

# Project files
COPY --from=deps /workspace/node_modules ./node_modules
COPY . .
# Installing dependencies
RUN apk update && apk add --no-cache openssl nodejs npm yarn
# Adding SSL
RUN ["./docker/create-certificate.sh"]
# Running the app
ENTRYPOINT [ "./docker/entrypoint.sh" ]
