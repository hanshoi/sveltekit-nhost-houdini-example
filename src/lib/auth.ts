import { goto } from '$app/navigation';
import * as nhost from '$lib/nhost';
import { user } from './stores/user';

async function login(email: string, password: string): Promise<void> {
  const response = await nhost.auth.signIn({ email, password });
  if (response.error) {
    throw new Error(response.error.error);
  } else if (response.session) {
    user.set(nhost.auth.getUser());
    goto('/');
  }
}

async function logout(): Promise<void> {
  const response = await nhost.auth.signOut();
  if (response.error) {
    throw new Error(response.error.error);
  }
}

async function isAuthenticated(): Promise<boolean> {
  return await nhost.auth.isAuthenticatedAsync();
}


export default { login, logout, isAuthenticated };
