# PWA Icons

This directory should contain the following icon files for PWA support:

## Required Icon Sizes

### Android/Standard PWA Icons
- `icon-192x192.png` - 192x192 pixels (Android home screen)
- `icon-512x512.png` - 512x512 pixels (Android splash screen, install prompt)

### iOS Icons
- `icon-180x180.png` - 180x180 pixels (iPhone home screen icon)
- `icon-152x152.png` - 152x152 pixels (iPad home screen icon)
- `icon-120x120.png` - 120x120 pixels (iPhone @2x)
- `icon-76x76.png` - 76x76 pixels (iPad @1x)

## Icon Design Guidelines

1. **Format**: PNG with transparency support
2. **Design**: 
   - Use a simple, recognizable icon
   - Ensure the icon is readable at small sizes
   - Avoid text in the icon (use symbols/logo)
   - Use high contrast for visibility
3. **Padding**: Leave 10-20% padding around the icon content
4. **Background**: Can be transparent or use the app's theme color (#2563eb)

## Generation Tools

You can generate these icons using:
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [PWA Builder Image Generator](https://www.pwabuilder.com/imageGenerator)

## Current Status

⚠️ **Placeholder icons are required** - Replace these with actual app icons before deployment.

The manifest.json references these icons, so they must exist for the PWA to work correctly.

