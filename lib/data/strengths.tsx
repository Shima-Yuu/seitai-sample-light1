import { UserCheck, Award, Home, BookOpen, ShieldCheck, Sparkles } from 'lucide-react'
import { ReactNode } from 'react'

// ヒーローセクションとStrengthsセクションで共有する短い説明文
export const strengthsSummary = [
  {
    id: 'diagnosis',
    icon: <UserCheck className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    title: '根本原因を突き止める<br>丁寧な問診',
    description:
      '症状の原因を正確に特定し、効果的な施術プランをご提案します。一人ひとりに最適なケアを。',
  },
  {
    id: 'gentle',
    icon: <Award className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    title: '痛みを最小限に抑えた<br>優しい施術',
    description:
      '痛みに配慮した優しい施術で体への負担を軽減。リラックスできる環境で回復を促進します。',
  },
  {
    id: 'trust',
    icon: <Home className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    title: '地域密着での<br>信頼と実績',
    description: '地域の皆様に15年以上支えられてきた実績。安心と信頼の施術をご提供しています。',
  },
]

// Strengthsセクションで使用する詳細な情報
export const strengthsDetail = [
  {
    id: 'diagnosis',
    title: '1. 根本の原因を突き止める',
    subtitle: '丁寧な問診',
    description: [
      '「なぜ痛みが出るのか」「どうすれば改善するのか」。同じ症状でも、原因は人それぞれ異なります。',
      '問診では、いつ、どんな時に症状が出るのか、普段の生活習慣なども含めて丁寧にお伺いします。そこから本当の原因を見つけ出し、最適な施術プランをご提案いたします。',
      '長年の経験で培った「見る目」と「聴く耳」で、お客様の痛みの根本原因を特定。一度の施術ではなく、長期的な視点での改善計画を立てることで、着実な回復を実現します。',
    ],
    icon: BookOpen,
    image: '/images/img_strengths-01.png',
  },
  {
    id: 'gentle',
    title: '2. 痛みを最小限に抑えた優しい施術',
    subtitle: '安心・安全な施術法',
    description: [
      '「整体は痛そう」「怖い」という不安の声をよく耳にします。当院では、痛みの少ない独自の施術法を採用。',
      '丁寧な検査と施術で、必要最小限の刺激で最大限の効果を引き出します。痛みの少ない施術により、お身体への負担を抑え、早期回復を目指します。',
      '特に初めての方や痛みに敏感な方にも安心していただけるよう、徐々に強さを調整しながら施術を進めていきます。また、施術前の丁寧な説明で不安を解消し、リラックスした状態で施術を受けていただけます。',
    ],
    icon: ShieldCheck,
    image: '/images/img_strengths-02.png',
  },
  {
    id: 'aftercare',
    title: '3. 徹底したアフターケアと再発予防指導',
    subtitle: '施術だけで終わらない一生涯のサポート',
    description: [
      '「一時的に良くなっても、また症状が戻ってしまう」というお悩みにもしっかり対応します。',
      '施術後には、日常生活でのセルフケア方法や、姿勢・動作の改善点をわかりやすくお伝えします。また、定期的なフォローアップで症状の変化を確認し、再発防止のためのアドバイスを継続的に提供。お客様の健康な生活を長期的にサポートいたします。',
      'お客様自身が「自分の体を理解する」ことを大切にしています。症状の原因や予防法を分かりやすく解説し、日常生活での小さな変化が大きな効果を生み出すことを実感していただけるようサポートいたします。',
    ],
    icon: Sparkles,
    image: '/images/img_strengths-03.png',
  },
]
