"use client"

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { testimonials } from '@/constants'
import { Star } from 'lucide-react'
import { motion } from 'motion/react'

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-24 px-4 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-linear-to-b from-orange-500/2.5 via-transparent to-transparent pointer-events-none" />

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
            Testimonials
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight leading-[1.1]">
            Loved by{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-300">
              creators worldwide
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            See what our users have to say about their experience with Clipsterra
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <Card className="group relative h-full border-border/60 bg-card/60 backdrop-blur-sm hover:border-orange-500/30 hover:shadow-[0_4px_24px_rgba(249,138,36,0.08)] transition-all duration-300 overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <CardHeader className="pb-3">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-foreground/80 leading-relaxed mb-5">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-orange-500/20">
                      <AvatarFallback className="bg-orange-500/10 text-orange-400 text-xs font-bold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm font-semibold">{testimonial.name}</CardTitle>
                      <CardDescription className="text-xs">{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection