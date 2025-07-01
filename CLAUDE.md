# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development**: `npm run dev` - Runs both server (port 3000) and client (port 3001) concurrently
- **Server only**: `npm run dev:server` - Express server with TypeScript watch mode
- **Client only**: `npm run dev:client` - Vite dev server with proxy to API
- **Build**: `npm run build` - Builds both server and client for production
- **Production**: `npm start` - Runs production build
- **Preview**: `npm run preview` - Build and start production server

## Code Quality

- **Linting/Formatting**: Uses Biome for linting, formatting, and import organization
- **TypeScript**: Strict mode enabled with ES2022 target
- **Code Style**: 4-space indentation, double quotes, semicolons, trailing commas

## Architecture

This is a full-stack Express + Alpine.js application with TypeScript:

### Server (`src/server.ts`)
- Express 5.1.0 server with TypeScript
- Serves static files from `public/` (dev) or `dist/public/` (prod)
- API routes under `/api/` prefix
- Environment-aware static file serving

### Client (`public/main.ts`)
- Alpine.js 3.x for reactive frontend
- TypeScript with proper Alpine typings
- Global window.Alpine for better DX
- Fetches data from Express API endpoints

### Build System
- **Development**: Concurrent server (tsx watch) + client (Vite dev server with API proxy)
- **Production**: TypeScript compilation + Vite build, server output as ESM (.mjs)
- **Static Assets**: Vite handles client bundling, Express serves in production

### Key Files
- `src/server.ts` - Express server with API routes
- `public/main.ts` - Alpine.js client application
- `public/index.html` - Frontend entry point
- `vite.config.js` - Build configuration with API proxy