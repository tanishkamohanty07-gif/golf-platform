'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LogOut, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ user, profile }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">

      <div className="w-full px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg">
            ⛳
          </div>
          <span className="font-heading text-white text-lg tracking-tight">
            GolfCharity
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">

          {[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Draws", href: "/dashboard/draws" },
            { name: "Charity", href: "/dashboard/charity" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-gray-400 hover:text-white text-sm transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-purple-400 after:to-blue-400 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
            >
              {item.name}
            </Link>
          ))}

          {profile?.is_admin && (
            <Link
              href="/admin"
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">

          {/* User Info */}
          <div className="text-right leading-tight">
            <p className="text-white text-xs font-medium">
              {profile?.full_name || "User"}
            </p>
            <p className="text-gray-500 text-[10px]">
              {user?.email}
            </p>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-white/10" />

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-xs transition-all duration-200 hover:scale-105"
          >
            <LogOut size={14} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-white/10 px-6 py-6 bg-black/90 backdrop-blur-xl space-y-5"
          >
            {[
              { name: "Dashboard", href: "/dashboard" },
              { name: "Draws", href: "/dashboard/draws" },
              { name: "Charity", href: "/dashboard/charity" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-400 hover:text-white text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {profile?.is_admin && (
              <Link
                href="/admin"
                className="block text-emerald-400 text-sm"
              >
                Admin
              </Link>
            )}

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400 mb-3">
                {user?.email}
              </p>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-red-400 text-sm"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}