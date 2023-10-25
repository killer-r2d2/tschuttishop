import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <div className="container mx-auto ps-5 pe-5">{children}</div>;
}
