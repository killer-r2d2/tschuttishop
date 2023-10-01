import { Form } from "../components/Form";
import { Products } from "../components/Product";
import { Section } from "../components/Base/Section";
import { Container } from "../components/Base/Container";

export default function Dashboard() {
  return (
    <Section>
      <Container>
        <Products />
        <Form />
      </Container>
    </Section>
  );
}
