import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { NextComponentType, NextPageContext } from 'next'

import LoginBanner from 'src/components/layout/LoginBanner'
import { TPageConfig } from 'src/types/page'
import theme from 'theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { showBanner = true } = Component as NextComponentType<NextPageContext, any, {}> & TPageConfig
  return (
    <ChakraProvider theme={theme}>
      {showBanner && <LoginBanner />}
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
