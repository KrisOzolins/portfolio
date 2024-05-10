const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
  elseWrapper = (children) => children,
}: {
  condition: boolean;
  wrapper: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
  elseWrapper?: (children: JSX.Element) => JSX.Element;
}) => {
  return condition ? wrapper(children) : elseWrapper(children);
};

export default ConditionalWrapper;
