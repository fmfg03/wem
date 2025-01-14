// src/providers/AppProviders.tsx
import { ReactNode } from 'react'
import { CartProvider } from '../context/CartContext'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
}
