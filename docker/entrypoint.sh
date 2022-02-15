#!/bin/sh

set -e

if [ -z "$NODE_ENV" ]; then
  echo "NODE_ENV is missing"
  exit 1
fi

# Prisma Generate
npx prisma generate
npx prisma migrate dev

if [[ "$NODE_ENV" = "production" ]]; then
  yarn prod &
else
  yarn dev &
fi

nginx -g 'daemon off;'
