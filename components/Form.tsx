'use client';

import React from 'react';
import { createUserAction } from '@/utils/actions';
import { useFormState, useFormStatus } from 'react-dom';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={btnStyle(pending)} disabled={pending}>
      {pending ? 'submitting...' : 'submit'}
    </button>
  );
};

function Form() {
  const [message, formAction] = useFormState(createUserAction, null);

  return (
    <form action={formAction} className={formStyle}>
      {message && <p className="text-red-500">{message}</p>}
      <h2 className="text-2xl capitalize mb-4">create user</h2>
      <input type="text" name="firstName" defaultValue="Peter" required className={inputStyle} />
      <input type="text" name="lastName" defaultValue="Parker" required className={inputStyle} />
      <SubmitButton />
    </form>
  );
}

const formStyle = 'max-w-lg flex flex-col gap-y-4  shadow rounded p-8';
const inputStyle = 'border shadow rounded py-2 px-3 text-gray-700';
const btnStyle = (pending: boolean) =>
  `${pending ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize`;

export default Form;
