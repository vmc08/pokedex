import { Text, Button, Box, Input, Container } from "@chakra-ui/react"

import Banner from 'components/Banner'

export default function IndexPage() {
  return (
    <Box>
      <Banner closable>
        <Text color="white" fontSize="large">
          <b>Did you buy a license yet?</b> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.
        </Text>
        <Button
          flexShrink={0}
          color="blue.600"
          size="sm"
          fontSize="medium"
          cursor="pointer"
          mt={[3, 0]}
          ml={[0, 6]}
          width={["full", "auto"]}
          as="a"
          href="#"
        >
          Check it out
        </Button>
      </Banner>
      <Container maxW="container.xl">
        <Input placeholder="Search Pokemon" />
      </Container>
    </Box>
  )
}
