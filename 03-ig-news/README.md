<h2>Módulo 3 - IG news</h2>

<p>Introduces Next.js and a common project architecture for Next.js projects that the front-end
shouldn't depend on the back-end to be developed. 
</p> 
<p>Before starting the project an important 
step is to install dependencies:</p>

```
yarn

//or

npm install
```

<p>Open the Next.js app by running:</p>

```
yarn dev
```

## :rocket: Technologies

This project was developed with the following technologies:

- [ReactJS](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Stripe](https://stripe.com/br)
- [next-auth](https://next-auth.js.org/)

## :pencil: Notes

<img src="./NextJS.png" alt="Diference between SPA and SSR when using Next.js">

<ul>
  <li>
    <strong>Advantages of using Next.js</strong>
    <p>
      The main advantage of using Next.js is SEO that enables the browsers to collect information about Reacts components without having Javascript enabled. Also, Next.js has built-in SASS
      support and file-system routing.
    </p>
  </li>
  <li>
    <strong>Creating Next.js app</strong>
    
      yarn create next-app ignews

  </li>
  <li>
    <strong>_app.tsx</strong>
    <p>The auto created component MyApp is a component that will always be around every component in the application. It works similarly to the route provider in the React Router Dom library.</p>
  </li>
  <li>
    <strong>document.tsx</strong>
    <p>This component will be rendered only once, at the start of the application. It works similarly to the index.html in the public folder of a create-react-app project.</p>
  </li>
  <li>
    <strong>Images in Next.js</strong>
    <p>Images in Next.js projects should be in an images folder inside public folder.</p>
  </li>
  <li>
    <strong>SSR API call</strong>
    <p>For more important API calls, specially the ones that contains important information for search engines, it's recommended to call the API in Next.js SSR. To do that, you need to add in your component a getServerSideProps function. That function will return to the component the api call info. <strong>The API calls inside the SSR require more processing, so be cautious to use it.</strong></p>
  </li>
  <li>
    <strong>SSG API call</strong>
    <p>Static Site Generation (SSG) allows Next.js to save a HTML copy of the rendered application after its first render. That way, the SSR won't be called again unnecessarily in a period of time. To do that you need to change the getServerSideProps function to getStaticProps, and add to your returned object the property "revalidate" the amount of time in minutes that the copy should be updated again.</p>
  </li>
  <li>
    <strong>Specifying which routes should use SSG</strong>
    <p>When using SSG, pages will be generated during it's first render. Therefore, if you have 1k+ pages available in your application, all those pages will be generated as soon as the application is opened by the user. It's a good practice to set which pages should be generated on first render, and which ones should be generated only when the user first access it. To do that you can use getStaticPaths, to specify which routes should be pre-rendered.</p>
    <p>The fallback key will determine what will be done with the routes that were not included. According to Next documentation:</p>
    <ul>
      <li>
        If 'false', then any paths not returned by getStaticPaths will result in a 404 page. You can do this if you have a small number of paths to pre-render - so they are all statically generated during build time. It’s also useful when the new pages are not added often. If you add more items to the data source and need to render the new pages, you’d need to run the build again.
      </li>
      <li>
        <p>
          If 'true', Next.js will serve a “fallback” version of the page on the first request to such a   path. In the background, Next.js will statically generate the requested path HTML and JSON.   This includes running getStaticProps. When that’s done, the browser receives the JSON for the   generated path. This will be used to automatically render the page with the required props.   From the user’s perspective, the page will be swapped from the fallback page to the full page.
        </p>
        <p>
          To verify if Next is showing the fallback page, use the router.isFallback flag. That way you can render a loading component to inform the user that the data is loading, when that is happening.
        </p>
        <p>
          fallback: true is useful if your app has a very large number of static pages that depend on data (think: a very large e-commerce site). You want to pre-render all product pages, but then your builds would take forever.
        </p>
        <p>
          Instead, you may statically generate a small subset of pages and use fallback: true for the rest. When          someone requests a page that’s not generated yet, the user will see the page with a loading indicator.          Shortly after, getStaticProps finishes and the page will be rendered with the requested data. From now        on, everyone who requests the same page will get the statically pre-rendered page.
        </p>
          This ensures that users always have a fast experience while preserving fast builds and the benefits of Static Generation.
        </p>
      </li>
      <li>
        <p>
          If 'blocking', Next.js will SSR on the first request and return the generated HTML. When that’s done, the browser receives the HTML for the generated path. From the user’s perspective, it will transition from "the browser is requesting the page" to "the full page is loaded". There is no flash of loading/fallback state.
        </p>
        <p>
          Its important to understand the SEO impact of true vs 'blocking'. If a crawler does not support JavaScript, it would see only the "loading" page with true, instead of the full correct page with blocking. Therefore SEO-wise 'blocking' is better, however, considering user experience, 'true' is better, since it informs the user that the page is loading.
        </p>
      </li>
    </ul>
  </li>
</ul>

```typescript
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          //here I'm passing which post preview should be pre-rendered
          slug: "como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal",
        },
      },
    ],
    fallback: "blocking",
  };
};
```

<ul>
  <li>
    <strong>API folder</strong>
    <p>Every file in pages/api folder becomes an api route. Since it's inside the server layer of Next.js, these routes are not reachable by the client, maintaining it's data safe.</p>
  </li>
  <li>
    <strong>Run Stripe cli</strong>
    
    stripe listen --forward-to localhost:3000/api/webhooks

  </li>
  <li>
    <strong>CMS (Content Management System)</strong>
    <ul>
      <li>
        Not Headless
        <ul>
          <li> Wordpress (has free plans) </li>
        </ul>
      </li>
      <li>
        Headless (Dashboard + HTTP API, GraphQL, SDK)
        <ul>
          <li>Strapi (small projects only)</li>
          <li>Keystone (small projects only)</li>
          <li>Ghost (blog)</li>
          <li>GraphCMS (payed, smaller projects)</li>
          <li>Prismic CMS (payed, smaller projects)</li>
          <li>Contentful (payed, big projects)</li>
          <li>Shopify (e-commerce)</li>
          <li>Saleor (e-commerce)</li>
        </ul>
      </li>
    </ul>

  </li>
</ul>
