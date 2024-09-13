import { RedirectToSignIn } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export async function initialProfile() {
  const user = await currentUser()

  if (!user) {
    return RedirectToSignIn
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (profile) {
    return profile
  }

  const newProfile = await db.profile.create({
    data: {
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
      name: `${user.firstName} ${user.lastName}`,
      userId: user.id,
    },
  })

  return newProfile
}
