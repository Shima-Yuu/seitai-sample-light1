'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { siteConfig } from '@/lib/config/site'
import Image from 'next/image'

type Announcement = {
  id: string
  date: Date
  title: string
  content: string
  isHtml?: boolean
  image?: string // 画像のパスを追加
}

const announcements: Announcement[] = [
  {
    id: '1',
    date: new Date('2024-04-01'),
    title: '新型コロナウイルス感染症対策について',
    content:
      '<p>当院では、お客様の安全を第一に考え、以下の感染症対策を実施しております。</p><ul><li>スタッフのマスク着用と手指消毒</li><li>施術ベッドの消毒</li><li>定期的な換気</li><li>予約人数の制限</li></ul><p>ご理解とご協力をお願いいたします。</p>',
    isHtml: true,
  },
  {
    id: '2',
    date: new Date('2024-03-15'),
    title: '春の健康キャンペーン実施中',
    content:
      '<p>4月末まで、初回限定で施術料金<strong>20%オフ</strong>キャンペーンを実施しております。この機会にぜひご利用ください。</p><p><a href="#contact" class="text-primary hover:underline">ご予約はこちら</a></p>',
    isHtml: true,
  },
  {
    id: '3',
    date: new Date('2024-03-01'),
    title: '営業時間変更のお知らせ',
    content:
      '<p>4月より、平日の営業時間を<strong>9:00〜20:00</strong>に変更いたします。</p><p>より多くの方にご利用いただけるよう、営業時間を拡大いたしました。</p>',
    isHtml: true,
    image: '/placeholder.svg?height=200&width=400&text=春の健康キャンペーン',
  },
  {
    id: '4',
    date: new Date('2024-02-15'),
    title: '新メニュー「骨盤矯正コース」開始',
    content:
      '<p>骨盤の歪みを整え、姿勢改善や腰痛緩和に効果的な<span class="font-bold">「骨盤矯正コース」</span>を開始しました。</p><p>詳しくはスタッフまでお問い合わせください。</p>',
    isHtml: true,
  },
  {
    id: '5',
    date: new Date('2024-02-01'),
    title: 'ホームページリニューアルのお知らせ',
    content:
      '<p>この度、ホームページをリニューアルいたしました。今後とも和心整体院をよろしくお願いいたします。</p>',
    isHtml: true,
  },
  {
    id: '6',
    date: new Date('2024-01-15'),
    title: '冬季休業のお知らせ',
    content:
      '<p>1月1日〜1月3日まで冬季休業とさせていただきます。</p><p>ご不便をおかけしますが、よろしくお願いいたします。</p>',
    isHtml: true,
  },
]

// HTMLをサニタイズして安全にレンダリングする関数
const renderHTML = (htmlContent: string) => {
  return { __html: htmlContent }
}

export function AnnouncementsSection() {
  const [showAll, setShowAll] = useState(false)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const { ref, isInView } = useScrollAnimation()

  const displayedAnnouncements = showAll ? announcements : announcements.slice(0, 3)

  const toggleExpand = (id: string) => {
    const newExpandedIds = new Set(expandedIds)
    if (newExpandedIds.has(id)) {
      newExpandedIds.delete(id)
    } else {
      newExpandedIds.add(id)
    }
    setExpandedIds(newExpandedIds)
  }

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="section-title">
            <h2>お知らせ</h2>
            <p>{siteConfig.name}からの最新情報をお届けします</p>
          </div>

          <div className="space-y-4 mb-8">
            {displayedAnnouncements.map(announcement => (
              <Card
                key={announcement.id}
                className="overflow-hidden border-l-4 border-l-primary transition-all duration-200 hover:opacity-85 cursor-pointer"
                onClick={() => toggleExpand(announcement.id)}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-primary block">
                        {format(announcement.date, 'yyyy年MM月dd日', { locale: ja })}
                      </span>
                      <h3 className="text-sm md:text-base font-bold mt-1">{announcement.title}</h3>
                    </div>
                    <div className="transition-transform duration-200">
                      {expandedIds.has(announcement.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                {expandedIds.has(announcement.id) ? (
                  <CardContent className="p-4 pt-2">
                    {announcement.image && (
                      <div className="mb-4">
                        <div className="relative w-full h-60 rounded-md overflow-hidden">
                          <Image
                            src={announcement.image}
                            alt={announcement.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    {announcement.isHtml ? (
                      <div
                        className="text-sm announcement-content"
                        dangerouslySetInnerHTML={renderHTML(announcement.content)}
                      />
                    ) : (
                      <div className="whitespace-pre-line text-xs">{announcement.content}</div>
                    )}
                  </CardContent>
                ) : (
                  <div className="pb-2"></div>
                )}
              </Card>
            ))}
          </div>

          {announcements.length > 3 && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="text-sm px-6 py-2 hover:bg-primary-hover hover:text-white"
                size="lg"
              >
                {showAll ? '閉じる' : 'もっと見る'}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
