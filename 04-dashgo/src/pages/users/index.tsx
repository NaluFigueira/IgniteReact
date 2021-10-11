import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Td,
  Tbody,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import Link from "next/link";

export default function UserList() {
  const isLargeResolution = useBreakpointValue({
    base: false,
    lg: true,
  });

  const editIconButtonMarginRight = useBreakpointValue({
    base: 0,
    lg: 2,
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Users
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Add user
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>User</Th>
                {isLargeResolution && <Th>Sign up date</Th>}
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Ana Figueira</Text>
                    <Text fontSize="sm" color="gray.300">
                      anachfigueira@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isLargeResolution && <Td>April 04</Td>}
                <Td>
                  <Button as="a" size="sm" fontSize="sm" colorScheme="purple">
                    <Icon
                      as={RiPencilLine}
                      fontSize="16"
                      mr={editIconButtonMarginRight}
                    />
                    {isLargeResolution ? "Edit" : ""}
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Ana Figueira</Text>
                    <Text fontSize="sm" color="gray.300">
                      anachfigueira@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isLargeResolution && <Td>April 04</Td>}
                <Td>
                  <Button as="a" size="sm" fontSize="sm" colorScheme="purple">
                    <Icon
                      as={RiPencilLine}
                      fontSize="16"
                      mr={editIconButtonMarginRight}
                    />
                    {isLargeResolution ? "Edit" : ""}
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Ana Figueira</Text>
                    <Text fontSize="sm" color="gray.300">
                      anachfigueira@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isLargeResolution && <Td>April 04</Td>}
                <Td>
                  <Button as="a" size="sm" fontSize="sm" colorScheme="purple">
                    <Icon
                      as={RiPencilLine}
                      fontSize="16"
                      mr={editIconButtonMarginRight}
                    />
                    {isLargeResolution ? "Edit" : ""}
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
