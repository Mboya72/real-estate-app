import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: '#6E4559',
      accent: '#4D7075',
      lightPink: '#F1D0D6',
      lightBeige: '#F9F5F1',
      darkText: '#2C2C2C',
      lightText: '#4A4A4A',
      borderGray: '#D1D1D1', // Here’s where we define a valid border color
      border: '#D1D1D1', // Add this as an example for 'border-border'
      background: "var(--background)",
      foreground: "#ffffff",
    },
    extend: {
      backdropBlur: {
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      fontFamily: {
        afacad: ['Afacad', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
