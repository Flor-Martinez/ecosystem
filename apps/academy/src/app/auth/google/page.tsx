'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleAuthPopupPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/campus');
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
        background: '#0B0F19',
        color: '#FFFFFF',
      }}
    >
      <p>Redirigiendo a la Academia...</p>
    </div>
  );
}
