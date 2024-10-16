import { fetchUsers, saveUsers } from '@/utils/actions';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  console.log(req.url);
  console.log(req.nextUrl.searchParams.get('id'));
  const users = await fetchUsers();
  return NextResponse.json({ data: users });
};

export const POST = async (req: NextRequest) => {
  const user = await req.json();
  const newUser = { id: Date.now(), ...user };
  await saveUsers(newUser);

  return NextResponse.json({ message: 'user created' });
};
