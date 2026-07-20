import { authClient } from "@/lib/auth-client";

export const getClientJWTToken = async () => {
  const { data: tokenData } = await authClient.token();
  return tokenData?.token;
};
