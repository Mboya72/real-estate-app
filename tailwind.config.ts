import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      lineHeight: {
        'extra-tight': '1', // Custom line height
      },
      fontSize: {
        '10xl': '10rem',   // 160px
        '11xl': '12rem',   // 192px
        '12xl': '14rem',   // 224px
      },
      fontFamily: {
        afacad: ['Afacad', 'sans-serif'], // Adding Afacad font family to Tailwind
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
