import React from 'react'

export default function PageHeader({children}) {
  return (
    <header className="tichet__check">
      <h2 className="ticket__check-title">{children || "Page title"}</h2>
    </header>
  )
}
