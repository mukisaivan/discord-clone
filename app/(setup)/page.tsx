import { initialProfile } from "@/lib/initial-profile"
import React from "react"

export default async function SetUpPage() {
  const profile = await initialProfile()

  return <div>Create a server</div>
}
