"use client"

import { stats } from '@/constants'
import { motion } from 'motion/react'

const ProofSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Subtle top/bottom border lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      {/* Faint background glow */}
      <div className="absolute inset-0 bg-linear-to-b from-orange-500/3 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 rounded-2xl overflow-hidden shadow-sm">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center justify-center text-center bg-background/80 backdrop-blur-sm px-6 py-10 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              {/* Hover accent */}
              <div className="absolute inset-0 bg-orange-500/4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Value */}
              <motion.div
                className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-1.5"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.1,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                {stat.value}
              </motion.div>

              {/* Label */}
              <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProofSection