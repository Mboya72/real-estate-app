// pages/_app.tsx
import '../app/globals.css';  // Import global styles

// Import the correct types from Next.js
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;  // Render the page component with its props
}

export default MyApp;
