import { describe, it, expect } from 'vitest';
import { auth as nhostAuth } from '$lib/nhost';
import { render } from '@testing-library/svelte';
import Layout from './+layout.svelte';
import { load } from './+layout';

describe('layout', () => {
  beforeEach(() => {
    nhostAuth.isAuthenticatedAsync.mockResolvedValue(true);
  });

  it('renders page', async () => {
    render(Layout);

    // TODO: check rendered page
  });

  it('redirect if authed', async () => {
    nhostAuth.isAuthenticatedAsync.mockResolvedValue(false);

    await expect(load()).rejects.toThrow();
  });
});
