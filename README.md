# Video Creator Server

## Getting start

_These instructions let get a copy of project for testing and developing._

## Requirements

_Clone the project in your PC:_

- Clone the [VideoCreatorServer](https://github.com/leoerickp/VideoCreatorServer.git).

## Config

_Into the project folder, it must create de file .env and add the following information:_

```javascript
STATE = dev;
DB_PASSWORD = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx;
DB_NAME = videoCreator;
DB_HOST = videoCreatorDB;
DB_PORT = 5432;
DB_USERNAME = postgres;
JWT_SECRET = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx;
PORT = 3000;
```

---

## Run

_Into the project folder:_

- Execute the following command:

```console
yarn install
```

```console
docker compose up -d
```

```console
tsc
```

```console
yarn start
```

## Frontend VideoCreatorFrontend

_The Frontend code repostory is available in:_ [VideoCreator-Frontend](https://github.com/leoerickp/VideoCreatorFrontend.git).

## Author

- [Leo Erick Pereyra Rodriguez](https://leoerickp.cf/).
