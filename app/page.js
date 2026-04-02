'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Heart, Trophy, TrendingUp, CheckCircle } from 'lucide-react'

/* ─── animation helpers ─── */
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

const riseInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

/* ─── tiny helpers ─── */
function SectionLabel({ color = '#10b981', children }) {
  return (
    <p className="label-xs mb-5" style={{ color }}>
      {children}
    </p>
  )
}

function Divider() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
      <div
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.22) 30%, rgba(6,182,212,0.22) 70%, transparent 100%)',
        }}
      />
    </div>
  )
}

/* ════════════════════════════════════════
   PAGE
════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.16) 0%, transparent 60%), linear-gradient(180deg, #07071a 0%, #090920 40%, #080818 100%)',
        minHeight: '100vh',
      }}
    >

      {/* ══ NAV ══════════════════════════════ */}
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(7,7,26,0.72)',
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: '0 auto',
            padding: '0 28px',
            height: 66,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: 34, height: 34,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
                boxShadow: '0 0 20px rgba(16,185,129,0.28)',
                flexShrink: 0,
              }}
            >
              ⛳
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', 'Times New Roman', serif",
                fontWeight: 800,
                fontSize: '1.1rem',
                color: '#fff',
                letterSpacing: '-0.01em',
              }}
            >
              GolfCharity
            </span>
          </Link>

          {/* Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link
              href="/login"
              style={{
                fontFamily: "'Times New Roman', Georgia, serif",
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#8b8ab0',
                textDecoration: 'none',
                padding: '9px 20px',
                borderRadius: 10,
                border: '1px solid transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#8b8ab0'
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'transparent'
              }}
            >
              Sign in
            </Link>

            <Link href="/signup" className="btn-primary" style={{ padding: '11px 26px', fontSize: '0.9rem', borderRadius: 11 }}>
              Get started
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      {/* ══ HERO ═════════════════════════════ */}
      {/*
        FIX 1: No blank screen — content visible immediately.
        All animations use opacity 0→1 + y offset, NOT display:none.
        pt-[66px] accounts for fixed nav height.
      */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px 96px',
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* ambient orbs — purely decorative, never block content */}
        <div
          className="orb float"
          style={{
            width: 520, height: 520,
            top: '-8%', left: '-6%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)',
          }}
        />
        <div
          className="orb float-delay"
          style={{
            width: 380, height: 380,
            top: '8%', right: '-4%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)',
          }}
        />
        <div
          className="orb"
          style={{
            width: 600, height: 280,
            bottom: '4%', left: '18%',
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)',
          }}
        />

        <div style={{ position: 'relative', maxWidth: 760, width: '100%' }}>

          {/* badge */}
          <motion.div
            {...rise(0)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 20px',
              borderRadius: 99,
              border: '1px solid rgba(16,185,129,0.22)',
              background: 'rgba(16,185,129,0.07)',
              marginBottom: 44,
            }}
          >
            <Heart size={12} style={{ color: '#10b981', flexShrink: 0 }} />
            <span className="label-xs" style={{ color: '#34d399' }}>
              Every subscription. Real charity impact.
            </span>
          </motion.div>

          {/*
            FIX 2: Playfair Display serif — editorial, premium.
            Two-line headline — clear hierarchy, no competition.
          */}
          <motion.h1 {...rise(0.08)} className="display-xl" style={{ color: '#ffffff', marginBottom: 10 }}>
            Play golf.
          </motion.h1>
          <motion.h1
            {...rise(0.16)}
            className="display-xl text-gradient-aurora"
            style={{ marginBottom: 40 }}
          >
            Change lives.
          </motion.h1>

          <motion.p
            {...rise(0.26)}
            className="body-lg"
            style={{ maxWidth: 500, margin: '0 auto 52px', color: '#7674a0' }}
          >
            Track your Stableford scores, enter monthly prize draws, and
            automatically donate to a charity you believe in — all from
            one clean dashboard.
          </motion.p>

          {/*
            FIX 3: btn-primary class = proper button.
            No underline. Gradient bg. Shadow. Hover lift.
            btn-ghost = secondary, clearly subordinate.
          */}
          <motion.div
            {...rise(0.34)}
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <Link href="/signup" className="btn-primary">
              Start for £9.99 / month
              <ArrowRight size={16} />
            </Link>
            <Link href="/login" className="btn-ghost">
              Sign in
            </Link>
          </motion.div>

          {/* trust row */}
          <motion.div
            {...rise(0.42)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 28,
              marginTop: 36,
              flexWrap: 'wrap',
            }}
          >
            {['Cancel anytime', 'Min. 10% to charity', 'Monthly prize draws'].map((t) => (
              <span
                key={t}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  fontSize: '0.78rem',
                  color: '#3e3d60',
                  fontFamily: "'Times New Roman', serif",
                }}
              >
                <CheckCircle size={13} style={{ color: '#10b981', flexShrink: 0 }} />
                {t}
              </span>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ══ IMPACT NUMBERS ═══════════════════ */}
      <section style={{ padding: '88px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          <motion.div {...riseInView()} style={{ textAlign: 'center', marginBottom: 60 }}>
            <SectionLabel color="#8b5cf6">Our impact so far</SectionLabel>
            <h2 className="display-lg" style={{ color: '#fff' }}>
              Numbers that{' '}
              <span className="text-gradient-gold">matter.</span>
            </h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20,
            }}
          >
            {[
              { value: '£240K+', label: 'Donated to charity', emoji: '💚', color: '#10b981' },
              { value: '3,800+', label: 'Active members', emoji: '👥', color: '#8b5cf6' },
              { value: '42', label: 'Charities supported', emoji: '🏥', color: '#f59e0b' },
              { value: '£18K', label: 'In prizes awarded', emoji: '🏆', color: '#06b6d4' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                {...riseInView(i * 0.1)}
                className="card-glass"
                style={{ padding: '34px 24px', textAlign: 'center' }}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: 14 }}>{stat.emoji}</div>
                <p
                  className="display-md"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}, #fff)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: 8,
                  }}
                >
                  {stat.value}
                </p>
                <p className="body-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══ HOW IT WORKS ═════════════════════ */}
      <section style={{ padding: '88px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          <motion.div {...riseInView()} style={{ textAlign: 'center', marginBottom: 68 }}>
            <SectionLabel color="#06b6d4">How it works</SectionLabel>
            <h2 className="display-lg" style={{ color: '#fff' }}>
              Three steps.{' '}
              <span className="text-gradient-aurora">One purpose.</span>
            </h2>
            <p
              className="body-lg"
              style={{ maxWidth: 460, margin: '18px auto 0', color: '#5e5d80' }}
            >
              No complexity. No friction. Just a simple loop that rewards
              you and funds what you care about.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
            }}
          >
            {[
              {
                n: '01',
                icon: <TrendingUp size={21} />,
                title: 'Track your scores',
                body: 'Enter your last 5 Stableford scores. Your performance builds your unique draw profile and keeps your game history in one place.',
                from: '#10b981', to: '#06b6d4',
                glow: 'rgba(16,185,129,0.11)',
              },
              {
                n: '02',
                icon: <Trophy size={21} />,
                title: 'Enter monthly draws',
                body: 'Your score numbers become your lottery entries. Every month, 5 numbers are drawn. Match 3, 4, or all 5 to win real prizes.',
                from: '#8b5cf6', to: '#6366f1',
                glow: 'rgba(139,92,246,0.11)',
              },
              {
                n: '03',
                icon: <Heart size={21} />,
                title: 'Fund your charity',
                body: 'Pick a verified charity at signup. A portion of every subscription goes there automatically — no extra steps, no friction.',
                from: '#f472b6', to: '#ec4899',
                glow: 'rgba(244,114,182,0.11)',
              },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                {...riseInView(i * 0.12)}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                style={{
                  position: 'relative',
                  background: `radial-gradient(circle at top left, ${step.glow} 0%, rgba(255,255,255,0.012) 70%)`,
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 24,
                  padding: '40px 34px',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'border-color 0.3s',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 14, right: 22,
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 800,
                    fontSize: '5rem',
                    lineHeight: 1,
                    color: 'rgba(255,255,255,0.03)',
                    userSelect: 'none',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {step.n}
                </span>

                <div
                  style={{
                    width: 48, height: 48,
                    borderRadius: 15,
                    background: `linear-gradient(135deg, ${step.from}, ${step.to})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff',
                    marginBottom: 26,
                    boxShadow: `0 4px 18px ${step.glow}`,
                    transition: 'transform 0.2s',
                  }}
                >
                  {step.icon}
                </div>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: '1.18rem',
                    color: '#fff',
                    marginBottom: 12,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.title}
                </h3>
                <p className="body-sm" style={{ lineHeight: 1.8 }}>
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══ CHARITY SPOTLIGHT ════════════════ */}
      <section style={{ padding: '88px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          <motion.div {...riseInView()} style={{ textAlign: 'center', marginBottom: 68 }}>
            <SectionLabel color="#f472b6">Your impact</SectionLabel>
            <h2 className="display-lg" style={{ color: '#fff' }}>
              Choose who you{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #f472b6, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                champion.
              </span>
            </h2>
            <p
              className="body-lg"
              style={{ maxWidth: 460, margin: '18px auto 0', color: '#5e5d80' }}
            >
              From cancer research to conservation — your subscription funds
              the causes that matter most to you.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
            }}
          >
            {[
              {
                emoji: '🔬',
                name: 'Cancer Research UK',
                desc: 'Funding life-saving research to help more people survive.',
                bg: 'linear-gradient(135deg, rgba(30,58,138,0.32), rgba(15,23,42,0.7))',
                border: 'rgba(59,130,246,0.18)',
                tag: 'Featured', tagColor: '#60a5fa',
              },
              {
                emoji: '🧠',
                name: 'Mind Mental Health',
                desc: 'Empowering everyone experiencing a mental health problem.',
                bg: 'linear-gradient(135deg, rgba(76,29,149,0.32), rgba(15,23,42,0.7))',
                border: 'rgba(139,92,246,0.18)',
                tag: null, tagColor: null,
              },
              {
                emoji: '🌍',
                name: 'WWF',
                desc: 'Protecting the natural world for future generations.',
                bg: 'linear-gradient(135deg, rgba(6,78,59,0.32), rgba(15,23,42,0.7))',
                border: 'rgba(16,185,129,0.18)',
                tag: 'Featured', tagColor: '#34d399',
              },
            ].map((c, i) => (
              <motion.div
                key={c.name}
                {...riseInView(i * 0.12)}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                style={{
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  borderRadius: 24,
                  padding: '36px 30px',
                  /*
                    FIX 5: cursor:default — not pointer.
                    No misleading affordance.
                  */
                  cursor: 'default',
                }}
              >
                <div style={{ fontSize: '2.6rem', marginBottom: 18 }}>{c.emoji}</div>

                {c.tag && (
                  <span
                    className="label-xs"
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: 99,
                      border: `1px solid ${c.tagColor}38`,
                      background: `${c.tagColor}12`,
                      color: c.tagColor,
                      marginBottom: 14,
                    }}
                  >
                    ⭐ {c.tag}
                  </span>
                )}

                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: '1.12rem',
                    color: '#fff',
                    marginBottom: 10,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {c.name}
                </h3>

                <p className="body-sm" style={{ lineHeight: 1.75, marginBottom: 20 }}>
                  {c.desc}
                </p>

                {/*
                  FIX 5: Was "Support this cause →" with pointer cursor.
                  Now: informational text only. No hover. No pointer.
                */}
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: '#3e3d5e',
                    fontFamily: "'Times New Roman', serif",
                    fontStyle: 'italic',
                  }}
                >
                  Select this charity after joining
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...riseInView(0.3)}
            style={{
              textAlign: 'center',
              color: '#2e2d4a',
              fontSize: '0.82rem',
              marginTop: 26,
              fontFamily: "'Times New Roman', serif",
            }}
          >
            + 39 more charities available after you join
          </motion.p>
        </div>
      </section>

      <Divider />

      {/* ══ PRIZE TIERS ══════════════════════ */}
      <section style={{ padding: '88px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          <motion.div {...riseInView()} style={{ textAlign: 'center', marginBottom: 68 }}>
            <SectionLabel color="#f59e0b">Monthly draws</SectionLabel>
            <h2 className="display-lg" style={{ color: '#fff' }}>
              Real prizes.{' '}
              <span className="text-gradient-gold">Every month.</span>
            </h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {[
              {
                icon: '🏆', match: '5 Number Match', pct: '40%',
                note: 'Jackpot — rolls over if unclaimed',
                bg: 'linear-gradient(135deg, rgba(120,53,15,0.32), rgba(15,23,42,0.8))',
                border: 'rgba(245,158,11,0.28)',
                color: '#fbbf24',
                glow: '0 0 36px rgba(245,158,11,0.1)',
              },
              {
                icon: '🥈', match: '4 Number Match', pct: '35%',
                note: 'Split equally among winners',
                bg: 'linear-gradient(135deg, rgba(30,41,59,0.48), rgba(15,23,42,0.8))',
                border: 'rgba(148,163,184,0.1)',
                color: '#94a3b8', glow: 'none',
              },
              {
                icon: '🥉', match: '3 Number Match', pct: '25%',
                note: 'Split equally among winners',
                bg: 'linear-gradient(135deg, rgba(30,41,59,0.48), rgba(15,23,42,0.8))',
                border: 'rgba(148,163,184,0.1)',
                color: '#94a3b8', glow: 'none',
              },
            ].map((t, i) => (
              <motion.div
                key={t.match}
                {...riseInView(i * 0.12)}
                style={{
                  background: t.bg,
                  border: `1px solid ${t.border}`,
                  borderRadius: 24,
                  padding: '44px 28px',
                  textAlign: 'center',
                  boxShadow: t.glow,
                  cursor: 'default',
                }}
              >
                <div style={{ fontSize: '2.8rem', marginBottom: 18 }}>{t.icon}</div>
                <p className="body-sm" style={{ marginBottom: 10, fontWeight: 500 }}>
                  {t.match}
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 800,
                    fontSize: '3.6rem',
                    lineHeight: 1,
                    color: t.color,
                    marginBottom: 8,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {t.pct}
                </p>
                <p className="label-xs" style={{ color: '#2e2d4a', marginBottom: 14 }}>
                  of prize pool
                </p>
                <div
                  style={{
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${t.color}45, transparent)`,
                    margin: '14px 0',
                  }}
                />
                <p className="body-sm" style={{ fontSize: '0.8rem' }}>{t.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ════════════════════════ */}
      {/*
        FIX 6 + 7: Reduced padding, tighter max-width (640px),
        content closer together, CTA is large + gradient + shadow + scale.
      */}
      <section style={{ padding: '72px 24px 112px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <motion.div
            {...riseInView()}
            style={{
              position: 'relative',
              borderRadius: 28,
              /* tighter padding than before */
              padding: '60px 44px',
              textAlign: 'center',
              overflow: 'hidden',
              border: '1px solid rgba(139,92,246,0.18)',
              background:
                'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(139,92,246,0.07) 50%, rgba(6,182,212,0.05) 100%)',
            }}
          >
            {/* top glow */}
            <div
              className="orb pulse-glow"
              style={{
                width: 400, height: 160,
                top: -50, left: '50%',
                transform: 'translateX(-50%)',
                background: 'radial-gradient(ellipse, rgba(139,92,246,0.28) 0%, transparent 70%)',
                filter: 'blur(44px)',
              }}
            />

            <div style={{ position: 'relative' }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                style={{ display: 'inline-flex', gap: 3, marginBottom: 24 }}
              >
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ fontSize: '1rem' }}>⭐</span>
                ))}
              </motion.div>

              <h2
                className="display-lg"
                style={{ color: '#fff', marginBottom: 16 }}
              >
                Ready to play{' '}
                <span className="text-gradient-aurora">with purpose?</span>
              </h2>

              <p
                className="body-lg"
                style={{
                  maxWidth: 400,
                  margin: '0 auto 40px',
                  color: '#5e5d80',
                  fontSize: '0.98rem',
                }}
              >
                Join thousands of golfers who compete, win real prizes, and
                fund charities they love — every single month.
              </p>

              {/*
                FIX 7: Dominant CTA. Large. Gradient. Shadow. Scale on hover.
                btn-primary class handles everything.
              */}
              <Link
                href="/signup"
                className="btn-primary"
                style={{ fontSize: '1.05rem', padding: '18px 44px' }}
              >
                Join now — £9.99 / month
                <ArrowRight size={18} />
              </Link>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 28,
                  marginTop: 28,
                  flexWrap: 'wrap',
                }}
              >
                {['Cancel anytime', 'Min 10% to charity', 'Real monthly prizes'].map((item) => (
                  <span
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                      fontSize: '0.76rem',
                      color: '#3e3d5e',
                      fontFamily: "'Times New Roman', serif",
                    }}
                  >
                    <CheckCircle size={12} style={{ color: '#10b981' }} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════ */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '30px 28px',
          background: 'rgba(255,255,255,0.008)',
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13,
              }}
            >
              ⛳
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: '#fff',
                fontSize: '0.95rem',
              }}
            >
              GolfCharity
            </span>
          </div>

          <p
            style={{
              fontSize: '0.72rem',
              color: '#1e1d36',
              fontFamily: "'Times New Roman', serif",
            }}
          >
            © 2025 Golf Charity Platform · Built for Digital Heroes
          </p>

          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link
              href="/login"
              style={{
                fontSize: '0.82rem',
                color: '#3e3d5e',
                textDecoration: 'none',
                fontFamily: "'Times New Roman', serif",
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#8b8ab0'}
              onMouseLeave={e => e.currentTarget.style.color = '#3e3d5e'}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="btn-primary"
              style={{
                padding: '9px 22px',
                fontSize: '0.82rem',
                borderRadius: 10,
              }}
            >
              Join now →
            </Link>
          </div>
        </div>
      </footer>

    </div>
  )
}