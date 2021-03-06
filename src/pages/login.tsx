import { FC } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import { Container, Box } from "@chakra-ui/react";

import LoginForm from "src/modules/login/forms/LoginForm";
import { TPageConfig } from "src/types/page";

const LoginPage: FC & TPageConfig = () => {
  return (
    <Container
      maxW="container.xl"
      minH="100vh"
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box maxW="96" w="full">
        <LoginForm />
      </Box>
    </Container>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}

LoginPage.showBanner = false;
LoginPage.isPublicPage = true;

export default LoginPage;
