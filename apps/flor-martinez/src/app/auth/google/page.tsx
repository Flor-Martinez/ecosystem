'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleAuthRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    if (window.opener) {
      window.close();
    } else {
      router.replace('/');
    }
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'sans-serif',
        color: '#666',
        backgroundColor: '#faf5ee',
      }}
    >
      <p>Redirigiendo a Flor Martínez...</p>
    </div>
  );
}
