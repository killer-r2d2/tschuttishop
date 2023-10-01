import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
};

export function Section({ children }: SectionProps) {
  return <section className="my-12 md:my-16 lg:my-24">{children}</section>;
}

