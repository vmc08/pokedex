import { GetServerSideProps } from "next"
import { Text, Container } from "@chakra-ui/react"

import LogoutButton from "src/components/LogoutButton"
import { getSession } from "next-auth/client"

export default function IndexPage() {
  return (
    <Container maxW="container.xl" p={4}>
      <Text>Public page</Text>
      <LogoutButton />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  return {
    props: { session },
  }
}
