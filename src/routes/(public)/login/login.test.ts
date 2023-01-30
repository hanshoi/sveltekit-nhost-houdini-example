import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Login from './+page.svelte';
import { goto } from '$app/navigation';
import { auth as nhostAuth } from '$lib/nhost';

function createPage() {
  render(Login);
  const email = screen.getByLabelText('Email address'),
    password = screen.getByLabelText('Password'),
    button = screen.getByRole('button');

  return {
    email,
    password,
    button,
    register: screen.getByText('sign up'),
    forgotPassword: screen.getByText('Forgot your password?'),
    login: async () => {
      await fireEvent.input(email, { target: { value: 'test@test.com' } });
      await fireEvent.input(password, { target: { value: 'supersecret' } });
      await fireEvent.click(button);
    }
  };
}

describe('login form', () => {
  beforeEach(() => {
    nhostAuth.isAuthenticatedAsync.mockResolvedValue(false);
  });

  it('renders page', async () => {
    const page = createPage();

    expect(page.email).toBeInTheDocument();
    expect(page.password).toBeInTheDocument();
    expect(page.button).toBeInTheDocument();
    expect(page.register).toBeInTheDocument();
    expect(page.forgotPassword).toBeInTheDocument();
  });

  it('with generic error message', async () => {
    nhostAuth.signIn.mockResolvedValue({ session: false, error: { error: 'error message' } });
    const page = createPage();

    await page.login();

    expect(await screen.findByText('Your credentials were wrong')).toBeInTheDocument();
  });

  it('with unverified email error message', async () => {
    nhostAuth.signIn.mockResolvedValue({ session: false, error: { error: 'unverified-email' } });
    const page = createPage();

    await page.login();

    expect(await screen.findByText('Email address not verified')).toBeInTheDocument();
  });

  it('success and redirect', async () => {
    nhostAuth.signIn.mockResolvedValue({ session: true, error: null });
    const page = createPage();

    await page.login();

    expect(goto).toHaveBeenCalledWith('/');
  });
});
