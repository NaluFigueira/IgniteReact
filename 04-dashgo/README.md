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
