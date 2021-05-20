import { useState } from "react"
import { Button, IconButton, Stack } from "@chakra-ui/react"
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import AppInput from 'src/components/form/AppInput'
import loginSchema from '../validations/loginSchema'

export type TLoginFormValues = {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPw, setShowPw] = useState(false)

  const { control, register, handleSubmit } = useForm<TLoginFormValues>({
    resolver: yupResolver(loginSchema),
  })
  const { errors } = useFormState({ control })

  const onSubmitAction = (formData: TLoginFormValues) => {
    console.log(formData)
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
          error={errors.email?.message}
          {...register("email")}
        />
        <AppInput
          id="password"
          type="password"
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
          error={errors.password?.message}
          {...register("password")}
        />
        <Button colorScheme="blue" size="lg" type="submit">Login</Button>
      </Stack>
    </form>
  )
}

export default LoginForm
