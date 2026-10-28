import { Suspense, useState } from 'react';

import { refExamples } from 'features/refExamples';

export const RefExamplesPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeExample = refExamples[activeIndex];

  return (
    <div className="page-full-width" style={{ display: 'flex', height: '100vh', alignItems: 'flex-start' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '240px',
          height: '100%',
          borderRight: '1px solid #e0e0e0',
          padding: '16px',
          backgroundColor: '#fafafa',
        }}
      >
        <h2 style={{ margin: '0 0 16px', fontSize: '16px' }}>Ref Examples</h2>
        <nav>
          {refExamples.map((example, index) => (
            <button
              key={example.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 12px',
                marginBottom: '4px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                backgroundColor: activeIndex === index ? '#e3f2fd' : 'transparent',
                fontWeight: activeIndex === index ? '600' : '400',
                color: activeIndex === index ? '#1976d2' : 'inherit',
              }}
            >
              {example.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ margin: '0 0 24px' }}>{activeExample.name}</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <activeExample.component />
        </Suspense>
      </main>
    </div>
  );
};