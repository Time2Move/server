###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:20-alpine as base
WORKDIR /app
RUN npm install -g pnpm

######################
# PREPARE BUILD STAGE
######################
FROM base as builder
WORKDIR /app
COPY ./ ./


ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV=PRODUCTION

# Copy pnpm from base stage
COPY --from=base /usr/local/lib/node_modules/pnpm /usr/local/lib/node_modules/pnpm


# Install app dependencies
RUN pnpm install --frozen-lockfile
RUN pnpm run prestart
RUN pnpm run prebuild
RUN pnpm run build

RUN mkdir -p /app/packages/api

RUN npx nestia swagger
# RUN npx prisma generate
RUN pnpm prune --prod
USER node

######################
# FINAL PRODUCTION IMAGE
######################
FROM base as production


COPY --chown=node:node --from=builder /app/dist /app/dist
COPY --chown=node:node --from=builder /app/prisma /app/prisma
COPY --chown=node:node --from=builder /app/node_modules /app/node_modules
COPY --chown=node:node --from=builder /app/.env /app/.env
COPY --chown=node:node --from=builder /app/packages /app/packages
COPY --chown=node:node --from=builder /app/package.json /app/package.json
RUN mkdir -p /app/logs && chown node:node /app/logs



USER node

CMD [ "pnpm", "run", "start:migrate:prod" ]
EXPOSE 8000
