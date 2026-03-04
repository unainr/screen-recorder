"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { faqs } from '@/constants'
import { motion } from 'motion/react'

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-24 px-4 overflow-hidden">
      {/* Top/bottom hairlines */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      {/* Background accent */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-orange-500/2 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-2xl">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Badge
            className="mb-4 px-3 py-1 text-xs font-semibold tracking-widest uppercase border border-orange-400/25 bg-orange-500/8 text-orange-400"
            variant="outline"
          >
            FAQ
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight leading-[1.1]">
            Frequently asked{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-300">
              questions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Everything you need to know about Clipsterra
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
        >
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.06, ease: "easeOut" }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-border/60 rounded-xl px-5 bg-card/50 backdrop-blur-sm data-[state=open]:border-orange-500/30 data-[state=open]:bg-orange-500/3 transition-colors duration-200"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold py-4 hover:no-underline hover:text-orange-400 transition-colors duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

      </div>
    </section>
  )
}

export default FAQSection