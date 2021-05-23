import { Text, Container } from "@chakra-ui/react"

import LogoutButton from "src/components/LogoutButton"

const IndexPage = () => (
  <Container maxW="container.xl" p={4}>
    <Text>Public page</Text>
    <LogoutButton />
  </Container>
)

export default IndexPage
