import { KJUR } from "jsrsasign";

const SDK_KEY    = process.env.ZOOM_SDK_KEY!;
const SDK_SECRET = process.env.ZOOM_SDK_SECRET!;

export type ZoomRole = 0 | 1; // 0 = attendee (student), 1 = host (tutor)

/**
 * Generate a Zoom Video SDK JWT.
 * Must be called server-side only (secret never leaves server).
 */
export function generateZoomSignature(
  sessionName: string,
  role: ZoomRole,
  expiresInSeconds = 7200
): string {
  const iat = Math.floor(Date.now() / 1000) - 30;
  const exp = iat + expiresInSeconds;

  const header  = { alg: "HS256", typ: "JWT" };
  const payload = {
    app_key:      SDK_KEY,
    tpc:          sessionName,   // topic / session name
    role_type:    role,
    version:      1,
    iat,
    exp,
  };

  return KJUR.jws.JWS.sign(
    "HS256",
    JSON.stringify(header),
    JSON.stringify(payload),
    { utf8: SDK_SECRET }
  );
}

/**
 * Session name is deterministic per lesson so student + tutor join the same room.
 */
export function lessonSessionName(lessonId: string): string {
  return `eigo-lesson-${lessonId}`;
}
