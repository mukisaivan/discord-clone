"use client"
import React from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

type Props = {}

export default function GoToAddProductScreenButton({}: Props) {
  const router = useRouter()

  function moveToAddProductScreen() {
    router.push("/product")
  }

  return (
    <div>
      <Button onClick={moveToAddProductScreen} />
    </div>
  )
}
