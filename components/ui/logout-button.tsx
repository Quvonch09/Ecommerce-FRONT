'use client';

import { useState } from 'react';

export function LogoutButton() {
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    window.location.reload();
  };

  return (
    <button className="ghost-button" disabled={isPending} onClick={handleLogout} type="button">
      {isPending ? 'Closing...' : 'Logout'}
    </button>
  );
}
