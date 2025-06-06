import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AnnouncementsSection } from '@/components/announcements-section'
import { SymptomsSection } from '@/components/symptoms-section'
import { StrengthsSection } from '@/components/strengths-section'
import { ServicesSection } from '@/components/services-section'
import { ProcessSection } from '@/components/process-section'
import { StoreInfoSection } from '@/components/store-info-section'
import { FAQSection } from '@/components/faq-section'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'
import { LoadingAnimation } from '@/components/loading-animation'

export default function Home() {
  return (
    <>
      <LoadingAnimation />
      <Header />
      <main>
        <HeroSection />
        <AnnouncementsSection />
        <SymptomsSection />
        <StrengthsSection />
        <ServicesSection />
        <ProcessSection />
        <StoreInfoSection />
        <FAQSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
