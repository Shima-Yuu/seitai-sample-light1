'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

// 施術メニューの定義
const treatmentMenus = [
  { id: 'foot', label: 'フットホワイトニング' },
  { id: 'hand', label: 'ハンドホワイトニング' },
  { id: 'premium', label: 'プレミアムコース' },
  { id: 'special', label: 'スペシャルコース' },
]

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'お名前を入力してください',
    })
    .min(2, {
      message: 'お名前は2文字以上で入力してください',
    }),
  email: z.string().email({
    message: '有効なメールアドレスを入力してください',
  }),
  phone: z.string().regex(/^[0-9]{10,11}$/, {
    message: '有効な電話番号を入力してください（ハイフンなし）',
  }),
  subject: z.string({
    required_error: 'お問い合わせ内容を選択してください',
  }),
  // 施術メニューは配列で定義（選択がない場合も許容）
  treatmentMenus: z.array(z.string()).optional(),
  message: z.string().min(1, {
    message: 'メッセージを入力してください',
  }),
})

type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showTreatmentMenus, setShowTreatmentMenus] = useState(false)
  const { ref, isInView } = useScrollAnimation()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      treatmentMenus: [],
      message: '',
    },
  })

  // お問い合わせ内容が「施術のご予約」の場合、メニュー選択を表示
  const watchSubject = form.watch('subject')

  useEffect(() => {
    setShowTreatmentMenus(watchSubject === 'reservation')
  }, [watchSubject])

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      // Formspreeのエンドポイントにデータを送信
      const response = await fetch('https://formspree.io/f/xxxx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (data.ok) {
        toast.success('お問い合わせを受け付けました。担当者からご連絡いたします。')
        form.reset()
      } else {
        toast.error('送信に失敗しました。しばらく経ってからもう一度お試しください。')
      }
    } catch (error) {
      console.error('送信エラー:', error)
      toast.error('送信中にエラーが発生しました。後ほどもう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="section-title">
          <h2>ご予約・お問い合わせ</h2>
          <p>
            ご質問やご予約は、お電話または
            <br className="md:hidden" />
            こちらのフォームからお気軽にどうぞ
          </p>
          <div className="flex items-center justify-center mt-6 mb-6">
            <div className="bg-primary/10 rounded-full px-6 py-2 md:py-3 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a href="tel:0312345678" className="text-lg font-medium text-primary hover:underline">
                03-1234-5678
              </a>
            </div>
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      お名前 <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="山田 太郎" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        メールアドレス <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        電話番号 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="09012345678" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        ハイフンなしで入力してください
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      お問い合わせ内容 <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="お問い合わせ内容を選択してください"
                            className="text-[#9ca3af] opacity-70"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          className="hover:bg-primary-hover hover:text-white cursor-pointer"
                          value="reservation"
                        >
                          施術のご予約
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary-hover hover:text-white cursor-pointer"
                          value="question"
                        >
                          施術に関するご質問
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary-hover hover:text-white cursor-pointer"
                          value="price"
                        >
                          料金に関するお問い合わせ
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary-hover hover:text-white cursor-pointer"
                          value="other"
                        >
                          その他のお問い合わせ
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showTreatmentMenus && (
                <FormField
                  control={form.control}
                  name="treatmentMenus"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>
                          施術メニュー <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormDescription>ご希望の施術メニューをお選びください</FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {treatmentMenus.map(item => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="treatmentMenus"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={checked => {
                                        const currentValue = field.value || []
                                        return checked
                                          ? field.onChange([...currentValue, item.id])
                                          : field.onChange(
                                              currentValue.filter(value => value !== item.id)
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      メッセージ <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="ご質問やご要望をご記入ください"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? '送信中...' : '送信する'}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}
