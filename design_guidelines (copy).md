# Design Guidelines: Cybersecurity Portfolio Website

## Design Approach
**Reference-Based with Strong Thematic Direction**: Matrix-inspired cybersecurity aesthetic with modern web polish. Draw inspiration from GitHub's dark mode sophistication, Stripe's precision, and hacker-themed terminal interfaces while maintaining the distinctive Matrix visual language.

## Core Design Principles
1. **Cyber Authenticity**: Embrace terminal/hacker culture aesthetics genuinely
2. **RTL Excellence**: Hebrew text flows naturally with proper right-to-left implementation
3. **Interactive Immersion**: Matrix background and terminal create engagement
4. **Professional Polish**: Balance cyberpunk edge with portfolio credibility

## Typography

**Primary Font**: 'IBM Plex Mono' (Google Fonts) - monospace for authenticity
**Secondary Font**: 'Assistant' or 'Heebo' (Google Fonts) - Hebrew-optimized sans-serif for body text

**Hierarchy**:
- Hero Title: 4xl to 6xl, bold, cyan accent (#14ffec)
- Section Headers: 3xl to 4xl, semi-bold
- Typing Effect: xl to 2xl, regular weight
- Terminal Text: base to lg, monospace
- Body/Skills: base to lg, regular
- Small Print/Meta: sm, muted

## Layout System

**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Section padding: py-16 to py-24 (desktop), py-12 (mobile)
- Component spacing: gap-6 to gap-8
- Inner padding: p-6 to p-8

**Container Strategy**:
- Full-width Matrix canvas background (fixed position)
- Content sections: max-w-4xl to max-w-6xl, centered
- Terminal: max-w-3xl for focused experience
- Contact form: max-w-2xl

## Color Palette (Reference Only - No Implementation)
Cyber theme with high-contrast neon accents on deep blacks

## Component Library

### Hero Section
- Full viewport height (min-h-screen)
- Matrix animation canvas (fixed background layer)
- Centered content: Name/title, typing effect, social links
- No hero image - Matrix animation is the visual impact
- Typing effect cycles through Hebrew cybersecurity terms
- Social links as subtle neon-accented text links

### Matrix Background Canvas
- Fixed position covering full viewport
- Falling characters: Hebrew letters + binary (0,1) + cyber symbols
- Neon cyan color with fade trails
- Subtle, non-distracting animation speed

### Skills Section
- Transparent card with neon border
- Grid layout: 2 columns on desktop, 1 on mobile
- Each skill: monospace font, subtle glow effect on border
- Icon option: small terminal/code icons from Heroicons

### Interactive Terminal
- Full-width black background section
- Green/cyan monospace text
- Command history display with scroll
- Live input field with cursor blink
- Commands: help, about, skills, clear, projects
- Output appears line-by-line with slight delay

### Contact Form
- Transparent card with neon border (matching skills section)
- Fields: Name, Email, Message (textarea)
- RTL-aware input alignment
- Button: solid cyan background with dark text
- Form validation states with subtle border glow

### Additional Sections (Professional Enhancement)
- **About/Bio**: Brief paragraph with cybersecurity focus areas
- **Projects/Certifications**: Card grid showcasing work/credentials
- **Footer**: Minimal with copyright, additional social links

## Navigation
Simple header bar with:
- Logo/name (top right for RTL)
- Navigation links (Hebrew): אודות, כישורים, פרויקטים, צור קשר
- Sticky on scroll with backdrop blur
- Anchor-based smooth scrolling

## Responsive Behavior
- Desktop: Multi-column layouts, wider terminals
- Tablet: 2-column grids reduce to single
- Mobile: Stack all content, full-width components
- Matrix animation density adjusts to screen size

## Interactions & Animations
**Minimal but Impactful**:
- Matrix background: continuous subtle animation
- Typing effect: delete/retype cycle in hero
- Terminal: command execution with line-by-line output
- Hover states: subtle glow on links/buttons
- Scroll: smooth anchor navigation
- NO complex scroll-triggered animations
- NO parallax effects
- NO excessive transitions

## Images
**No images required** - Matrix animation canvas serves as the primary visual element. This is a code-focused, terminal-aesthetic portfolio where the animated background provides all necessary visual interest.

## Accessibility
- RTL implementation throughout (dir="rtl" on html)
- Semantic HTML5 structure
- Form labels in Hebrew
- Keyboard navigation for terminal
- Sufficient contrast despite dark theme
- Focus states on all interactive elements

## Key Differentiators
1. **Authentic Terminal Interaction**: Functional command-line interface, not just visual
2. **Hebrew-First Design**: Proper RTL flow, Hebrew typography excellence
3. **Matrix as Canvas**: Background animation is integral, not decorative
4. **Hacker Aesthetic with Professionalism**: Balance edge with credibility

This creates a distinctive, memorable portfolio that showcases technical skills through the design itself while maintaining professional credibility for cybersecurity work.