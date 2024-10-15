'use server';

import { writeFile, readFile } from 'fs/promises';
import { revalidatePath } from 'next/cache';

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export const createUserAction = async (prevState: any, formData: FormData) => {
  'use server';
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const newUser: User = { id: Date.now().toString(), firstName, lastName };

  try {
    await saveUsers(newUser);
    revalidatePath('/actions');
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  const result = await readFile('users.json', { encoding: 'utf-8' });
  const users = result ? JSON.parse(result) : [];
  return users;
};

const saveUsers = async (user: User) => {
  const users = await fetchUsers();
  users.push(user);
  await writeFile('users.json', JSON.stringify(users, null, 2));
};
