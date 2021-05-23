import { FC } from "react"
import { Container, Box } from "@chakra-ui/react"

import LoginForm from 'src/modules/login/forms/LoginForm'
import { TPageConfig } from 'src/types/page'

const LoginPage: FC & TPageConfig = () => {
  return (
    <Container maxW="container.xl" minH="100vh" d="flex" alignItems="center" justifyContent="center">
      <Box maxW="96" w="full">
        <LoginForm />
      </Box>
    </Container>
  )
}

LoginPage.showBanner = false
LoginPage.publicPage = true

export default LoginPage
