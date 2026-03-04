"use client"

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { features } from '@/constants'
import { Monitor, Smartphone, Globe } from 'lucide-react'
import { motion } from 'motion/react'

const platformCards = [
  {
    icon: Monitor,
    title: "Desktop App",
    description: "Full-featured desktop application for Windows, Mac, and Linux",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Record on the go with our iOS and Android apps",
  },
  {
    icon: Globe,
    title: "Web Browser",
    description: "No installation needed — record directly from your browser",
  },
]

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 px-4 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-orange-500/2.5 to-transparent pointer-events-none" />

      <div className="container mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Badge
            className="mb-4 px-3 py-1 text-xs font-semibold tracking-widest uppercase border border-orange-400/25 bg-orange-500/8 text-orange-400"
            variant="outline"
          >
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight leading-[1.1]">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-300">
              create amazing clips
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Powerful features designed to make screen recording and sharing effortless — from capture to delivery.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            >
              <Card className="group relative h-full border-border/60 bg-card/60 backdrop-blur-sm hover:border-orange-500/30 hover:shadow-[0_4px_24px_rgba(249,138,36,0.08)] transition-all duration-300 overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <CardHeader className="pb-3">
                  <div className="w-11 h-11 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/15 group-hover:border-orange-500/30 transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <CardTitle className="text-base font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Platform Cards */}
        <motion.div
          className="mt-6 grid md:grid-cols-3 gap-px bg-border/40 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
        >
          {platformCards.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={index}
              className="group relative flex items-start gap-4 bg-card/70 backdrop-blur-sm px-7 py-7 hover:bg-orange-500/3 transition-colors duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <div className="shrink-0 w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center mt-0.5 group-hover:border-orange-500/35 transition-colors duration-300">
                <Icon className="w-4.5 h-4.5 text-orange-400" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default FeaturesSection