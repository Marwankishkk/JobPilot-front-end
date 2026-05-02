"use client";

import { CurrentUserProvider } from "@/lib/current-user-context";

export default function Providers({ children }) {
  return <CurrentUserProvider>{children}</CurrentUserProvider>;
}
