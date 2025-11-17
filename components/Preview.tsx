'use client';

import { EmailTemplate, SectionContent, SpacingValue } from '@/lib/types/email';

interface PreviewProps {
  template: EmailTemplate;
}

export default function Preview({ template }: PreviewProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100%',
    }}>
      {/* Preview Label */}
      <div style={{
        marginBottom: 'var(--space-7)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        Preview
      </div>

      {/* Email Container */}
      <div
        style={{
          width: `${template.settings.width}px`,
          maxWidth: '100%',
          border: '1px solid var(--black)',
          background: 'var(--white)',
        }}
      >
        <div
          style={{
            padding: `${getSpacingPx(template.settings.paddingY)} ${getSpacingPx(template.settings.paddingX)}`,
          }}
        >
          {template.sections.length === 0 ? (
            <div
              style={{
                padding: 'var(--space-9)',
                textAlign: 'center',
                fontSize: 'var(--text-sm)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              Your email preview will appear here as you add sections.
            </div>
          ) : (
            template.sections.map((section) => (
              <PreviewSection key={section.id} section={section} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function PreviewSection({ section }: { section: SectionContent }) {
  switch (section.type) {
    case 'heading':
    case 'subheading':
      return (
        <div
          style={{
            paddingTop: getSpacingPx(section.spacing.top),
            paddingBottom: getSpacingPx(section.spacing.bottom),
          }}
        >
          <h2
            style={{
              fontSize: `var(--text-${section.size})`,
              fontWeight: section.weight,
              textAlign: section.align,
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            {section.text || '\u00A0'}
          </h2>
        </div>
      );

    case 'text':
      return (
        <div
          style={{
            paddingTop: getSpacingPx(section.spacing.top),
            paddingBottom: getSpacingPx(section.spacing.bottom),
          }}
        >
          <p
            style={{
              fontSize: `var(--text-${section.size})`,
              textAlign: section.align,
              lineHeight: `var(--leading-${section.lineHeight})`,
              whiteSpace: 'pre-wrap',
            }}
          >
            {section.text || '\u00A0'}
          </p>
        </div>
      );

    case 'button':
      const buttonAlign = section.align === 'center' ? 'center' : section.align === 'right' ? 'flex-end' : 'flex-start';
      return (
        <div
          style={{
            paddingTop: getSpacingPx(section.spacing.top),
            paddingBottom: getSpacingPx(section.spacing.bottom),
            display: 'flex',
            justifyContent: buttonAlign,
          }}
        >
          <button
            style={{
              padding: 'var(--space-3) var(--space-6)',
              border: `${section.style === 'outline' ? '2px' : '0'} solid var(--black)`,
              background: section.style === 'solid' ? 'var(--black)' : 'transparent',
              color: section.style === 'solid' ? 'var(--white)' : 'var(--black)',
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {section.text || '\u00A0'}
          </button>
        </div>
      );

    case 'spacer':
      return (
        <div
          style={{
            height: getSpacingPx(section.height),
          }}
        />
      );

    case 'divider':
      return (
        <div
          style={{
            paddingTop: getSpacingPx(section.spacing.top),
            paddingBottom: getSpacingPx(section.spacing.bottom),
          }}
        >
          <hr
            style={{
              border: 'none',
              borderTop: `${section.thickness}px solid var(--black)`,
              margin: 0,
            }}
          />
        </div>
      );
  }
}

// Helper to convert spacing value to pixels
function getSpacingPx(value: SpacingValue): string {
  const spacingMap: Record<SpacingValue, number> = {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 24,
    6: 32,
    7: 48,
    8: 64,
    9: 96,
    10: 128,
  };
  return `${spacingMap[value]}px`;
}
