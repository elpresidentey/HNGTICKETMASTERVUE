/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        success: '#10B981',
        warning: '#F59E0B',
        neutral: '#6B7280',
        error: '#EF4444',
        // Ticket status colors as specified in requirements
        'ticket-open': '#10B981',      // Green for open tickets
        'ticket-progress': '#F59E0B',  // Amber for in_progress tickets  
        'ticket-closed': '#6B7280',    // Gray for closed tickets
        // Additional semantic colors
        'bg-light': '#F9FAFB',
        'bg-white': '#FFFFFF',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'border-light': '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}