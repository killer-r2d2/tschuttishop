"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { EdgeStoreProvider } from "@/utils/edgestore/edgestore";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <EdgeStoreProvider>{children}</EdgeStoreProvider>
    </NextUIProvider>
  );
}
