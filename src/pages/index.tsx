import { FC } from "react"
import { GetServerSideProps } from "next"
import { Text, Container } from "@chakra-ui/react"
import { getSession } from "next-auth/client"
import { Session } from "next-auth"

import LogoutButton from "src/components/LogoutButton"

const IndexPage: FC<Session> = (props) => {
  console.log(props)
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
    props: { ...session },
  }
}

export default IndexPage
