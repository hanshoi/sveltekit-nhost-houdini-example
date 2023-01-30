/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
  apiUrl: 'env:PUBLIC_GRAPHQL_URL',
  plugins: {
    'houdini-svelte': {}
  },
  schemaPollHeaders: {
    'X-Hasura-Admin-Secret': 'nhost-admin-secret',
    'X-Hasura-Role': 'user'
  }
};

export default config;
