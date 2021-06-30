<h2>Módulo 1 - GitHub Explorer</h2>

<p>Introduces basic concepts of ReactJS. Before starting the project an important 
step is to install dependencies:</p>

```
yarn

//or

npm install
```
<p>Open the React app by opening index.html from dist folder.</p>

## :rocket: Technologies

This project was developed with the following technologies:

-  [ReactJS](https://reactjs.org/)
-  [Babel](https://babeljs.io/)
-  [Webpack](https://webpack.js.org/)
-  [Sass](https://sass-lang.com/)

## :pencil: Notes

<ul>
  <li>
    Babel is a JavaScript compiler. In a nutshell: Babel converts modern 
    JS to JS that the browser can understand. Babel can be executed using:
    <br />
    <br />
    
    yarn babel src/index.jsx --out-file dist/bundle.js
  </li>
  <li>
    Webpack generate loaders for a lot of file types, like .sass, .png, .hbs,
    etc., so that the browser can understand them. Execute Webpack using the 
    following command lines:
    <br />
    <br />

    yarn webpack
  </li>
  <li>
    You can run a live server for Webpack, that way Webpack will always run 
    automatically when changes are detected in the project. To run the server 
    use the command line:
    <br />
    <br />

    yarn webpack serve
  </li>
  
  <li>
    <strong>React's state immutability</strong>
    <p>Immutability means that you can't change a variable's state. 
    Therefore, a new value is created in memory every time you need to update 
    that variable.</p> 
    <p>React uses that to make the reconciliation process easier.
    The reconciliation process compares the virtual DOM with a previous version
    to reflect state changes.That way, there's a better control over changes in
    your application.</p>    
  </li>

  <li>
    <strong>React hooks</strong>
    <ul>
      <li>
        <strong>useState</strong>: returns an array with the desired state and a method to create a new state.
      </li>
      <li>
        <strong>useEffect</strong>: triggers a callback when one of the dependencies in the array has changed. If there are no dependencies, the callback is called once as soon as the component renders.
      </li>
    </ul>  
  </li>
</ul>