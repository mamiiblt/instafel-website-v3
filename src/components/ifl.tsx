import Link from 'next/link'

export function LoadingBar() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-full">
      <div className="relative h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}
