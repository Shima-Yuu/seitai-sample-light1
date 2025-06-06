'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Phone, Mail, Train, Bus, Car } from 'lucide-react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { formatPhoneNumber } from '@/lib/utils'
import { siteConfig } from '@/lib/config/site'

// アクセス情報は設定ファイルに含まれていないため、ここで定義
const accessInfo = [
  { type: '電車', description: 'JR新宿駅 東口から徒歩5分' },
  { type: 'バス', description: '新宿駅前バス停から徒歩2分' },
  { type: '車', description: '近隣にコインパーキングあり' },
]

export function StoreInfoSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="access" className="section-padding">
      <div className="container">
        <div className="section-title">
          <h2>店舗情報</h2>
          <p>{siteConfig.name}へのアクセス方法と営業時間のご案内</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <MapPin className="h-5 w-5 text-primary" />
                  住所・連絡先
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-sm md:text-base">{siteConfig.name}</p>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {siteConfig.clinic.address}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a
                    href={`tel:${siteConfig.clinic.phone}`}
                    className="hover:text-primary transition-colors text-sm md:text-base"
                  >
                    {formatPhoneNumber(siteConfig.clinic.phone)}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a
                    href={`mailto:${siteConfig.clinic.email}`}
                    className="hover:text-primary transition-colors text-sm md:text-base"
                  >
                    {siteConfig.clinic.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Clock className="h-5 w-5 text-primary" />
                  営業時間
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {siteConfig.clinic.businessHours.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium text-sm md:text-base">{item.days}</span>
                      <span className="text-sm md:text-base">{item.hours}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-muted-foreground">
                    <span className="text-sm md:text-base">定休日</span>
                    <span className="text-sm md:text-base">{siteConfig.clinic.closedDays}</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  ※最終受付は営業終了の1時間前までとなります。
                  <br />
                  ※予約状況により、営業時間が変更になる場合がございます。
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <MapPin className="h-5 w-5 text-primary" />
                  アクセス
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {accessInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {item.type === '電車' && (
                        <Train className="h-5 w-5 text-primary flex-shrink-0" />
                      )}
                      {item.type === 'バス' && (
                        <Bus className="h-5 w-5 text-primary flex-shrink-0" />
                      )}
                      {item.type === '車' && <Car className="h-5 w-5 text-primary flex-shrink-0" />}
                      <div>
                        <p className="font-medium text-sm md:text-base">{item.type}</p>
                        <p className="text-muted-foreground text-sm md:text-base">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full min-h-[400px] lg:min-h-[600px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.828030689816!2d139.69850261525877!3d35.68960868019392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188cd0d6b1ba1f%3A0x1c0a476cb0b11deb!2z5paw5a6_6aeF!5e0!3m2!1sja!2sjp!4v1651234567890!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '0.5rem' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${siteConfig.name}の地図`}
              aria-label={`${siteConfig.name}の地図`}
            ></iframe>
          </motion.div>
        </div>

        <div className="mt-8 text-center">
          <Button asChild size="lg">
            <a href="#contact">ご予約・お問い合わせはこちら</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
