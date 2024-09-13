import UserHeading from "@/app/(auth)/(components)/UserHeading"
import GoToAddProductScreenButton from "@/components/GoToAddProductScreenButton"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { auth, currentUser } from "@clerk/nextjs/server"

export default async function Home() {
  const { userId } = auth()

  if (userId) {
    // Query DB for user specific information or display assets only to signed in users
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser()

  if (!user) {
    return <div>no user yet</div>
  }

  return (
    <div>
      <UserHeading />
      <div>
        <GoToAddProductScreenButton />
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  )
}
