<script lang="ts">
import { goto } from '$app/navigation';
import auth from '$lib/auth';
import { getErrorMessage } from '$lib/errors';
import { onMount } from 'svelte';

let email: string;
let password: string;
let success = true;
let error: string | null = null;

onMount(async () => {
  if (await auth.isAuthenticated()) {
    goto('/');
  }
});

async function login() {
  try {
    await auth.login(email, password);
    success = true;
  } catch (e) {
    success = false;
    const errorMessage = getErrorMessage(e);
    if (errorMessage == 'unverified-user') {
      error = 'Email address not verified';
    }
  }
}
</script>

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
      Sign in to your account
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Or
      {' '}
      <a href="/register" class="font-medium text-indigo-600 hover:text-indigo-500">sign up</a>
    </p>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" on:submit|preventDefault={login}>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
          <div class="mt-1">
            <input
              bind:value={email}
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1">
            <input
              bind:value={password}
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {#if success === false && error === null}
          <div class="text-sm text-red-500">Your credentials were wrong</div>
        {:else if success === false && typeof error === 'string'}
          <div class="text-sm text-red-500">{error}</div>
        {/if}
        <div class="flex items-center justify-between" />

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
              >Forgot your password?</a
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >Sign in</button
          >
        </div>
      </form>
    </div>
  </div>
</div>
