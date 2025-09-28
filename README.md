# Patient Portal

A modern healthcare management system built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **User Management**: Secure authentication and role-based access control
- **Patient Dashboard**: Intuitive interface for patients to manage their health data
- **Doctor Dashboard**: Comprehensive tools for healthcare providers
- **Admin Dashboard**: Administrative controls and system management
- **Modern UI**: Clean, responsive design with Shadcn UI components
- **Type Safety**: Full TypeScript implementation for better development experience
- **Performance**: Optimized for production with Next.js 14 features
- **Security**: Built with security best practices and proper headers

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Build Tool**: SWC
- **Package Manager**: npm

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd patient-portal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
patient-portal/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (patient)/         # Patient dashboard routes
│   │   ├── (doctor)/          # Doctor dashboard routes
│   │   ├── (admin)/           # Admin dashboard routes
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── not-found.tsx      # 404 page
│   ├── components/              # React components
│   │   ├── ui/                # Shadcn UI components
│   │   ├── common/            # Shared components
│   │   ├── sidebar/           # Sidebar components
│   │   ├── navbar/            # Navigation components
│   │   ├── forms/             # Form components
│   │   ├── charts/            # Chart components
│   │   ├── billing/           # Billing components
│   │   └── chat/              # Chat components
│   ├── lib/                   # Utility functions
│   │   ├── clerk.ts           # Clerk authentication
│   │   ├── stripe.ts          # Stripe integration
│   │   ├── api.ts             # API utilities
│   │   └── utils.ts           # General utilities
│   ├── styles/                # Additional styles
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── components.json             # Shadcn UI configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── next.config.ts             # Next.js configuration
```

## 🎨 UI Components

The project uses Shadcn UI components for a consistent and modern design system:

### Available Components
- **Form Elements**: Button, Input, Label, Select, Textarea, Form
- **Layout**: Card, Dialog, Tabs, Separator
- **Navigation**: Navigation Menu, Dropdown Menu
- **Data Display**: Table, Badge, Avatar, Alert
- **Feedback**: Toast, Skeleton
- **Utilities**: Scroll Area

### Styling
- Tailwind CSS for utility-first styling
- CSS variables for theming
- Dark mode support
- Responsive design

## 🔧 Configuration

### Next.js Configuration
The `next.config.ts` file includes:
- Production optimizations
- Security headers
- Image optimization
- Webpack configurations
- Experimental features

### Tailwind Configuration
The `tailwind.config.ts` file is configured with:
- Custom color scheme
- Typography settings
- Component utilities
- Dark mode support

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

## 🔒 Security

- Security headers configured in `next.config.ts`
- HTTPS enforcement
- XSS protection
- Content type protection
- Frame options protection

## 📊 Performance

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS optimization
- Bundle size optimization
- Caching strategies

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Path aliases for clean imports

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help, please open an issue or contact the development team.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the icons
