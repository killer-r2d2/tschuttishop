type ButtonProps = {
  text: string;
  type: "submit" | "button";
};

export function Button({ text, type }: ButtonProps) {
  return (
    <button
      type={type}
      className="bg-slate-900 p-2 text-slate-100 rounded-md hover:bg-slate-800 transition"
    >
      {text}
    </button>
  );
}
