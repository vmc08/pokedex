import { useState } from "react"
import {
  InputGroup, InputLeftElement, InputRightElement, Input,
  Button, IconButton,
  Container, Box, Stack,
} from "@chakra-ui/react"
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

export default () => {
  const [showPw, setShowPw] = useState(false)

  return (
    <Container maxW="container.xl" minH="100vh" d="flex" alignItems="center" justifyContent="center">
      <Box maxW="96" w="full">
        <Stack spacing="4">
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<EmailIcon color="gray.300" />}
            />
            <Input type="email" placeholder="Email" />
          </InputGroup>
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<LockIcon color="gray.300" />}
            />
            <Input type={showPw ? "text" : "password"} placeholder="Password" />
            <InputRightElement>
              <IconButton
                variant="ghost"
                aria-label={showPw ? "Hide password" : "Show password"}
                icon={showPw ? <ViewIcon /> : <ViewOffIcon />}
                onClick={() => setShowPw(prevState => !prevState)}
              />
            </InputRightElement>
          </InputGroup>
          <Button colorScheme="blue" size="lg">Login</Button>
        </Stack>
      </Box>
    </Container>
  )
}
