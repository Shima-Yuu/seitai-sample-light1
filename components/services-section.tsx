'use client'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { Check, Ticket } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const services = [
  {
    id: 'standard',
    title: '標準整体コース',
    description: '全身の歪みを整え、筋肉の緊張を緩和する基本的な整体施術です。',
    time: '60分',
    price: 6600,
    firstTimePrice: 5280,
    features: ['全身の歪みチェック', '骨格調整', '筋肉の緊張緩和', '施術後のアドバイス'],
  },
  {
    id: 'premium',
    title: 'プレミアム整体コース',
    description:
      '標準コースに加え、より詳細な検査と丁寧な施術を行います。慢性的な症状にお悩みの方におすすめです。',
    time: '90分',
    price: 9900,
    firstTimePrice: 7920,
    recommended: true,
    features: [
      '詳細な問診と検査',
      '全身の歪みチェック',
      '骨格調整',
      '筋肉の緊張緩和',
      'ストレッチ指導',
      '生活習慣のアドバイス',
      'セルフケア指導',
    ],
  },
  {
    id: 'quick',
    title: 'クイック整体コース',
    description: '時間のない方や、特定の部位のみの施術をご希望の方向けの短時間コースです。',
    time: '30分',
    price: 3850,
    firstTimePrice: 3080,
    features: ['気になる部位の集中施術', '簡易的な歪みチェック', 'クイックアドバイス'],
  },
  {
    id: 'pelvic',
    title: '骨盤矯正コース',
    description: '骨盤の歪みを整え、姿勢改善や腰痛緩和に効果的なコースです。',
    time: '60分',
    price: 7700,
    firstTimePrice: 6160,
    features: [
      '骨盤の歪みチェック',
      '骨盤矯正',
      '姿勢分析',
      '骨盤周りの筋肉調整',
      'セルフケア指導',
    ],
  },
]

const ticketPlans = [
  {
    id: '5',
    name: '5回チケット',
    discount: '5%オフ',
    price: '通常料金の5%割引',
    validity: '6ヶ月間有効',
  },
  {
    id: '10',
    name: '10回チケット',
    discount: '10%オフ',
    price: '通常料金の10%割引',
    validity: '1年間有効',
  },
]

export function ServicesSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="services" className="section-padding">
      <div className="container">
        <div className="section-title">
          <h2>施術メニュー・料金</h2>
          <p>あなたの症状や目的に合わせた最適なコースをご用意しています</p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map(service => (
              <div
                key={service.id}
                className={`bg-card rounded-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05),0_4px_10px_-1px_rgba(0,0,0,0.1)] overflow-hidden ${
                  service.recommended ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="relative">
                  {service.recommended && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground py-1 px-4 rounded-bl-lg font-medium text-sm md:text-base">
                      おすすめ
                    </div>
                  )}
                  <div className="p-5 md:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg md:text-2xl font-bold">{service.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground mt-1">
                          {service.time}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm md:text-lg mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm md:text-base">
                          <Check className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 flex justify-between items-end">
                      <div>
                        <p className="text-xs md:text-sm text-muted-foreground">通常価格</p>
                        <p className="text-xl md:text-2xl font-bold">
                          {service.price.toLocaleString()}円
                          <span className="text-sm font-normal">（税込）</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs md:text-sm text-muted-foreground">初回限定価格</p>
                        <p className="text-xl md:text-2xl font-bold text-primary">
                          {service.firstTimePrice.toLocaleString()}円
                          <span className="text-sm font-normal">（税込）</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Card className="bg-secondary/30 border-none shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05),0_4px_10px_-1px_rgba(0,0,0,0.1)] overflow-hidden">
            <CardHeader className="bg-primary/10 pt-3 pb-4 md:pt-4 md:pb-5">
              <div className="flex items-center gap-3">
                <Ticket className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg md:text-2xl">回数券のご案内</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 py-6 md:py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ticketPlans.map(plan => (
                  <Card key={plan.id} className="border shadow-md ">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex items-center justify-between">
                        <span className="text-sm md:text-xl">{plan.name}</span>
                        <span className="text-sm md:text-xl text-primary font-bold">
                          {plan.discount}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-1" />
                          <span className="text-sm md:text-base">{plan.price}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-1" />
                          <span className="text-sm md:text-base">{plan.validity}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-1" />
                          <span className="text-sm md:text-base">全コース利用可能</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-muted-foreground mt-4 md:mt-6 text-xs md:text-sm">
                ※回数券の有効期限は購入日から記載の期間となります。
                <br />
                ※初回限定価格との併用はできません。
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
