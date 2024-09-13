import React from "react"
import AddProductForm from "./AddProductForm"

type Props = {}

export default function Page({}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Add a New Product
        </h1>
        <AddProductForm />
      </div>
    </div>
  )
}
