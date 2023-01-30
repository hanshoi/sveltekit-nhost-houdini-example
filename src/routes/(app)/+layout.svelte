<script lang ts>
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import auth from '$lib/auth';
import WaitForAuth from '$lib/components/WaitForAuth.svelte';

onMount(async () => {
  if (!(await auth.isAuthenticated())) {
    goto('/login');
  }
});
</script>

<WaitForAuth>
  <div class="flex flex-1 flex-col">
    <main class="flex-1">
      <div class="py-6">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 class="text-2xl font-semibold text-gray-900">Todos</h1>
        </div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <slot />
        </div>
      </div>
    </main>
  </div>
</WaitForAuth>
