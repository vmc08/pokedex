import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { NextComponentType, NextPageContext } from 'next'
import { Provider } from 'next-auth/client'

import LoginBanner from 'src/components/layout/LoginBanner'
import AuthGuard from "src/components/AuthGuard"
import { TPageConfig } from 'src/types/page'
import theme from 'theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const {
    showBanner = true,
    publicPage = false,
  } = Component as NextComponentType<NextPageContext, any, {}> & TPageConfig
  const { session, ...actualPageProps } = pageProps
  return (
    <Provider session={session}>
      <ChakraProvider theme={theme}>
        <AuthGuard publicPage={publicPage}>
          {showBanner && <LoginBanner />}
          <Component {...actualPageProps} />
        </AuthGuard>
      </ChakraProvider>
    </Provider>
  )
}

export default App
