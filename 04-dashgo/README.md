# Módulo 4 - Dashgo

Using Next.js and Chakra UI, Dashgo was constructed to learn about authentication flow, form management with Reac, and declarative UI.

Before starting the project an important
step is to install dependencies:

```
yarn

//or

npm install
```

Open the Next.js app by running:

```
yarn dev
```

## :rocket: Technologies

This project was developed with the following teachnologies:

- [ReactJS](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)

## :pencil: Notes

### Declarative UI

Originated with Theme UI, declarative UI is a promising tool regarding styling components in an application.

The main difference between usual styling and declarative styling is that in declarative styling we can define a component style in its own JSX tag. To avoid making the code "dirty" with inline styles, the frameworks provide a lot of default components and encourages the development of small, modular and reusable components, which also improves the code maintainability.

Other popular declarative UI frameworks for React: Chakra UI and Tailwind CSS.

#### Configuring Chakra UI

To install Chakra UI in your Next.js project:

```
yarn add @chakra-ui/react @chakra-ui/core @emotion/react @emotion/styled framer-motion

//or

npm install @chakra-ui/react @chakra-ui/core @emotion/react @emotion/styled framer-motion
```

Then you need to configure your application theme:

```ts
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  //your theme here
});
```

At last, you'll have to wrap your main component with Chakra provider, passing the created theme as an attribute:

```tsx
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
```

#### Chakra UI unit system

1 unit in chakra === 1/4 rem === 4 px

To insert directly a value in pixels, use brackets:

```tsx
<Flex
  as="header"
  w="100%"
  maxWidth={1480}
  h="20"
  mx="auto"
  mt="4"
  px="6"
  align="center"
>
  {/*In this case max width is given in pixels*/}
</Flex>
```

#### Chakra responsive layout tools

- Array/Object of different measures based on screen size:

```tsx
<Box bg="red.200" w={[300, 400, 500]}>
  This is a box
</Box>
//or
<Box bg="red.200" w={{base: 300, sm: 400,  md: 500}}>
  This is a box
</Box>
```

- **useBreakpointValue** hook to use different values based on screen size:

```tsx
function Example() {
  const variant = useBreakpointValue({ base: "outline", md: "solid" });

  return (
    <VStack align="flex-start">
      <Text>Resize your window to see the button variant change</Text>
      <Button colorScheme="teal" variant={variant}>
        Button
      </Button>
    </VStack>
  );
}
```

- **useMediaQuery** hook to apply media queries:

```tsx
function Example() {
  const [isLargerThanHD, isDisplayingInBrowser] = useMediaQuery([
    "(min-width: 1920px)",
    "(display-mode: browser)",
  ]);

  function determineText() {
    if (isLargerThanHD) {
      return `high resolution you got there ${
        isDisplayingInBrowser ? "in your browser" : "on your screen"
      }`;
    }

    return isDisplayingInBrowser
      ? "rendering in a browser"
      : "rendering on something else, e.g. PWA";
  }

  return <Text>{determineText()}</Text>;
}
```

### Dealing with forms

There are two alternatives to deal with forms in React:

- **Controlled components**: uses a state for each input in the form.
- **Uncontrolled components**: access input info only when needed, it's not stored in state. For this method, it's recommended to use **useRef** hook, or a library focused on form processing, for example Formik, React Hook Form, Unform.
