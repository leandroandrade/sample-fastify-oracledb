# sample-fastify-oracledb

Sample project o how to use `fastify-oracledb`


## Get started

Details to configure local environment:

Installing dependencies:

```shell
npm install
```

Configuring .env file

```shell
cp .env.example .env
```

Starting application like development:

```shell
npm run dev
```

Command to run tests:

```shell
npm t
```

Base url to API:
```
http://localhost:3000/api
```

## Apple Silicon

Currently, there is no Oracle Database port for ARM chips, hence Oracle XE images cannot run on the new Apple Silicon chips via Docker Desktop or OrbStack, but there are other technologies that can spin up `x86_64` software on Apple Silicon chips, such as [colima](https://github.com/abiosoft/colima). To run, install colima ([instructions](https://github.com/abiosoft/colima#installation)).

Run **colima**:
```sh
colima start --arch x86_64 --memory 6
```

Start containers:
```sh
docker compose up -d
```

Stop containers:
```sh
docker compose down -v
```

Stop **colima**:
```sh
colima stop
```

## License

Licensed under [MIT](./LICENSE).
