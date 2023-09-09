"use client"

import { ThemeProvider } from '@/components/theme-provider'

const LayoutWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      {children}
    </ThemeProvider>
  )
}

export default LayoutWrapper;
