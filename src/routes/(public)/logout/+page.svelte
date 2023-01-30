<script lang="ts">
import { goto } from '$app/navigation';
import auth from '$lib/auth';
import { onMount } from 'svelte';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

const timeout = 5000; // 5 seconds
let progressBar = tweened(0, {
  duration: timeout - 800,
  easing: cubicOut
});

onMount(async () => {
  await auth.logout();
  // this starts progress bar animation from 0-100 with length of timeout
  progressBar.set(100);
  setTimeout(async () => {
    await goto('/login');
  }, timeout);
});
</script>

<div class="flex min-h-full flex-col bg-white pt-16 pb-12">
  <main class="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
    <div class="flex flex-shrink-0 justify-center">
      <a href="/login" class="inline-flex">
        <span class="sr-only">Logout</span>
      </a>
    </div>
    <div class="py-16">
      <div class="text-center">
        <h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          You have logged out.
        </h1>
        <p class="mt-2 text-base text-gray-500">Thank you for visiting us.</p>
        <div class="mt-6">
          <a href="/login" class="text-base font-medium text-indigo-600 hover:text-indigo-500">
            Log back in
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
        <div class="mt-6 flex justify-center">
          <div class="w-3/12 rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              class="truncate rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
              style="width: {$progressBar}%"
            >
              redirecting to login
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
