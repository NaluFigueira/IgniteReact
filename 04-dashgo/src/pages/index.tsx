import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "../components/Form/Input";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail is required").email("Invalid e-mail"),
  password: yup.string().required("Password is required"),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            type="email"
            name="email"
            error={errors.email}
            label="E-mail"
            {...register("email")}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            error={errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          isLoading={formState.isSubmitting}
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
        >
          Sign in
        </Button>
      </Flex>
    </Flex>
  );
}
