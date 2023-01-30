# SvelteKit Nhost Houdini Example
Stack consist of:
* SvelteKit frontend for a modern and cool development experience. 
* Nhost for backend, database and authentication/authorization.
* houdini for graphql client.
* tailwindcss to make it all look great.

## Prequisites

- docker
- yarn, npm or pnpm
- node (v18)

## Run Nhost

Start nhost local setup.

```
cd backend
nhost up
```

## Install packages
```
yarn install
```

## Setup Houdini

Generate types and stores for houdini

```
yarn run houdini generate
```

## Run SvelteKit

Start your TODO application

```
yarn dev -o
```

Now you can login with 'admin@example.com' and 'password' crendentials.
