# RL Frontend

A modern real estate platform frontend built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15.3.3 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query (React Query)
- **Database**: Supabase
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Icons**: Custom SVG icons + Lucide React
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
# Fill in your environment variables
```

### Development

Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The development server uses Turbopack for faster builds and hot reloading.

## Available Scripts

### Development

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build the application for production
- `yarn start` - Start production server
- `yarn type-check` - Run TypeScript type checking

### Code Quality

- `yarn lint` - Run ESLint
- `yarn lint:fix` - Run ESLint and automatically fix issues
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting

## Project Structure

```
src/
├── assets/          # Static assets (icons, images)
│   └── icons/       # Custom SVG icons with index.tsx barrel export
├── components/      # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utility libraries and configurations
│   └── supabase.ts # Supabase client setup
├── pages/          # Next.js pages (using pages router)
├── styles/         # Global styles
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Code Quality & Standards

This project uses several tools to maintain code quality:

- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Runs linters on staged files
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting

Pre-commit hooks automatically run linting and formatting on staged files.

## Icons Usage

Icons are available as named exports from the icons barrel:

```tsx
import { UserOutline, DashboardBold, SearchOutline } from '@/assets/icons';

// Use in JSX
<UserOutline className="w-6 h-6" />;
```

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Add other environment variables as needed
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel Platform](https://vercel.com/new):

1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
yarn build
yarn start
```

## Contributing

1. Create a feature branch from `staging`
2. Make your changes
3. Run `yarn type-check` and `yarn lint:fix`
4. Commit your changes (pre-commit hooks will run automatically)
5. Push and create a pull request

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Supabase](https://supabase.com/docs) - Backend as a service
- [TanStack Query](https://tanstack.com/query) - Data fetching and caching
