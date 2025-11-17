'use client';

import { useState } from 'react';
import { EmailTemplate } from '@/lib/types/email';
import { createTemplateFromPreset, TemplatePreset } from '@/lib/templates';
import TemplateSelector from '@/components/TemplateSelector';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';

export default function Home() {
  const [template, setTemplate] = useState<EmailTemplate | null>(null);

  const handleTemplateSelect = (preset: TemplatePreset) => {
    setTemplate(createTemplateFromPreset(preset));
  };

  const handleStartOver = () => {
    setTemplate(null);
  };

  // Show template selector if no template is chosen
  if (!template) {
    return <TemplateSelector onSelect={handleTemplateSelect} />;
  }

  // Show editor and preview once template is chosen
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: '100vh',
        width: '100vw',
      }}
    >
      {/* Editor Panel */}
      <div
        style={{
          borderRight: '1px solid var(--black)',
          overflowY: 'auto',
          padding: 'var(--space-8)',
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <Editor
            template={template}
            onChange={setTemplate}
            onStartOver={handleStartOver}
          />
        </div>
      </div>

      {/* Preview Panel */}
      <div
        style={{
          overflowY: 'auto',
          padding: 'var(--space-8)',
          background: 'var(--white)',
        }}
      >
        <Preview template={template} />
      </div>
    </div>
  );
}
