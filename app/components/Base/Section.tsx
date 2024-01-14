import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
};

export function Section({ children }: SectionProps) {
  return <section id="{id}" className="my-12 md:my-16 lg:my-24">{children}</section>;
}

