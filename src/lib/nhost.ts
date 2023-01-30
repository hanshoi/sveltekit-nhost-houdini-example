import { NhostClient, type NhostClientConstructorParams } from '@nhost/nhost-js';
import { isBrowser, type NhostSession } from '@nhost/hasura-auth-js';
import Cookies from 'js-cookie';

class SvelteKitNhostClient extends NhostClient {
  constructor(params: NhostClientConstructorParams) {
    // Disable automations on serverside.
    // Need cookie storage for auth trasfering to SSR.
    super({
      ...params,
      autoSignIn: isBrowser() && params.autoSignIn,
      autoRefreshToken: isBrowser() && params.autoRefreshToken,
      clientStorageType: 'cookie'
    });

    this.auth.onAuthStateChanged(() => {
      setAccessTokenInCookie(this);
    });
    this.auth.onTokenChanged(setAccessTokenInCookie);
  }
}
export const NHOST_ACCESS_TOKEN = 'nhostAccessToken';

export const setAccessTokenInCookie = (param: NhostClient | NhostSession | null) => {
  const session = param && 'auth' in param ? param.auth.getSession() : param;
  if (!session) {
    Cookies.remove(NHOST_ACCESS_TOKEN);
    return;
  }
  const expires = new Date();
  // * Expire the cookie 60 seconds before the token expires
  expires.setSeconds(expires.getSeconds() + session.accessTokenExpiresIn - 60);
  Cookies.set(NHOST_ACCESS_TOKEN, session.accessToken, {
    sameSite: 'strict',
    expires
  });
};

const nhostClient = new SvelteKitNhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION
});

export const auth = nhostClient.auth;
export const storage = nhostClient.storage;
export const getUrl = nhostClient.graphql.getUrl;
