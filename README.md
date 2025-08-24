# Real Estate Platform 🏠 (In progress)

A modern full-stack real estate platform built with cutting-edge technologies. This monorepo contains both frontend and backend applications designed to provide a comprehensive property management and listing solution.

## ✨ Features

- 🏘️ **Property Listings** - Browse, search, and filter real estate properties
- 🔍 **Advanced Search** - Filter by location, price, property type, and amenities
- 👤 **User Management** - User authentication and profile management
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Modern UI** - Beautiful, intuitive interface with smooth animations
- 📊 **Analytics Dashboard** - Insights and property statistics
- 🔐 **Secure Authentication** - Powered by Supabase

## 🌐 Live Demo

**Live Application**: [https://real-estate-six-tawny-67.vercel.app/](https://real-estate-six-tawny-67.vercel.app/)

### Test Credentials

- **Email**: landlord@realestate.com
- **Password**: I will add when finished

## 🚀 Tech Stack

### Frontend

- **Framework**: Next.js 15.3.3 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Icons**: Custom SVG icons + Lucide React

### Backend

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: Supabase integration
- **Testing**: Jest with comprehensive test suite
- **Deployment**: Vercel-ready configuration

### Infrastructure

- **Database**: PostgreSQL with TypeORM
- **Authentication**: Supabase integration
- **Cache**: Redis
- **Containerization**: Docker & Docker Compose
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Package Manager**: Yarn
- **Monorepo**: Organized frontend/backend structure

## 🏗️ Quick Start

### Prerequisites

- Docker and Docker Compose (recommended)
- OR manually: Node.js 18+, Yarn package manager, PostgreSQL
- Git

### With Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd real-estate-fullstack

# Copy environment variables
cp .env.example .env
# Edit .env with your actual values

# Start all services (PostgreSQL, Redis, Backend, Frontend)
docker-compose up -d

# View logs (optional)
docker-compose logs -f

# Stop all services
docker-compose down
```

**Services will be available at:**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:3001](http://localhost:3001)
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

### Manual Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd real-estate-fullstack
   ```

2. **Backend Setup**

   ```bash
   cd backend
   yarn install
   cp .env.example .env
   # Configure your environment variables
   yarn migration:run
   yarn start:dev
   ```

3. **Frontend Setup** (in a new terminal)

   ```bash
   cd frontend
   yarn install
   cp .env.example .env.local
   # Configure your environment variables
   yarn dev
   ```

4. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:3001](http://localhost:3001)

## 📁 Project Structure

```
real-estate-fullstack/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Next.js pages
│   │   ├── assets/         # Static assets and icons
│   │   ├── lib/            # Utility libraries
│   │   └── styles/         # Global styles
│   ├── package.json
│   └── README.md           # Frontend-specific documentation
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── modules/        # Feature modules
│   │   ├── db/             # Database configuration
│   │   ├── config/         # App configuration
│   │   └── exceptions/     # Custom exceptions
│   ├── Dockerfile          # Backend Docker configuration
│   ├── package.json
│   └── README.md           # Backend-specific documentation
├── docker-compose.yml      # Docker orchestration
├── .env.example            # Environment variables template
└── README.md              # This file
```

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure the following:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/real_estate

# Backend
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
PORT=3001

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Redis (optional)
REDIS_URL=redis://localhost:6379
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
yarn test              # Unit tests
yarn test:e2e          # End-to-end tests
yarn test:cov          # Coverage report
```

### Frontend Tests

```bash
cd frontend
yarn test              # Component tests
yarn type-check        # TypeScript validation
```

## 🚀 Deployment

The application is configured for deployment on **Vercel**.

### Automatic Deployment

- Push to `main` branch triggers automatic deployment
- Environment variables configured in Vercel dashboard
- Both frontend and backend deploy simultaneously

### Manual Deployment

```bash
# Build frontend
cd frontend && yarn build

# Build backend
cd backend && yarn build

# Deploy to your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `yarn test` (in both frontend and backend)
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Follow ESLint and Prettier configurations
- Write tests for new features
- Update documentation as needed
- Use TypeScript strictly (no `any` types)

## 📚 Documentation

- [Frontend Documentation](./frontend/README.md) - Detailed frontend setup and development
- [Backend Documentation](./backend/README.md) - API documentation and backend architecture

## 🐛 Common Issues

### Port Conflicts

- Frontend runs on `:3000`, Backend on `:3001`
- Change ports in respective `.env` files if needed

### Database Connection

- Ensure Supabase credentials are correctly configured
- Check if migrations are up to date: `cd backend && yarn migration:run`

### Environment Variables

- Ensure all required environment variables are set
- Copy from `.env.example` files and fill in actual values

## 📄 License

This project is licensed under a restrictive license. See the [LICENSE](./LICENSE) file for more details.

All Rights Reserved.

The code in this repository is provided for portfolio and demonstration purposes only. No part of this code may be copied, modified, distributed, or used in any way without the explicit prior written permission of the author.

## 👨‍💻 For Recruiters

Quick demo setup:

```bash
git clone <repository-url>
cd real-estate-fullstack
cp .env.example .env
docker-compose up -d
```

This project showcases full-stack development skills with modern technologies including Docker containerization.
