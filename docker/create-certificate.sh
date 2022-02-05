#!/bin/sh

mkdir /etc/ssl/private
chmod 700 /etc/ssl/private

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt -subj "/C=CL/ST=Metropolitana/L=Santiago/O=Psbarrales/OU=IT Department/CN=DockerNginx"
openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
