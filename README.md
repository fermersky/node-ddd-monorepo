# Node.js server with minimalistic implementation of DDD

This is a Node.js server that implements Domain-Driven Design (DDD) in a minimalistic way. The main purpose of this server is to focus on business logic and be agnostic to any transport or protocol.

The server has two entities, namely Driver and WorkShift. A driver can have multiple shifts. Instead of using an ORM, the server uses manual mapping from SQL queries to domain entities. The server implements dependency injection using ESM and function parameters. However, using `tsyringe/inversify` libraries would be a better option as it would remove the responsibility of instantiating dependencies from the app code.

The server supports two different transports: HTTP (fastify) and WebSocket (uWebSocket.js).

The documentation is generated using Docusaurus, and can be found in the `drivers-app-docs` folder.

## Some libs from the app stack

- `tsx`: for local development & file watching
- `esbuild`: for TS -> JS compilation
- `tsc-alias`: for replacing paths aliases (such as `@api, @domain and @infrastrcuture`) with relative paths
- `uWebSockets.js`: C++ implementation of WebSockets
- `Turborepo`: build system for monorepo - https://turbo.build/repo

## Turborepo

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: docusaurus app
- `server`: backend
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd node-ddd-monorepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd node-ddd-monorepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd node-ddd-monorepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
