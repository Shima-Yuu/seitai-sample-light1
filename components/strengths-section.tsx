'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import Image from 'next/image'
import { strengthsDetail } from '@/lib/data/strengths'

export function StrengthsSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="strengths" className="section-padding bg-primary/5">
      <div className="container">
        <div className="section-title">
          <h2>当院の強み</h2>
          <p>あなたの痛みと真摯に向き合い、根本から改善へ導きます</p>
        </div>

        <div className="space-y-12 md:space-y-24 mt-8 md:mt-16">
          {strengthsDetail.map((strength, index) => (
            <motion.div
              key={strength.id}
              ref={index === 0 ? ref : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`flex flex-col ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-6 lg:gap-12 items-center`}
            >
              {/* 画像部分 */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <div className="relative w-full h-64 md:h-80">
                    <Image
                      src={strength.image}
                      alt={strength.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute bottom-0 left-0 p-4 lg:p-6 w-full`}>
                    <span className="inline-flex items-center justify-center rounded-full bg-primary/90 px-3 py-1 text-xs md:text-sm text-white">
                      <strength.icon className="h-4 w-4 mr-1" />
                      {strength.subtitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* テキスト部分 */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-lg lg:text-3xl font-bold mb-3 mb:mb-4 text-primary">
                  {strength.title}
                </h3>
                <div className="space-y-4">
                  {strength.description.map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground text-sm md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
