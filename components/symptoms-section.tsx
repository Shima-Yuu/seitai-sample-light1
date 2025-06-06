'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const symptoms = [
  {
    id: 'neck-shoulder',
    title: '首痛、肩こり',
    description:
      '長時間のデスクワークやスマートフォンの使用による首・肩のコリや痛みを改善します。独自の施術で血行を促進し、凝り固まった筋肉をほぐすことで、首や肩の可動域を広げ、痛みの軽減を目指します。',
    image: '/images/img_worries-01.webp',
  },
  {
    id: 'lower-back',
    title: '腰痛',
    description:
      '慢性的な腰痛から急性の腰痛まで、お客様の症状に合わせた施術を行います。正しい姿勢の指導と、腰周りの筋肉や関節の調整により、根本的な改善を目指します。日常生活での予防法もアドバイスいたします。',
    image: '/images/img_worries-02.webp',
  },
  {
    id: 'headache',
    title: 'スポーツ外傷',
    description:
      'スポーツ活動による怪我や痛みに対して、早期回復と再発防止を目指した施術を行います。アスリートの方から趣味のスポーツまで、それぞれの活動レベルに合わせた最適なケアをご提案します。',
    image: '/images/img_worries-03.webp',
  },
  {
    id: 'stiff-body',
    title: '交通事故でお悩みの方',
    description:
      '交通事故による首や腰の痛み、むち打ちなどの症状に対して、丁寧な施術で回復をサポートします。保険適用の手続きもお手伝いし、事故後の身体の不調を総合的にケアいたします。',
    image: '/images/img_worries-04.webp',
  },
  {
    id: 'joint-pain',
    title: '膝の痛み',
    description:
      '加齢や運動、長時間の歩行による膝の痛みに対して、専門的なアプローチで改善を図ります。膝周りの筋肉バランスを整え、関節への負担を軽減する施術で、日常生活の動作をサポート。適切なストレッチ法や生活上の注意点もアドバイスいたします。',
    image: '/images/img_worries-05.png',
  },
  {
    id: 'posture',
    title: '寝違え',
    description:
      '寝違えは、急な首の動きや不自然な姿勢が原因で首の筋肉や靭帯が損傷し、痛みやこりを引き起こす一般的な症状です。特に寝ている間や長時間同じ姿勢でいる際に発生しやすく、早期の対処が必要です。当院では、専門的な治療で症状の改善を目指します。',
    image: '/images/img_worries-06.png',
  },
]

export function SymptomsSection() {
  const { ref, isInView } = useScrollAnimation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="symptoms" className="section-padding">
      <div className="container">
        <div className="section-title">
          <h2>症状別のお悩み</h2>
          <p>このような痛みやお悩みを抱えていませんか？</p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {symptoms.map(symptom => (
            <motion.div key={symptom.id} variants={itemVariants}>
              <Card className="h-full overflow-hidden transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={symptom.image || '/placeholder.svg'}
                    alt={symptom.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white text-lg md:text-xl font-bold p-4">{symptom.title}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm md:text-base">
                    {symptom.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            asChild
            className="text-sm px-6 py-2 hover:bg-primary-hover hover:text-white"
            size="lg"
          >
            <Link href="#services">料金表はこちら</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
