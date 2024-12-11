interface ContainerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Container({ children, className }: ContainerProps) {
  return <div className={`container mx-auto px-4 lg:px-8 ${className}`}>{children}</div>;
}

export default Container;
