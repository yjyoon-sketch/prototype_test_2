"use client";

import * as Core from "@teamsparta/stack-core";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Core.StackProvider>{children}</Core.StackProvider>;
}
