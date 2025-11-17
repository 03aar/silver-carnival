'use client';

import { TEMPLATE_PRESETS, TemplatePreset } from '@/lib/templates';

interface TemplateSelectorProps {
  onSelect: (preset: TemplatePreset) => void;
}

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <div
      className="fade-in-scale"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 'var(--space-8)',
        background: 'var(--white)',
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: '640px',
          width: '100%',
          marginBottom: 'var(--space-9)',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--text-3xl)',
            fontWeight: 600,
            marginBottom: 'var(--space-4)',
            letterSpacing: 'var(--tracking-tight)',
          }}
        >
          Email Studio
        </h1>
        <p
          style={{
            fontSize: 'var(--text-base)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--black)',
          }}
        >
          Choose a story format to begin.
        </p>
      </div>

      {/* Template Grid */}
      <div
        style={{
          maxWidth: '960px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-5)',
        }}
      >
        {TEMPLATE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset)}
            style={{
              border: '1px solid var(--black)',
              padding: 'var(--space-6)',
              textAlign: 'left',
              background: 'var(--white)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderWidth = '2px';
              e.currentTarget.style.padding = 'calc(var(--space-6) - 1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderWidth = '1px';
              e.currentTarget.style.padding = 'var(--space-6)';
            }}
          >
            {/* Category Label */}
            <div
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--space-3)',
                opacity: 0.6,
              }}
            >
              {preset.category}
            </div>

            {/* Template Name */}
            <h3
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                marginBottom: 'var(--space-2)',
                lineHeight: 'var(--leading-tight)',
              }}
            >
              {preset.name}
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: 'var(--text-sm)',
                lineHeight: 'var(--leading-relaxed)',
                opacity: 0.8,
              }}
            >
              {preset.description}
            </p>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 'var(--space-9)',
          fontSize: 'var(--text-xs)',
          opacity: 0.5,
        }}
      >
        The quietest, sharpest email storytelling engine.
      </div>
    </div>
  );
}
