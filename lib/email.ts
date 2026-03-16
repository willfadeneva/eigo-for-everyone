import { Resend } from "resend";

// Lazy init — avoids "Missing API key" crash during Next.js static page collection
let _resend: Resend | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY!);
  return _resend;
}
const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@eigo-for-everyone.vercel.app";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingConfirmationData {
  to: string;
  studentName: string;
  tutorName: string;
  lessonDate: string;   // "2026-03-20 at 14:00 JST"
  durationMins: number;
  price: string;        // "¥3,500"
  zoomJoinUrl?: string;
}

interface LessonReminderData {
  to: string;
  studentName: string;
  tutorName: string;
  lessonDate: string;
  zoomJoinUrl?: string;
}

interface WelcomeData {
  to: string;
  name: string;
  role: "STUDENT" | "TUTOR";
}

interface TutorApprovedData {
  to: string;
  tutorName: string;
}

// ─── Email Senders ────────────────────────────────────────────────────────────

export async function sendBookingConfirmation(data: BookingConfirmationData) {
  return getResend().emails.send({
    from: FROM,
    to: data.to,
    subject: `✅ Lesson booked with ${data.tutorName} | Eigo for Everyone`,
    html: bookingConfirmationHtml(data),
  });
}

export async function sendLessonReminder(data: LessonReminderData) {
  return getResend().emails.send({
    from: FROM,
    to: data.to,
    subject: `⏰ Lesson reminder: ${data.lessonDate} | Eigo for Everyone`,
    html: lessonReminderHtml(data),
  });
}

export async function sendWelcomeEmail(data: WelcomeData) {
  return getResend().emails.send({
    from: FROM,
    to: data.to,
    subject: `🎉 Welcome to Eigo for Everyone, ${data.name}!`,
    html: welcomeHtml(data),
  });
}

export async function sendTutorApprovedEmail(data: TutorApprovedData) {
  return getResend().emails.send({
    from: FROM,
    to: data.to,
    subject: `🎊 You're approved as an Eigo tutor!`,
    html: tutorApprovedHtml(data),
  });
}

// ─── HTML Templates ───────────────────────────────────────────────────────────

const baseStyle = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 600px; margin: 0 auto; color: #1a1a2e;
`;

function bookingConfirmationHtml(d: BookingConfirmationData) {
  return `
    <div style="${baseStyle}">
      <div style="background:#3730a3;padding:24px;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:24px;">英語 Eigo for Everyone</h1>
      </div>
      <div style="background:#fff;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;">
        <h2 style="color:#3730a3;">Lesson Confirmed! ✅</h2>
        <p>Hi ${d.studentName},</p>
        <p>Your lesson with <strong>${d.tutorName}</strong> is confirmed.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:8px;color:#64748b;">📅 Date &amp; Time</td><td style="padding:8px;font-weight:600;">${d.lessonDate}</td></tr>
          <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">⏱ Duration</td><td style="padding:8px;font-weight:600;">${d.durationMins} minutes</td></tr>
          <tr><td style="padding:8px;color:#64748b;">💴 Price</td><td style="padding:8px;font-weight:600;">${d.price}</td></tr>
        </table>
        ${d.zoomJoinUrl ? `
        <a href="${d.zoomJoinUrl}" style="display:inline-block;background:#3730a3;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin:8px 0;">
          Join Zoom Lesson
        </a>` : `<p style="color:#64748b;">Zoom link will be sent before your lesson.</p>`}
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
        <p style="color:#64748b;font-size:14px;">Questions? Reply to this email or visit your dashboard.</p>
      </div>
    </div>`;
}

function lessonReminderHtml(d: LessonReminderData) {
  return `
    <div style="${baseStyle}">
      <div style="background:#3730a3;padding:24px;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:24px;">英語 Eigo for Everyone</h1>
      </div>
      <div style="background:#fff;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;">
        <h2 style="color:#3730a3;">⏰ Lesson Reminder</h2>
        <p>Hi ${d.studentName},</p>
        <p>Your lesson with <strong>${d.tutorName}</strong> is coming up on <strong>${d.lessonDate}</strong>.</p>
        ${d.zoomJoinUrl ? `
        <a href="${d.zoomJoinUrl}" style="display:inline-block;background:#3730a3;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin:8px 0;">
          Join Zoom Lesson
        </a>` : ""}
        <p style="color:#64748b;font-size:14px;margin-top:24px;">頑張ってください！ Good luck!</p>
      </div>
    </div>`;
}

function welcomeHtml(d: WelcomeData) {
  const isStudent = d.role === "STUDENT";
  return `
    <div style="${baseStyle}">
      <div style="background:#3730a3;padding:24px;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:24px;">英語 Eigo for Everyone</h1>
      </div>
      <div style="background:#fff;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;">
        <h2 style="color:#3730a3;">ようこそ！ Welcome, ${d.name}! 🎉</h2>
        ${isStudent
          ? `<p>You're now ready to find your perfect English tutor. Browse hundreds of verified tutors and book your first lesson today!</p>
             <a href="${process.env.NEXT_PUBLIC_APP_URL}/tutors" style="display:inline-block;background:#3730a3;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;">Find a Tutor</a>`
          : `<p>Your tutor application has been received. Our team will review your profile and get back to you within 2 business days.</p>
             <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/tutor" style="display:inline-block;background:#3730a3;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;">Set Up Your Profile</a>`
        }
        <p style="color:#64748b;font-size:14px;margin-top:24px;">— The Eigo for Everyone team</p>
      </div>
    </div>`;
}

function tutorApprovedHtml(d: TutorApprovedData) {
  return `
    <div style="${baseStyle}">
      <div style="background:#3730a3;padding:24px;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:24px;">英語 Eigo for Everyone</h1>
      </div>
      <div style="background:#fff;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;">
        <h2 style="color:#3730a3;">🎊 You're approved, ${d.tutorName}!</h2>
        <p>Your tutor profile is now live on Eigo for Everyone. Students can find and book you.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/tutor" style="display:inline-block;background:#3730a3;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;">Go to your dashboard</a>
        <p style="color:#64748b;font-size:14px;margin-top:24px;">Set your availability and rates to start receiving bookings!</p>
      </div>
    </div>`;
}
