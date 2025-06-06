import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { formatPhoneNumber } from '@/lib/utils'
import { siteConfig } from '@/lib/config/site'

const navItems = [
  { name: '症状別のお悩み', href: '#symptoms' },
  { name: '当院の強み', href: '#strengths' },
  { name: '施術メニュー・料金表', href: '#services' },
  { name: '施術の流れ', href: '#process' },
  { name: 'アクセス・営業時間', href: '#access' },
  { name: 'よくある質問', href: '#faq' },
]

export function Footer() {
  return (
    <footer className="bg-secondary py-12 pb-3">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">{siteConfig.name}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{siteConfig.clinic.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <a
                  href={`tel:${siteConfig.clinic.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {formatPhoneNumber(siteConfig.clinic.phone)}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href={`mailto:${siteConfig.clinic.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {siteConfig.clinic.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">サイトマップ</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {navItems.map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">営業時間</h3>
            <div className="space-y-2 text-sm">
              {siteConfig.clinic.businessHours.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.days}</span>
                  <span>{item.hours}</span>
                </div>
              ))}
              <div className="flex justify-between text-muted-foreground">
                <span>定休日</span>
                <span>{siteConfig.clinic.closedDays}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-3 border-t border-border flex flex-col md:flex-row justify-center items-center">
          <p className="text-xs text-muted-foreground text-gray-500">
            &copy; {new Date().getFullYear()} {siteConfig.name} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
