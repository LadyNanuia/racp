# rAthena Control Panel

I got tired of most RO control panels and database websites being out of sync with the data of the server I was playing on, so I decided to create my own app that never goes out of sync.

It's mostly a for-fun/practice project, but it turned out to be a useful app as well.

## Demo

There is a [demo available](http://139.59.197.170) that showcase all the public portions of RACP.
It's connected to the latest rAthena instance, however the rAthena servers are not online,
so you cannot play on the server. The only purpose of the demo is to showcase RACP.

Also, since RACP has very powerful admin features built-in, the demo has no admin account available,
since I don't want to have to deal with curious visitors randomly messing around with the demo instance.

If you want to try out the admin features, clone the repo and run it locally.

## Design goals

<details>
    <summary>Minimal configuration</summary>
    
> Just install and run. RACP will read all data from either the rAthena data files or mysql database.

</details>

<details>
    <summary>Total abstraction</summary>

> RACP contains no data. No fixtures, no enums, nothing. RACP will read all data from either the rAthena data files or mysql database and the RO client files.

</details>

<details>
    <summary>Integration stability</summary>

> Unit and E2E tests run on each commit and will run against the latest rathena version.

</details>

<details>
    <summary>Function over form</summary>

> The UI prioritizes functionality over aesthetics. Does not support theming, keeps things simple.

</details>

## Prerequisites

To run RACP you will need the following software installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [Mysql](https://www.mysql.com/)
- [Java](https://www.java.com/)
- [rAthena](https://github.com/rathena/) (Or a fork)

## Development

- Clone this repository on a machine matching the [prerequisites](#prerequisites)
- Open a terminal and navigate to the project root
- Run `yarn install`
- Run `yarn api:dev` to start the api in dev mode.
- Run `yarn app:dev` to start the app in dev mode.
- Visit `http://localhost:8080/` in your browser.
- (Optional) Run `yarn unit` to run the unit tests (add `--watch` to keep the runner active).
- (Optional) Run `yarn e2e:dev` to run open the E2E test development tool.

### Developing against a custom rAthena instance

- Install rAthena on the same machine as RACP.
- Create a new file `.env.local` in the project root folder
- Add the following to the file, but substitute `<path>` with the absolute path to your rAthena folder:

```
rAthenaPath=<path>
```

### Branching strategy

All development happens in branches. The `main` branch gets deployed to the demo site listed above.
No branch is allowed to merge unless all tests pass.

### Testing practices

All major features should be covered by E2E tests.
As for unit tests, they are not required, but are encouraged for more complex units.

## Deployment

### Manual

This is a fairly standard React + Express.js application, so you can use the provided [scripts](package.json) to manually manage a production deployment if you have the technical experience to do so:

- Clone this repository a server matching the [prerequisites](#prerequisites)
- Run `yarn api:prod` to start the api in prod mode.
- Run `yarn app:prod` to start the app in prod mode.

You will need to provide the proper configuration options to the `api` and `app` commands, since only their `dev` variants come with all required configuration embedded. To see which configuration options are available:

- For the Api: run `yarn api:prod --help`. Options are set via CLI or environment variables.
- For the App: check [webpack.config.ts](webpack.config.ts). Options are set via environment variables.

### Automatic

RACP comes with a built-in deployment process that will automatically deploy the latest
version of RACP to a server of your choice whenever you make changes to the repository.

This process has **additional** prerequisites for your server:

- Must be a UNIX server.
- Requires [PM2](https://pm2.keymetrics.io/) to be installed.

To use the automatic deployment:

- Fork this repository
- Add the following [GitHub Action Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) to your fork's repository settings:
  - `DEPLOY_HOST` - The host of the server to deploy to
  - `DEPLOY_USERNAME` - The ssh username to connect with when deploying
  - `DEPLOY_PASSWORD` - The ssh password to connect with when deploying
  - `DEPLOY_API_PORT` - The port to run the api on (Whatever port you want)
  - `DEPLOY_APP_PORT` - The port to run the web app on (80 is recommended, but it's up to you)
  - `DEPLOY_RATHENA_PATH` - The absolute path to the rAthena folder on your server
  - `DEPLOY_ENABLED` - Set to true to enable automatic deployment
- GitHub will now deploy automatically whenever you push changes to the main branch of your fork.
