'use client'
//import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import TheHeader from '../components/TheFooter';
import TheFooter from '../components/TheFooter';

import "primeflex/primeflex.css";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
//import 'primeicons/primeicons.css';                                 // icons


const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
return (
  <html lang="en">
      <body className={inter.className}>
        <TheHeader></TheHeader>
        <main>
        {children}
        </main>
        <TheFooter></TheFooter>
        </body>
    </html>
);
}