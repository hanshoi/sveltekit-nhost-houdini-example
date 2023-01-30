<script lang="ts">
import type { PageData } from './$houdini';
import { CachePolicy, graphql } from '$houdini';
export let data: PageData;
$: ({ Todo } = data);
$: todos = $Todo?.data?.todos || [];
</script>

<div class="py-4">
  <div class="h-96 rounded-lg border-4 border-dashed border-gray-200">
    <div class="flex flex-row p-3">
      <form method="POST" class="basis-1/2 space-y-3">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <input
            type="text"
            name="description"
            id="description"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-0 sm:w-auto sm:text-sm"
          >Add</button
        >
      </form>
      <div class="w-full space-y-3 p-3">
        {#each todos as todo (todo.id)}
          <div class="rounded border-2 p-2">
            <h2 class="text-2xl font-semibold text-gray-700">{todo.title}</h2>
            {#if todo.description}
              <p class="text-sm text-gray-500">{todo.description}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
