'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { cn } from '@/lib/utils'
import { useState } from 'react'

// FAQをカテゴリー別に整理
const faqCategories = [
  { id: 'all', label: 'すべて' },
  { id: 'first', label: '初めての方' },
  { id: 'treatment', label: '施術について' },
  { id: 'reservation', label: '予約・料金' },
]

const faqs = [
  {
    id: 'faq1',
    question: '初めての施術でも大丈夫ですか？',
    answer:
      'はい、もちろん大丈夫です。初めての方には、丁寧にカウンセリングを行い、不安や疑問にお答えしながら施術を進めていきます。痛みが苦手な方や、整体が初めての方にも安心していただける施術を心がけています。',
    category: 'first',
  },
  {
    id: 'faq2',
    question: '予約は必要ですか？',
    answer:
      '予約制となっております。お電話またはWebフォームからご予約いただけます。当日のご予約も空きがあれば対応可能ですので、お気軽にお問い合わせください。',
    category: 'reservation',
  },
  {
    id: 'faq3',
    question: '施術は痛いですか？',
    answer:
      '当院では、痛みの少ない施術を心がけています。強い刺激が苦手な方には、ソフトな施術も可能です。施術中に痛みを感じた場合は、遠慮なくお伝えください。お客様の状態に合わせて調整いたします。',
    category: 'treatment',
  },
  {
    id: 'faq4',
    question: '服装は何を着ればいいですか？',
    answer:
      '動きやすい服装でお越しください。ジーンズなど固い素材の服は施術がしづらい場合がありますので、できればジャージやスウェットなどがおすすめです。必要に応じて施術着のご用意もございます。',
    category: 'first',
  },
  {
    id: 'faq5',
    question: '効果はどのくらいで実感できますか？',
    answer:
      '症状や体質によって個人差がありますが、多くの方は1回の施術でも変化を実感されます。慢性的な症状の場合は、複数回の施術が必要なケースもあります。定期的なメンテナンスをおすすめしています。',
    category: 'treatment',
  },
  {
    id: 'faq6',
    question: '保険は使えますか？',
    answer:
      '当院の施術は自費診療となりますので、健康保険の適用外です。ただし、医療費控除の対象となる場合がありますので、領収書は大切に保管されることをおすすめします。',
    category: 'reservation',
  },
  {
    id: 'faq7',
    question: '妊娠中でも施術を受けられますか？',
    answer:
      '妊娠中の方も安心して受けていただける施術メニューをご用意しています。ただし、妊娠初期（16週未満）の方や、切迫早産などのリスクがある方はご遠慮いただいております。必ず事前にご相談ください。',
    category: 'treatment',
  },
  {
    id: 'faq8',
    question: 'キャンセルはいつまでにすればいいですか？',
    answer:
      '前日までにご連絡いただければ、キャンセル料は発生いたしません。当日のキャンセルは、施術料の50%をキャンセル料としていただく場合がございますので、ご了承ください。',
    category: 'reservation',
  },
]

export function FAQSection() {
  const { ref, isInView } = useScrollAnimation()
  const [selectedCategory, setSelectedCategory] = useState('all')

  // カテゴリーでフィルタリング
  const filteredFaqs =
    selectedCategory === 'all' ? faqs : faqs.filter(faq => faq.category === selectedCategory)

  return (
    <section id="faq" className="section-padding bg-secondary/50">
      <div className="container">
        <div className="section-title">
          <h2>よくある質問</h2>
          <p>お客様からよくいただくご質問にお答えします</p>
        </div>

        {/* カテゴリータブ */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {faqCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="multiple" className="w-full space-y-4">
            {filteredFaqs.map(faq => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border rounded-lg overflow-hidden shadow-sm bg-background hover:shadow-md transition-all duration-200"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-medium p-4 hover:bg-secondary/30 transition-colors">
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base px-4 md:px-6 pb-5 pt-2 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
