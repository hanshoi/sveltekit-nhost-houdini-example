import { browser } from '$app/environment';
import { PUBLIC_GRAPHQL_URL } from '$env/static/public';
import { HoudiniClient, type RequestHandler } from '$houdini';

const requestHandler: RequestHandler = async ({ fetch, text = '', variables = {}, session }) => {
  const url = PUBLIC_GRAPHQL_URL;
  const token = session?.accessToken as string | null | undefined;
  if (!token) {
    console.error('No token found in session. In browser:', browser);
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
