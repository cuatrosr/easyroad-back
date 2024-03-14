FROM node:20-alpine3.18 AS base

ENV DIR /project
WORKDIR $DIR
ARG NPM_TOKEN

FROM base AS build

RUN apk update && apk add --no-cache dumb-init=1.2.5-r2 && apk add --no-cache git
RUN git clone -b main --single-branch https://github.com/cuatrosr/easyroad-back

COPY package.json pnpm-lock.yaml $DIR
RUN npm install -g pnpm
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > "$DIR/.npmrc" && \
  pnpm install --frozen-lockfile && \
  rm -f .npmrc

COPY tsconfig*.json $DIR
COPY nest-cli.json $DIR
COPY src $DIR/src

RUN pnpm build && \
  pnpm prune --prod --config.ignore-scripts=true

FROM base AS production

ENV NODE_ENV=production
ENV USER=node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist

USER $USER
EXPOSE $PORT $WEBSOCKET_PORT
CMD ["dumb-init", "node", "dist/main.js"]
