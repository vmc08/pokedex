import { PropsWithChildren, useEffect } from "react";
import { Spinner, Flex } from "@chakra-ui/react";
import Router from "next/router";
import { useSession } from "next-auth/client";

import { TPageConfig } from "src/types/page";

const PageSpinner = () => (
  <Flex h="100vh" alignItems="center" justifyContent="center">
    <Spinner speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />
  </Flex>
);

const AuthGuard: React.FC<PropsWithChildren<Omit<TPageConfig, "showBanner">>> =
  ({ isPublicPage: publicPage, children }) => {
    const [session, loading] = useSession();

    useEffect(() => {
      if (!publicPage && !session && !loading) {
        void Router.replace({
          pathname: "/login",
          query: {
            callbackUrl: Router.asPath,
          },
        });
      }
    }, [loading]);

    if (
      loading || // while retrieving session
      (!publicPage && !session) // page requires auth and no session, wait useEffect to redirect
    ) {
      return <PageSpinner />;
    }

    return <>{children}</>;
  };

export default AuthGuard;
