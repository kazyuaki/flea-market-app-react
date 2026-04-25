import React from 'react'
import Header from './Header/Header'

type NormalLayoutProps = {
  children: React.ReactNode
  showMyPageHeader?: boolean
}

export const NormalLayout = ({ children, showMyPageHeader }: NormalLayoutProps) => {
  return (
    <div className="page">
      <Header showMyPage={showMyPageHeader} />
      <main className="container">{children}</main>
    </div>
  )
}