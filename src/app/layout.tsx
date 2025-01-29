import { Poppins, Afacad } from "next/font/google";
import "./globals.css";

// Import fonts
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${afacad.variable}`}>
      <head />
      <body>{children}</body>
    </html>
  );
}
