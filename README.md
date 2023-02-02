# Vindow News search backend

## Getting started

> **Important!** Ts.ED requires Node >= 14, Express >= 4 and TypeScript >= 4.

```batch
# install dependencies
$  install

# serve
$  start

# build for production
$  build
$  start:prod
```

## Docker

```
# build docker image
yarn docker:build

# start docker image
yarn docker:run
```

## Environments

Create a `.env` file with the following:

```
DEFAULT_URL=<YOU_MONGO_URL>
```
