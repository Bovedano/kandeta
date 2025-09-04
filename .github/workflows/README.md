# GitHub Workflows

## Release Workflow

### Descripción

El workflow de release permite generar releases automatizadas con binarios compilados para Windows, Mac y Linux directamente desde GitHub.

### Cómo usar

1. Ve a la pestaña "Actions" en tu repositorio de GitHub
2. Selecciona el workflow "Release" 
3. Haz clic en "Run workflow"
4. Selecciona el tipo de release:
   - **patch**: Para correcciones de bugs (1.1.1 → 1.1.2)
   - **minor**: Para nuevas funcionalidades (1.1.1 → 1.2.0)  
   - **major**: Para cambios importantes/breaking changes (1.1.1 → 2.0.0)
5. Haz clic en "Run workflow"

### Qué hace el workflow

1. **Actualiza la versión**: Incrementa automáticamente la versión en `package.json` según el tipo seleccionado
2. **Crea un commit**: Commitea el cambio de versión al repositorio
3. **Crea un tag**: Genera un tag git con la nueva versión (ej: `v1.2.0`)
4. **Compila los binarios**: Ejecuta la compilación en paralelo para:
   - **Windows**: Genera `.exe` y archivos de setup
   - **macOS**: Genera archivos `.dmg`
   - **Linux**: Genera `.AppImage`, `.deb` y `.snap`
5. **Crea la release**: Publica automáticamente una nueva release en GitHub con todos los binarios adjuntos

### Binarios generados

- **Windows**: `kendeta-{version}-setup.exe`
- **macOS**: `kendeta-{version}.dmg`
- **Linux**: 
  - `kendeta-{version}.AppImage` (universal)
  - `kendeta_{version}_amd64.deb` (Debian/Ubuntu)
  - Snap package

### Requisitos

- Permisos de escritura en el repositorio para crear commits y tags
- GitHub Token con permisos para crear releases

### Notas importantes

- El workflow se ejecuta automáticamente sin intervención manual
- Los archivos binarios se generan usando `electron-builder`
- La release se publica inmediatamente (no como draft)
- Los artefactos se mantienen durante 5 días en GitHub Actions