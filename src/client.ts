import { browser } from '$app/environment';
import { PUBLIC_GRAPHQL_URL } from '$env/static/public';
import { HoudiniClient, type RequestHandler } from '$houdini';
import { NHOST_ACCESS_TOKEN } from '$lib/nhost';
import Cookies from 'js-cookie';

const requestHandler: RequestHandler = async ({ fetch, text = '', variables = {}, session }) => {
  const url = PUBLIC_GRAPHQL_URL;
  let token = session?.accessToken as string | null | undefined;
  if (!token) {
    if (browser) {
      token = Cookies.get(NHOST_ACCESS_TOKEN);
    }
    if (!token) {
      console.error('No token found in session. In browser:', browser);
    }
  }
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify({
      query: text,
      variables
    })
  });
  return await result.json();
};

export default new HoudiniClient(requestHandler);
