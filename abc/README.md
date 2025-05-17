# 🧱 ABC Architecture — Project Overview

Welcome to the **ABC Folder Structure**, a modern architecture system designed for scalable, modular, and team-friendly React Native and Next.js projects.

ABC stands for:

- **Architectural** — A clear, top-down structure from root to feature
- **Bounded** — Each feature is isolated and self-contained
- **Composable** — Features are plug-and-play and can be reused across projects

This structure is built for teams working in **SCRUM-style sprints**, delivering **independent features** that require minimal cross-team coordination.

---

## 🗂 Root Folder Overview

```
src/
├── app/           # All app features (each team owns a folder)
├── backend/       # Firebase/Supabase/backend SDKs
├── config/        # Static config: env, routes, constants
├── database/      # Schemas, accessors, ORM adapters
├── global/        # Shared logic: state, hooks, types
├── localization/  # i18n and translations
├── resources/     # Assets: images, fonts, icons
├── ui/            # Design system: theme, primitives, layouts
└── index.tsx      # Root entry (unified for Expo + Next.js)
```

---

## 📦 Feature Folder Structure (`app/feature-name/`)

Each feature is a **self-contained unit**. You can copy and paste a feature into another project with little to no rewiring.

```
app/feature-name/
├── api/            # Public API: expose hooks, stores, and handlers
├── components/     # Feature-specific UI components
├── handlers/       # Async logic and event pipelines
├── hooks/          # Custom hooks local to the feature
├── screens/        # Screens/pages (can split by platform)
├── store/          # Zustand stores and local logic
├── types/          # TypeScript types/interfaces
├── index.ts        # Optional internal entrypoint
└── README.md       # Feature-specific documentation
```

---

## 🧩 Global API Access

To make any feature usable globally:

1. In `api/index.ts` inside the feature folder, export pre-named aliases:

```ts
export { useFeatureStore as useFeatureName } from "../store/useFeatureStore";
export { useFeatureLogic } from "../hooks/useFeatureLogic";
```

2. Then in `global/index.ts`, simply:

```ts
export * from "@/app/feature-name/api";
```

3. Anywhere in the app:

```ts
import { useFeatureName } from "@/global";
```

---

## ⚙️ Design System (`ui/`)

The `ui/` folder is your shared visual system:

- `theme/`: Zustand store + tokens (light/dark mode)
- `primitives/`: Base components (Button, Text, Input)
- `layout/`: Layout components (Stack, Container, Spacer)

Each module inside `ui/` should export ready-to-use aliases:

```ts
export { useThemeStore as useTheme } from "./theme/store/useThemeStore";
```

Then in `global/index.ts`:

```ts
export * from "@/ui/theme";
```

---

## 🌍 Global Layer (`global/`)

Only truly cross-feature logic should be promoted here:

- Shared Zustand stores (`useUser`, `usePermissions`)
- Universal hooks (`useKeyboard`, `useDebounce`)
- Shared types, utils, or validators

All of it is exported through a single access point:

```ts
// global/index.ts
export * from "@/app/auth/api";
export * from "@/ui/theme";
export * from "./user";
```

Usage:

```ts
import { useUser, useTheme } from "@/global";
```

---

## ✅ Rules and Conventions

- ✅ Features must not import each other
- ✅ All shared logic must go through `global/` or `api/`
- ✅ Zustand stores always live inside `store/`
- ✅ Components never live in shared `components/` folders — they’re nested inside features or `ui/`
- ✅ Keep all logic co-located
- ✅ Pre-requisites must be documented in feature README or as code comments

---

## 🚀 Summary

The ABC system keeps codebases:

- **Organized** by responsibility
- **Modular** and portable
- **Team-scalable** with clear boundaries
- **Globalized** through a single, elegant interface

Drop a feature, wire its API in `global/`, and start using it.
That’s the ABC way.
