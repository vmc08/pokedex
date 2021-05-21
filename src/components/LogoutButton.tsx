import { useRouter } from "next/router"
import { Button, useToast } from "@chakra-ui/react"
import { signOut, useSession } from "next-auth/client"

const LogoutButton = () => {
  const [session, loading] = useSession()
  const router = useRouter()
  const toast = useToast()

  if (loading || !session) return null

  return (
    <Button
      colorScheme="blue"
      onClick={async () => {
        try {
          const result = await signOut({
            redirect: false,
            callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/login`,
          })
          if (result && result.url) router.push(result.url)
        } catch (e) {
          toast({
            description: 'An unknown error has occurred!',
            status: 'error',
            position: 'top',
          })
        }
      }}
    >
      Logout
    </Button>
  )
}

export default LogoutButton
