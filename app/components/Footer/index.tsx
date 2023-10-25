import { Container } from "../Base/Container";

export function Footer() {
  return (
    <footer>
      <div className="bg-slate-900 text-white p-5 border-x border-t border-slate-500 shadow mt-5 h-[30vh]">
        <Container>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h1>Footer</h1>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
