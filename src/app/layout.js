import { Inter, Playfair_Display, Great_Vibes, Amiri, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwriting",
});
const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
});
const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

export const metadata = {
  title: "You are Invited",
  description: "Join us for our special day.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} ${amiri.variable} ${cairo.variable}`}>
      <body style={{ margin: 0, padding: 0 }}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
