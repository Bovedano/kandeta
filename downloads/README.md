# Kandeta Downloads

This directory contains all available releases of Kandeta organized by version and platform.

## Directory Structure

```
downloads/
├── v1.1.0/
│   ├── win/
│   │   └── kendeta-1.1.0-setup.exe    # Windows installer (~94 MB)
│   ├── mac/
│   │   └── (macOS builds - build locally with npm run build:mac)
│   └── linux/
│       └── (Linux builds - build locally with npm run build:linux)
├── v1.2.0/
│   └── ... (future releases)
└── README.md (this file)
```

## Current Release: v1.1.0

### Windows
- **File**: `kendeta-1.1.0-setup.exe`
- **Size**: ~94 MB
- **Format**: NSIS installer with auto-updater
- **Requirements**: Windows 10 or later
- **Installation**: Double-click to run installer

### macOS & Linux
Currently, macOS and Linux builds need to be compiled locally:

```bash
# For macOS
npm run build:mac

# For Linux  
npm run build:linux
```

## Version History

- **v1.1.0** (Current)
  - Smart literal creation with auto-scroll and filter management
  - Improved dialog functionality with validation and Enter key support
  - Enhanced translation workflow with automated translation services

## Installation Instructions

### Windows
1. Download `kendeta-1.1.0-setup.exe`
2. Double-click the downloaded file
3. Follow the installation wizard
4. Launch Kandeta from Start Menu or Desktop shortcut

### Building from Source
If you prefer to build from source or need a different platform:

1. Clone the repository
2. Install dependencies: `npm install`
3. Build for your platform:
   - Windows: `npm run build:win`
   - macOS: `npm run build:mac` 
   - Linux: `npm run build:linux`

## Support

If you encounter issues with any download:
- Check [Issues](../../../issues)
- Review [Developer Documentation](../DEVELOPER.md)
- Create a [New Issue](../../../issues/new)

---

**Download the latest release and start managing your translations efficiently!** 🚀