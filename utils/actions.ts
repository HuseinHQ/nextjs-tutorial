'use server';

import { writeFile, readFile } from 'fs/promises';
import { revalidatePath } from 'next/cache';

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export const createUserAction = async (prevState: string | null, formData: FormData) => {
  'use server';
  console.log('prevState', prevState);

  await new Promise((resolve) => setTimeout(resolve, 3000));
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const newUser: User = { id: Date.now().toString(), firstName, lastName };

  try {
    await saveUsers(newUser);
    revalidatePath('/actions');

    // some logic
    return 'User created successfully';
  } catch (error) {
    console.log(error);
    return 'Failed to create user';
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  const result = await readFile('users.json', { encoding: 'utf-8' });
  const users = result ? JSON.parse(result) : [];
  return users;
};

export const saveUsers = async (user: User) => {
  const users = await fetchUsers();
  users.push(user);
  await writeFile('users.json', JSON.stringify(users, null, 2));
};

export const deleteUserAction = async (formData: FormData) => {
  const id = formData.get('id') as string;
  const users = await fetchUsers();
  const updatedUsers = users.filter((user) => user.id !== id);
  await writeFile('users.json', JSON.stringify(updatedUsers, null, 2));
  revalidatePath('/actions');
};
export const removeUser = async (id: string, formData: FormData) => {
  const name = formData.get('name') as string;
  console.log(name);

  const users = await fetchUsers();
  const updatedUsers = users.filter((user) => user.id !== id);
  await writeFile('users.json', JSON.stringify(updatedUsers, null, 2));
  revalidatePath('/actions');
};
