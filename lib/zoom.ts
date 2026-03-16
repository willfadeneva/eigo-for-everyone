// Zoom Video SDK utilities — server-side only (JWT signing)
import { KJUR } from "jsrsasign";

export type ZoomRole = 0 | 1; // 0 = attendee (student), 1 = host (tutor)

/**
 * Generate a Zoom Video SDK JWT.
 * Must be called server-side only — SDK_SECRET never leaves server.
 */
export function generateZoomSignature(
  sessionName: string,
  role: ZoomRole,
  expiresInSeconds = 7200
): string {
  const sdkKey = process.env.ZOOM_SDK_KEY!;
  const sdkSecret = process.env.ZOOM_SDK_SECRET!;

  const iat = Math.floor(Date.now() / 1000) - 30;
  const exp = iat + expiresInSeconds;

  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    app_key: sdkKey,
    tpc: sessionName,
    role_type: role,
    version: 1,
    iat,
    exp,
  };

  return KJUR.jws.JWS.sign(
    "HS256",
    JSON.stringify(header),
    JSON.stringify(payload),
    { utf8: sdkSecret }
  );
}

/**
 * Deterministic session name per lesson — student and tutor join the same room.
 */
export function lessonSessionName(lessonId: string): string {
  return `eigo-lesson-${lessonId}`;
}
