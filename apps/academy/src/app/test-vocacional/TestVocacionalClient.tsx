'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { EblVocationalTestView } from '@/components/campus/EblVocationalTestView';

export function TestVocacionalClient() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '80vh', padding: '2rem 1rem 4rem', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <EblVocationalTestView
          onBackToDashboard={() => router.push('/campus')}
          onGoToModule={(targetView) => {
            if (targetView === 'modulo-cv' || targetView === 'modulo-1' || targetView === 'modulo-fundamentos') {
              router.push('/campus');
            } else {
              router.push('/experiencia');
            }
          }}
        />
      </div>
    </div>
  );
}
