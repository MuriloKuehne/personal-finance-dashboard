# Personal Finance Dashboard

A modern, full-featured personal finance management application built with Next.js and Supabase. Track your income, expenses, and gain valuable insights into your financial health with beautiful charts and analytics.

## Features

- **Transaction Management**: Add, edit, and delete income and expense transactions
- **Category Management**: Organize transactions with custom categories
- **Financial Analytics**: 
  - Monthly and weekly summaries with interactive charts
  - Dashboard with key financial metrics
  - Net balance tracking
- **User Authentication**: Secure authentication with Supabase Auth
- **Theme Support**: Light and dark mode with comprehensive theme system
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Fast, responsive UI with server-side rendering

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database & Auth**: Supabase
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account and project
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-finance-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Set up your Supabase database:
   - Create a new Supabase project
   - Run the database migrations (see Database Setup section)
   - Configure authentication providers if needed

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

This application requires the following Supabase database tables:

- `transactions`: Stores income and expense transactions
- `categories`: Stores transaction categories
- `user_profiles`: Stores user profile information

You'll need to create these tables in your Supabase project. The application uses Row Level Security (RLS) policies to ensure users can only access their own data.

### Required Tables Schema

The application expects tables with the following structure:

**transactions**
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `amount` (numeric)
- `type` (text: 'income' or 'expense')
- `category_id` (uuid, foreign key to categories)
- `description` (text)
- `date` (date)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**categories**
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `name` (text)
- `type` (text: 'income' or 'expense')
- `created_at` (timestamp)
- `updated_at` (timestamp)

**user_profiles**
- `id` (uuid, primary key, foreign key to auth.users)
- `email` (text)
- `full_name` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

Ensure RLS policies are enabled and configured to allow users to only access their own data.

## Project Structure

```
personal-finance-dashboard/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── categories/
│   │   ├── settings/
│   │   └── transactions/
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── auth/               # Authentication components
│   ├── charts/             # Chart components
│   ├── dashboard/          # Dashboard-specific components
│   ├── layout/             # Layout components
│   ├── theme/              # Theme provider
│   └── ui/                 # Reusable UI components
├── lib/                     # Utility libraries
│   ├── auth/               # Authentication utilities
│   ├── supabase/           # Supabase client utilities
│   ├── types/              # TypeScript type definitions
│   └── utils/              # General utilities
├── middleware.ts           # Next.js middleware for auth
└── public/                 # Static assets
```

## Key Features

### Dashboard
The main dashboard provides an overview of your financial status:
- Total income and expenses
- Net balance calculation
- Monthly and weekly summaries with interactive charts
- Recent transactions list

### Transactions
- Add new income or expense transactions
- Edit existing transactions
- Delete transactions
- Filter and view transactions by date range
- Categorize transactions

### Categories
- Create custom categories for income and expenses
- Edit and delete categories
- Organize transactions by category

### Settings
- Update user profile information
- Manage account settings

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (for production) | No |

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Server Components by default (minimize 'use client')
- Tailwind CSS for styling
- Mobile-first responsive design

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy

The application is optimized for Vercel's platform and will work out of the box.

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

Make sure to set all required environment variables in your deployment platform.

## Security

- All user data is protected with Row Level Security (RLS) in Supabase
- Authentication is handled securely through Supabase Auth
- Input validation using Zod schemas
- CSRF protection via Next.js middleware
- Secure cookie handling for sessions

## Theme System

The application includes a comprehensive theme system with light and dark modes. All theme variables are documented in `THEME_VARIABLES.md`. The theme system uses CSS custom properties for easy customization.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Support

For issues and questions, please open an issue in the repository.
