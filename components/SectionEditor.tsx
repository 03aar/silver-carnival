'use client';

import { SectionContent, SpacingValue, Alignment, TextSize, FontWeight } from '@/lib/types/email';

interface SectionEditorProps {
  section: SectionContent;
  index: number;
  totalSections: number;
  onChange: (section: SectionContent) => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

export default function SectionEditor({
  section,
  index,
  totalSections,
  onChange,
  onDelete,
  onMove,
}: SectionEditorProps) {
  return (
    <div style={{
      border: '1px solid var(--black)',
      padding: 'var(--space-5)',
    }}>
      {/* Section Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-4)',
        paddingBottom: 'var(--space-3)',
        borderBottom: '1px solid var(--black)',
      }}>
        <div style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {section.type}
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button
            onClick={() => onMove('up')}
            disabled={index === 0}
            style={{
              padding: 'var(--space-1) var(--space-2)',
              border: '1px solid var(--black)',
              fontSize: 'var(--text-xs)',
              opacity: index === 0 ? 0.3 : 1,
              cursor: index === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            ↑
          </button>
          <button
            onClick={() => onMove('down')}
            disabled={index === totalSections - 1}
            style={{
              padding: 'var(--space-1) var(--space-2)',
              border: '1px solid var(--black)',
              fontSize: 'var(--text-xs)',
              opacity: index === totalSections - 1 ? 0.3 : 1,
              cursor: index === totalSections - 1 ? 'not-allowed' : 'pointer',
            }}
          >
            ↓
          </button>
          <button
            onClick={onDelete}
            style={{
              padding: 'var(--space-1) var(--space-2)',
              border: '1px solid var(--black)',
              fontSize: 'var(--text-xs)',
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Section Controls */}
      {renderControls(section, onChange)}
    </div>
  );
}

function renderControls(section: SectionContent, onChange: (section: SectionContent) => void) {
  const updateField = <K extends keyof SectionContent>(field: K, value: SectionContent[K]) => {
    onChange({ ...section, [field]: value });
  };

  const spacing = 'spacing' in section ? section.spacing : null;
  const updateSpacing = (type: 'top' | 'bottom', value: SpacingValue) => {
    if (spacing) {
      onChange({ ...section, spacing: { ...spacing, [type]: value } } as SectionContent);
    }
  };

  switch (section.type) {
    case 'heading':
    case 'subheading':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Field label="Text">
            <input
              type="text"
              value={section.text}
              onChange={(e) => updateField('text', e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--space-2) var(--space-3)',
                fontSize: 'var(--text-base)',
              }}
            />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-3)' }}>
            <Field label="Size">
              <select
                value={section.size}
                onChange={(e) => updateField('size', e.target.value as TextSize)}
                style={{
                  width: '100%',
                  padding: 'var(--space-2)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                {(section.type === 'heading'
                  ? ['xl', '2xl', '3xl', '4xl']
                  : ['lg', 'xl', '2xl']
                ).map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Align">
              <select
                value={section.align}
                onChange={(e) => updateField('align', e.target.value as Alignment)}
                style={{
                  width: '100%',
                  padding: 'var(--space-2)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                {['left', 'center', 'right'].map((align) => (
                  <option key={align} value={align}>
                    {align}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Weight">
              <select
                value={section.weight}
                onChange={(e) => updateField('weight', Number(e.target.value) as FontWeight)}
                style={{
                  width: '100%',
                  padding: 'var(--space-2)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                <option value={400}>400</option>
                <option value={600}>600</option>
              </select>
            </Field>
          </div>

          <SpacingControls spacing={spacing!} onChange={updateSpacing} />
        </div>
      );

    case 'text':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Field label="Text">
            <textarea
              value={section.text}
              onChange={(e) => updateField('text', e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: 'var(--space-2) var(--space-3)',
                fontSize: 'var(--text-base)',
                resize: 'vertical',
              }}
            />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-3)' }}>
            <Field label="Size">
              <select
                value={section.size}
                onChange={(e) => updateField('size', e.target.value as TextSize)}
                style={{
                  width: '100%',
                  padding: 'var(--space-2)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                {['sm', 'base', 'lg'].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Align">
              <select
                value={section.align}
                onChange={(e) => updateField('align', e.target.value as Alignment)}
                style={{
                  width: '100%',
                  padding: 'var(--space-2)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                {['left', 'center', 'right'].map((align) => (
                  <option key={align} value={align}>
                    {align}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Line Height">
              <select
                value={section.lineHeight}
                onChange={(e) => updateField('lineHeight', e.target.value as any)}
                style={{
                  width: '100%',
                  padding: 'var(--space-2)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                {['tight', 'normal', 'relaxed', 'loose'].map((lh) => (
                  <option key={lh} value={lh}>
                    {lh}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <SpacingControls spacing={spacing!} onChange={updateSpacing} />
        </div>
      );

    case 'button':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Field label="Text">
            <input
              type="text"
              value={section.text}
              onChange={(e) => updateField('text', e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--space-2) var(--space-3)',
                fontSize: 'var(--text-base)',
              }}
            />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Field label="Align">
              <select
                value={section.align}
                onChange={(e) => updateField('align', e.target.value as Alignment)}
                style={{
                  width: '100%',
                  padding: 'var(--space-2)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                {['left', 'center', 'right'].map((align) => (
                  <option key={align} value={align}>
                    {align}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Style">
              <select
                value={section.style}
                onChange={(e) => updateField('style', e.target.value as 'solid' | 'outline')}
                style={{
                  width: '100%',
                  padding: 'var(--space-2)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                <option value="solid">solid</option>
                <option value="outline">outline</option>
              </select>
            </Field>
          </div>

          <SpacingControls spacing={spacing!} onChange={updateSpacing} />
        </div>
      );

    case 'spacer':
      return (
        <Field label="Height">
          <select
            value={section.height}
            onChange={(e) => updateField('height', Number(e.target.value) as SpacingValue)}
            style={{
              width: '100%',
              padding: 'var(--space-2)',
              fontSize: 'var(--text-sm)',
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </Field>
      );

    case 'divider':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Field label="Thickness">
            <select
              value={section.thickness}
              onChange={(e) => updateField('thickness', Number(e.target.value) as 1 | 2)}
              style={{
                width: '100%',
                padding: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
              }}
            >
              <option value={1}>1px</option>
              <option value={2}>2px</option>
            </select>
          </Field>

          <SpacingControls spacing={spacing!} onChange={updateSpacing} />
        </div>
      );
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          marginBottom: 'var(--space-2)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function SpacingControls({
  spacing,
  onChange,
}: {
  spacing: { top: SpacingValue; bottom: SpacingValue };
  onChange: (type: 'top' | 'bottom', value: SpacingValue) => void;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
      <Field label="Top Space">
        <select
          value={spacing.top}
          onChange={(e) => onChange('top', Number(e.target.value) as SpacingValue)}
          style={{
            width: '100%',
            padding: 'var(--space-2)',
            fontSize: 'var(--text-sm)',
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Bottom Space">
        <select
          value={spacing.bottom}
          onChange={(e) => onChange('bottom', Number(e.target.value) as SpacingValue)}
          style={{
            width: '100%',
            padding: 'var(--space-2)',
            fontSize: 'var(--text-sm)',
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}
