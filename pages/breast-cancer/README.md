# Breast Cancer Section Documentation

## Overview
This section provides comprehensive information about breast cancer, including diagnosis, treatment, screening, symptoms, and more to educate users about breast cancer awareness and resources available in Bellevue, WA.

## Directory Structure
```
/pages/breast-cancer/
├── diagnosis/
│   ├── index.html
│   └── converted-index.html (redirect)
├── screening/
│   ├── index.html
│   └── converted-index.html (redirect)
├── symptoms/
│   ├── index.html
│   └── converted-index.html (redirect)
├── treatment/
│   ├── index.html
│   └── converted-index.html (redirect)
├── facts-and-statistics/
├── metastatic/
├── risk-factors/
├── survivorship/
└── facts-statistics.html
```

## Implementation Notes

### Navigation
- Added a new main navigation item "Breast Cancer" in the header component
- The main breast cancer page is accessible at `/breast-cancer.html`
- Each subtopic has its own directory with comprehensive information

### Redirects
- Created redirects from `converted-index.html` to `index.html` in each section for backward compatibility
- Any links pointing to the old converted files will automatically redirect to the new files

### Path Resolution
- All pages use absolute paths starting with `/Cancer/` to ensure assets load correctly regardless of page depth
- JavaScript utilities handle path resolution for components and assets

## Maintenance Guidelines
1. When adding new content, follow the existing directory structure
2. Use absolute paths for all assets and links
3. Always test navigation from multiple entry points
4. Keep content focused on educational goals and local resources

## Technical Notes
- All pages load common header and footer components
- Pages use a consistent grid layout with sidebar navigation
- Responsive design works on mobile, tablet, and desktop devices
- JavaScript handles dynamic path resolution 