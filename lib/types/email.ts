/**
 * Email Template Data Model
 *
 * Philosophy:
 * - Each template is a story
 * - Each section is a chapter
 * - Each element serves a narrative purpose
 * - Only essential parameters that matter
 */

// Spacing Scale (aligned with CSS variables)
export type SpacingValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// Text Hierarchy Levels
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

// Text Alignment
export type Alignment = 'left' | 'center' | 'right';

// Content Weight (hierarchy through font-weight)
export type FontWeight = 400 | 600;

// Section Types - The building blocks of narrative
export type SectionType =
  | 'heading'      // Primary heading - story title
  | 'subheading'   // Secondary heading - chapter title
  | 'text'         // Body text - the story itself
  | 'spacer'       // Intentional negative space
  | 'divider'      // Visual separation - scene break
  | 'button';      // Call to action - story conclusion

// Base Content Interface
export interface BaseContent {
  id: string;
  type: SectionType;
}

// Heading Section
export interface HeadingContent extends BaseContent {
  type: 'heading';
  text: string;
  size: Extract<TextSize, 'xl' | '2xl' | '3xl' | '4xl'>;
  align: Alignment;
  weight: FontWeight;
  spacing: {
    top: SpacingValue;
    bottom: SpacingValue;
  };
}

// Subheading Section
export interface SubheadingContent extends BaseContent {
  type: 'subheading';
  text: string;
  size: Extract<TextSize, 'lg' | 'xl' | '2xl'>;
  align: Alignment;
  weight: FontWeight;
  spacing: {
    top: SpacingValue;
    bottom: SpacingValue;
  };
}

// Text Section
export interface TextContent extends BaseContent {
  type: 'text';
  text: string;
  size: Extract<TextSize, 'sm' | 'base' | 'lg'>;
  align: Alignment;
  lineHeight: 'tight' | 'normal' | 'relaxed' | 'loose';
  spacing: {
    top: SpacingValue;
    bottom: SpacingValue;
  };
}

// Spacer Section - Negative space as material
export interface SpacerContent extends BaseContent {
  type: 'spacer';
  height: SpacingValue;
}

// Divider Section - Scene break
export interface DividerContent extends BaseContent {
  type: 'divider';
  thickness: 1 | 2;
  spacing: {
    top: SpacingValue;
    bottom: SpacingValue;
  };
}

// Button Section
export interface ButtonContent extends BaseContent {
  type: 'button';
  text: string;
  align: Alignment;
  style: 'solid' | 'outline';
  spacing: {
    top: SpacingValue;
    bottom: SpacingValue;
  };
}

// Union type of all content types
export type SectionContent =
  | HeadingContent
  | SubheadingContent
  | TextContent
  | SpacerContent
  | DividerContent
  | ButtonContent;

// Email Template - The complete story
export interface EmailTemplate {
  id: string;
  name: string;
  sections: SectionContent[];
  meta: {
    created: string;
    modified: string;
  };
  settings: {
    width: 600 | 650 | 700;  // Email-safe widths
    paddingX: SpacingValue;   // Horizontal breathing room
    paddingY: SpacingValue;   // Vertical breathing room
  };
}

// Default values - Starting with intention
export const DEFAULT_SPACING: SpacingValue = 5;
export const DEFAULT_WIDTH = 600;
export const DEFAULT_PADDING: SpacingValue = 6;

// Template preset - The blank canvas
export const createEmptyTemplate = (): EmailTemplate => ({
  id: crypto.randomUUID(),
  name: 'Untitled',
  sections: [],
  meta: {
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
  settings: {
    width: DEFAULT_WIDTH,
    paddingX: DEFAULT_PADDING,
    paddingY: DEFAULT_PADDING,
  },
});
