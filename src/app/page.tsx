// app/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = () => {
    // Aqui você faria a lógica real de login
    // e depois redirecionaria:
    router.push('/tools')
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Button onClick={handleLogin}>Login</Button>
    </div>
  )
}
