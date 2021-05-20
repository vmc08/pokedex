import {
  Flex, Box,
  IconButton,
} from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"

interface IBannerProps {
  closable?: boolean
}

const Banner: React.FC<IBannerProps> = ({ closable, children }) => (
  <Flex
    py={3}
    px={[3, 5, 5, 8]}
    justifyContent="space-between"
    alignItems={["flex-start", "center"]}
    bgGradient="linear(to-r, blue.500, purple.500)"
  >
    <Box
      display={["block", "flex"]}
      alignItems="center"
      justifyContent="center"
      width="full"
    >
      {children}
    </Box>
    {closable && (
      <IconButton
        ml={3}
        variant="ghost"
        color="white"
        aria-label="Close banner"
        icon={<CloseIcon />}
      />
    )}
  </Flex>
)

export default Banner
