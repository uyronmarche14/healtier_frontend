/**
 * Type declarations for the application
 */

// Common component props
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Layout props
export interface LayoutProps extends ComponentProps {
  title?: string;
  description?: string;
}

// Form field props
export interface FieldProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}