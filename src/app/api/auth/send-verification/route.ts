import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createVerificationToken } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const verificationToken = await createVerificationToken(session.user.email);
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

    await sendEmail({
      to: session.user.email,
      subject: "Verify your email address",
      text: `Please verify your email by clicking this link: ${verificationUrl}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Email</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: Arial, sans-serif;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <tr>
                <td style="background-color: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center">
                        <img src="${
                          process.env.NEXT_PUBLIC_APP_URL
                        }/logo.png" alt="Logo" style="width: 150px; margin-bottom: 20px;">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h1 style="color: #1a1a1a; font-size: 24px; font-weight: 700; margin-bottom: 20px; text-align: center;">
                          Verify Your Email Address
                        </h1>
                        <p style="color: #4a5568; font-size: 16px; line-height: 24px; margin-bottom: 24px; text-align: center;">
                          Thank you for signing up! Please click the button below to verify your email address.
                        </p>
                        <div style="text-align: center; margin-bottom: 24px;">
                          <a href="${verificationUrl}" 
                             style="display: inline-block; background-color: #4f46e5; color: white; text-decoration: none; 
                                    padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                            Verify Email
                          </a>
                        </div>
                        <p style="color: #718096; font-size: 14px; line-height: 20px; margin-bottom: 12px; text-align: center;">
                          If you didn't create an account, you can safely ignore this email.
                        </p>
                        <p style="color: #718096; font-size: 14px; line-height: 20px; text-align: center;">
                          Button not working? Copy and paste this link into your browser:<br>
                          <a href="${verificationUrl}" style="color: #4f46e5; text-decoration: none; word-break: break-all;">
                            ${verificationUrl}
                          </a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; text-align: center;">
                  <p style="color: #718096; font-size: 12px; margin: 0;">
                    © ${new Date().getFullYear()} LatteLink. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { message: "Verification email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json(
      { message: "Error sending verification email" },
      { status: 500 }
    );
  }
}
