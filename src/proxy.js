import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: [
    "/client/add-job",
    "/client/manage-gigs",
    "/freelancer/saved-gigs",
    "/freelancer/my-applications",
  ],
};
