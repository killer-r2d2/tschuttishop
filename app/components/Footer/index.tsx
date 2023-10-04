import { Container } from "../Base/Container";

export function Footer() {
  return (
    <footer>
      <Container>
        <div className="bg-slate-900 text-white p-5 border-x border-t border-slate-500 rounded-t-xl shadow mt-5 h-[30vh] ">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h1>Footer</h1>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
