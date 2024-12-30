import * as jose from "jose";
import privateKey from "./private-key.json";
import publicKey from "./public-key.json";
import { SessionData } from "./session";

export async function generateMembershipToken(
  payload: SessionData,
): Promise<string> {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setExpirationTime("1m")
    .sign(privateKey);
}

export type MembershipTokenResult =
  | {
      success: true;
      data: SessionData;
    }
  | {
      success: false;
    };

export async function verifyMembershipToken(
  token: string,
): Promise<MembershipTokenResult> {
  try {
    const result = await jose.jwtVerify<SessionData>(
      token,
      await jose.importJWK(publicKey, "RS256"),
    );

    return {
      success: true,
      data: result.payload,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
