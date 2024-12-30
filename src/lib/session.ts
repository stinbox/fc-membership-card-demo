import "server-only";
import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";

export type SessionData =
  | {
      id: string;
      name: string;
      membershipExpiry: string;
    }
  | {
      id: undefined;
      name: undefined;
      membershipExpiry: undefined;
    };

const COOKIE_NAME = "dummy-session";
const SESSION_PASSWORD = "dummy-password-12345678901234567890";

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();

  const session = await getIronSession<SessionData>(cookieStore, {
    cookieName: COOKIE_NAME,
    password: SESSION_PASSWORD,
  });

  return session;
}
