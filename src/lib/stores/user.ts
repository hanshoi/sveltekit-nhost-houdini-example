import type { AuthChangeEvent, NhostSession, User } from '@nhost/hasura-auth-js';
import { auth as nhostAuth } from '$lib/nhost';
import { readable, writable, type Readable, type Writable } from 'svelte/store';

export const user: Writable<null | User> = writable(null);

export const isAuthenticated: Readable<boolean> = readable(false, (set) => {
  nhostAuth.onAuthStateChanged((event: AuthChangeEvent, session: NhostSession | null) => {
    switch (event) {
      case 'SIGNED_IN':
        set(true);
        user.set(session?.user || null);
        break;
      case 'SIGNED_OUT':
        set(false);
        user.set(null);
        break;
    }
  });
});
