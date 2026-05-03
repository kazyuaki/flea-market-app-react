import React from 'react'
import Header from './Header/Header'

type NormalLayoutProps = {
  children: React.ReactNode
  showMyPageHeader?: boolean
  mainClassName?: string
}

export const NormalLayout = ({
  children,
  showMyPageHeader,
  mainClassName = "",
}: NormalLayoutProps) => {
  return (
    <div className="page">
      <Header showMyPage={showMyPageHeader} />
      <main className={`container ${mainClassName}`}>{children}</main>
    </div>
  )
}
