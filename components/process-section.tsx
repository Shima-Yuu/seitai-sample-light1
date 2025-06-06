'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { ClipboardCheck, MessageCircle, Clipboard, Calendar, HeartPulse } from 'lucide-react'

const steps = [
  {
    id: 'step1',
    title: '受付・ご案内',
    description:
      'ご来院後、受付でお名前をお伺いし、問診票のご記入をお願いいたします。お着替えのご案内もさせていただきます。',
    icon: ClipboardCheck,
  },
  {
    id: 'step2',
    title: 'カウンセリング',
    description:
      '痛みの症状や原因、生活習慣などを丁寧にお伺いし、最適な施術プランをご提案いたします。',
    icon: MessageCircle,
  },
  {
    id: 'step3',
    title: '検査・診断',
    description: '姿勢や動きの確認、触診などを行い、お体の状態を詳しく検査します。',
    icon: Clipboard,
  },
  {
    id: 'step4',
    title: '施術',
    description:
      'お一人おひとりの症状に合わせた施術を、リラックスできる空間で行います。痛みを最小限に抑えた丁寧な施術を心がけています。',
    icon: HeartPulse,
  },
  {
    id: 'step5',
    title: 'お会計・アフターケア',
    description:
      '施術後の経過説明と、ご自宅でのケア方法をお伝えいたします。次回のご予約も承ります。',
    icon: Calendar,
  },
]

export function ProcessSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="process" className="section-padding bg-secondary/50">
      <div className="container">
        <div className="section-title">
          <h2>施術の流れ</h2>
          <p>初めての方でも安心してご利用いただけるよう、施術の流れをご紹介します</p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* 中央の縦線 */}
          <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-primary -z-10"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              ref={index === 0 ? ref : undefined}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 mb-10 md:mb-12 last:mb-0 relative"
            >
              <div className="flex-shrink-0 bg-primary text-primary-foreground p-3 rounded-full z-10">
                <step.icon className="h-6 w-6" />
              </div>

              <div className="pt-1">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
