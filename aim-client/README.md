## Frontend Directory Structure

```text
src
 ├── app                     # Next.js App Router pages
 │   ├── layout.tsx
 │   ├── page.tsx
 │   └── ...
 │
 ├── components              # Reusable UI components
 │   ├── layout              # Header, Footer, Navigation
 │   ├── common              # Button, Card, Container, etc.
 │   └── sections            # Page-specific sections
 │
 ├── constants               # Static constants and routes
 │
 ├── data                    # Mock data and temporary content
 │
 ├── lib                     # Utility functions and helpers
 │
 ├── types                   # TypeScript type definitions
 │
 └── assets                  # Images, icons, and static resources
```

### Directory Responsibilities

| Directory             | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| `app`                 | Next.js App Router pages and layouts                           |
| `components/layout`   | Global layout components such as Header and Footer             |
| `components/common`   | Reusable UI components shared across the application           |
| `components/sections` | Page-level sections composed of multiple UI components         |
| `constants`           | Application constants, navigation menus, and route definitions |
| `data`                | Mock data and temporary content before API integration         |
| `lib`                 | Utility functions, helpers, and shared logic                   |
| `types`               | TypeScript interfaces and type definitions                     |
| `assets`              | Static resources including images and icons                    |

```
```
