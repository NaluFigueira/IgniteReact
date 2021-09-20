import {
  Input as FormInput,
  InputProps as FormInputProps,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

interface InputProps extends FormInputProps {
  name: string;
  label?: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor="name">{label}</FormLabel>}

      <FormInput
        id={name}
        name={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{ bgColor: "gray.900" }}
        size="lg"
        {...rest}
      />
    </FormControl>
  );
}
