import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex gap-2 text-slate-900 hover:text-slate-500 transition-colors"
    >
      <ArrowLeftIcon className="w-6" />
      Zurück
    </button>
  );
}
