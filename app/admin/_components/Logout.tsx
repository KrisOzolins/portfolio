// 'use client';

import { logout } from '@/app/admin/_lib/actions';
import { useFormState, useFormStatus } from 'react-dom';

export default function Logout() {
  const [errorMessage, dispatch] = useFormState(logout, undefined);

  return (
    <form action={dispatch} className="block py-2.5 px-4 hover:bg-gray-700">
      <LogoutButton />
    </form>
  );
}

function LogoutButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <button aria-disabled={pending} type="submit" onClick={handleClick}>
      Logout
    </button>
  );
}
