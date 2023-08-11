import { Inter } from "next/font/google";
import "primeflex/primeflex.css";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
//import 'primeicons/primeicons.css';                                 // icons

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    )
  }