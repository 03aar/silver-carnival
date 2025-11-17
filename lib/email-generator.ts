/**
 * Industrial-Grade Email HTML Generator
 *
 * Philosophy:
 * - Bulletproof across all email clients (Gmail, Outlook, Apple Mail, etc.)
 * - Table-based layout (email clients require this)
 * - Inline styles only (external CSS not supported)
 * - Mobile-responsive using media queries
 * - No JavaScript, no external resources
 * - Clean, semantic HTML structure
 *
 * Tested against:
 * - Gmail (web, iOS, Android)
 * - Outlook (2007-2021, 365, web)
 * - Apple Mail (macOS, iOS)
 * - Yahoo Mail
 * - Thunderbird
 */

import { EmailTemplate, SectionContent, SpacingValue } from './types/email';

// Spacing value to pixel conversion
const SPACING_MAP: Record<SpacingValue, number> = {
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

// Font size mapping
const FONT_SIZE_MAP: Record<string, number> = {
  xs: 11,
  sm: 13,
  base: 16,
  lg: 20,
  xl: 28,
  '2xl': 36,
  '3xl': 52,
  '4xl': 72,
};

// Line height mapping
const LINE_HEIGHT_MAP = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
};

export function generateEmailHTML(template: EmailTemplate): string {
  const { sections, settings } = template;
  const paddingX = SPACING_MAP[settings.paddingX];
  const paddingY = SPACING_MAP[settings.paddingY];

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${template.name}</title>
  <style type="text/css">
    /* Reset */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* Typography */
    body, table, td, a {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      color: #000000;
    }

    /* Mobile Responsive */
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .mobile-padding { padding-left: 16px !important; padding-right: 16px !important; }
    }
  </style>
  <!--[if mso]>
  <style type="text/css">
    table { border-collapse: collapse; }
    .button-solid { padding: 12px 24px !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff;">
  <!-- Wrapper table for email clients -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0; padding: 0; background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 0;">
        <!-- Main email container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="${settings.width}" class="email-container" style="margin: 0 auto; max-width: ${settings.width}px; background-color: #ffffff;">
          <tr>
            <td style="padding: ${paddingY}px ${paddingX}px;" class="mobile-padding">
              <!-- Content sections -->
${sections.map((section) => generateSectionHTML(section)).join('\n')}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function generateSectionHTML(section: SectionContent): string {
  switch (section.type) {
    case 'heading':
    case 'subheading':
      return generateHeadingHTML(section);
    case 'text':
      return generateTextHTML(section);
    case 'button':
      return generateButtonHTML(section);
    case 'spacer':
      return generateSpacerHTML(section);
    case 'divider':
      return generateDividerHTML(section);
    default:
      return '';
  }
}

function generateHeadingHTML(
  section: Extract<SectionContent, { type: 'heading' | 'subheading' }>
): string {
  const paddingTop = SPACING_MAP[section.spacing.top];
  const paddingBottom = SPACING_MAP[section.spacing.bottom];
  const fontSize = FONT_SIZE_MAP[section.size];
  const fontWeight = section.weight;
  const textAlign = section.align;
  const lineHeight = 1.2;
  const letterSpacing = '-0.02em';

  const text = escapeHTML(section.text);

  return `              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="padding-top: ${paddingTop}px; padding-bottom: ${paddingBottom}px;">
                <tr>
                  <td align="${textAlign}" style="font-size: ${fontSize}px; font-weight: ${fontWeight}; line-height: ${lineHeight}; letter-spacing: ${letterSpacing}; color: #000000; margin: 0; padding: 0;">
                    ${text}
                  </td>
                </tr>
              </table>`;
}

function generateTextHTML(section: Extract<SectionContent, { type: 'text' }>): string {
  const paddingTop = SPACING_MAP[section.spacing.top];
  const paddingBottom = SPACING_MAP[section.spacing.bottom];
  const fontSize = FONT_SIZE_MAP[section.size];
  const textAlign = section.align;
  const lineHeight = LINE_HEIGHT_MAP[section.lineHeight];

  const text = escapeHTML(section.text).replace(/\n/g, '<br>');

  return `              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="padding-top: ${paddingTop}px; padding-bottom: ${paddingBottom}px;">
                <tr>
                  <td align="${textAlign}" style="font-size: ${fontSize}px; font-weight: 400; line-height: ${lineHeight}; color: #000000; margin: 0; padding: 0;">
                    ${text}
                  </td>
                </tr>
              </table>`;
}

function generateButtonHTML(section: Extract<SectionContent, { type: 'button' }>): string {
  const paddingTop = SPACING_MAP[section.spacing.top];
  const paddingBottom = SPACING_MAP[section.spacing.bottom];
  const textAlign = section.align;
  const text = escapeHTML(section.text);

  const buttonStyle =
    section.style === 'solid'
      ? 'background-color: #000000; color: #ffffff; border: 2px solid #000000;'
      : 'background-color: #ffffff; color: #000000; border: 2px solid #000000;';

  return `              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="padding-top: ${paddingTop}px; padding-bottom: ${paddingBottom}px;">
                <tr>
                  <td align="${textAlign}">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:44px;v-text-anchor:middle;width:auto;" arcsize="0%" stroke="t" strokecolor="#000000" strokeweight="2px" fillcolor="${section.style === 'solid' ? '#000000' : '#ffffff'}">
                    <w:anchorlock/>
                    <center style="color:${section.style === 'solid' ? '#ffffff' : '#000000'};font-family:sans-serif;font-size:15px;font-weight:600;">${text}</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0; display: inline-block;">
                      <tr>
                        <td style="${buttonStyle} padding: 12px 24px; font-size: 15px; font-weight: 600; text-align: center; text-decoration: none; display: inline-block; mso-padding-alt: 0; border-radius: 0;">
                          <a href="#" style="color: ${section.style === 'solid' ? '#ffffff' : '#000000'}; text-decoration: none; display: block;">${text}</a>
                        </td>
                      </tr>
                    </table>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>`;
}

function generateSpacerHTML(section: Extract<SectionContent, { type: 'spacer' }>): string {
  const height = SPACING_MAP[section.height];

  return `              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="height: ${height}px; line-height: ${height}px; font-size: 0;">
                    &nbsp;
                  </td>
                </tr>
              </table>`;
}

function generateDividerHTML(section: Extract<SectionContent, { type: 'divider' }>): string {
  const paddingTop = SPACING_MAP[section.spacing.top];
  const paddingBottom = SPACING_MAP[section.spacing.bottom];
  const thickness = section.thickness;

  return `              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="padding-top: ${paddingTop}px; padding-bottom: ${paddingBottom}px;">
                <tr>
                  <td style="border-top: ${thickness}px solid #000000; line-height: 0; font-size: 0;">
                    &nbsp;
                  </td>
                </tr>
              </table>`;
}

function escapeHTML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
