"use client"

import * as React from "react"

export type ToastProps = {
  id?: string
  title: string
  description?: string
  onClose?: () => void
}

export function Toast({ title, description, onClose }: ToastProps) {
  return (
    <div className="bg-white shadow-md rounded-md p-3 text-black relative">
      <strong>{title}</strong>
      {description && <p>{description}</p>}
      <button
        onClick={onClose}
        className="absolute top-1 right-2 text-gray-600 hover:text-black"
      >
        ✖
      </button>
    </div>
  )
}
