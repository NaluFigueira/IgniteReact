<h2>Módulo 2 - DT Money</h2>

<p>Introduces frameworks, tools and concepts from ReactJS that are common in 
day-to-day development in most companies. Also contains a lot of lessons about
good pratices in front-end and coding in general. 
</p> 
<p>Before starting the project an important 
step is to install dependencies:</p>

```
yarn

//or

npm install
```
<p>Open the React app by running:</p>

```
yarn start
```



## :rocket: Technologies

This project was developed with the following technologies:

-  [ReactJS](https://reactjs.org/)
-  [Typescript](https://www.typescriptlang.org/)
-  [create-react-app](https://create-react-app.dev/)
-  [styled-components](https://styled-components.com/)

## :pencil: Notes

<ul>
  <li>
    <p>
      To create your ReactJS project with   create-react-app, using Typescript, use the   following command:
    </p>
    <br />
    
    yarn create react-app 02-dtmoney --template typescript
  </li>
  <li>
    <p>
      When creating the project by using create-react-app all the configurations of webpack and babel are in the
      react-scripts library. The library also generates the following scripts:
    </p>
    <br />

    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    }
  </li>
  <li>
    <strong>Eject script</strong>
    <p>
      The purpose of the eject script is to eject the webpack and babel configurations from the react-scripts library folder, that way you can change them if you want. However, this action is irreversible (unless you're using version control) and you'll need to take care of updating each library manually.
    </p>
  </li>
  <li>
    <strong>styled-components</strong>
    <p>
      Library that allows creation of styled components in React. 
      The main advantage is that each styled component has a random class name, which means that the styling isn't shared globally across the project's components.
      Also, the library supports style nesting, use of props for each component and use of variables.
    </p>
  </li>
  <li>
    <strong>Font-size</strong>
    <ul>
      <li>The project is using 1rem = 16px as the standard font size.</li>
      <li>
        To be more responsive, the project avoids using pixel measures, 
        and prefers percentage or rem in size calculations.
      </li>
    </ul>
  </li>
</ul>