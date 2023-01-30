import type { Actions } from './$types';
import { graphql } from '$houdini';
import { fail } from '@sveltejs/kit';

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();

    const title = data.get('title')?.toString();
    const description = data.get('description') as string | null | undefined;

    if (!title) {
      return fail(403, { title: '*' });
    }

    const addTodo = graphql(`
      mutation addTodo($title: String!, $description: String) {
        insert_todos_one(object: { title: $title, description: $description }) {
          id
          title
          description
        }
      }
    `);

    try {
      return await addTodo.mutate({ title, description }, { event });
    } catch (error) {
      console.error('error', error);
      return fail(403, { error });
    }
  }
} satisfies Actions;