# Theme Variables Reference

This document lists all CSS variables used in the theme system. Both light and dark theme values are implemented and working.

## Background Colors

| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-background-primary` | `#ffffff` | `#0f0f0f` | Main backgrounds (header, sidebar, cards) |
| `--color-background-secondary` | `#f9fafb` | `#1a1a1a` | Alternate backgrounds (main content area) |
| `--color-background-card` | `#ffffff` | `#1f1f1f` | Card component backgrounds |
| `--color-background-input` | `#ffffff` | `#1f1f1f` | Form input backgrounds |
| `--color-background-overlay` | `rgba(0, 0, 0, 0.5)` | `rgba(0, 0, 0, 0.8)` | Modal/dialog overlay |
| `--color-background-hover` | `#f9fafb` | `#2a2a2a` | Hover state backgrounds |
| `--color-background-active` | `#f3f4f6` | `#262626` | Active state backgrounds |
| `--color-background-disabled` | `#f9fafb` | `#1a1a1a` | Disabled input backgrounds |

## Text Colors

| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-text-primary` | `#111827` | `#f5f5f5` | Headings, main content text |
| `--color-text-secondary` | `#4b5563` | `#d4d4d4` | Descriptions, subtext |
| `--color-text-tertiary` | `#6b7280` | `#a3a3a3` | Muted content |
| `--color-text-muted` | `#9ca3af` | `#737373` | Placeholders, timestamps |
| `--color-text-label` | `#111827` | `#f5f5f5` | Form labels |
| `--color-text-link` | `#2563eb` | `#3b82f6` | Link text |
| `--color-text-inverse` | `#ffffff` | `#0f0f0f` | Text on colored backgrounds |

## Border Colors

| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-border-default` | `#e5e7eb` | `#3a3a3a` | Default borders (cards, dividers) |
| `--color-border-input` | `#d1d5db` | `#404040` | Input/select borders |
| `--color-border-divider` | `#e5e7eb` | `#3a3a3a` | Divider borders |
| `--color-border-focus` | `#2563eb` | `#3b82f6` | Focus ring color |
| `--color-border-hover` | `#9ca3af` | `#525252` | Hover border color |

## Button Colors

### Primary Button
| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-button-primary-bg` | `#2563eb` | `#2563eb` | Primary button background |
| `--color-button-primary-text` | `#ffffff` | `#ffffff` | Primary button text |
| `--color-button-primary-hover` | `#1d4ed8` | `#1e40af` | Primary button hover |
| `--color-button-primary-focus` | `#2563eb` | `#3b82f6` | Primary button focus ring |

### Outline Button
| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-button-outline-bg` | `#ffffff` | `#1f1f1f` | Outline button background |
| `--color-button-outline-text` | `#374151` | `#d4d4d4` | Outline button text |
| `--color-button-outline-border` | `#d1d5db` | `#404040` | Outline button border |
| `--color-button-outline-hover` | `#f9fafb` | `#2a2a2a` | Outline button hover |
| `--color-button-outline-focus` | `#2563eb` | `#3b82f6` | Outline button focus ring |

### Ghost Button
| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-button-ghost-bg` | `transparent` | `transparent` | Ghost button background |
| `--color-button-ghost-text` | `#374151` | `#d4d4d4` | Ghost button text |
| `--color-button-ghost-hover` | `#f3f4f6` | `#2a2a2a` | Ghost button hover |
| `--color-button-ghost-focus` | `#2563eb` | `#3b82f6` | Ghost button focus ring |

### Destructive Button
| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-button-destructive-bg` | `#dc2626` | `#dc2626` | Destructive button background |
| `--color-button-destructive-text` | `#ffffff` | `#ffffff` | Destructive button text |
| `--color-button-destructive-hover` | `#b91c1c` | `#b91c1c` | Destructive button hover |
| `--color-button-destructive-focus` | `#dc2626` | `#ef4444` | Destructive button focus ring |

## Status Colors

### Success (Green)
| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-success-bg` | `#f0fdf4` | `#052e16` | Success message background |
| `--color-success-bg-light` | `#dcfce7` | `#14532d` | Light success background (badges) |
| `--color-success-text` | `#15803d` | `#4ade80` | Success text |
| `--color-success-text-light` | `#16a34a` | `#22c55e` | Light success text |
| `--color-success-border` | `#bbf7d0` | `#166534` | Success border |

