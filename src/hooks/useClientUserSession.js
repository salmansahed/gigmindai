"use client";

import { authClient } from "@/lib/auth-client";

export const useClientUserSession = () => {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  return {
    session,
    isPending,
    error,
    refetch,
    user: session?.user,
  };
};
