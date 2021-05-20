import { ReactNode, FC, forwardRef } from "react"
import {
  InputGroup, InputLeftElement, InputRightElement, Input,
  FormControl, FormErrorMessage,
  InputProps
} from "@chakra-ui/react"

interface IAppInputProps extends InputProps {
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  error?: string;
}

const AppInput = forwardRef<HTMLInputElement, IAppInputProps>(({
  leftIcon, rightElement, error, size, ...inputProps
}, ref) => {
  return (
    <FormControl isInvalid={Boolean(error)}>
      <InputGroup size={size}>
        {leftIcon && (
          <InputLeftElement
            pointerEvents="none"
            children={leftIcon}
          />
        )}
        <Input {...inputProps} ref={ref} />
        {rightElement && (
          <InputRightElement>
            {rightElement}
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
})

export default AppInput
