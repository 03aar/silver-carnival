'use client';

import { useState } from 'react';
import { EmailTemplate, SectionContent, SectionType, DEFAULT_SPACING } from '@/lib/types/email';
import SectionEditor from './SectionEditor';
import { generateEmailHTML } from '@/lib/email-generator';

interface EditorProps {
  template: EmailTemplate;
  onChange: (template: EmailTemplate) => void;
}

export default function Editor({ template, onChange }: EditorProps) {
  const [showExportModal, setShowExportModal] = useState(false);
  const addSection = (type: SectionType) => {
    const newSection: SectionContent = createDefaultSection(type);
    onChange({
      ...template,
      sections: [...template.sections, newSection],
      meta: {
        ...template.meta,
        modified: new Date().toISOString(),
      },
    });
  };

  const updateSection = (index: number, section: SectionContent) => {
    const newSections = [...template.sections];
    newSections[index] = section;
    onChange({
      ...template,
      sections: newSections,
      meta: {
        ...template.meta,
        modified: new Date().toISOString(),
      },
    });
  };

  const deleteSection = (index: number) => {
    onChange({
      ...template,
      sections: template.sections.filter((_, i) => i !== index),
      meta: {
        ...template.meta,
        modified: new Date().toISOString(),
      },
    });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...template.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];

    onChange({
      ...template,
      sections: newSections,
      meta: {
        ...template.meta,
        modified: new Date().toISOString(),
      },
    });
  };

  const exportHTML = () => {
    const html = generateEmailHTML(template);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '-') || 'email'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyHTML = () => {
    const html = generateEmailHTML(template);
    navigator.clipboard.writeText(html);
  };

  return (
    <div>
      {/* Header */}
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 'var(--space-3)',
        }}>
          <h1 style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 600,
          }}>
            Email Studio
          </h1>
          <button
            onClick={() => setShowExportModal(true)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              border: '1px solid var(--black)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--black)';
              e.currentTarget.style.color = 'var(--white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--black)';
            }}
          >
            Export
          </button>
        </div>
        <p style={{
          fontSize: 'var(--text-sm)',
          lineHeight: 'var(--leading-relaxed)',
        }}>
          Build email templates with absolute precision and restraint.
        </p>
      </header>

      {/* Export Modal */}
      {showExportModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--space-6)',
          }}
          onClick={() => setShowExportModal(false)}
        >
          <div
            style={{
              background: 'var(--white)',
              border: '2px solid var(--black)',
              padding: 'var(--space-6)',
              maxWidth: '400px',
              width: '100%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 600,
              marginBottom: 'var(--space-5)',
            }}>
              Export Email
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}>
              <button
                onClick={() => {
                  exportHTML();
                  setShowExportModal(false);
                }}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  border: '2px solid var(--black)',
                  background: 'var(--black)',
                  color: 'var(--white)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                Download HTML
              </button>
              <button
                onClick={() => {
                  copyHTML();
                  setShowExportModal(false);
                }}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  border: '2px solid var(--black)',
                  background: 'transparent',
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  border: '1px solid var(--black)',
                  background: 'transparent',
                  fontSize: 'var(--text-sm)',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Section Toolbar */}
      <div style={{
        marginBottom: 'var(--space-7)',
        paddingBottom: 'var(--space-6)',
        borderBottom: '1px solid var(--black)',
      }}>
        <div style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          marginBottom: 'var(--space-3)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          Add Section
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
        }}>
          {(['heading', 'subheading', 'text', 'button', 'spacer', 'divider'] as SectionType[]).map((type) => (
            <button
              key={type}
              onClick={() => addSection(type)}
              style={{
                padding: 'var(--space-2) var(--space-3)',
                border: '1px solid var(--black)',
                fontSize: 'var(--text-sm)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--black)';
                e.currentTarget.style.color = 'var(--white)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--black)';
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
      }}>
        {template.sections.length === 0 ? (
          <div style={{
            padding: 'var(--space-9) var(--space-6)',
            textAlign: 'center',
            border: '1px solid var(--black)',
            fontSize: 'var(--text-sm)',
            lineHeight: 'var(--leading-relaxed)',
          }}>
            No sections yet. Add your first section above to begin crafting your email.
          </div>
        ) : (
          template.sections.map((section, index) => (
            <SectionEditor
              key={section.id}
              section={section}
              index={index}
              totalSections={template.sections.length}
              onChange={(updated) => updateSection(index, updated)}
              onDelete={() => deleteSection(index)}
              onMove={(direction) => moveSection(index, direction)}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Helper to create default sections
function createDefaultSection(type: SectionType): SectionContent {
  const id = crypto.randomUUID();
  const baseSpacing = { top: DEFAULT_SPACING, bottom: DEFAULT_SPACING };

  switch (type) {
    case 'heading':
      return {
        id,
        type: 'heading',
        text: 'Heading',
        size: '2xl',
        align: 'left',
        weight: 600,
        spacing: baseSpacing,
      };
    case 'subheading':
      return {
        id,
        type: 'subheading',
        text: 'Subheading',
        size: 'xl',
        align: 'left',
        weight: 600,
        spacing: baseSpacing,
      };
    case 'text':
      return {
        id,
        type: 'text',
        text: 'Your story begins here.',
        size: 'base',
        align: 'left',
        lineHeight: 'relaxed',
        spacing: baseSpacing,
      };
    case 'spacer':
      return {
        id,
        type: 'spacer',
        height: 6,
      };
    case 'divider':
      return {
        id,
        type: 'divider',
        thickness: 1,
        spacing: baseSpacing,
      };
    case 'button':
      return {
        id,
        type: 'button',
        text: 'Continue',
        align: 'left',
        style: 'solid',
        spacing: baseSpacing,
      };
  }
}
