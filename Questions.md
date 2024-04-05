## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.
The primary difference between Component and PureComponent lies in the way React performs a check for re-rendering. A regular Component will re-render whenever the parent component re-renders, even if the props and state remain unchanged. On the other hand, PureComponent performs a shallow comparison of the props and state, and only re-renders if there is a difference.
Using PureComponent can provide a performance boost by preventing unnecessary re-renders. However, it might break your app if you are mutating the state or props objects instead of creating new ones. For example:

this.state.data.push(newItem); // This will not trigger a re-render

Since the state object reference hasn't changed, PureComponent won't detect the update. To fix this, you should create a new object or use the spread operator:

this.setState({ data: [...this.state.data, newItem] });

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
Using shouldComponentUpdate with the Context API can be dangerous because shouldComponentUpdate is a React lifecycle method that is not aware of changes in the context. If a component is subscribed to the context and the context value changes, shouldComponentUpdate might prevent the component from re-rendering, leading to stale data being displayed.
To avoid this issue, you should either avoid using shouldComponentUpdate in components that consume context or use the static contextType property to access the context value and compare it in shouldComponentUpdate.

## 3. Describe 3 ways to pass information from a component to its PARENT.
1. Callbacks: The parent can pass a callback function as a prop to the child, and the child can call that function with the data it wants to pass back to the parent.

2. State Lifting: The parent can manage the state and pass it down to the child as props, along with a function to update the state. The child can then call this function with the new data.

3. Context API: The child can use the React Context API to update a context value that the parent is subscribed to.

## 4. Give 2 ways to prevent components from re-rendering.
1. Implement shouldComponentUpdate or use PureComponent to optimize rendering based on prop or state changes.

2. Memoization: Memoize expensive calculations or functions using libraries like memo or useMemo to avoid unnecessary re-execution.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.
A fragment is a special syntax in React that allows you to group a list of children without adding an extra node to the DOM. Fragments are useful when you need to return multiple elements from a component's render method, but you don't want to add an unnecessary wrapper element like a <div> or <span>.
Example of a fragment breaking an app:
If you have a component that returns a list of elements with a key prop, and you wrap that list in a fragment, React might not be able to uniquely identify each element, leading to rendering issues or bugs.

render() {
  return (
    <React.Fragment>
      {items.map(item => <Item key={item.id} {...item} />)}
    </React.Fragment>
  );
}

In this case, you should use the shorthand syntax <>...</> instead of <React.Fragment>...</React.Fragment>.

## 6. Give 3 examples of the HOC pattern.
1. Custom HOC for Adding Props
You can create custom HOCs to add additional props or functionality to a component. Here's an example of an HOC that adds a logProps prop to the wrapped component:

const withLogProps = (WrappedComponent) => {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Old props:', prevProps);
      console.log('New props:', this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;
      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => (
    <LogProps {...props} forwardedRef={ref} />
  ));
};

const CustomComponent = ({ logProps }) => {
  // Component logic
};

const LoggedComponent = withLogProps(CustomComponent);

export default LoggedComponent;

In this example, the withLogProps HOC wraps the CustomComponent and adds a logProps function that logs the previous and current props whenever the component updates. The React.forwardRef is used to pass the ref to the wrapped component.

2. React Router's withRouter HOC
The withRouter HOC from the react-router-dom library is used to inject the React Router props (history, location, match) into a component, even if it's not directly rendered by a Route component.

import { withRouter } from 'react-router-dom';

const CustomComponent = ({ history, location, match }) => {
  // Component logic using the router props
};

const RouterComponent = withRouter(CustomComponent);

export default RouterComponent;

3. React Redux's connect HOC
The connect HOC from the react-redux library is used to connect a React component to the Redux store. It provides the component with the necessary Redux store data as props and the functions to dispatch actions to the store.

import { connect } from 'react-redux';

const CustomComponent = ({ data, dispatchAction }) => {
  
};

const mapStateToProps = (state) => ({
  data: state.someData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAction: () => dispatch(someAction()),
});

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomComponent);

export default ConnectedComponent;

## 7. What's the difference in handling exceptions in promises, callbacks and async…await?
1. Promises: Use the `.catch()` method to handle exceptions thrown by a promise chain.
2. Callbacks: Pass an additional error-handling callback function as the first argument to the callback-based function.
3. async/await: Use a try/catch block to handle exceptions thrown by an async function or inside the await expression.
## 8. How many arguments does setState take and why is it async.
`setState` takes two arguments: an object that represents the state changes or a function that returns such an object, and an optional callback.
It's asynchronous because React batches state updates for performance reasons, so calling `setState` doesn't immediately mutate the state or trigger a re-render. Instead, React queues up state updates and performs them in batches.
## 9. List the steps needed to migrate a Class to Function Component.
Convert the class component to a function component.
Replace the state with React hooks (`useState`, `useEffect`, etc.).
Replace lifecycle methods with the appropriate hooks (`useEffect`, `useLayoutEffect`, etc.).
Convert class methods to regular functions or use the `useCallback` hook for performance optimization.
If using context, replace `static contextType` with the useContext hook.
If using refs, replace the `createRef` method with the `useRef` hook.
## 10.List a few ways styles can be used with components.
1. Inline styles: Passing an object with camelCased style properties as a prop to the component.
2. CSS stylesheets: Importing a regular CSS file and applying styles based on class names.
3. CSS modules: Importing a CSS module file that generates unique class names for each component.
4. CSS-in-JS libraries: Using libraries like styled-components or emotion to write CSS styles inside JavaScript files.
## 11.How to render an HTML string coming from the server.
To render an HTML string coming from the server, you can use the `dangerouslySetInnerHTML` prop. However, be careful as this can open up your application to cross-site scripting (XSS) attacks if the HTML string is not sanitized properly.

function MyComponent({ htmlString }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
}

It's recommended to sanitize the HTML string on the server-side before sending it to the client, or use a third-party library like dompurify to sanitize it on the client-side.