import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { NextComponentType, NextPageContext } from 'next'
import { Provider } from 'next-auth/client'

import LoginBanner from 'src/components/layout/LoginBanner'
import { TPageConfig } from 'src/types/page'
import theme from 'theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { showBanner = true } = Component as NextComponentType<NextPageContext, any, {}> & TPageConfig
  const { session, ...actualPageProps } = pageProps
  return (
    <Provider session={session}>
      <ChakraProvider theme={theme}>
        {showBanner && <LoginBanner />}
        <Component {...actualPageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default App
