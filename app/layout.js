import { Poppins } from "next/font/google"
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/sonner";
const poppins = Poppins({ subsets: ["latin"],
  weight: ["600", "800"],
});


export const metadata = {
  title: "SmartSpend",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={poppins.className}>
        <Toaster />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
