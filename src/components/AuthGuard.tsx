import { PropsWithChildren, useEffect } from "react"
import { Spinner, Flex } from "@chakra-ui/react"
import Router from "next/router"
import { useSession } from "next-auth/client"

import { TPageConfig } from "src/types/page"

const PageSpinner = () => (
  <Flex h="100vh" alignItems="center" justifyContent="center">
    <Spinner
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="lg"
    />
  </Flex>
)

const AuthGuard: React.FC<PropsWithChildren<Omit<TPageConfig, "showBanner">>> = ({ publicPage, children }) => {
  const [session, loading] = useSession()

  const handleRedirects = () => {
    if (!publicPage) {
      if (!session) Router.replace("/login")
    } else {
      if (session) Router.replace("/")
    }
  }

  useEffect(() => {
    if (!loading) handleRedirects()
  }, [loading])

  if (loading) return <PageSpinner />
  if (!publicPage && !session) return <PageSpinner />
  if (publicPage && session) return <PageSpinner />

  return <>
    {children}
  </>
}

export default AuthGuard
