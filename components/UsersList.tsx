import React from 'react';
import { fetchUsers } from '@/utils/actions';
import DeleteButton from './DeleteButton';

async function UsersList() {
  const users = await fetchUsers();
  return (
    <div className="mt-4">
      {users.length ? (
        <div className="max-w-lg">
          {users.map((user) => (
            <h4 key={user.id} className="capitalize mb-2 text-lg flex items-center justify-between">
              {user.firstName} {user.lastName}
              <DeleteButton id={user.id} />
            </h4>
          ))}
        </div>
      ) : (
        <p>No users found...</p>
      )}
    </div>
  );
}

export default UsersList;
