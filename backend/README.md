# RL Backend

A NestJS backend application for the RL (Real Estate Listings) platform, built with TypeScript, TypeORM, and Supabase integration.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- PostgreSQL database (or Supabase account)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "RL - Backend"
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Environment Setup**

   ```bash
   # Copy environment file and configure your variables
   cp .env.example .env
   ```

   Configure your environment variables:

   - Database connection settings
   - Supabase credentials
   - API keys and secrets

4. **Database Setup**

   ```bash
   # Run database migrations
   yarn migration:run
   ```

5. **Start the development server**
   ```bash
   yarn start:dev
   ```

The API will be available at `http://localhost:3000`

## 📜 Available Scripts

### Development

- `yarn start:dev` - Start in development mode with file watching
- `yarn start:local` - Start with local configuration
- `yarn start:debug` - Start in debug mode
- `yarn build` - Build the application for production
- `yarn start:prod` - Start the production build

### Database & Migrations

- `yarn migration:generate <MigrationName>` - Generate a new migration based on entity changes
- `yarn migration:run` - Run pending migrations
- `yarn migration:revert` - Revert the last migration
- `yarn migration:show` - Show all migrations and their status
- `yarn migration:create <MigrationName>` - Create a new empty migration file

### Code Quality

- `yarn lint` - Run ESLint and fix issues
- `yarn format` - Format code with Prettier

### Testing

- `yarn test` - Run unit tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:cov` - Run tests with coverage report
- `yarn test:debug` - Run tests in debug mode
- `yarn test:e2e` - Run end-to-end tests

## 📁 Project Structure

```
src/
├── config/           # Configuration files
│   └── supabase.config.ts
├── db/              # Database related files
│   ├── data-source.ts
│   ├── database.module.ts
│   └── migrations/   # TypeORM migrations
├── exceptions/      # Custom exception classes
├── modules/         # Feature modules
├── shared/          # Shared utilities and decorators
│   ├── decorators/
│   └── enums/
├── utils/           # Utility functions
├── app.module.ts    # Root application module
├── main.ts         # Application entry point
└── local.ts        # Local development entry point
```

## 🗄️ Database

This project uses **TypeORM** with **PostgreSQL** (via Supabase) as the database.

### Working with Migrations

1. **Make changes to your entities**
2. **Generate migration**:
   ```bash
   yarn migration:generate src/db/migrations/YourMigrationName
   ```
3. **Review the generated migration** in `src/db/migrations/`
4. **Run the migration**:
   ```bash
   yarn migration:run
   ```

### Migration Best Practices

- Always review generated migrations before running them
- Use descriptive names for migrations
- Test migrations on a development database first
- Keep migrations small and focused
- Never edit a migration that has already been run in production

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_HOST=your-database-host
DATABASE_PORT=5432
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=your-database-name

# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Application
PORT=3000
NODE_ENV=development
```

## 🧪 Testing

### Unit Tests

```bash
yarn test
```

### E2E Tests

```bash
yarn test:e2e
```

### Test Coverage

```bash
yarn test:cov
```

## 🚀 Deployment

This application is configured for deployment on **Vercel**.

### Vercel Deployment

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Manual Deployment

1. **Build the application**:

   ```bash
   yarn build
   ```

2. **Start production server**:
   ```bash
   yarn start:prod
   ```

## 🛠️ Development Workflow

### Adding a New Feature

1. **Create a new module**:

   ```bash
   nest generate module features/your-feature
   nest generate controller features/your-feature
   nest generate service features/your-feature
   ```

2. **Add your entities** if needed
3. **Generate and run migrations**:

   ```bash
   yarn migration:generate src/db/migrations/AddYourFeature
   yarn migration:run
   ```

4. **Write tests** for your feature
5. **Update documentation** as needed

### Code Standards

- Follow **ESLint** configuration
- Use **Prettier** for code formatting
- Write **unit tests** for services and controllers
- Write **E2E tests** for critical API endpoints
- Use **TypeScript** strictly (no `any` types)

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contributing

1. Create a feature branch from `staging`
2. Make your changes
3. Run tests: `yarn test` and `yarn test:e2e`
4. Run linting: `yarn lint`
5. Create a pull request to `staging`

## 📋 Common Issues & Solutions

### Database Connection Issues

- Verify environment variables are set correctly
- Check if database is running and accessible
- Ensure migrations are up to date

### TypeORM Issues

- Clear compiled files: `rm -rf dist/`
- Rebuild: `yarn build`
- Check entity imports and decorators

### Development Server Issues

- Clear node_modules: `rm -rf node_modules && yarn install`
- Check port availability (default: 3000)
- Verify environment configuration

---

For any questions or issues, please refer to the project documentation or contact the development team.
