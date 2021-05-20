import Link from 'next/link'
import { Text, Button, Box, Container } from "@chakra-ui/react"

import Banner from 'components/Banner'

export default function IndexPage() {
  return (
    <Box>
      <Banner closable>
        <Text color="white" fontSize="large">
          <b>Welcome to Pokepedia!</b> You are not logged in yet, signin and enjoy the full feature of the app.
        </Text>
        <Link href="/login">
          <Button
            flexShrink={0}
            color="blue.600"
            size="sm"
            fontSize="medium"
            cursor="pointer"
            mt={[3, 0]}
            ml={[0, 6]}
            width={["full", "auto"]}
          >
            Login
          </Button>
        </Link>
      </Banner>
      <Container maxW="container.xl" p={4}>
        <Text>Public page</Text>
      </Container>
    </Box>
  )
}
