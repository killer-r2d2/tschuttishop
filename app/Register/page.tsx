"use client";
import { Input } from "@nextui-org/react";
import { Section } from "../components/Base/Section";
import { Container } from "../components/Base/Container";

export default function Register() {
  return (
    <Section>
      <Container>
        <h1>register</h1>
        <form action="">
          <div className="my-2">
            <Input
              type="text"
              variant={"bordered"}
              label="Name"
              name="name"
            />
          </div>
          <div className="my-2">
            <Input
              type="text"
              variant={"bordered"}
              label="Vorname"
              name="vorname"
            />
          </div>
          <div className="my-2">
            <Input
              type="text"
              variant={"bordered"}
              label="Email"
              name="email"
            />
          </div>
          <div className="my-2">
            <Input
              type="password"
              variant={"bordered"}
              label="Passwort"
              name="password"
            />
          </div>
          <div className="my-2">
            <Input
              type="password"
              variant={"bordered"}
              label="Passwort wiederholen"
              name="password"
            />
            </div>
        </form>
      </Container>
    </Section>
  );
}
