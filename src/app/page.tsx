import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 md:p-12">
      <main className="w-full max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Welcome to Patient Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A modern healthcare management system built with Next.js 14, TypeScript, and Tailwind CSS.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link 
              href="/doctor-dashboard" 
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Get Started
            </Link>
            <Link 
              href="/patients-dashboard" 
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">User Management</h3>
              <p className="text-muted-foreground">Secure authentication and role-based access control for patients, doctors, and administrators.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
              <p className="text-muted-foreground">Intuitive dashboards tailored for patients, doctors, and administrators.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p className="text-muted-foreground">Built with security best practices to protect sensitive healthcare data.</p>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Built with Modern Technologies</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
              <span>Next.js 14</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
              <span>TypeScript</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
              <span>Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
              <span>Shadcn UI</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full max-w-6xl mx-auto py-6 border-t mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2023 Patient Portal. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
