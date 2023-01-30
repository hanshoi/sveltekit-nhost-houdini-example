import '@testing-library/jest-dom';
import { vi } from 'vitest';
import.meta.env.VITE_NHOST_SUBDOMAIN = 'localhost';
import.meta.env.VITE_NHOST_REGION = 'test';

vi.mock('$lib/nhost', () => {
	return {
		auth: {
			signIn: vi.fn().mockResolvedValue({ session: true, error: null }),
			signOut: vi.fn(),
			signUp: vi.fn(),
			isAuthenticatedAsync: vi.fn().mockResolvedValue(true)
		},
		storage: vi.fn(),
		graphql: vi.fn()
	};
});

vi.mock('$app/navigation', () => {
	return { goto: vi.fn() };
});

vi.mock('$app/environment', () => {
	return { browser: true };
});
