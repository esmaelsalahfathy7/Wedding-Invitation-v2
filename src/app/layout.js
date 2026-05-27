import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

export const metadata = {
  title: "You are Invited",
  description: "Join us for our special day.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
