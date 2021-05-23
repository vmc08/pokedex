import { useState } from "react"
import Router from "next/router"
import { Button, IconButton, Stack, useToast } from "@chakra-ui/react"
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'next-auth/client'

import AppInput from 'src/components/form/AppInput'
import loginSchema from '../validations/loginSchema'

export type TLoginFormValues = {
  email: string;
  password: string;
}

const LoginForm = () => {
  const toast = useToast()
  const [showPw, setShowPw] = useState(false)

  const { control, register, handleSubmit } = useForm<TLoginFormValues>({
    resolver: yupResolver(loginSchema),
  })
  const { errors, isSubmitting } = useFormState({ control })

  const onSubmitAction = async (formData: TLoginFormValues) => {
    try {
      const result = await signIn("credentials", {
        ...formData,
        redirect: false,
        callbackUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
      })
      if (result?.ok && result.url) {
        Router.push(result.url)
      } else {
        toast({
          description: 'Invalid credentials.',
          status: 'error',
          position: 'top',
        })
      }
    } catch (e) {
      toast({
        description: 'An unknown error has occurred!',
        status: 'error',
        position: 'top',
      })
    }
  }

  return (
    <form onSubmitCapture={handleSubmit(onSubmitAction)}>
      <Stack spacing="4">
        <AppInput
          id="email"
          type="email"
          placeholder="Email"
          size="lg"
          leftIcon={<EmailIcon color="gray.300" />}
          isReadOnly={isSubmitting}
          error={errors.email?.message}
          {...register("email")}
        />
        <AppInput
          id="password"
          type={showPw ? "text" : "password"}
          placeholder="Password"
          size="lg"
          leftIcon={<LockIcon color="gray.300" />}
          rightElement={(
            <IconButton
              variant="ghost"
              aria-label={showPw ? "Hide password" : "Show password"}
              icon={showPw ? <ViewIcon /> : <ViewOffIcon />}
              onClick={() => setShowPw(prevState => !prevState)}
            />
          )}
          isReadOnly={isSubmitting}
          error={errors.password?.message}
          {...register("password")}
        />
        <Button
          isLoading={isSubmitting}
          loadingText="Authenticating"
          colorScheme="blue"
          size="lg"
          type="submit"
        >
          Login
        </Button>
      </Stack>
    </form>
  )
}

export default LoginForm
