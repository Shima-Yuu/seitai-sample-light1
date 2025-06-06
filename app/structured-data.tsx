import Script from 'next/script'
import { siteConfig } from '@/lib/config/site'

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: siteConfig.name,
    image: '',
    '@id': '',
    url: '',
    telephone: siteConfig.clinic.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '新宿1-1-1 和心ビル2F',
      addressLocality: '新宿区',
      addressRegion: '東京都',
      postalCode: '123-4567',
      addressCountry: 'JP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.689608,
      longitude: 139.698502,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'PublicHolidays'],
        opens: '10:00',
        closes: '17:00',
      },
    ],
    priceRange: '¥¥',
    servesCuisine: '整体, マッサージ, 骨盤矯正',
    description: siteConfig.description,
  }

  return (
    <Script id="structured-data" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  )
}
