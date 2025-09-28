frontend/
├── src/
│   ├── app/                          # Next.js App Router (routes)
│   │   ├── layout.tsx                # Root layout (Navbar/Sidebar wrapper)
│   │   ├── page.tsx                  # Landing page
│   │   │
│   │   ├── (auth)/                   # Auth routes (public)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── reset-password/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/              # Protected routes
│   │   │   ├── patient/
│   │   │   │   ├── page.tsx          # Patient dashboard
│   │   │   │   ├── store/            # Medicines store
│   │   │   │   ├── billing/          # Subscriptions, invoices
│   │   │   │   ├── chat/             # Patient chat
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx          # Admin dashboard
│   │   │   │   ├── medicines/        # Manage medicines
│   │   │   │   ├── users/            # Manage users
│   │   │   │   ├── billing/          # Admin billing reports
│   │   │   │   ├── chat/             # Admin chat
│   │   │   │   └── reports/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── doctor/
│   │   │       ├── page.tsx          # Doctor dashboard
│   │   │       ├── patients/         # Patient list & records
│   │   │       └── chat/             # Doctor chat
│   │   │
│   │   └── api/                      # Next.js API routes (if any frontend API)
│   │
│   ├── components/                   # Reusable UI components
│   │   ├── ui/                       # Shadcn/ui primitives
│   │   ├── sidebar/                  # Sidebar component
│   │   ├── navbar/                   # Top navigation
│   │   ├── forms/                    # Form inputs, auth forms
│   │   ├── charts/                   # Charts for admin dashboard
│   │   ├── billing/                  # Billing-related components
│   │   └── chat/                     # Chat UI components
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAuth.ts                # Clerk auth helpers
│   │   ├── useSidebar.ts             # Sidebar toggle logic
│   │   ├── useChat.ts                # Chat socket hook
│   │   └── useBilling.ts             # Billing state hook
│   │
│   ├── lib/                          # Utilities / helpers
│   │   ├── clerk.ts                  # Clerk client setup
│   │   ├── stripe.ts                 # Stripe client setup
│   │   ├── api.ts                    # Axios/fetch wrapper
│   │   └── utils.ts                  # General helpers
│   │
│   ├── styles/                       # Global styles
│   │   ├── globals.css
│   │   └── theme.css
│   │
│   ├── types/                        # TypeScript types/interfaces
│   │   ├── user.ts
│   │   ├── medicine.ts
│   │   ├── billing.ts
│   │   ├── chat.ts
│   │   └── index.ts
│   │
│   └── public/                       # Static assets (logos, icons, etc.)
│
├── .env.local                        # Environment variables (never commit)
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── next.config.js                    # Next.js config
└── package.json
