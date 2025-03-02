import Link from 'next/link'
import { Instagram, InstagramLoading } from './Icons'

export function LoadingBar() {
  return (
    // arka planı duruma göre değiştirirsin eğer muted kısımı sorun yaratıyorsa
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 z-50 flex items-center justify-center h-full">
        <InstagramLoading className="relative h-14 w-14 animate-spin" />
      </div>
    </div>
  )
}
