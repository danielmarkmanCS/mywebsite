# Cybersecurity Portfolio Website - Daniel

## Overview

A Matrix-inspired cybersecurity portfolio website built for Daniel, a cybersecurity expert. The application features an immersive dark theme with Matrix-style animations, Hebrew RTL support, and interactive elements including a terminal emulator and contact form. Built as a full-stack application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, chosen for its fast HMR and optimized production builds
- Wouter for lightweight client-side routing (single-page application)

**UI Component System**
- Shadcn/ui components built on Radix UI primitives for accessible, composable UI elements
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for type-safe component variants
- Custom CSS variables system for theme consistency (defined in `index.css`)

**Design Philosophy**
- Matrix-inspired cybersecurity aesthetic with neon cyan accents (#14ffec)
- Full RTL (Right-to-Left) support for Hebrew content
- Monospace typography (IBM Plex Mono) for authentic terminal/hacker aesthetic
- Hebrew-optimized Heebo font for body text
- Dark mode by default with high-contrast neon accents

**Key Interactive Features**
1. **Matrix Background**: Canvas-based animation with falling Hebrew/cyber characters
2. **Typing Effect Component**: Cycles through Hebrew cybersecurity terms
3. **Interactive Terminal**: Simulated command-line interface with predefined commands
4. **Contact Form**: React Hook Form with Zod validation, integrated with backend API

**State Management**
- TanStack Query (React Query) for server state management and API interactions
- React Hook Form for form state and validation
- Local component state with React hooks for UI interactions

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for API endpoints
- HTTP server (no WebSocket implementation currently)
- In-memory storage system (MemStorage class) - no database persistence yet

**API Structure**
- RESTful endpoints under `/api` prefix
- POST `/api/contact` - Submit contact form messages
- GET `/api/contact` - Retrieve contact messages (admin functionality)
- Request/response validation using Zod schemas

**Middleware & Security**
- JSON body parsing with raw body preservation for webhook support
- CORS and rate limiting packages included but not yet configured
- Session management dependencies present but not implemented

**Development vs Production**
- Development: Vite middleware integration for HMR and fast refresh
- Production: Pre-built static files served from `dist/public`
- Custom logging middleware for request/response tracking

### Data Storage Solutions

**Current Implementation**
- In-memory storage using JavaScript Map objects
- Two data models: Users and ContactMessages
- UUID-based primary keys using crypto.randomUUID()

**Database Schema (Drizzle ORM)**
- PostgreSQL schema defined but not actively used
- Drizzle ORM configuration pointing to Neon serverless database
- Schema includes:
  - `users` table: id, username, password
  - `contact_messages` table: id, name, email, message
- Zod validation schemas auto-generated from Drizzle tables

**Migration Strategy**
- Database migrations directory configured (`/migrations`)
- `db:push` script available for schema synchronization
- Easy path to migrate from MemStorage to PostgreSQL when needed

### External Dependencies

**UI & Styling**
- Radix UI primitives (@radix-ui/*) - Accessible component foundation
- Tailwind CSS - Utility-first CSS framework
- Lucide React - Icon library
- React Icons - Additional icon set (used for Instagram icon)
- Google Fonts - IBM Plex Mono, Heebo fonts

**Form Handling & Validation**
- React Hook Form - Form state management
- Zod - Schema validation library
- @hookform/resolvers - Integration between React Hook Form and Zod

**Data Fetching**
- TanStack Query - Server state management
- Native fetch API for HTTP requests

**Database & ORM** (configured but not active)
- @neondatabase/serverless - Neon PostgreSQL driver
- Drizzle ORM - Type-safe ORM with PostgreSQL dialect
- drizzle-zod - Auto-generate Zod schemas from Drizzle tables

**Development Tools**
- Vite plugins for Replit integration (@replit/vite-plugin-*)
- TypeScript - Type checking across frontend and backend
- ESBuild - Server bundling for production

**Session & Authentication** (dependencies present, not implemented)
- express-session
- connect-pg-simple
- passport, passport-local
- Authentication infrastructure ready but not active

**Potential Future Integrations**
- Nodemailer - Email sending capability
- Stripe - Payment processing
- OpenAI, Google Generative AI - AI features
- Multer - File uploads
- WebSocket (ws) - Real-time features