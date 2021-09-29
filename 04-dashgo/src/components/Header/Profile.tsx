import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showUserNameAndEmail: boolean;
}

export function Profile({ showUserNameAndEmail }: ProfileProps) {
  return (
    <Flex align="center">
      {showUserNameAndEmail && (
        <Box mr="4" textAlign="right">
          <Text>Ana Figueira</Text>

          <Text color="gray.300" fontSize="small">
            anachfigueira@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Ana Figueira"
        src="https://avatars.githubusercontent.com/u/24214761?v=4"
      />
    </Flex>
  );
}
