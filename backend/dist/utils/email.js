"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendStudentApplicationEmail = exports.sendConfirmationEmail = exports.sendContactEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Email transporter configuration
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com',
        pass: process.env.SMTP_PASS || 'your-app-password',
    },
});
// Send contact form email
const sendContactEmail = async (data) => {
    const { name, email, phone, country_of_interest, message, inquiry_id } = data;
    const mailOptions = {
        from: process.env.SMTP_USER || 'noreply@rnbridge.com',
        to: process.env.ADMIN_EMAIL || 'admin@rnbridge.com',
        subject: `New Contact Inquiry - RNBRIDGE LTD (ID: ${inquiry_id})`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1976d2 0%, #2e7d32 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">RNBRIDGE LTD</h1>
          <p style="margin: 10px 0 0 0;">New Contact Inquiry</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #1976d2;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 8px;">${phone}</td>
            </tr>
            ` : ''}
            ${country_of_interest ? `
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Country of Interest:</td>
              <td style="padding: 8px;">${country_of_interest}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Inquiry ID:</td>
              <td style="padding: 8px;">#${inquiry_id}</td>
            </tr>
          </table>
          
          <h3 style="color: #1976d2; margin-top: 20px;">Message</h3>
          <div style="background: white; padding: 15px; border-left: 4px solid #1976d2; margin: 10px 0;">
            <p style="margin: 0; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 5px;">
            <p style="margin: 0; color: #1976d2; font-weight: bold;">
              📧 Reply to: ${email}
            </p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">
              Please respond to this inquiry within 24 hours.
            </p>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© 2024 RNBRIDGE LTD. All rights reserved.</p>
          <p style="margin: 5px 0 0 0;">This is an automated notification from the RNBRIDGE LTD website.</p>
        </div>
      </div>
    `,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Contact email sent successfully:', info.messageId);
        return info;
    }
    catch (error) {
        console.error('❌ Error sending contact email:', error);
        throw error;
    }
};
exports.sendContactEmail = sendContactEmail;
// Send confirmation email to user
const sendConfirmationEmail = async (data) => {
    const { name, email, inquiry_id } = data;
    const mailOptions = {
        from: process.env.SMTP_USER || 'noreply@rnbridge.com',
        to: email,
        subject: 'Thank you for contacting RNBRIDGE LTD',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1976d2 0%, #2e7d32 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">RNBRIDGE LTD</h1>
          <p style="margin: 10px 0 0 0;">Thank you for contacting us!</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #1976d2;">Dear ${name},</h2>
          
          <p>Thank you for reaching out to RNBRIDGE LTD. We have received your inquiry and our team will get back to you within 24 hours.</p>
          
          <div style="background: white; padding: 15px; border-left: 4px solid #2e7d32; margin: 20px 0;">
            <h3 style="color: #2e7d32; margin: 0 0 10px 0;">Your Inquiry Details</h3>
            <p style="margin: 0;"><strong>Inquiry ID:</strong> #${inquiry_id}</p>
            <p style="margin: 5px 0 0 0;"><strong>Status:</strong> Under Review</p>
          </div>
          
          <h3 style="color: #1976d2;">What happens next?</h3>
          <ul style="color: #333; line-height: 1.6;">
            <li>Our education consultants will review your inquiry</li>
            <li>We'll contact you within 24 hours to discuss your options</li>
            <li>You'll receive a personalized consultation plan</li>
            <li>We'll guide you through the entire application process</li>
          </ul>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h4 style="color: #2e7d32; margin: 0 0 10px 0;">📞 Need immediate assistance?</h4>
            <p style="margin: 0; color: #333;">
              Call us: <strong>+44 20 1234 5678</strong><br>
              WhatsApp: <strong>+44 20 1234 5678</strong><br>
              Email: <strong>info@rnbridge.com</strong>
            </p>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© 2024 RNBRIDGE LTD. All rights reserved.</p>
          <p style="margin: 5px 0 0 0;">Your Gateway to Global Education</p>
        </div>
      </div>
    `,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Confirmation email sent successfully:', info.messageId);
        return info;
    }
    catch (error) {
        console.error('❌ Error sending confirmation email:', error);
        throw error;
    }
};
exports.sendConfirmationEmail = sendConfirmationEmail;
// Send student application confirmation
const sendStudentApplicationEmail = async (studentData) => {
    const { first_name, last_name, email, desired_country, desired_program } = studentData;
    const mailOptions = {
        from: process.env.SMTP_USER || 'noreply@rnbridge.com',
        to: email,
        subject: 'Student Application Received - RNBRIDGE LTD',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1976d2 0%, #2e7d32 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">RNBRIDGE LTD</h1>
          <p style="margin: 10px 0 0 0;">Student Application Received</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #1976d2;">Dear ${first_name} ${last_name},</h2>
          
          <p>Thank you for submitting your student application to RNBRIDGE LTD. We're excited to help you achieve your international education goals!</p>
          
          <div style="background: white; padding: 15px; border-left: 4px solid #2e7d32; margin: 20px 0;">
            <h3 style="color: #2e7d32; margin: 0 0 10px 0;">Application Summary</h3>
            <p style="margin: 5px 0;"><strong>Desired Country:</strong> ${desired_country}</p>
            <p style="margin: 5px 0;"><strong>Desired Program:</strong> ${desired_program}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> Under Review</p>
          </div>
          
          <h3 style="color: #1976d2;">Next Steps</h3>
          <ol style="color: #333; line-height: 1.6;">
            <li>Our education consultants will review your application</li>
            <li>We'll schedule a consultation call within 48 hours</li>
            <li>You'll receive a personalized education plan</li>
            <li>We'll guide you through university applications</li>
            <li>Visa and documentation support will be provided</li>
          </ol>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h4 style="color: #2e7d32; margin: 0 0 10px 0;">🎓 Why Choose RNBRIDGE LTD?</h4>
            <ul style="margin: 0; color: #333;">
              <li>15+ years of experience in international education</li>
              <li>95% success rate in student placements</li>
              <li>Direct partnerships with 50+ universities</li>
              <li>24/7 student support services</li>
            </ul>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© 2024 RNBRIDGE LTD. All rights reserved.</p>
          <p style="margin: 5px 0 0 0;">Your Gateway to Global Education</p>
        </div>
      </div>
    `,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Student application email sent successfully:', info.messageId);
        return info;
    }
    catch (error) {
        console.error('❌ Error sending student application email:', error);
        throw error;
    }
};
exports.sendStudentApplicationEmail = sendStudentApplicationEmail;
exports.default = {
    sendContactEmail: exports.sendContactEmail,
    sendConfirmationEmail: exports.sendConfirmationEmail,
    sendStudentApplicationEmail: exports.sendStudentApplicationEmail,
};
//# sourceMappingURL=email.js.map