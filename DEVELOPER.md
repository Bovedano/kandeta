# Kandeta - Developer Documentation

Welcome to the Kandeta developer documentation! This guide will help you understand the project structure, architecture, and how to contribute to the project.

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Key Concepts](#key-concepts)
- [Development Workflow](#development-workflow)
- [Adding New Features](#adding-new-features)
- [Testing](#testing)
- [Contributing Guidelines](#contributing-guidelines)

## Project Overview

Kandeta is a translation management application built with Electron, React, and TypeScript. It provides a user-friendly interface for managing translation files, with features like:

- Multi-format translation file support (JSON separated files)
- Real-time translation editing with auto-scroll and filtering
- Automated translation integration (Claude API, Google Translate)
- Project-based translation management
- Import/export functionality

## Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Desktop Framework**: Electron 31
- **UI Library**: Evergreen UI
- **Build Tool**: Electron Vite
- **State Management**: React Context API
- **Icons**: React Icons

### Application Structure
```
┌─────────────────┐
│   Main Process  │ ← Electron main process (Node.js)
│   (src/main)    │
└─────────┬───────┘
          │ IPC
┌─────────▼───────┐
│ Renderer Process│ ← React application
│ (src/renderer)  │
└─────────────────┘
```

## Project Structure

```
src/
├── main/                          # Electron main process
│   ├── index.ts                   # Main entry point
│   ├── modules/                   # IPC modules
│   │   ├── files.ts              # File operations
│   │   └── http.ts               # HTTP requests
│   └── setupIPC.ts               # IPC handlers setup
│
├── preload/                       # Preload scripts
│   └── index.ts                   # Bridge between main and renderer
│
└── renderer/src/                  # React application
    ├── components/                # UI components
    │   ├── Commons/              # Reusable components
    │   │   ├── CComponents/      # Custom styled components
    │   │   ├── Dialogs/         # Dialog components
    │   │   ├── Modals/          # Modal components
    │   │   └── ...
    │   ├── Editor/              # Main editor components
    │   │   ├── EditorPanel/     # Main editor container
    │   │   ├── EditorListPanel/ # Translation list view
    │   │   └── EditorDetailPanel/ # Translation detail view
    │   └── Menu/                # Application menu
    │
    ├── context/                 # React Context providers
    │   ├── useSelectedLiteralContext.tsx
    │   ├── useFilterContext.tsx
    │   └── ...
    │
    ├── core/                    # Business logic
    │   ├── domain.d.ts          # Type definitions
    │   ├── literals/           # Translation management
    │   ├── project/            # Project operations
    │   ├── translators/        # Translation services
    │   └── files/              # File format handlers
    │
    ├── Tools/                   # Modal tools/dialogs
    │   ├── NewTranslationInput/
    │   ├── RenameTranslationInput/
    │   ├── DuplicateTranslationInput/
    │   └── hooks/              # Custom hooks for tools
    │
    ├── theme/                   # UI theming
    └── hooks/                   # Global custom hooks
```

## Key Concepts

### Domain Models

#### Project
The main entity that contains all translation data:
```typescript
interface Project {
  file: string | undefined           // Project file path
  files_format: FilesFormats        // File format type
  files: LanguageFile[]             // Language files
  translation_info: TranslationInfo // All translation data
  status?: ProjectStatus            // Save status
}
```

#### Literal
Individual translation unit:
```typescript
interface Literal {
  id: string                        // Unique identifier
  is_modified: boolean             // Modified flag
  translations: Translation[]      // Translations for each language
}
```

#### Translation
Text in a specific language:
```typescript
interface Translation {
  language_id: string              // Language identifier
  text: string                     // Translated text
}
```

### Architecture Patterns

#### Context-Based State Management
- **GlobalContext**: Main application state
- **FilterContext**: Search/filter state
- **ErrorContext**: Error handling and display
- **SelectedLiteralContext**: Currently selected translation

#### Tools Pattern
Modal dialogs are implemented as "Tools" with:
- Component in `Tools/{ToolName}/`
- Hook in `Tools/hooks/use{ToolName}.ts`
- Registration in `GlobalToolsRegister.tsx`

#### File Format Abstraction
Support for multiple file formats through:
- **Loader**: Reads files into internal format
- **Saver**: Writes internal format to files
- **Generator**: Creates new file templates

## Development Workflow

### Setting Up Development Environment

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Run linting**:
   ```bash
   npm run lint
   ```

4. **Type checking**:
   ```bash
   npm run typecheck
   ```

### Code Style Guidelines

- **TypeScript**: All files must be TypeScript with explicit return types
- **React**: Use functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Imports**: Use absolute imports with `@renderer/` prefix
- **Error Handling**: Use `useError` hook for user-facing errors

### Git Workflow

1. **Feature branches**: Create from `main` branch
2. **Commit messages**: Use descriptive messages with present tense
3. **Pull requests**: Include description and link related issues

## Adding New Features

### Creating a New Tool/Dialog

1. **Create the tool component**:
   ```typescript
   // src/renderer/src/Tools/MyNewTool/MyNewTool.tsx
   interface MyNewToolProps {
     isOpen: boolean
     onClose: () => void
     // Add specific props
   }
   
   export const MyNewTool = (props: MyNewToolProps): JSX.Element => {
     // Implementation
   }
   ```

2. **Create the hook**:
   ```typescript
   // src/renderer/src/Tools/hooks/useMyNewTool.ts
   interface ToolType {
     // Define tool data structure
   }
   
   export const useMyNewTool = (): ToolsContextType<ToolType> => {
     return useToolsContext<ToolType>('myNewTool')
   }
   ```

3. **Register in GlobalToolsRegister**:
   ```typescript
   // Add to GlobalToolsRegister.tsx
   <MyNewTool
     isOpen={myNewToolController.isOpen}
     onClose={myNewToolController.close}
     {...myNewToolController.data}
   />
   ```

### Adding a New Translation Service

1. **Create translator module**:
   ```typescript
   // src/renderer/src/core/translators/myService/myService.ts
   export const myServiceTranslator: TranslationModule = {
     id: 'myService',
     name: 'My Service',
     config: [...],
     translate: async (config, from, to, text) => {
       // Implementation
     }
   }
   ```

2. **Register in translator registry**:
   ```typescript
   // src/renderer/src/core/translators/register.ts
   import { myServiceTranslator } from './myService/myService'
   
   export const register = (): TranslationModule[] => [
     // existing translators,
     myServiceTranslator
   ]
   ```

### Adding a New File Format

1. **Create format handlers**:
   ```typescript
   // src/renderer/src/core/files/myFormat/
   ├── loader.ts    # Load files into internal format
   ├── saver.ts     # Save internal format to files
   └── generator.ts # Generate new file templates
   ```

2. **Register in loaderFactory**:
   ```typescript
   // Update src/renderer/src/core/files/loaderFactory.ts
   ```

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Testing Guidelines
- Write unit tests for business logic in `core/`
- Write integration tests for complex workflows
- Mock external dependencies (file system, APIs)
- Test error conditions and edge cases

## Contributing Guidelines

### Code Review Process
1. Ensure all tests pass
2. Code follows style guidelines
3. TypeScript compiles without errors
4. No console.log statements in production code
5. Error handling follows project patterns

### Performance Considerations
- Use React.memo() for expensive components
- Implement virtualization for large lists
- Debounce user input (search, filters)
- Lazy load non-critical components

### Security Guidelines
- Never commit API keys or secrets
- Validate all user inputs
- Use secure IPC communication patterns
- Follow Electron security best practices

### Debugging Tips

#### React DevTools
Install React DevTools for debugging component state and props.

#### Electron DevTools
Access DevTools in development mode:
- **Main process**: Use VS Code debugger
- **Renderer process**: Open DevTools with `Ctrl+Shift+I`

#### Common Issues
- **Context errors**: Ensure components are wrapped in appropriate providers
- **IPC issues**: Check preload script exposure and main process handlers
- **File path issues**: Use absolute paths and proper path separators

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev/)
- [Evergreen UI Components](https://evergreen.segment.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Getting Help

- Check existing issues in the repository
- Create detailed bug reports with reproduction steps
- Join our developer discussions
- Follow the project roadmap for upcoming features

---

Happy coding! 🚀