"use server";

import { generateMembershipToken } from "@/lib/membership-token";
import { getSession } from "@/lib/session";

export async function fetchMembershipToken() {
  const session = await getSession();
  if (!session.id) {
    throw new Error("Session not found");
  }

  return await generateMembershipToken(session);
}
