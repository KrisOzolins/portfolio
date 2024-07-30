import { FunctionComponent, ReactNode } from 'react';

type Props = {
  // condition?: boolean;
  // wrapper: (_: ReactNode) => any;
  // children: ReactNode;

  condition: boolean;
  wrapper: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
  elseWrapper?: (children: JSX.Element) => JSX.Element;
};

const ConditionalWrapper: FunctionComponent<Props> = ({ condition, wrapper, children, elseWrapper = (children) => children }) => {
  return condition ? wrapper(children) : elseWrapper(children);
};

// const ConditionalWrapper: FunctionComponent<Props> = ({
//   condition,
//   wrapper,
//   children,
//   elseWrapper = (children) => children,
// }: {
//   condition: boolean;
//   wrapper: (children: JSX.Element) => JSX.Element;
//   children: JSX.Element;
//   elseWrapper?: (children: JSX.Element) => JSX.Element;
// }) => {
//   return condition ? wrapper(children) : elseWrapper(children);
// };

export default ConditionalWrapper;

// export const ConditionalWrapper: FunctionComponent<Props> = ({ condition, wrapper, children }) => {
//   return condition ? wrapper(children) : children;
// };
