// import { NextRequest, NextResponse } from "next/server";
// import nodemailer, { type SendMailOptions } from "nodemailer";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface CareerFormPayload {
//     name: string;
//     email: string;
//     phone?: string;
//     position?: string;
//     linkedin?: string;
//     message?: string;
//     // resume is sent as a base64 string from the client
//     resumeBase64?: string;
//     resumeName?: string;
//     resumeType?: string;
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function buildApplicantEmail(data: CareerFormPayload): string {
//     return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>Application Received</title>
// </head>
// <body style="margin:0;padding:0;background:#f7f9fc;font-family:'Segoe UI',Arial,sans-serif;">
//   <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fc;padding:40px 0;">
//     <tr>
//       <td align="center">
//         <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
//           <!-- Header -->
//           <tr>
//             <td style="background:#0d2a4a;padding:32px 40px;border-left:6px solid #f5c518;">
//               <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">
//                 Fermionic Design
//               </h1>
//               <p style="margin:6px 0 0;color:#93c5fd;font-size:13px;">Careers Team</p>
//             </td>
//           </tr>
//           <!-- Body -->
//           <tr>
//             <td style="padding:36px 40px;">
//               <h2 style="margin:0 0 8px;color:#0d2a4a;font-size:20px;font-weight:700;">
//                 We received your application! 🎉
//               </h2>
//               <p style="margin:0 0 24px;color:#64748b;font-size:14px;line-height:1.7;">
//                 Hi <strong>${data.name}</strong>, thank you for applying to Fermionic Design. 
//                 We've received your application${data.position ? ` for the <strong>${data.position}</strong> role` : ""} 
//                 and our team will review it shortly. We'll be in touch within a few business days.
//               </p>
//               <div style="background:#f1f5f9;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
//                 <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#0d2a4a;text-transform:uppercase;letter-spacing:0.1em;">Your Submission Summary</p>
//                 <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
//                   ${data.position ? `<tr><td style="font-size:13px;color:#64748b;padding:4px 0;width:130px;">Position</td><td style="font-size:13px;color:#1e293b;font-weight:600;">${data.position}</td></tr>` : ""}
//                   <tr><td style="font-size:13px;color:#64748b;padding:4px 0;width:130px;">Email</td><td style="font-size:13px;color:#1e293b;font-weight:600;">${data.email}</td></tr>
//                   ${data.phone ? `<tr><td style="font-size:13px;color:#64748b;padding:4px 0;">Phone</td><td style="font-size:13px;color:#1e293b;font-weight:600;">${data.phone}</td></tr>` : ""}
//                   ${data.linkedin ? `<tr><td style="font-size:13px;color:#64748b;padding:4px 0;">LinkedIn</td><td style="font-size:13px;color:#1e293b;font-weight:600;">${data.linkedin}</td></tr>` : ""}
//                 </table>
//               </div>
//               <p style="margin:0;color:#64748b;font-size:13px;line-height:1.7;">
//                 In the meantime, feel free to reach us at 
//                 <a href="mailto:careers@fermionic.design" style="color:#1e6bb8;text-decoration:none;font-weight:600;">careers@fermionic.design</a>.
//               </p>
//             </td>
//           </tr>
//           <!-- Footer -->
//           <tr>
//             <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
//               <p style="margin:0;color:#94a3b8;font-size:12px;">
//                 © ${new Date().getFullYear()} Fermionic Design · Bengaluru, India
//               </p>
//             </td>
//           </tr>
//         </table>
//       </td>
//     </tr>
//   </table>
// </body>
// </html>
//   `.trim();
// }

// function buildInternalEmail(data: CareerFormPayload): string {
//     return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>New Career Application</title>
// </head>
// <body style="margin:0;padding:0;background:#f7f9fc;font-family:'Segoe UI',Arial,sans-serif;">
//   <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fc;padding:40px 0;">
//     <tr>
//       <td align="center">
//         <table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
//           <!-- Header -->
//           <tr>
//             <td style="background:#0d2a4a;padding:28px 40px;border-left:6px solid #f5c518;">
//               <p style="margin:0 0 4px;color:#f5c518;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;">New Application Received</p>
//               <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">${data.name}</h1>
//               ${data.position ? `<p style="margin:4px 0 0;color:#93c5fd;font-size:13px;">Applied for: <strong>${data.position}</strong></p>` : `<p style="margin:4px 0 0;color:#93c5fd;font-size:13px;">General Application</p>`}
//             </td>
//           </tr>
//           <!-- Details -->
//           <tr>
//             <td style="padding:32px 40px;">
//               <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
//                 ${(
//             [
//                 ["Full Name", data.name],
//                 ["Email", `<a href="mailto:${data.email}" style="color:#1e6bb8;text-decoration:none;">${data.email}</a>`],
//                 data.phone ? ["Phone", data.phone] : null,
//                 data.position ? ["Position", data.position] : null,
//                 data.linkedin ? ["LinkedIn", `<a href="${data.linkedin}" style="color:#1e6bb8;text-decoration:none;">${data.linkedin}</a>`] : null,
//                 data.resumeName ? ["Resume", `📎 ${data.resumeName} (attached)`] : null,
//             ] as (string[] | null)[]
//         )
//             .filter((row): row is string[] => row !== null)
//             .map(
//                 ([label, value]: string[]) => `
//                     <tr>
//                       <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;width:140px;vertical-align:top;">${label}</td>
//                       <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#1e293b;">${value}</td>
//                     </tr>`
//             )
//             .join("")}
//               </table>

//               ${data.message
//             ? `
//               <div style="margin-top:24px;">
//                 <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#0d2a4a;text-transform:uppercase;letter-spacing:0.1em;">Cover Message</p>
//                 <div style="background:#f8fafc;border-left:3px solid #f5c518;border-radius:4px;padding:16px 20px;color:#334155;font-size:14px;line-height:1.7;">
//                   ${data.message.replace(/\n/g, "<br/>")}
//                 </div>
//               </div>`
//             : ""
//         }

//               <div style="margin-top:28px;">
//                 <a
//                   href="mailto:${data.email}?subject=Re: Your Application at Fermionic Design"
//                   style="display:inline-block;background:#0d2a4a;color:#ffffff;text-decoration:none;font-weight:600;font-size:13px;padding:12px 24px;border-radius:100px;"
//                 >
//                   Reply to Applicant →
//                 </a>
//               </div>
//             </td>
//           </tr>
//           <!-- Footer -->
//           <tr>
//             <td style="background:#f8fafc;padding:16px 40px;border-top:1px solid #e2e8f0;">
//               <p style="margin:0;color:#94a3b8;font-size:12px;">
//                 Submitted on ${new Date().toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short", timeZone: "Asia/Kolkata" })} IST
//               </p>
//             </td>
//           </tr>
//         </table>
//       </td>
//     </tr>
//   </table>
// </body>
// </html>
//   `.trim();
// }

// // ─── Route Handler ─────────────────────────────────────────────────────────────

// export async function POST(req: NextRequest) {
//     try {
//         // ── 1. Parse body ──────────────────────────────────────────────────────────
//         const body: CareerFormPayload = await req.json();

//         const { name, email, phone, position, linkedin, message, resumeBase64, resumeName, resumeType } = body;

//         // ── 2. Basic validation ────────────────────────────────────────────────────
//         if (!name?.trim()) {
//             return NextResponse.json({ error: "Name is required." }, { status: 400 });
//         }
//         if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//             return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
//         }

//         // ── 3. Build transporter ───────────────────────────────────────────────────
//         const transporter = nodemailer.createTransport({
//             host: process.env.SMTP_HOST || "smtp.gmail.com",
//             port: parseInt(process.env.SMTP_PORT || "587"),
//             secure: process.env.SMTP_SECURE === "true", // true for port 465
//             auth: {
//                 user: process.env.SMTP_USER,
//                 pass: process.env.SMTP_PASS,
//             },
//         });

//         // ── 4. Build attachments ───────────────────────────────────────────────────
//         type Attachment = NonNullable<SendMailOptions["attachments"]>[number];
//         const attachments: Attachment[] = [];
//         if (resumeBase64 && resumeName) {
//             attachments.push({
//                 filename: resumeName,
//                 content: resumeBase64,
//                 encoding: "base64",
//                 contentType: resumeType || "application/octet-stream",
//             });
//         }

//         const recipientEmail = process.env.CAREERS_EMAIL || "careers@fermionic.design";
//         const senderAddress = process.env.SMTP_USER!;

//         // ── 5. Send internal notification email ───────────────────────────────────
//         await transporter.sendMail({
//             from: `"Fermionic Careers" <${senderAddress}>`,
//             to: recipientEmail,
//             replyTo: email,
//             subject: `New Application: ${position || "General"} — ${name}`,
//             html: buildInternalEmail({ name, email, phone, position, linkedin, message, resumeName }),
//             attachments,
//         });

//         // ── 6. Send confirmation email to applicant ────────────────────────────────
//         await transporter.sendMail({
//             from: `"Fermionic Design Careers" <${senderAddress}>`,
//             to: email,
//             subject: "We received your application — Fermionic Design",
//             html: buildApplicantEmail({ name, email, phone, position, linkedin, message }),
//         });

//         return NextResponse.json(
//             { success: true, message: "Application submitted successfully." },
//             { status: 200 }
//         );
//     } catch (err: unknown) {
//         console.error("[/api/career] Error:", err);
//         const message =
//             err instanceof Error ? err.message : "Unexpected server error.";
//         return NextResponse.json({ error: message }, { status: 500 });
//     }
// }

// // Disallow other methods
// export async function GET() {
//     return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
// }



import { NextRequest, NextResponse } from "next/server";
import nodemailer, { type SendMailOptions } from "nodemailer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CareerFormPayload {
    name: string;
    email: string;
    phone?: string;
    position?: string;
    linkedin?: string;
    message?: string;
    // resume is sent as a base64 string from the client
    resumeBase64?: string;
    resumeName?: string;
    resumeType?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildApplicantEmail(data: CareerFormPayload): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Application Received</title>
</head>
<body style="margin:0;padding:0;background:#f7f9fc;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fc;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#0d2a4a;padding:32px 40px;border-left:6px solid #f5c518;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">
                Fermionic Design
              </h1>
              <p style="margin:6px 0 0;color:#93c5fd;font-size:13px;">Careers Team</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <h2 style="margin:0 0 8px;color:#0d2a4a;font-size:20px;font-weight:700;">
                We received your application! 🎉
              </h2>
              <p style="margin:0 0 24px;color:#64748b;font-size:14px;line-height:1.7;">
                Hi <strong>${data.name}</strong>, thank you for applying to Fermionic Design. 
                We've received your application${data.position ? ` for the <strong>${data.position}</strong> role` : ""} 
                and our team will review it shortly. We'll be in touch within a few business days.
              </p>
              <div style="background:#f1f5f9;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#0d2a4a;text-transform:uppercase;letter-spacing:0.1em;">Your Submission Summary</p>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                  ${data.position ? `<tr><td style="font-size:13px;color:#64748b;padding:4px 0;width:130px;">Position</td><td style="font-size:13px;color:#1e293b;font-weight:600;">${data.position}</td></tr>` : ""}
                  <tr><td style="font-size:13px;color:#64748b;padding:4px 0;width:130px;">Email</td><td style="font-size:13px;color:#1e293b;font-weight:600;">${data.email}</td></tr>
                  ${data.phone ? `<tr><td style="font-size:13px;color:#64748b;padding:4px 0;">Phone</td><td style="font-size:13px;color:#1e293b;font-weight:600;">${data.phone}</td></tr>` : ""}
                  ${data.linkedin ? `<tr><td style="font-size:13px;color:#64748b;padding:4px 0;">LinkedIn</td><td style="font-size:13px;color:#1e293b;font-weight:600;">${data.linkedin}</td></tr>` : ""}
                </table>
              </div>
              <p style="margin:0;color:#64748b;font-size:13px;line-height:1.7;">
                In the meantime, feel free to reach us at 
                <a href="mailto:careers@fermionic.design" style="color:#1e6bb8;text-decoration:none;font-weight:600;">careers@fermionic.design</a>.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                © ${new Date().getFullYear()} Fermionic Design · Bengaluru, India
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function buildInternalEmail(data: CareerFormPayload): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Career Application</title>
</head>
<body style="margin:0;padding:0;background:#f7f9fc;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fc;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#0d2a4a;padding:28px 40px;border-left:6px solid #f5c518;">
              <p style="margin:0 0 4px;color:#f5c518;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;">New Application Received</p>
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">${data.name}</h1>
              ${data.position ? `<p style="margin:4px 0 0;color:#93c5fd;font-size:13px;">Applied for: <strong>${data.position}</strong></p>` : `<p style="margin:4px 0 0;color:#93c5fd;font-size:13px;">General Application</p>`}
            </td>
          </tr>
          <!-- Details -->
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${(
            [
                ["Full Name", data.name],
                ["Email", `<a href="mailto:${data.email}" style="color:#1e6bb8;text-decoration:none;">${data.email}</a>`],
                data.phone ? ["Phone", data.phone] : null,
                data.position ? ["Position", data.position] : null,
                data.linkedin ? ["LinkedIn", `<a href="${data.linkedin}" style="color:#1e6bb8;text-decoration:none;">${data.linkedin}</a>`] : null,
                data.resumeName ? ["Resume", `📎 ${data.resumeName} (attached)`] : null,
            ] as (string[] | null)[]
        )
            .filter((row): row is string[] => row !== null)
            .map(
                ([label, value]: string[]) => `
                    <tr>
                      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;width:140px;vertical-align:top;">${label}</td>
                      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#1e293b;">${value}</td>
                    </tr>`
            )
            .join("")}
              </table>

              ${data.message
            ? `
              <div style="margin-top:24px;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#0d2a4a;text-transform:uppercase;letter-spacing:0.1em;">Cover Message</p>
                <div style="background:#f8fafc;border-left:3px solid #f5c518;border-radius:4px;padding:16px 20px;color:#334155;font-size:14px;line-height:1.7;">
                  ${data.message.replace(/\n/g, "<br/>")}
                </div>
              </div>`
            : ""
        }

              <div style="margin-top:28px;">
                <a
                  href="mailto:${data.email}?subject=Re: Your Application at Fermionic Design"
                  style="display:inline-block;background:#0d2a4a;color:#ffffff;text-decoration:none;font-weight:600;font-size:13px;padding:12px 24px;border-radius:100px;"
                >
                  Reply to Applicant →
                </a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:16px 40px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                Submitted on ${new Date().toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short", timeZone: "Asia/Kolkata" })} IST
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─── Route Handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    try {
        // ── 1. Parse body ──────────────────────────────────────────────────────────
        const body: CareerFormPayload = await req.json();

        const { name, email, phone, position, linkedin, message, resumeBase64, resumeName, resumeType } = body;

        // ── 2. Basic validation ────────────────────────────────────────────────────
        if (!name?.trim()) {
            return NextResponse.json({ error: "Name is required." }, { status: 400 });
        }
        if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
        }

        // ── 3. Build transporter ───────────────────────────────────────────────────
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true", // true for port 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // ── 4. Build attachments ───────────────────────────────────────────────────
        type Attachment = NonNullable<SendMailOptions["attachments"]>[number];
        const attachments: Attachment[] = [];
        if (resumeBase64 && resumeName) {
            attachments.push({
                filename: resumeName,
                content: resumeBase64,
                encoding: "base64",
                contentType: resumeType || "application/octet-stream",
            });
        }

        const companyEmail = process.env.COMPANY_EMAIL || process.env.CAREERS_EMAIL || "careers@fermionic.design";
        const senderAddress = process.env.SMTP_USER!;

        // ── 5. Send internal notification email ───────────────────────────────────
        await transporter.sendMail({
            from: `"Fermionic Careers" <${senderAddress}>`,
            to: companyEmail,
            cc: senderAddress,
            replyTo: email,
            subject: `New Application: ${position || "General"} — ${name}`,
            html: buildInternalEmail({ name, email, phone, position, linkedin, message, resumeName }),
            attachments,
        });

        // ── 6. Send confirmation email to applicant ────────────────────────────────
        await transporter.sendMail({
            from: `"Fermionic Design Careers" <${senderAddress}>`,
            to: email,
            subject: "We received your application — Fermionic Design",
            html: buildApplicantEmail({ name, email, phone, position, linkedin, message }),
        });

        return NextResponse.json(
            { success: true, message: "Application submitted successfully." },
            { status: 200 }
        );
    } catch (err: unknown) {
        console.error("[/api/career] Error:", err);
        const message =
            err instanceof Error ? err.message : "Unexpected server error.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// Disallow other methods
export async function GET() {
    return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}