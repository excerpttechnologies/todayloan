// Email HTML template for the company (you receive this)
export const getCompanyEmailTemplate = (data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  timestamp: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background-color: #f0f2f5;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .header {
      background: linear-gradient(135deg, #0d2a4a, #1e6bb8);
      padding: 30px 24px;
      text-align: center;
      position: relative;
    }
    .header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #f5c518, #f5c518, #f5c518);
    }
    .logo {
      max-width: 160px;
      height: auto;
      background: white;
      border-radius: 8px;
      padding: 8px 16px;
      display: inline-block;
    }
    .header h1 {
      color: #ffffff;
      margin: 12px 0 4px;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header p {
      color: rgba(255,255,255,0.8);
      margin: 0;
      font-size: 13px;
    }
    .content {
      padding: 30px 28px;
    }
    .alert-badge {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 24px;
    }
    .alert-badge span {
      color: #92400e;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section {
      margin-bottom: 18px;
      padding-bottom: 18px;
      border-bottom: 1px solid #f1f5f9;
    }
    .section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #94a3b8;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .label-icon {
      font-size: 14px;
    }
    .value {
      font-size: 15px;
      font-weight: 500;
      color: #0f172a;
      word-break: break-word;
      padding-left: 22px;
    }
    .value a {
      color: #1e6bb8;
      text-decoration: none;
      font-weight: 600;
    }
    .value a:hover {
      text-decoration: underline;
    }
    .message-box {
      background: #f8fafc;
      border-radius: 8px;
      padding: 16px 20px;
      margin-top: 4px;
      border: 1px solid #e2e8f0;
      margin-left: 22px;
    }
    .message-box .value {
      padding: 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.7;
      white-space: pre-wrap;
    }
    .badge {
      display: inline-block;
      background: #10b981;
      color: white;
      font-size: 10px;
      padding: 2px 10px;
      border-radius: 12px;
      font-weight: 600;
      margin-left: 8px;
      vertical-align: middle;
    }
    .action-buttons {
      display: flex;
      gap: 10px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      text-align: center;
      transition: all 0.2s;
    }
    .btn-primary {
      background: #0d2a4a;
      color: white;
    }
    .btn-primary:hover {
      background: #1e6bb8;
    }
    .btn-secondary {
      background: #f1f5f9;
      color: #1e293b;
      border: 1px solid #e2e8f0;
    }
    .btn-secondary:hover {
      background: #e2e8f0;
    }
    .footer {
      background: #f8fafc;
      padding: 20px 24px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
    }
    .footer p {
      margin: 2px 0;
    }
    @media (max-width: 480px) {
      .content {
        padding: 20px 16px;
      }
      .action-buttons {
        flex-direction: column;
      }
      .value {
        padding-left: 0;
      }
      .message-box {
        margin-left: 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img 
        src="https://res.cloudinary.com/dxzluoydo/image/upload/v1782479076/act-final2_vahnwr.png" 
        alt="AnalogChips Technology" 
        class="logo"
      />
      <h1>New Contact Form Submission</h1>
      <p>AnalogChips Technology</p>
    </div>
    
    <div class="content">
      <div class="alert-badge">
        <span>🔔 ACTION REQUIRED — New Inquiry Received</span>
      </div>
      
      <div class="section">
        <div class="label">
          <span class="label-icon">📅</span> TIMESTAMP
        </div>
        <div class="value">${data.timestamp}</div>
      </div>
      
      <div class="section">
        <div class="label">
          <span class="label-icon">👤</span> FULL NAME
        </div>
        <div class="value">${data.name}</div>
      </div>
      
      <div class="section">
        <div class="label">
          <span class="label-icon">✉️</span> EMAIL ADDRESS
        </div>
        <div class="value">
          <a href="mailto:${data.email}">${data.email}</a>
          <span class="badge">Reply Directly</span>
        </div>
      </div>
      
      ${data.phone ? `
      <div class="section">
        <div class="label">
          <span class="label-icon">📞</span> PHONE NUMBER
        </div>
        <div class="value">
          <a href="tel:${data.phone}">${data.phone}</a>
        </div>
      </div>
      ` : ''}
      
      ${data.company ? `
      <div class="section">
        <div class="label">
          <span class="label-icon">🏢</span> COMPANY
        </div>
        <div class="value">${data.company}</div>
      </div>
      ` : ''}
      
      <div class="section">
        <div class="label">
          <span class="label-icon">💬</span> MESSAGE
        </div>
        <div class="message-box">
          <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
        </div>
      </div>
      
      <div class="action-buttons">
        <a href="mailto:${data.email}?subject=Response to your inquiry about AnalogChips products" class="btn btn-primary">
          📧 Reply to ${data.name.split(' ')[0]}
        </a>
        ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-secondary">📞 Call</a>` : ''}
      </div>
    </div>
    
    <div class="footer">
      <p>This is an automated message from AnalogChips Technology website contact form.</p>
      <p>© ${new Date().getFullYear()} AnalogChips Technology Pvt Ltd. All rights reserved.</p>
      <p>Bengaluru, India</p>
    </div>
  </div>
</body>
</html>
`;

// Email HTML template for the user (auto-reply thank you)
export const getUserEmailTemplate = (data: {
  name: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting AnalogChips</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background-color: #f0f2f5;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .header {
      background: linear-gradient(135deg, #0d2a4a, #1e6bb8);
      padding: 40px 24px 30px;
      text-align: center;
      position: relative;
    }
    .header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #f5c518, #f5c518, #f5c518);
    }
    .logo {
      max-width: 160px;
      height: auto;
      background: white;
      border-radius: 8px;
      padding: 8px 16px;
      display: inline-block;
    }
    .header .checkmark {
      font-size: 48px;
      display: block;
      margin: 8px 0 4px;
    }
    .header h1 {
      color: #ffffff;
      margin: 8px 0 4px;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header p {
      color: rgba(255,255,255,0.85);
      margin: 0;
      font-size: 14px;
    }
    .content {
      padding: 30px 28px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 12px;
    }
    .message {
      color: #475569;
      margin-bottom: 16px;
      font-size: 15px;
      line-height: 1.7;
    }
    .thank-you-box {
      background: #f0fdf4;
      border-radius: 8px;
      padding: 16px 20px;
      margin: 16px 0;
      border-left: 4px solid #22c55e;
    }
    .thank-you-box p {
      color: #166534;
      font-size: 14px;
      margin: 0;
    }
    .next-steps {
      margin: 20px 0 16px;
    }
    .next-steps h3 {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 10px;
    }
    .step {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
      font-size: 14px;
      color: #1e293b;
    }
    .step:last-child {
      margin-bottom: 0;
    }
    .step-number {
      width: 26px;
      height: 26px;
      background: #0d2a4a;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      flex-shrink: 0;
      padding:7px;
      margin:2px;
    }
    .contact-info {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
    }
    .contact-info p {
      font-size: 13px;
      color: #64748b;
      margin-bottom: 8px;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
      color: #475569;
      font-size: 13px;
    }
    .contact-item:last-child {
      margin-bottom: 0;
    }
    .contact-item a {
      color: #1e6bb8;
      text-decoration: none;
    }
    .contact-item a:hover {
      text-decoration: underline;
    }
    .contact-icon {
      font-size: 14px;
      width: 22px;
      text-align: center;
    }
    .footer {
      background: #f8fafc;
      padding: 20px 24px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
    }
    .footer p {
      margin: 2px 0;
    }
    .footer .note {
      font-size: 11px;
      color: #cbd5e1;
      margin-top: 6px;
    }
    @media (max-width: 480px) {
      .content {
        padding: 20px 16px;
      }
      .step {
        font-size: 13px;
      }
      .header h1 {
        font-size: 22px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img 
        src="https://res.cloudinary.com/dxzluoydo/image/upload/v1782479076/act-final2_vahnwr.png" 
        alt="AnalogChips Technology" 
        class="logo"
      />
    
      <h1>Thank You!</h1>
      <p>We've received your inquiry</p>
    </div>
    
    <div class="content">
      <div class="greeting">Dear ${data.name},</div>
      
      <div class="message">
        Thank you for reaching out to <strong>AnalogChips Technology</strong>. We appreciate your interest in our semiconductor and power management solutions.
      </div>
      
      <div class="thank-you-box">
        <p>✅ Your message has been received successfully. Our team will review your inquiry and get back to you shortly.</p>
      </div>
      
      <div class="next-steps">
        <h3>📋 What happens next?</h3>
        <div class="step">
          <span class="step-number">1</span>
          <span>Our team reviews your inquiry</span>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <span>We respond within <strong>24 business hours</strong></span>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <span>We discuss your specific requirements</span>
        </div>
      </div>
      
      <div class="message">
        In the meantime, feel free to explore our product portfolio on our website.
      </div>
      
      <div class="contact-info">
        <p>📬 <strong>Need immediate assistance?</strong></p>
        <div class="contact-item">
          <span class="contact-icon">📞</span>
          Call us: <a href="tel:+918012345678">+91 80 1234 5678</a>
        </div>
        <div class="contact-item">
          <span class="contact-icon">✉️</span>
          Email: <a href="mailto:sales@analog-chips.com">sales@analog-chips.com</a>
        </div>
        <div class="contact-item">
          <span class="contact-icon">🌐</span>
          Website: <a href="https://www.analog-chips.com">www.analog-chips.com</a>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} AnalogChips Technology Pvt Ltd. All rights reserved.</p>
      <p>Bengaluru, India</p>
      <p class="note">This is an automated response. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;