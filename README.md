# SvelteKit Nhost Houdini Example
Stack

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
