import React from 'react';

// todo: Implement a better example, using this one for now https://www.freecodecamp.org/news/higher-order-components-in-react.
const withLoading = (WrappedComponent) => {
  class WithLoading extends React.Component {
    state = {
      isLoading: true,
    };

    componentDidMount() {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
    }

    render() {
      return <WrappedComponent {...this.props} loading={this.state.isLoading} />;
    }
  }

  WithLoading.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithLoading;
};

export default withLoading;

// Usage:
// const MyComponent = ({ loading }) => <div>{loading ? <p>Loading...</p> : <p>Hello, world!</p>}</div>;
// const MyComponentWithLoading = withLoading(MyComponent);
