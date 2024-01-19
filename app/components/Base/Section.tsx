import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
};

export function Section({ children }: SectionProps) {
  return <section id="{id}" className="my-12">{children}</section>;
}

