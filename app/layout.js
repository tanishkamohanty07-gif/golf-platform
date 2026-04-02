import './globals.css'
import { Playfair_Display, Lora } from 'next/font/google'

/* ─── Fonts ─── */

// Heading font (luxury / editorial feel)
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

// Body font (clean + readable serif)
const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

/* ─── Metadata ─── */
export const metadata = {
  title: 'GolfCharity — Play with Purpose',
  description: 'Enter scores. Win prizes. Fund charities you love.',
}

/* ─── Layout ─── */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <body
        className="bg-black text-white"
        style={{
          fontFamily: 'var(--font-body), serif',
        }}
      >
        {children}
      </body>
    </html>
  )
}