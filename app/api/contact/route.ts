import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getCompanyEmailTemplate, getUserEmailTemplate } from './email-templates';

// Configure Nodemailer transporter with more robust settings
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST || 'smtp.hostinger.com',
//   port: parseInt(process.env.SMTP_PORT || '587'),
//   secure: true,
//   // auth: {
//   //   user: process.env.SMTP_USER,
//   //   pass: process.env.SMTP_PASS,
//   // },

//   auth: {
//     user: "sales@analog-chips.com",
//     pass: "SSRachips1@",
//   },

// });

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "sales@analog-chips.com",
    pass: "SSRachips1@",
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error(err);
  } else {
    console.log("SMTP Ready");
  }
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // console.log('📨 Contact form received:', {
    //   name: body.name,
    //   email: body.email,
    //   phone: body.phone,
    //   company: body.company,
    //   messageLength: body.message?.length || 0
    // });

    const { name, email, phone, company, message } = body;

    // Validation
    if (!name || !email || !message) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    const fromEmail = process.env.SMTP_USER;
    const companyEmail = process.env.COMPANY_EMAIL || 'sales@analog-chips.com';

    console.log('📧 Email Configuration:');
    console.log('From Email:', fromEmail);
    console.log('Company Email:', companyEmail);
    console.log('SMTP Host:', process.env.SMTP_HOST);
    console.log('SMTP Port:', process.env.SMTP_PORT);

    // Email to Company - SIMPLIFIED VERSION
    const companyHtml = getCompanyEmailTemplate({
      name,
      email,
      phone: phone || '',
      company: company || '',
      message,
      timestamp
    });

    const companyEmailOptions = {
      from: fromEmail, // Simplified from field
      to: fromEmail,
      subject: `New Contact Form Submission from ${name}`,
      html: companyHtml,
      replyTo: email,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nCompany: ${company || 'Not provided'}\nMessage: ${message}`,
    };

    // Auto-reply to User - SIMPLIFIED VERSION
    const userHtml = getUserEmailTemplate({ name });

    const userEmailOptions = {
      from: fromEmail, // Simplified from field
      to: email,
      subject: 'Thank you for contacting AnalogChips Technology',
      html: userHtml,
      text: `Dear ${name},\n\nThank you for contacting AnalogChips Technology. We have received your inquiry and our team will review it shortly.\n\nWe will get back to you within 24 business hours.\n\nBest regards,\nAnalogChips Technology Team`,
    };

    console.log('📤 Attempting to send emails...');

    // Try sending emails with detailed error logging
    let companyEmailSent = false;
    let userEmailSent = false;

    // Send company email
    try {
      console.log('📤 Sending company email to:', companyEmail);
      const companyResult = await transporter.sendMail(companyEmailOptions);
      console.log('✅ Company email sent:', companyResult.messageId);
      console.log('✅ Company email response:', companyResult.response);
      companyEmailSent = true;
    } catch (companyError: any) {
      console.error('❌ Company email failed:');
      console.error('Error code:', companyError.code);
      console.error('Error message:', companyError.message);
      console.error('Command:', companyError.command);
      console.error('Response:', companyError.response);
      console.error('Full error:', companyError);
    }

    // Send user email
    try {
      console.log('📤 Sending user email to:', email);
      const userResult = await transporter.sendMail(userEmailOptions);
      console.log('✅ User email sent:', userResult.messageId);
      console.log('✅ User email response:', userResult.response);
      userEmailSent = true;
    } catch (userError: any) {
      console.error('❌ User email failed:');
      console.error('Error code:', userError.code);
      console.error('Error message:', userError.message);
      console.error('Command:', userError.command);
      console.error('Response:', userError.response);
      console.error('Full error:', userError);
    }

    // Check results
    if (!companyEmailSent && !userEmailSent) {
      console.error('❌ Both emails failed to send');
      return NextResponse.json(
        { error: 'Failed to send emails. Please try again later.' },
        { status: 500 }
      );
    }

    if (!companyEmailSent && userEmailSent) {
      console.warn('⚠️ Company email failed, but user received auto-reply');
      return NextResponse.json({
        success: true,
        message: 'Thank you for your inquiry. We will get back to you soon!',
      });
    }

    console.log('✅ All emails sent successfully!');
    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry. We will get back to you soon!',
    });

  } catch (error: any) {
    console.error('❌ Contact form error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}