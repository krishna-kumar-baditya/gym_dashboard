# Gym Dashboard

A modern, full-featured gym management dashboard built with Next.js, TypeScript, and Supabase. This application provides a comprehensive admin interface for managing trainers, services, class schedules, memberships, testimonials, and more.

## 🚀 Features

### Core Functionality
- **Dashboard Overview**: Real-time statistics and analytics
  - Total trainers, services, class types, and messages
  - Today's class schedule
  - Statistics charts
  - Recent submissions table

- **Trainer Management**: Complete CRUD operations for trainers
  - Add, edit, and delete trainers
  - Upload trainer images
  - Track specialty and experience

- **Service Management**: Manage gym services and offerings
  - Create and edit services
  - Categorize services
  - Upload service images
  - Toggle active/inactive status

- **Class Schedule**: Organize and manage class schedules
  - Day-based filtering (Monday-Sunday)
  - Time-based organization
  - Trainer assignment
  - Active/inactive status

- **Membership Plans**: Manage membership offerings
  - Create and edit plans
  - Track active memberships

- **Testimonials**: Manage client testimonials
  - Add and edit testimonials
  - Upload testimonial images
  - Approve/reject testimonials

- **Media Gallery**: Organize gym images
  - Upload images by category (Trainer, Class, Facility)
  - Filter by category
  - Delete images

- **Contact Messages**: View and manage contact form submissions
  - Mark messages as read/unread
  - Track submission dates

- **Settings**: Admin settings and profile management

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Chart.js & Recharts** - Data visualization
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Storage for images
  - Authentication
  - Row Level Security (RLS)

### UI Components
- **Material-UI (MUI)** - Component library
- **MUI Data Grid** - Advanced data tables

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18+ and npm
- **Supabase account** (for database and storage)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gym_dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Set up the required database tables:
     - `trainers`
     - `services`
     - `class_schedule`
     - `membership_plans`
     - `testimonials`
     - `gallery`
     - `contact_messages`
   - Create storage buckets:
     - `trainers` (for trainer images)
     - `services` (for service images)
     - `testimonials` (for testimonial images)
     - `gallery` (for gallery images)
   - Configure Row Level Security (RLS) policies

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
gym_dashboard/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin dashboard pages
│   │   ├── dashboard/      # Main dashboard
│   │   ├── trainers/       # Trainer management
│   │   ├── services/       # Service management
│   │   ├── class_schedule/ # Class schedule
│   │   ├── membership_plans/
│   │   ├── testimonials/
│   │   ├── gallery/
│   │   └── settings/
│   ├── login/              # Login page
│   └── layout.tsx          # Root layout
├── components/             # Reusable React components
│   ├── dashboard/          # Dashboard-specific components
│   └── layout/             # Layout components (Sidebar, Topbar)
├── features/               # Feature modules
│   ├── trainers/
│   ├── services/
│   ├── class_schedule/
│   ├── dashboard/
│   ├── gallery/
│   └── testimonials/
├── lib/                    # Utility libraries
│   ├── supabase/           # Supabase client
│   ├── axios/              # Axios configuration
│   └── dayjs.ts            # Date utilities
├── providers/              # React context providers
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Features in Detail

### Dashboard
- Real-time statistics cards
- Interactive charts showing trends
- Today's class schedule
- Recent submissions from various sources

### Trainer Management
- Full CRUD operations
- Image upload to Supabase storage
- Specialty and experience tracking
- Active/inactive status

### Service Management
- Service creation and editing
- Category organization
- Image management
- Search and pagination

### Class Schedule
- Day-based filtering
- Time-based sorting
- Trainer assignment
- Description and status management

## 🔐 Authentication

The application uses Supabase authentication. Users must log in to access the admin dashboard.

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The application is optimized for Vercel deployment and includes:
- Image optimization configuration
- Next.js production optimizations
- TypeScript strict mode compliance

### Environment Variables for Production

Ensure these are set in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🐛 Troubleshooting

### Build Errors
- Ensure all TypeScript errors are resolved
- Check that all environment variables are set
- Verify Supabase connection

### Image Upload Issues
- Verify Supabase storage buckets are created
- Check RLS policies for storage buckets
- Ensure proper permissions are set

## 📝 Development Notes

- The project uses TypeScript strict mode
- All nullable fields are properly handled with fallbacks
- Supabase relations are properly typed and transformed
- The codebase follows Next.js 16 App Router conventions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

Built with ❤️ for gym management

---

For more information about Next.js, visit [nextjs.org](https://nextjs.org)