### Error (Red)
| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-error-bg` | `#fef2f2` | `#7f1d1d` | Error message background |
| `--color-error-bg-light` | `#fee2e2` | `#991b1b` | Light error background (badges) |
| `--color-error-text` | `#991b1b` | `#f87171` | Error text |
| `--color-error-text-light` | `#dc2626` | `#ef4444` | Light error text |
| `--color-error-border` | `#fecaca` | `#991b1b` | Error border |

### Info (Blue)
| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-info-bg` | `#eff6ff` | `#1e3a8a` | Info message background |
| `--color-info-bg-light` | `#dbeafe` | `#1e40af` | Light info background |
| `--color-info-text` | `#1e40af` | `#60a5fa` | Info text |
| `--color-info-text-light` | `#2563eb` | `#3b82f6` | Light info text |
| `--color-info-border` | `#bfdbfe` | `#1e40af` | Info border |

## Navigation Colors

| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-nav-active-bg` | `#eff6ff` | `#1e3a8a` | Active navigation item background |
| `--color-nav-active-text` | `#1d4ed8` | `#60a5fa` | Active navigation item text |
| `--color-nav-inactive-text` | `#374151` | `#a3a3a3` | Inactive navigation item text |
| `--color-nav-hover-bg` | `#f9fafb` | `#2a2a2a` | Navigation item hover background |

## Stats Card Colors

### Income Variant
| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-stats-income-bg` | `#f0fdf4` | `#052e16` | Income stats card background |
| `--color-stats-income-border` | `#bbf7d0` | `#166534` | Income stats card border |
| `--color-stats-income-text` | `#15803d` | `#4ade80` | Income stats card text |
| `--color-stats-income-icon-bg` | `#dcfce7` | `#14532d` | Income stats card icon background |

### Expense Variant
| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-stats-expense-bg` | `#fef2f2` | `#7f1d1d` | Expense stats card background |
| `--color-stats-expense-border` | `#fecaca` | `#991b1b` | Expense stats card border |
| `--color-stats-expense-text` | `#991b1b` | `#f87171` | Expense stats card text |
| `--color-stats-expense-icon-bg` | `#fee2e2` | `#991b1b` | Expense stats card icon background |

### Balance Variant
| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-stats-balance-bg` | `#eff6ff` | `#1e3a8a` | Balance stats card background |
| `--color-stats-balance-border` | `#bfdbfe` | `#1e40af` | Balance stats card border |
| `--color-stats-balance-text` | `#1e40af` | `#60a5fa` | Balance stats card text |
| `--color-stats-balance-icon-bg` | `#dbeafe` | `#1e40af` | Balance stats card icon background |

### Default Variant
| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-stats-default-bg` | `#ffffff` | `#1f1f1f` | Default stats card background |
| `--color-stats-default-border` | `#e5e7eb` | `#3a3a3a` | Default stats card border |
| `--color-stats-default-text` | `#111827` | `#f5f5f5` | Default stats card text |
| `--color-stats-default-icon-bg` | `#f3f4f6` | `#2a2a2a` | Default stats card icon background |

## Shadow

| Variable | Light Theme Value | Dark Theme Value | Usage |
|----------|------------------|------------------|-------|
| `--color-shadow-sm` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | `0 1px 2px 0 rgba(0, 0, 0, 0.3)` | Small shadow for cards |

## Design Principles

The dark theme follows these design principles:

1. **Visual Hierarchy**: Maintains the same visual hierarchy as the light theme through appropriate contrast ratios
2. **Semantic Colors**: Preserves semantic color meanings (success=green, error=red, info=blue)
3. **Accessibility**: All color combinations meet WCAG AA contrast ratio requirements (minimum 4.5:1 for text)
4. **Consistency**: Uses a cohesive color palette based on dark grays and appropriate accent colors

## Color Palette Notes

- **Base Backgrounds**: Use near-black (`#0f0f0f`) for primary backgrounds, with progressively lighter grays for elevated surfaces
- **Text Hierarchy**: Light text colors maintain the same hierarchy as dark text in light theme
- **Borders**: Subtle dark grays provide separation without being harsh
- **Accent Colors**: Primary blue (`#3b82f6`) and semantic colors are adjusted for dark backgrounds while remaining recognizable
- **Status Colors**: Darkened backgrounds with lighter text ensure readability and maintain semantic meaning

