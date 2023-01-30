import { setSession } from '$houdini';
import { NHOST_ACCESS_TOKEN } from '$lib/nhost';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
  // setup user info
  const accessToken: string | undefined = event.cookies.get(NHOST_ACCESS_TOKEN);
  console.log('setaccessToken', accessToken);
  if (accessToken) {
    // set the session information for this event for houdini
    setSession(event, { accessToken });
  } else {
    if (!event.route.id?.startsWith('/(public)')) {
      throw redirect(302, '/login');
    }
  }
  return await resolve(event);
}) satisfies Handle;
